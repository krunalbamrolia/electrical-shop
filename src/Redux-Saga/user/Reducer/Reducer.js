
import {
    DELETE_BRAND_ERROR, DELETE_BRAND_PENDING, DELETE_BRAND_SUCCESS,
    DELETE_CATEGORY_ERROR, DELETE_CATEGORY_PENDING, DELETE_CATEGORY_SUCCESS, 
    DELETE_MODEL_ERROR, DELETE_MODEL_PENDING, DELETE_MODEL_SUCCESS, 
    DELETE_PRODUCT_ERROR, DELETE_PRODUCT_PENDING, DELETE_PRODUCT_SUCCESS, 
    
    GET_BRAND_ERROR, GET_BRAND_PENDING, GET_BRAND_SUCCESS, 
    GET_CATEGORY_ERROR, GET_CATEGORY_PENDING, GET_CATEGORY_SUCCESS, 
    GET_MODEL_ERROR, GET_MODEL_PENDING, GET_MODEL_SUCCESS, 
    GET_PRODUCT_ERROR, GET_PRODUCT_PENDING, GET_PRODUCT_SUCCESS, 
    
    POST_BRAND_ERROR, POST_BRAND_PENDING, POST_BRAND_SUCCESS, 
    POST_CATEGORY_ERROR, POST_CATEGORY_PENDING, POST_CATEGORY_SUCCESS, 
    POST_MODEL_ERROR, POST_MODEL_PENDING, POST_MODEL_SUCCESS, 
    POST_PRODUCT_ERROR, POST_PRODUCT_PENDING, POST_PRODUCT_SUCCESS, 
    
    UPDATE_BRAND_ERROR, UPDATE_BRAND_PENDING, UPDATE_BRAND_SUCCESS, 
    UPDATE_CATEGORY_ERROR, UPDATE_CATEGORY_PENDING, UPDATE_CATEGORY_SUCCESS, 
    UPDATE_MODEL_ERROR, UPDATE_MODEL_PENDING, UPDATE_MODEL_SUCCESS, 
    UPDATE_PRODUCT_ERROR, UPDATE_PRODUCT_PENDING, UPDATE_PRODUCT_SUCCESS
} from "../Action/Action";




let initialstate = {
    user: [],
    isLoading: false,
    isError: null
};

