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
    provider: firebase.auth.GoogleAuthProvider;

    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();

        this.auth.onAuthStateChanged(() => {
            //this.loggedIn = Boolean(user);
            return app.auth().onAuthStateChanged((user) => {
                if (user) {
                    console.log('The user is logged in');
                } else {
                    console.log('The user is not logged in');
                }
            });
        });

        this.loggedIn = false;

        this.provider = new app.auth.GoogleAuthProvider();
    }

    /* Auth API */

    createUser(email: string, password: string, firstName: string, lastName: string): void {
        // Need to add code to save user info in the realtime database as well.
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
        this.db.ref('/users').push(dbObject);
        this.auth.createUserWithEmailAndPassword(email, password);
    }

    signIn(email: string, password: string): void {
        this.auth.signInWithEmailAndPassword(email, password);
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

    googleSignIn = () => {
        this.auth
            .signInWithPopup(this.provider)
            .then((result) => {
                if (result) {
                    const user = result.user;
                    console.log(user);
                    // To-do: handle what happen after (redirect, etc.)
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
            });
    };

    /* -------- */

    /* Database Operations API */

    async test(): Promise<void> {
        const data = await (await this.db.ref('/').once('value')).val();
        console.log(data);
    }

    async userAlreadyExists(email: string) {
        const snapshotOfPotentialUser = await this.db.ref('users').orderByChild('email').equalTo(email).once('value');
        const exists = await snapshotOfPotentialUser.exists();
        return exists;
    }
    
    async addProject(name: string, description: string, mngr: string) {
        const project = {
            name: name,
            description: description,
            managers: {manager: mngr},
            memebers: {},
            table: {}
        };
        this.db.ref('projects/' + mngr + '/' + 0).set(project);
    }
    /* -------- */
}

const firebase = new FirebaseWrapper();
export default firebase;
