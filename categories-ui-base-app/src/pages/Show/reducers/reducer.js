import {
    DELETE_CATEGORY,
    ERROR_DELETE_CATEGORY,
    ERROR_RECEIVE_CATEGORIES,
    RECEIVE_CATEGORIES, REQUEST_DELETE_CATEGORY,
    REQUEST_RECEIVE_CATEGORIES
} from "../actions/actionTypes";

const initialState = {
    list: [],
    isError: false,
    isFetching: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ERROR_RECEIVE_CATEGORIES: {
            return {
                ...state,
                isError: true,
                isFetching: false,
            };
        }

        case REQUEST_RECEIVE_CATEGORIES: {

            return {
                ...state,
                isFetching: false,
                isError: false
            };
        }

        case RECEIVE_CATEGORIES: {
            return {
                ...state,
                isFetching: true,
                isError: false,
                list: action.payload
            };
        }

        case ERROR_DELETE_CATEGORY: {
            return {
                ...state,
                isFailed: true,
                isFetching: false,
            };
        }

        case DELETE_CATEGORY: {
            const categories = state.list.filter((category) => category.id !== action.delete)
            return {
                ...state,
                isFetching: false,
                list: categories
            };
        }

        case REQUEST_DELETE_CATEGORY: {
            return {
                ...state,
                isFetching: true,
                isFailed: false,
            };
        }

        default:
            return state;
    }
}