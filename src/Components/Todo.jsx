import { React, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import SearchContext from "../Context/SearchContext";
import UpdateContext from "../Context/UpdateContext";
function Todo() {
  const [valueSearch, setValueSearch] = useState("");
  const [udpateItem, setUpdateItem] = useState([]);
  return (
    <main>
        <UpdateContext.Provider value={{ udpateItem, setUpdateItem }}>
          <SearchContext.Provider value={{ valueSearch, setValueSearch }}>
            <Header />
            <Main />
          </SearchContext.Provider>
        </UpdateContext.Provider>
    </main>
  );
}

export default Todo;
