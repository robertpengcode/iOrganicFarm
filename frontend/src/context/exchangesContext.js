import { createContext } from "react";

export const ExchangesContext = createContext(
    {
        exchanges: [],
        updateExchanges: ()=>{},
    }
)