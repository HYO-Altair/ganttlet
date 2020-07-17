export interface IUser {
    loggedIn: boolean;
    email: string;
}

export type Json = string | number | boolean | null | { [property: string]: Json } | Json[];

export interface ICleanDatabase {
    users: unknown;
    projects: unknown;
}

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    projects: unknown;
    settings: unknown;
}

export interface IProject {
    name: string;
    timeZone: string;
    description: string;
    managers: unknown;
    members: unknown;
    tasks: unknown;
}

export interface IProjectTask {
    id: string;
    taskName: string;
    description: string;
    color: string;
    duration: string;
    startDate: string;
    endDate: string;
    assignees: unknown;
    subTasks: unknown;
    comments: unknown;
}

export interface ITaskComment {
    originalPoster: string;
    text: string;
    taggedUsers: unknown;
}

export interface IGoogleAuthProfile {
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

export interface ILogInCredentials {
    email: string;
    password: string;
}

export interface IRegisterCredentials {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
