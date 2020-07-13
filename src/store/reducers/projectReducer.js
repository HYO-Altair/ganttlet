const initState = {
    projects: [
        {
            name: 'Project1',
            description: 'Describe Project1',
        },

        {
            name: 'Project2',
            description: 'Describe Project2',
        },

        {
            name: 'Project3',
            description: 'Describe Project3',
        },
        {
            name: 'Project4',
            description: 'Describe Project4',
        },
        {
            name: 'Project5',
            description: 'Describe Project5',
        },
    ],
};

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('create project', action.project);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('create project error', action.err);
            return state;
        default:
            return state;
    }
};

export default projectReducer;
