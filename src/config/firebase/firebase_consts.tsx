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
    projects: {},
};

// template for adding a new user to users
export const newUserJSON = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    projects: {},
    settings: {},
};

// template for adding a new project to a team
export const newProjectJSON = {
    name: '',
    timezone: '',
    description: '',
    managers: {},
    members: {},
    tasks: {},
};

// template for adding a new task to a project
export const newProjectTaskJSON = {
    id: '',
    taskname: '',
    description: '',
    color: '',
    duration: '',
    startdate: '',
    enddate: '',
    assignees: {},
    subtasks: {},
    comments: {},
};

// template for adding a new comment to a task
export const newTaskComment = {
    op: '',
    text: '',
    taggedusers: {},
};
