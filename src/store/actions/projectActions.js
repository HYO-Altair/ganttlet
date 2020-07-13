export const createProject = (project) => {
    return (dispatch, getState, { getFirebase }) => {
        // make async call to database
        const firebase = getFirebase();
        firebase
            .database()
            .ref(`/projects/${project.name}`)
            .set({
                ...project,
            })
            .then(() => {
                dispatch({ type: 'CREATE_PROJECT', project });
            })
            .catch((err) => {
                dispatch({ type: 'CREATE_PROJECT_ERROR', err });
            });
    };
};
