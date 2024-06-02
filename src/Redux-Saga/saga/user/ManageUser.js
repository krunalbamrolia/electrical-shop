import { call, put } from 'redux-saga/effects'
import {
    delete_brand, delete_category, delete_model, delete_product,
    get_brand, get_category, get_model, get_product,
    post_brand, post_category, post_model, post_product,
    update_brand, update_category, update_model, update_product
} from '../../user/API/Api';
import {
    DELETE_BRAND_ERROR, DELETE_BRAND_SUCCESS,
    DELETE_CATEGORY_ERROR, DELETE_CATEGORY_SUCCESS,
    DELETE_MODEL_ERROR, DELETE_MODEL_SUCCESS,
    DELETE_PRODUCT_ERROR, DELETE_PRODUCT_SUCCESS,
    
    GET_BRAND_ERROR, GET_BRAND_SUCCESS,
    GET_CATEGORY_ERROR, GET_CATEGORY_SUCCESS,
    GET_MODEL_ERROR, GET_MODEL_SUCCESS,
    GET_PRODUCT_ERROR, GET_PRODUCT_SUCCESS,
    
    POST_BRAND_ERROR, POST_BRAND_SUCCESS,
    POST_CATEGORY_ERROR, POST_CATEGORY_SUCCESS,
    POST_MODEL_ERROR, POST_MODEL_SUCCESS,
    POST_PRODUCT_ERROR, POST_PRODUCT_SUCCESS,
    
    UPDATE_BRAND_ERROR, UPDATE_BRAND_SUCCESS,
    UPDATE_CATEGORY_ERROR, UPDATE_CATEGORY_SUCCESS,
    UPDATE_MODEL_ERROR, UPDATE_MODEL_SUCCESS,
    UPDATE_PRODUCT_ERROR, UPDATE_PRODUCT_SUCCESS
} from '../../user/Action/Action';

// -------------------PRODUCT -------------------
// get product data
function* HANDLE_GET_PRODUCT(action) {
    // console.log(action, "action from manage");
    try {
        let { data, status } = yield call(get_product, action);
        // console.log(status,"status from manage");
        if (status === 200) {
            yield put({ type: GET_PRODUCT_SUCCESS, data });
        }
        else {
            yield put({ type: GET_PRODUCT_ERROR, data });
        }
    }
    catch (err) {
        yield put({ type: GET_PRODUCT_ERROR, err });
    }
}


// post product data 
function* HANDLE_POST_PRODUCT(action) {
    // console.log(action,"manage action");
    try {
        let { data, status } = yield call(post_product, action);
        // console.log(data,"data from manage");
        if (status == 201 || status == 200) {
            yield put({ type: POST_PRODUCT_SUCCESS, data });
        }
        else {
            yield put({ type: POST_PRODUCT_ERROR, data });
        }
    }
    catch (err) {
        yield put({ type: POST_PRODUCT_ERROR, err });
    }
}

// delete product data
function* HANDLE_DELETE_PRODUCT(action) {
    try {
        let { data, status } = yield call(delete_product, action);
        if (status == 200) {
            yield put({ type: DELETE_PRODUCT_SUCCESS, data });
        }
        else {
            yield put({ type: DELETE_PRODUCT_ERROR, data });
        }
    }
    catch (err) {
        yield put({ type: DELETE_PRODUCT_ERROR, err });
    }
}

//update product data
function* HANDLE_UPDATE_PRODUCT(action) {
    try {
        let { data, status } = yield call(update_product, action)
        if (status == 200) {
            yield put({ type: UPDATE_PRODUCT_SUCCESS, data })
        }
        else {
            yield put({ type: UPDATE_PRODUCT_ERROR, data })
        }
    }
    catch (err) {
        yield put({ type: UPDATE_PRODUCT_ERROR, data: err })
    }
}


// -------------------CATEGORY -------------------

// get category data
function* HANDLE_GET_CATEGORY(action) {
    // console.log(action, "action from manage");
    try {
        let { data, status } = yield call(get_category, action);
        // console.log(status,"status from manage");
        if (status === 200) {
            yield put({ type: GET_CATEGORY_SUCCESS, data });
        }
        else {
            yield put({ type: GET_CATEGORY_ERROR, data });
        }
    }
    catch (err) {
        yield put({ type: GET_CATEGORY_ERROR, err });
    }
}


// post category data 
function* HANDLE_POST_CATEGORY(action) {
    // console.log(action,"manage action");
    try {
        let { data, status } = yield call(post_category, action);
        // console.log(data,"data from manage");
        if (status == 201 || status == 200) {
            yield put({ type: POST_CATEGORY_SUCCESS, data });
        }
        else {
            yield put({ type: POST_CATEGORY_ERROR, data });
        }
    }
    catch (err) {
        yield put({ type: POST_CATEGORY_ERROR, err });
    }
}

// delete category data
function* HANDLE_DELETE_CATEGORY(action) {
    try {
        let { data, status } = yield call(delete_category, action);
        if (status == 200) {
            yield put({ type: DELETE_CATEGORY_SUCCESS, data });
        }
        else {
            yield put({ type: DELETE_CATEGORY_ERROR, data });
        }
    }
    catch (err) {
        yield put({ type: DELETE_CATEGORY_ERROR, err });
    }
}

