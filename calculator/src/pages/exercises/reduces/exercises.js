const initialState = {
    isLoading: false,
    isError: false,
    list: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_EXERCISES': {
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        }
        case 'RECEIVE_EXERCISES': {
            const {
                exercises,
            } = action;
            return {
                ...state,
                isLoading: false,
                isError: false,
                list: exercises,
            };
        }
        case 'ERROR_RECEIVE_EXERCISES': {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }
        default: return state;
    }
};