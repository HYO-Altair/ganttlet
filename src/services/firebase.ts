import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { config } from '../config/firebase/firebase_consts';

interface IProject {
    name: string;
    description: string;
    owner: string;
    members: string[];
}

interface IUser {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    projects: {
        owned: IProject[] | null;
        member: IProject[] | null;
    };
}

interface IGoogleAuthProfile {
    email: string;
    family_name: string;
    given_name: string;
    granted_scopes: string;
    id: string;
    locale: string;
    name: string;
    picture: string;
    verified_email: boolean;
}

class FirebaseWrapper {
    auth: app.auth.Auth;
    db: app.database.Database;
    provider: firebase.auth.GoogleAuthProvider;

    loggedIn: boolean;
    lastLoginAttemptWasInvalid: boolean;

    currentUser: IUser | null;

    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();

        this.auth.onAuthStateChanged(() => {
            return app.auth().onAuthStateChanged((user) => {
                // Not currently used, but I felt it was best to have it available
                this.loggedIn = Boolean(user);
                if (!this.loggedIn) {
                    this.currentUser = null;
                }
            });
        });

        this.loggedIn = false;
        this.lastLoginAttemptWasInvalid = false;
        this.currentUser = null;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Special setting for Cypress to prevent jank with staying signed in.
        if (window.Cypress) {
            this.auth.setPersistence(app.auth.Auth.Persistence.NONE);
        }
        this.provider = new app.auth.GoogleAuthProvider();
    }

    /* Auth API */

    async createUser(email: string, password: string, firstName: string, lastName: string): Promise<void> {
        const result = await this.auth.createUserWithEmailAndPassword(email, password);
        const uid = result.user?.uid ?? 'null_uid';
        await this.pushUserObject(uid, email, firstName, lastName);
        this.setUserDataListener(uid);
    }

    async signIn(email: string, password: string): Promise<void> {
        try {
            const result = await this.auth.signInWithEmailAndPassword(email, password);
            this.lastLoginAttemptWasInvalid = false;

            const uid = result.user?.uid ?? 'null_uid';
            this.setUserDataListener(uid);
        } catch (error) {
            this.lastLoginAttemptWasInvalid = true;
        }
    }

    signOut(): void {
        this.auth.signOut();
    }

    deleteUser() {
        if (this.auth.currentUser) {
            try {
                // Saving it beforehand because the currentUser in auth becomes null if the delete succeeds
                const uid = this.auth.currentUser.uid;

                this.auth.currentUser.delete();
                this.deleteUserObject(uid);
            } catch (error) {
                console.error(error);
                // Firebase has a concept of some actions needing the user to have signed in recently and
                // delete is one of them. So, this catch block catches the exception thrown if it has been
                // too long since the last sign in.
                // TODO: Somehow make the user sign in again.
            }
        }
    }

    async googleSignIn() {
        try {
            const result = await this.auth.signInWithPopup(this.provider);
            const uid = result.user?.uid ?? 'null_uid';
            if (result.additionalUserInfo?.isNewUser) {
                // For some reason, the profile key does not have typing by default so I console.logged in
                // and made an interface out of it.
                const profile = result.additionalUserInfo?.profile as IGoogleAuthProfile;

                const email = profile.email;
                const firstName = profile?.given_name;
                const lastName = profile?.family_name;

                await this.pushUserObject(uid, email, firstName, lastName);
            }
            this.setUserDataListener(uid);
        } catch (err) {
            const error = err as app.auth.Error;
            console.error(`${error.code} : ${error.message}`);
        }
    }

    /* -------- */

    /* Database Operations API */

    async setUserDataListener(uid: string) {
        this.db.ref(`/users/${uid}`).on('value', async (snapshot) => {
            const data = snapshot.val();
            const newCurrentUser: IUser = {
                uid: uid,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                projects: {
                    owned: null,
                    member: null,
                },
            };
            this.currentUser = newCurrentUser;
        });
    }

    async userAlreadyExists(email: string) {
        const snapshotOfPotentialUser = await this.db.ref('/users').orderByChild('email').equalTo(email).once('value');
        return snapshotOfPotentialUser.exists();
    }

    async pushUserObject(uid: string, email: string, firstName: string, lastName: string): Promise<void> {
        const dbObject = {
            email: email,
            firstName: firstName,
            lastName: lastName,
        };
        this.db.ref(`/users/${uid}`).set(dbObject);
    }

    async deleteUserObject(uid: string) {
        this.db.ref(`/users/${uid}`).remove();
    }

    /* -------- */
}

const firebase = new FirebaseWrapper();
export default firebase;
