import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import shoppingCartReducer from "./shoppingCartReducer";
import exchangePlatformReducer from "./exchangePlatformReducer";

const reducers = combineReducers({
  cartItems: shoppingCartReducer,
  exchangeItems: exchangePlatformReducer,
});

const store = createStore(reducers, {}, applyMiddleware(thunk));

export default store;

