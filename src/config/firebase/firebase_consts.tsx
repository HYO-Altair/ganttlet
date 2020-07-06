/*
 * Firebase paths
 */
export const rootPath = 'notset.com'; // prolly process.env idk
export const userPath = rootPath + 'child/users';
export const teamsPath = rootPath + 'child/teams';

/*
 * Firebase JSON templates
 */

// template for resetting database
export const cleanDatabaseJSON = {
    users: {},
    teams: {},
};

// template for adding a new user to users
export const newUserJSON = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    teams: {},
    settings: {},
};

// template for adding a new team to teams
export const newTeamJSON = {
    managers: {},
    members: {},
    projects: {},
};

// template for adding a new project to a team
export const newProjectJSON = {
    description: '',
    managers: {},
    members: {},
    table: {},
};

// template for adding a new task to a project
export const newProjectTaskJSON = {
    id: '',
    taskname: '',
    duration: '',
    startdate: '',
    enddate: '',
};
