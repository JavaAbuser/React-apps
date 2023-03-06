import {
    ERROR_CREATE_CATEGORY,
    CREATE_CATEGORY,
    REQUEST_CREATE_CATEGORY,

} from '../actions/actionTypes';

const initialState = {
    isError: false,
    isFetching: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ERROR_CREATE_CATEGORY: {
            return {
                ...state,
                isError: true,
                isFetching: false,
            };
        }

        case CREATE_CATEGORY: {
            return {
                ...state,
                isFetching: false,
            };
        }

        case REQUEST_CREATE_CATEGORY: {
            return {
                ...state,
                isFetching: true,
                isError: false,
            };
        }

        default:
            return state;
    }
}