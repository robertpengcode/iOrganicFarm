import { createContext } from "react";

export const IsExchangingContext = createContext(
    {
        isExchanging: false,
        updateIsExchanging: ()=>{},
    }

)