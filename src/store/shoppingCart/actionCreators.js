

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

export const decrease = (cartItem) => {
    return (dispatch) => {
        dispatch(
            {
                type: "DECREASE",
                payload: cartItem,
            }
        )
    }
}

export const remove = (cartItem) => {
    return (dispatch) => {
        dispatch(
            {
                type: "REMOVE",
                payload: cartItem,
            }
        )
    }
}

