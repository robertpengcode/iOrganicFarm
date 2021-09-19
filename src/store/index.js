import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import shoppingCartReducer from "./shoppingCart/shoppingCartReducer";

const reducers = combineReducers({
  shoppingCart: shoppingCartReducer,
});

const store = createStore(reducers, {}, applyMiddleware(thunk));

export default store;
export * as actionCreators from './shoppingCart/actionCreators';
