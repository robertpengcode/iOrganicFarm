const ADD = "exADD";
const INCREASE = "exINCREASE";
const DECREASE = "exDECREASE";
const REMOVE = "exREMOVE";

const exchangePlatformReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.payload];

    case INCREASE:
      let iState = state.map((item) => {
        if (item.id === action.payload.id) {
          return {...item, quantity: item.quantity + 1};
        }
        return item;
      });
      return iState;

    case DECREASE:
      let dState = state.map((item) => {
        if (item.id === action.payload.id) {
          return {...item, quantity: item.quantity - 1};
        }
        return item;
      });
      return dState;

    case REMOVE:
      return state.filter((item) => item.name !== action.payload.name);

    default:
      return state;
  }
};

export default exchangePlatformReducer;