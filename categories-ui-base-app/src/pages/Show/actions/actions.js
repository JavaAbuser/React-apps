import {
    ERROR_RECEIVE_CATEGORIES,
    REQUEST_RECEIVE_CATEGORIES,
    RECEIVE_CATEGORIES,
    ERROR_DELETE_CATEGORY,
    DELETE_CATEGORY,
    REQUEST_DELETE_CATEGORY
} from "./actionTypes";

const errorReceiveCategories = () => ({
    type: ERROR_RECEIVE_CATEGORIES,
});

const requestReceiveCategories = () => ({
    type: REQUEST_RECEIVE_CATEGORIES
});

const receiveCategories = (listCategories) => ({
    payload: listCategories,
    type: RECEIVE_CATEGORIES
});

const errorDeleteCategory = () => ({
    type: ERROR_DELETE_CATEGORY
});

const deleteCategory = categoryId => ({
    deletedCustomerId: categoryId,
    type: DELETE_CATEGORY
});

const requestDeleteCategory = () => ({
    type: REQUEST_DELETE_CATEGORY
});

const deleteCategoryById = id => {
    return fetch(`http://localhost:8080/category/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        },
    )
}
const getCategories = () => {
    return fetch(`http://localhost:8080/categories`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    }).catch(() => ([
        {
            "id": 1,
            "name": "Toys",
            "description": "for kids"
        },
        {
            "id": 2,
            "name": "Clothes",
            "description": "for everyone"
        }
    ]));
}

const fetchGetCategories = () => (dispatch) => {
    dispatch(requestReceiveCategories());
    return getCategories()
        .then((categories) => dispatch(receiveCategories(categories)))
        .catch(() => dispatch(errorReceiveCategories()));
};

const fetchDeleteCategory = id => (dispatch) => {
    dispatch(requestDeleteCategory());
    return deleteCategoryById(id)
        .then(() => dispatch(deleteCategory(id)))
        .catch(() => dispatch(errorDeleteCategory()));
};

export default {fetchGetCategories, fetchDeleteCategory}