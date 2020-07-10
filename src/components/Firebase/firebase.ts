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

// Not sure where we could end up using this, but just declaring for now
// interface IUser {
//     email: string;
//     fname: string;
//     lName: string;
//     teams: {
//         teamCount: number;
//     };
//     settings: {
//         theme: string; // Probably change this to an enum or something
//     };
// }

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
    loggedIn: boolean;
    lastLoginAttemptWasInvalid: boolean;
    provider: firebase.auth.GoogleAuthProvider;

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

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Special setting for Cypress to prevent jank with staying signed in.
        if (window.Cypress) {
            this.auth.setPersistence(app.auth.Auth.Persistence.NONE);
        }
        this.provider = new app.auth.GoogleAuthProvider();
    }

    /* Auth API */

    async createUser(email: string, password: string, firstName: string, lastName: string): Promise<void> {
        // Need to add code to save user info in the realtime database as well.
        await this.auth.createUserWithEmailAndPassword(email, password);
        this.pushUserObject(this.auth.currentUser?.uid || 'null_user', email, firstName, lastName);
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
                this.deleteCurrentUsersObject(uid);
            } catch (error) {
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

                const uid = result.user?.uid || 'null_id';
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
            teams: {
                teamCount: 0,
            },
            settings: {
                theme: 'default',
            },
        };
        this.db.ref(`/users/${uid}`).set(dbObject);
    }

    async deleteCurrentUsersObject(uid: string) {
        this.db.ref(`/users/${uid}`).remove();
    }

    /* -------- */
}

const firebase = new FirebaseWrapper();
export default firebase;
