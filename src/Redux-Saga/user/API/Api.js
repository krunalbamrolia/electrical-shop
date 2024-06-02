import axios from "axios";
import {
    DELETE_BRAND, DELETE_CATEGORY, DELETE_MODEL, DELETE_PRODUCT,
    GET_BRAND, GET_CATEGORY, GET_MODEL, GET_PRODUCT, 
    POST_BRAND, POST_CATEGORY, POST_MODEL, POST_PRODUCT, 
    PUT_BRAND, PUT_CATEGORY, PUT_MODEL, PUT_PRODUCT, 
    base_url
} from "../../Constant";

// -------------------PRODUCT -------------------
//get data
let get_product = (action) => {
    // console.log(action, "action from api");
    return axios.get(base_url + GET_PRODUCT).then((res) => {
        // console.log(res, "api");
        let data = res.data;
        let status = res.status;
        return { data, status };
    });
};

// add data
let post_product = (action) => {
    // console.log(action,"from api");
    return axios.post(base_url + POST_PRODUCT, action.payload).then((res) => {
        // console.log(res, "post res");
        let data = res.data;
        let status = res.status;
        return { data, status };
    });
};

// delete data
let delete_product = (action) => {
    return axios.delete(base_url + DELETE_PRODUCT + action.payload).then((res) => {
        let data = res.data;
        let status = res.status;
        return { data, status };
    })
}

// update data
let update_product = (action) => {
    return axios.put(base_url + PUT_PRODUCT + action.payload.id, action.payload).then((res) => {
        let data = res.data;
        let status = res.status;
        return { data, status };
    })
}

// -------------------CATEGORY -------------------
//get data
let get_category = (action) => {
    // console.log(action, "action from api");
    return axios.get(base_url + GET_CATEGORY).then((res) => {
        // console.log(res, "api");
        let data = res.data;
        let status = res.status;
        return { data, status };
    });
};

// add data
let post_category = (action) => {
    // console.log(action,"from api");
    return axios.post(base_url + POST_CATEGORY, action.payload).then((res) => {
        // console.log(res, "post res");
        let data = res.data;
        let status = res.status;
        return { data, status };
    });
};

// delete data
let delete_category = (action) => {
    return axios.delete(base_url + DELETE_CATEGORY + action.payload).then((res) => {
        let data = res.data;
        let status = res.status;
        return { data, status };
    })
}

// update data
let update_category = (action) => {
    return axios.put(base_url + PUT_CATEGORY + action.payload.id, action.payload).then((res) => {
        let data = res.data;
        let status = res.status;
        return { data, status };
    })
}


// -------------------BRAND -------------------
//get data
let get_brand = (action) => {
    // console.log(action, "action from api");
    return axios.get(base_url + GET_BRAND).then((res) => {
        // console.log(res, "api");
        let data = res.data;
        let status = res.status;
        return { data, status };
    });
};

// add data
let post_brand = (action) => {
    // console.log(action,"from api");
    return axios.post(base_url + POST_BRAND, action.payload).then((res) => {
        // console.log(res, "post res");
        let data = res.data;
        let status = res.status;
        return { data, status };
    });
};

// delete data
let delete_brand = (action) => {
    return axios.delete(base_url + DELETE_BRAND + action.payload).then((res) => {
        let data = res.data;
        let status = res.status;
        return { data, status };
    })
}

// update data
let update_brand = (action) => {
    return axios.put(base_url + PUT_BRAND + action.payload.id, action.payload).then((res) => {
        let data = res.data;
        let status = res.status;
        return { data, status };
    })
}

// -------------------MODEL -------------------
//get data
let get_model = (action) => {
    // console.log(action, "action from api");
    return axios.get(base_url + GET_MODEL).then((res) => {
        // console.log(res, "api");
        let data = res.data;
        let status = res.status;
        return { data, status };
    });
};

// add data
let post_model = (action) => {
    // console.log(action,"from api");
    return axios.post(base_url + POST_MODEL, action.payload).then((res) => {
        // console.log(res, "post res");
        let data = res.data;
        let status = res.status;
        return { data, status };
    });
};

// delete data
let delete_model = (action) => {
    return axios.delete(base_url + DELETE_MODEL + action.payload).then((res) => {
        let data = res.data;
        let status = res.status;
        return { data, status };
    })
}

// update data
let update_model = (action) => {
    return axios.put(base_url + PUT_MODEL + action.payload.id, action.payload).then((res) => {
        let data = res.data;
        let status = res.status;
        return { data, status };
    })
}


export {
    get_product, post_product, delete_product, update_product,
    get_category, post_category, delete_category, update_category,
    get_brand, post_brand, delete_brand, update_brand,
    get_model, post_model, delete_model, update_model
};