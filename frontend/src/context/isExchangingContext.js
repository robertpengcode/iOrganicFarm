import { createContext } from "react";

export const isExchangingContext = createContext(
    {
        isExchanging: false,
        updateIsExchanging: ()=>{},
    }

)