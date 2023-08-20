import { createContext, useState } from "react";

const UpdateContext = createContext();

const UpdateProvider = ({children}) =>{
    const [udpateItem, setUpdateItem] = useState([]);

    const data = {udpateItem, setUpdateItem}

    return <UpdateContext.Provider value={data}>{children}</UpdateContext.Provider>;
}

export {UpdateProvider}
export default UpdateContext