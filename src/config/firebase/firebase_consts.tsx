/*
 * Firebase paths
 */
export const rootPath = 'notset.com'; // prolly process.env idk
export const userPath = rootPath + 'child/users';
export const teamsPath = rootPath + 'child/teams';
export const config = {
    apiKey: 'AIzaSyAFCnshUKjdme_1QFXaSFzkTxjLtGpztF0',
    authDomain: 'ganttlett.firebaseapp.com',
    databaseURL: 'https://ganttlett.firebaseio.com',
    projectId: 'ganttlett',
    storageBucket: 'ganttlett.appspot.com',
    messagingSenderId: '783372525556',
    appId: '1:783372525556:web:37eb04f4ccfdbd62fae3a1',
    measurementId: 'G-WH23WGKNYZ',
};
/*
 * Firebase JSON interfaces
 */

// template for resetting database
export interface cleanDatabaseJSON {
    users: unknown;
    projects: unknown;
}

// template for adding a new user to users
export interface newUserJSON {
    fname: string;
    lname: string;
    email: string;
    password: string;
    projects: unknown;
    settings: unknown;
}

// template for adding a new project to a team
export interface newProjectJSON {
    name: string;
    timezone: string;
    description: string;
    managers: unknown;
    members: unknown;
    tasks: unknown;
}

// template for adding a new task to a project
export interface newProjectTaskJSON {
    id: string;
    taskname: string;
    description: string;
    color: string;
    duration: string;
    startdate: string;
    enddate: string;
    assignees: unknown;
    subtasks: unknown;
    comments: unknown;
}

// template for adding a new comment to a task
export interface newTaskComment {
    op: string;
    text: string;
    taggedUsers: unknown;
}
