const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const REMOVE = "REMOVE";

const shoppingCartReducer = (state = {}, action) => {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.id),
      };
    case DECREASE:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.id),
      };
    case REMOVE:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.id),
      };

    //   case READ_CART:
    //     return action.cart
    //   case ADD_ITEM:
    //     return {...state, orderProducts: [...state.orderProducts, action.item]}

    //   case UPDATE_ITEM:
    //     return {
    //       ...state,
    //       orderProducts: state.orderProducts.map(item => {
    //         if (item.id === action.item.id) {
    //           item.quantity = action.item.quantity
    //           if (item.product) {
    //             item.totalPrice = item.product.price * item.quantity
    //           }
    //         }
    //         return {...item}
    //       })
    //     }
    default:
      return state;
  }
};

export default shoppingCartReducer;
