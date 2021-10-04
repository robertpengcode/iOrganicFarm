import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import shoppingCartReducer from "./shoppingCart/shoppingCartReducer";

const reducers = combineReducers({
  cartItems: shoppingCartReducer,
});

const store = createStore(reducers, {}, applyMiddleware(thunk));

export default store;

