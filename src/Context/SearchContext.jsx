import { createContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({children}) =>{
    const [valueSearch, setValueSearch] = useState('');

    const data = {valueSearch, setValueSearch}

    return <SearchContext.Provider value={data}>{children}</SearchContext.Provider>;
}

export {SearchProvider}
export default SearchContext