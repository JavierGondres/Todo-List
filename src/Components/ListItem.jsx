import { React, useEffect, useState, useContext,  } from "react";
import { BsTrash } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import UpdateContext from "../Context/UpdateContext";

function ListItem({ content, removeItem, id, checkInput}) {
  const [check, setCheck] = useState(checkInput);
  const [updateInput, setUpdateInput] = useState("");
  const [activeNewInput, setActiveNewInput] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {udpateItem, setUpdateItem} = useContext(UpdateContext);

  const pressEnter = (event) =>{
    if (event.key === 'Enter') {
      setNewInput()
    }
  }

  let inputValue = "";

  const updateCheck = () => {
    setCheck((prev) => !prev);
  };

  const openNewInput = () => {
    setActiveNewInput((prev) => !prev);
    setSidebarOpen(false);
  };

  const getNewInput = (e) => {
    inputValue = e.target.value;
  };

  const setNewInput = () => {
    setUpdateInput(inputValue);
    setActiveNewInput((prev) => !prev);

  };

  const toggleSidebar = () => {
    setTimeout(() => {
      setSidebarOpen(true);
    }, 100); 
  }
    useEffect(()=>{
      toggleSidebar()
    }, [activeNewInput])

    useEffect(() =>{
      setUpdateItem({ content: updateInput, id: (id), check:(check)})
    }, [updateInput, check])

  return (
    <div className="list-item">
      <button className="btn-check" onClick={() => setCheck(!check)}>
        <div className={`${check ? "filled-div" : "outline-div"}`}></div>
      </button>
      <p  onClick={() => openNewInput()}className="p-item">{updateInput !== "" ? updateInput : content}</p>
      <div className="buttons-items" >
        <button className="btn-item btn-filled" onClick={() => removeItem(id)}>
          <BsTrash className="img-btn-item" />
        </button>
      </div>

      {activeNewInput ? (
        <div className="update-input-container">
          <div className={`wrapper ${sidebarOpen ? 'abrir': null}`}>
            <div className="input-wrapper">
              <h1>Actualizar</h1>
              <div className="input-full-border input-update-container">
              <input
                className="input-add input-update"
                type="text"
                placeholder="Actualizar Task"
                onKeyDown={(e) => pressEnter(e)}
                onChange={(e) => getNewInput(e)}
              />
              </div>
            </div>
            <div className="update-btns">
              <button className="close-update" onClick={() => openNewInput()}>
                Cerrar
              </button>
              <button
                className="close-update act"
                onClick={() => setNewInput()}
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );

}

export default ListItem
