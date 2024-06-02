import { takeLatest } from 'redux-saga/effects'
import {
    DELETE_BRAND_PENDING, DELETE_CATEGORY_PENDING, DELETE_MODEL_PENDING, DELETE_PRODUCT_PENDING,
    GET_BRAND_PENDING, GET_CATEGORY_PENDING, GET_MODEL_PENDING, GET_PRODUCT_PENDING,
    POST_BRAND_PENDING, POST_CATEGORY_PENDING, POST_MODEL_PENDING, POST_PRODUCT_PENDING,
    UPDATE_BRAND_PENDING, UPDATE_CATEGORY_PENDING, UPDATE_MODEL_PENDING, UPDATE_PRODUCT_PENDING
} from '../../user/Action/Action'

import {
    HANDLE_DELETE_BRAND, HANDLE_DELETE_CATEGORY, HANDLE_DELETE_MODEL,HANDLE_DELETE_PRODUCT, 
    HANDLE_GET_BRAND, HANDLE_GET_CATEGORY, HANDLE_GET_MODEL, HANDLE_GET_PRODUCT, 
    HANDLE_POST_BRAND, HANDLE_POST_CATEGORY, HANDLE_POST_MODEL, HANDLE_POST_PRODUCT, 
    HANDLE_UPDATE_BRAND, HANDLE_UPDATE_CATEGORY, HANDLE_UPDATE_MODEL, HANDLE_UPDATE_PRODUCT
} from '../user/ManageUser'


// -------------------PRODUCT -------------------
// get product 
function* HANDLE_GET_PRODUCT_SAGA() {
    yield takeLatest(GET_PRODUCT_PENDING, HANDLE_GET_PRODUCT)
}

//post product  
function* HANDLE_POST_PRODUCT_SAGA() {
    yield takeLatest(POST_PRODUCT_PENDING, HANDLE_POST_PRODUCT)
}

// delete product  
function* HANDLE_DELETE_PRODUCT_SAGA() {
    yield takeLatest(DELETE_PRODUCT_PENDING, HANDLE_DELETE_PRODUCT)
}

// UPDATE product  
function* HANDLE_UPDATE_PRODUCT_SAGA() {
    yield takeLatest(UPDATE_PRODUCT_PENDING, HANDLE_UPDATE_PRODUCT)
}


// -------------------CATEGORY -------------------
// get category
function* HANDLE_GET_CATEGORY_SAGA() {
    yield takeLatest(GET_CATEGORY_PENDING, HANDLE_GET_CATEGORY)
}

//post category 
function* HANDLE_POST_CATEGORY_SAGA() {
    yield takeLatest(POST_CATEGORY_PENDING, HANDLE_POST_CATEGORY)
}

// delete category 
function* HANDLE_DELETE_CATEGORY_SAGA() {
    yield takeLatest(DELETE_CATEGORY_PENDING, HANDLE_DELETE_CATEGORY)
}

// UPDATE category 
function* HANDLE_UPDATE_CATEGORY_SAGA() {
    yield takeLatest(UPDATE_CATEGORY_PENDING, HANDLE_UPDATE_CATEGORY)
}


// -------------------BRAND -------------------
// get brand
function* HANDLE_GET_BRAND_SAGA() {
    yield takeLatest(GET_BRAND_PENDING, HANDLE_GET_BRAND)
}

//post brand 
function* HANDLE_POST_BRAND_SAGA() {
    yield takeLatest(POST_BRAND_PENDING, HANDLE_POST_BRAND)
}

// delete brand 
function* HANDLE_DELETE_BRAND_SAGA() {
    yield takeLatest(DELETE_BRAND_PENDING, HANDLE_DELETE_BRAND)
}

// UPDATE brand 
function* HANDLE_UPDATE_BRAND_SAGA() {
    yield takeLatest(UPDATE_BRAND_PENDING, HANDLE_UPDATE_BRAND)
}


// -------------------MODEL -------------------
// get model
function* HANDLE_GET_MODEL_SAGA() {
    yield takeLatest(GET_MODEL_PENDING, HANDLE_GET_MODEL)
}

//post model 
function* HANDLE_POST_MODEL_SAGA() {
    yield takeLatest(POST_MODEL_PENDING, HANDLE_POST_MODEL)
}

// delete model 
function* HANDLE_DELETE_MODEL_SAGA() {
    yield takeLatest(DELETE_MODEL_PENDING, HANDLE_DELETE_MODEL)
}

// UPDATE model 
function* HANDLE_UPDATE_MODEL_SAGA() {
    yield takeLatest(UPDATE_MODEL_PENDING, HANDLE_UPDATE_MODEL)
}


export {
    HANDLE_GET_PRODUCT_SAGA, HANDLE_POST_PRODUCT_SAGA, HANDLE_DELETE_PRODUCT_SAGA, HANDLE_UPDATE_PRODUCT_SAGA,
    HANDLE_GET_CATEGORY_SAGA, HANDLE_POST_CATEGORY_SAGA, HANDLE_DELETE_CATEGORY_SAGA, HANDLE_UPDATE_CATEGORY_SAGA,
    HANDLE_GET_BRAND_SAGA, HANDLE_POST_BRAND_SAGA, HANDLE_DELETE_BRAND_SAGA, HANDLE_UPDATE_BRAND_SAGA,
    HANDLE_GET_MODEL_SAGA, HANDLE_POST_MODEL_SAGA, HANDLE_DELETE_MODEL_SAGA, HANDLE_UPDATE_MODEL_SAGA

};