const receiveExercises = exercises => ({ exercises, type: 'RECEIVE_EXERCISES' });

const requestExercises = () => ({ type: 'REQUEST_EXERCISES' });

const errorReceiveExercises = () => ({ type: 'ERROR_RECEIVE_EXERCISES' });

async function getExercises (exercisesCount){
    let response = await fetch(`http://localhost:8080/math/examples?count=${exercisesCount}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    let content = await response.json()
    console.log(content)
    return content
}

const fetchExercises = ({ exercisesCount }) => (dispatch) => {
    dispatch(requestExercises())

    return getExercises(exercisesCount)
        .then(exercises => dispatch(receiveExercises(exercises)))
        .catch(() => dispatch(errorReceiveExercises()))
};

export default fetchExercises
