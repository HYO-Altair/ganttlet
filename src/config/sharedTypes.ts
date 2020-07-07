export interface IUser {
    loggedIn: boolean;
    email: string;
}

export type Json = string | number | boolean | null | { [property: string]: Json } | Json[];
