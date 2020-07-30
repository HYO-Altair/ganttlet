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
    tasks: ITasksWrapper;
}

export interface ITasksWrapper {
    data: IProjectTaskData[];
    links: IProjectTaskLink[];
}

// I changed this to resemble the DHTMLX task JSON exactly. We'll probably change this up down the
export interface IProjectTaskData {
    ['!nativeeditor_status']: string; // Probably turn this into an enum
    id: number;
    text: string;
    parent: number;
    progress: number;
    duration: number;
    start_date: string;
    end_date: string;
}

export interface IProjectTaskLink {
    ['!nativeeditor_status']: string; // Probably turn this into an enum
    id: number;
    source: number;
    target: number;
    type: string;
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

export interface IComment {
    name: string;
    message: string;
    time: string;
}
