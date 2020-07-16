export interface IUser {
    loggedIn: boolean;
    email: string;
}

export type Json = string | number | boolean | null | { [property: string]: Json } | Json[];

export interface IcleanDatabaseJSON {
    users: unknown;
    projects: unknown;
}

export interface IUserJSON {
    fname: string;
    lname: string;
    email: string;
    password: string;
    projects: unknown;
    settings: unknown;
}

export interface IProjectJSON {
    name: string;
    timezone: string;
    description: string;
    managers: unknown;
    members: unknown;
    tasks: unknown;
}

export interface IProjectTaskJSON {
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

export interface ITaskComment {
    op: string;
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
