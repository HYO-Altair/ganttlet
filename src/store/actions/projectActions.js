export const createProject = (project) => {
    return async (dispatch, getState, { getFirebase }) => {
        // make async call to database
        try {
            const firebase = getFirebase();
            await firebase
                .database()
                .ref(`/projects/`)
                .push({ ...project });
            return dispatch({ type: 'CREATE_PROJECT', project });
        } catch (err) {
            return dispatch({ type: 'CREATE_PROJECT_ERROR', err });
        }
    };
};
