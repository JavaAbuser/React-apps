import {
    ERROR_CREATE_CATEGORY,
    CREATE_CATEGORY,
    REQUEST_CREATE_CATEGORY,

} from './actionTypes';

const errorCreateCategory = () => ({
    type: ERROR_CREATE_CATEGORY,
});

const createCategory = category => ({
    payload: category,
    type: CREATE_CATEGORY,
});

const requestCreateCategory = () => ({
    type: REQUEST_CREATE_CATEGORY,
});

const saveCustomer = (categoryName) => {
    const jsonRequest = {
        name: categoryName
    };

    return fetch(`http://localhost:8080/category`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(jsonRequest)
        },
    )
}

const fetchCreateCategory = (categoryName) => (dispatch) => {
    dispatch(requestCreateCategory());
    return saveCustomer(categoryName)
        .then(() => dispatch(createCategory(categoryName)))
        .catch(() => dispatch(errorCreateCategory()));
};

export default {fetchCreateCategory}