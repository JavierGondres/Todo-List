import React, { useState, useContext } from "react";
import { MdColorLens } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import SearchContext from "../Context/SearchContext";
function Header() {
  const [activeColors, setActiveColor] = useState(false);
  const { valueSearch, setValueSearch } = useContext(SearchContext);
  const [theme, setThem] = useState({color:'azul'});

  const obtenerValorDeBusqueda = (e) => {
    setValueSearch(e.target.value);
  };

  const activeColorsInput = () => {
    setActiveColor((prev) => !prev);
  };

  const changeTheme = (e) =>{
    let color = e.target.getAttribute('data-value')
    setThem({...theme,color})
  }
  return (
    <header className={`${theme.color}`}>
      <nav>
        <div className="title-container">
          <h1 className="header-title">To Do</h1>
          <div className="colors-container">
            <button className="btn-color" onClick={() => activeColorsInput()}>
              <MdColorLens className="icon-color" />
            </button>
            {activeColors && (
              <div className="colors">
                <div className="azul colors-div" data-value='azul' onClick = {changeTheme}></div>
                <div className="texts colors-div" data-value='texts' onClick = {changeTheme}></div>
                <div className="black colors-div" data-value='black' onClick = {changeTheme}></div>
              </div>
            )}
          </div>
        </div>
        <div className="input-header-container">
          <button className="btn-input">
            <BsSearch className="icon-search"></BsSearch>
          </button>
          <input type="text"className="input-header" onChange={(e) => obtenerValorDeBusqueda(e)} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
