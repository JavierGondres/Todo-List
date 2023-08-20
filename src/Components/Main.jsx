import React, { useEffect, useState, useRef, useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdColorLens } from "react-icons/md";
import ListItem from "./ListItem";
import SearchContext from "../Context/SearchContext";
import UpdateContext from "../Context/UpdateContext";


function Main() {
  const [inputValue, setInputValue] = useState("");
  const [arrayItems, setArrayItems] = useState([]);
  const input = useRef(null);
  const inputContainer = useRef(null);
  const [activeColorsInput, setActiveColorInput] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const { valueSearch, setValueSearch } = useContext(SearchContext);
  const { udpateItem, setUpdateItem } = useContext(UpdateContext);

  const pressEnter = (event) => {
    if (event.key === "Enter") {
      displayListItem();
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        inputContainer.current &&
        !inputContainer.current.contains(event.target)
      ) {
        setOpenInput(false);
      } else setOpenInput(true);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getInputValue = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };

  const displayListItem = () => {
    let content = inputValue;

    setArrayItems((prev) => [
      ...prev,
      { content, id: Date.now(), check: false }, // Asigno un id único para no tener problemas despues
    ]);

    setInputValue(""); //Reinicio el input value
    input.current.value = ""; //Reinicio el input value
  };

  const renderItems = (array) => {
    return array.map((item) => (
      <ListItem
        key={item.id} // Uso el id como clave
        content={item.content}
        id={item.id} // Paso el id como prop
        checkInput={item.check}
        removeItem={removeItem}
      />
    ));
  };

  const removeItem = (id) => {
    const newArray = arrayItems.filter((item) => item.id !== id);
    setArrayItems(newArray);
  };

  let allItems = [];

  //Filtrado
  if (valueSearch !== "") {
    const filteredItems = arrayItems.filter((item) =>
      item.content.includes(valueSearch)
    );

    allItems = renderItems(filteredItems);
  } else allItems = renderItems(arrayItems);

  useEffect(() => {
    if (udpateItem.content !== "") {
      const updatedItems = arrayItems.map((item) =>
        item.id === udpateItem.id ? { ...udpateItem } : item
      );
      setArrayItems(updatedItems);
      setUpdateItem({ content: "", id: null }); // Limpia udpateItem después de aplicar la actualización
    }
  }, [udpateItem, arrayItems, setUpdateItem]);

  return (
    <section>
      <h1 className="main-title">My To do List</h1>
      <div className="input-container" ref={inputContainer}>
        <div
          className={`${
            !openInput ? "input-full-border" : "input-add-container "
          }`}
        >
          <label htmlFor="input-add" className="label-add">
            {openInput ? (
              <div className="outline-div"></div>
            ) : (
              <AiOutlinePlus className="plus-icon"></AiOutlinePlus>
            )}
          </label>
          <input
            ref={input}
            type="text"
            id="input-add"
            className="input-add"
            placeholder="Add a Task"
            onKeyDown={(e) => pressEnter(e)}
            onChange={getInputValue}
          />
        </div>
        {openInput && (
          <div className="add-container">
            <button className="add" onClick={displayListItem}>
              Add
            </button>
          </div>
        )}
      </div>
      {allItems}
    </section>
  );
}

export default Main;
