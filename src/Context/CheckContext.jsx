import { createContext, useState } from "react";

const CheckContext = createContext();

const CheckProvider = ({children}) =>{
    const [checkItem, setCheckItem] = useState(false);

    const data = {checkItem, setCheckItem}

    return <SearchContext.Provider value={data}>{children}</SearchContext.Provider>;
}

export {CheckProvider}
export default CheckContext