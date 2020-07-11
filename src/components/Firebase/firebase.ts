import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: 'AIzaSyAFCnshUKjdme_1QFXaSFzkTxjLtGpztF0',
    authDomain: 'ganttlett.firebaseapp.com',
    databaseURL: 'https://ganttlett.firebaseio.com',
    projectId: 'ganttlett',
    storageBucket: 'ganttlett.appspot.com',
    messagingSenderId: '783372525556',
    appId: '1:783372525556:web:37eb04f4ccfdbd62fae3a1',
    measurementId: 'G-WH23WGKNYZ',
};

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
    projects: IProject[];
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

    currentUser: IUser | undefined;

    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();

        this.auth.onAuthStateChanged(() => {
            return app.auth().onAuthStateChanged((user) => {
                // Not currently used, but I felt it was best to have it available
                this.loggedIn = Boolean(user);
            });
        });

        this.loggedIn = false;
        this.lastLoginAttemptWasInvalid = false;
        this.currentUser = undefined;

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
        const uid = result.user?.uid || 'null_uid';
        this.pushUserObject(uid, email, firstName, lastName);
    }

    async signIn(email: string, password: string): Promise<void> {
        try {
            await this.auth.signInWithEmailAndPassword(email, password);
            this.lastLoginAttemptWasInvalid = false;
        } catch (error) {
            this.lastLoginAttemptWasInvalid = true;
        }
    }

    signOut(): void {
        this.auth.signOut();
    }

    resetPassword(email: string): void {
        this.auth.sendPasswordResetEmail(email);
    }

    // Kinda redundant, but TS complains if I use the isLoggedIn function
    updatePassword(password: string): void {
        if (this.auth.currentUser) {
            this.auth.currentUser.updatePassword(password);
        }
    }

    deleteUser() {
        if (this.auth.currentUser) {
            try {
                // Saving it beforehand because the currentUser becomes null if the delete succeeds
                const uid = this.auth.currentUser.uid;

                this.auth.currentUser.delete();
                this.deleteUserObject(uid);
            } catch (error) {
                console.log(error);
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

            if (result.additionalUserInfo?.isNewUser) {
                // For some reason, the profile key does not have typing by default so I console.logged in
                // and made an interface out of it.
                const profile = result.additionalUserInfo?.profile as IGoogleAuthProfile;

                const uid = result.user?.uid || 'null_uid';
                const email = profile.email;
                const firstName = profile?.given_name;
                const lastName = profile?.family_name;

                this.pushUserObject(uid, email, firstName, lastName);
            }
        } catch (err) {
            const error = err as app.auth.Error;
            console.log(`${error.code} : ${error.message}`);
        }
    }

    /* -------- */

    /* Database Operations API */

    async test(): Promise<void> {
        const data = await (await this.db.ref('/').once('value')).val();
        console.log(data);
    }

    async userAlreadyExists(email: string) {
        const snapshotOfPotentialUser = await this.db.ref('/users').orderByChild('email').equalTo(email).once('value');
        const exists = await snapshotOfPotentialUser.exists();
        return exists;
    }

    pushUserObject(uid: string, email: string, firstName: string, lastName: string): void {
        const dbObject = {
            email: email,
            fname: firstName,
            lName: lastName,
            projects: {},
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
