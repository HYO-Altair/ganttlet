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
            this.deleteCurrentUsersObject();
            this.auth.currentUser.delete();
        }
    }

    async googleSignIn() {
        try {
            const result = await this.auth.signInWithPopup(this.provider);
            const user = result.user;
            // const token = googleSignInResult.credential.
            // We need to use Google OAuth to get the users details.
            this.pushUserObject(user?.uid || 'null_user', 'proletariat@revolution.com', 'Karl', 'Marx');
        } catch (error) {
            // const errorCode = error.code;
            console.log(error);
        }
        // this.auth
        //     .signInWithPopup(this.provider)
        //     .then((result) => {
        //         if (result) {
        //             const user = result.user;
        //             console.log(user);
        //             // To-do: handle what happen after (redirect, etc.)
        //         }
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         console.log(errorCode);
        //     });
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

    async deleteCurrentUsersObject() {
        this.db.ref(`/users/${this.auth.currentUser?.uid}`).remove();
    }

    /* -------- */
}

const firebase = new FirebaseWrapper();
export default firebase;
