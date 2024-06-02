import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducers from "./RootReduser";
import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, createStore } from "redux";
import rootSaga from "./saga";

let sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);


export default store;