let userReducer = (state = initialstate, action) => {
    // console.log(action, "action from reducer");

    switch (action.type) {

        // -------------------PRODUCT -------------------
        // product get data
        case GET_PRODUCT_PENDING: {
            return {
                isLoading: true,
                ...state
            };
        }
        case GET_PRODUCT_SUCCESS: {
            return {
                isLoading: false,
                user: action.data
            };
        }
        case GET_PRODUCT_ERROR: {
            return {
                ...state,
                isError: action.data
            };
        }

        // product post data 
        case POST_PRODUCT_PENDING: {
            return {
                isLoading: true,
                ...state
            }
        }
        case POST_PRODUCT_SUCCESS: {
            return {
                isLoading: false,
                user: state.user.concat(action.data)
            }
        }
        case POST_PRODUCT_ERROR: {
            return {
                isError: action.data,
                ...state
            }
        }

        // product delete data 
        case DELETE_PRODUCT_PENDING: {
            return {
                isLoading: true,
                ...state
            }
        }
        case DELETE_PRODUCT_SUCCESS: {
            console.log(action.data.id);
            return {
                isLoading: false,
                user: state.user.filter((val) => val.id !== action.data.id)
            }
        }
        case DELETE_PRODUCT_ERROR: {
            return {
                isLoading: false,
                isError: action.data
            }
        }

        // product update data
        case UPDATE_PRODUCT_PENDING: {
            return {
                isLoading: true,
                ...state
            };
        }

        case UPDATE_PRODUCT_SUCCESS: {
            return {
                isLoading: false,
                user: state.user.map((val) => {

                    if (val.id == action.data.id) {
                        return {
                            ...val,
                            ...action.data,
                        };
                    }
                    else {
                        return {
                            ...val
                        };
                    }
                }),
            };
        }

        case UPDATE_PRODUCT_ERROR: {
            return {
                isLoading: false,
                isError: action.data
            }
        }


        // -------------------CATEGORY -------------------

        // category get data
        case GET_CATEGORY_PENDING: {
            return {
                isLoading: true,
                ...state
            };
        }
        case GET_CATEGORY_SUCCESS: {
            return {
                isLoading: false,
                user: action.data
            };
        }
        case GET_CATEGORY_ERROR: {
            return {
                ...state,
                isError: action.data
            };
        }

        // category post data 
        case POST_CATEGORY_PENDING: {
            return {
                isLoading: true,
                ...state
            }
        }
        case POST_CATEGORY_SUCCESS: {
            return {
                isLoading: false,
                user: state.user.concat(action.data)
            }
        }
        case POST_CATEGORY_ERROR: {
            return {
                isError: action.data,
                ...state
            }
        }

        // category delete data 
        case DELETE_CATEGORY_PENDING: {
            return {
                isLoading: true,
                ...state
            }
        }
        case DELETE_CATEGORY_SUCCESS: {
            console.log(action.data.id);
            return {
                isLoading: false,
                user: state.user.filter((val) => val.id !== action.data.id)
            }
        }
        case DELETE_CATEGORY_ERROR: {
            return {
                isLoading: false,
                isError: action.data
            }
        }

        // category update data
        case UPDATE_CATEGORY_PENDING: {
            return {
                isLoading: true,
                ...state
            };
        }

        case UPDATE_CATEGORY_SUCCESS: {
            return {
                isLoading: false,
                user: state.user.map((val) => {

                    if (val.id == action.data.id) {
                        return {
                            ...val,
                            ...action.data,
                        };
                    }
                    else {
                        return {
                            ...val
                        };
                    }
                }),
            };
        }

        case UPDATE_CATEGORY_ERROR: {
            return {
                isLoading: false,
                isError: action.data
            }
        }

        // -------------------BRAND -------------------

        // brand get data
        case GET_BRAND_PENDING: {
            return {
                isLoading: true,
                ...state
            };
        }
        case GET_BRAND_SUCCESS: {
            return {
                isLoading: false,
                user: action.data
            };
        }
        case GET_BRAND_ERROR: {
            return {
                ...state,
                isError: action.data
            };
        }

        // brand post data 
        case POST_BRAND_PENDING: {
            return {
                isLoading: true,
                ...state
            }
        }
        case POST_BRAND_SUCCESS: {
            return {
                isLoading: false,
                user: state.user.concat(action.data)
            }
        }
        case POST_BRAND_ERROR: {
            return {
                isError: action.data,
                ...state
            }
        }

        // brand delete data 
        case DELETE_BRAND_PENDING: {
            return {
                isLoading: true,
                ...state
            }
        }
        case DELETE_BRAND_SUCCESS: {
            console.log(action.data.id);
            return {
                isLoading: false,
                user: state.user.filter((val) => val.id !== action.data.id)
            }
        }
        case DELETE_BRAND_ERROR: {
            return {
                isLoading: false,
                isError: action.data
            }
        }

        // brand update data
        case UPDATE_BRAND_PENDING: {
            return {
                isLoading: true,
                ...state
            };
        }

        case UPDATE_BRAND_SUCCESS: {
            return {
                isLoading: false,
                user: state.user.map((val) => {

                    if (val.id == action.data.id) {
                        return {
                            ...val,
                            ...action.data,
                        };
                    }
                    else {
                        return {
                            ...val
                        };
                    }
                }),
            };
        }

        case UPDATE_BRAND_ERROR: {
            return {
                isLoading: false,
                isError: action.data
            }
        }

        // -------------------MODEL -------------------

        // model get data
        case GET_MODEL_PENDING: {
            return {
                isLoading: true,
                ...state
            };
        }
        case GET_MODEL_SUCCESS: {
            return {
                isLoading: false,
                user: action.data
            };
        }
        case GET_MODEL_ERROR: {
            return {
                ...state,
                isError: action.data
            };
        }

        // model post data 
        case POST_MODEL_PENDING: {
            return {
                isLoading: true,
                ...state
            }
        }
        case POST_MODEL_SUCCESS: {
            return {
                isLoading: false,
                user: state.user.concat(action.data)
            }
        }
        case POST_MODEL_ERROR: {
            return {
                isError: action.data,
                ...state
            }
        }

        // model delete data 
        case DELETE_MODEL_PENDING: {
            return {
                isLoading: true,
                ...state
            }
        }
        case DELETE_MODEL_SUCCESS: {
            console.log(action.data.id);
            return {
                isLoading: false,
                user: state.user.filter((val) => val.id !== action.data.id)
            }
        }
        case DELETE_MODEL_ERROR: {
            return {
                isLoading: false,
                isError: action.data
            }
        }

        // model update data
        case UPDATE_MODEL_PENDING: {
            return {
                isLoading: true,
                ...state
            };
        }

        case UPDATE_MODEL_SUCCESS: {
            return {
                isLoading: false,
                user: state.user.map((val) => {

                    if (val.id == action.data.id) {
                        return {
                            ...val,
                            ...action.data,
                        };
                    }
                    else {
                        return {
                            ...val
                        };
                    }
                }),
            };
        }

        case UPDATE_MODEL_ERROR: {
            return {
                isLoading: false,
                isError: action.data
            }
        }



        default: {
            return {
                ...state,
            };
        }
    }
}

export default userReducer;