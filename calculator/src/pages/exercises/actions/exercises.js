const receiveExercises = exercises => ({ exercises, type: 'RECEIVE_EXERCISES' });

const requestExercises = () => ({ type: 'REQUEST_EXERCISES' });

const errorReceiveExercises = () => ({ type: 'ERROR_RECEIVE_EXERCISES' });

const getExercises = (exercisesCount) => new Promise((onSuccess) => {
    const exercises = ['2 + 2', '7 / 0', '14 - 5']
    setTimeout(
        () => onSuccess(exercises),
        2000
    );
});

const fetchExercises = ({ exercisesCount }) => (dispatch) => {
    dispatch(requestExercises())

    return getExercises(exercisesCount)
        .then(exercise => dispatch(receiveExercises(exercise)))
        .catch(() => dispatch(errorReceiveExercises()))
};

export default fetchExercises