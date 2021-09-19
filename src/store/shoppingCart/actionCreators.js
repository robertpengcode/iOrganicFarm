export const increase = (cartItem) => {
    return (dispatch) => {
        dispatch(
            {
                type: "INCREASE",
                payload: cartItem,
            }
        )
    }
}