//update category data
function* HANDLE_UPDATE_CATEGORY(action) {
    try {
        let { data, status } = yield call(update_category, action)
        if (status == 200) {
            yield put({ type: UPDATE_CATEGORY_SUCCESS, data })
        }
        else {
            yield put({ type: UPDATE_CATEGORY_ERROR, data })
        }
    }
    catch (err) {
        yield put({ type: UPDATE_CATEGORY_ERROR, data: err })
    }
}

// -------------------BRAND -------------------

// get brand data
function* HANDLE_GET_BRAND(action) {
    // console.log(action, "action from manage");
    try {
        let { data, status } = yield call(get_brand, action);
        // console.log(status,"status from manage");
        if (status === 200) {
            yield put({ type: GET_BRAND_SUCCESS, data });
        }
        else {
            yield put({ type: GET_BRAND_ERROR, data });
        }
    }
    catch (err) {
        yield put({ type: GET_BRAND_ERROR, err });
    }
}


// post brand data 
function* HANDLE_POST_BRAND(action) {
    // console.log(action,"manage action");
    try {
        let { data, status } = yield call(post_brand, action);
        // console.log(data,"data from manage");
        if (status == 201 || status == 200) {
            yield put({ type: POST_BRAND_SUCCESS, data });
        }
        else {
            yield put({ type: POST_BRAND_ERROR, data });
        }
    }
    catch (err) {
        yield put({ type: POST_BRAND_ERROR, err });
    }
}

// delete brand data
function* HANDLE_DELETE_BRAND(action) {
    try {
        let { data, status } = yield call(delete_brand, action);
        if (status == 200) {
            yield put({ type: DELETE_BRAND_SUCCESS, data });
        }
        else {
            yield put({ type: DELETE_BRAND_ERROR, data });
        }
    }
    catch (err) {
        yield put({ type: DELETE_BRAND_ERROR, err });
    }
}

//update brand data
function* HANDLE_UPDATE_BRAND(action) {
    try {
        let { data, status } = yield call(update_brand, action)
        if (status == 200) {
            yield put({ type: UPDATE_BRAND_SUCCESS, data })
        }
        else {
            yield put({ type: UPDATE_BRAND_ERROR, data })
        }
    }
    catch (err) {
        yield put({ type: UPDATE_BRAND_ERROR, data: err })
    }
}


// -------------------MODELS -------------------

// get model data
function* HANDLE_GET_MODEL(action) {
    // console.log(action, "action from manage");
    try {
        let { data, status } = yield call(get_model, action);
        // console.log(status,"status from manage");
        if (status === 200) {
            yield put({ type: GET_MODEL_SUCCESS, data });
        }
        else {
            yield put({ type: GET_MODEL_ERROR, data });
        }
    }
    catch (err) {
        yield put({ type: GET_MODEL_ERROR, err });
    }
}


// post model data 
function* HANDLE_POST_MODEL(action) {
    // console.log(action,"manage action");
    try {
        let { data, status } = yield call(post_model, action);
        // console.log(data,"data from manage");
        if (status == 201 || status == 200) {
            yield put({ type: POST_MODEL_SUCCESS, data });
        }
        else {
            yield put({ type: POST_MODEL_ERROR, data });
        }
    }
    catch (err) {
        yield put({ type: POST_MODEL_ERROR, err });
    }
}

// delete model data
function* HANDLE_DELETE_MODEL(action) {
    try {
        let { data, status } = yield call(delete_model, action);
        if (status == 200) {
            yield put({ type: DELETE_MODEL_SUCCESS, data });
        }
        else {
            yield put({ type: DELETE_MODEL_ERROR, data });
        }
    }
    catch (err) {
        yield put({ type: DELETE_MODEL_ERROR, err });
    }
}

//update model data
function* HANDLE_UPDATE_MODEL(action) {
    try {
        let { data, status } = yield call(update_model, action)
        if (status == 200) {
            yield put({ type: UPDATE_MODEL_SUCCESS, data })
        }
        else {
            yield put({ type: UPDATE_MODEL_ERROR, data })
        }
    }
    catch (err) {
        yield put({ type: UPDATE_MODEL_ERROR, data: err })
    }
}

export {
    HANDLE_GET_PRODUCT, HANDLE_POST_PRODUCT, HANDLE_DELETE_PRODUCT, HANDLE_UPDATE_PRODUCT,
    HANDLE_GET_CATEGORY, HANDLE_POST_CATEGORY, HANDLE_DELETE_CATEGORY, HANDLE_UPDATE_CATEGORY,
    HANDLE_GET_BRAND, HANDLE_POST_BRAND, HANDLE_DELETE_BRAND, HANDLE_UPDATE_BRAND,
    HANDLE_GET_MODEL, HANDLE_POST_MODEL, HANDLE_DELETE_MODEL, HANDLE_UPDATE_MODEL,
};