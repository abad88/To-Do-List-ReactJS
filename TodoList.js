import React, { useState } from "react";
import "../todoList/TodoList.css";

const TodoList = () => {
  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editInstance, setEditInstance] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("Type Something");
    } else if (!toggleSubmit && inputData) {
      setItem(
        item.map((ele) => {
          if (ele.id === editInstance) {
            return { ...ele, name: inputData };
          }
          return ele;
        })
      );
      setToggleSubmit(true);
      setInputData('');
      setEditInstance(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItem([...item, allInputData]);
      setInputData("");
    }
  };

  const clearItem = () => {
    setItem([]);
  };

  const deleteItem = (index) => {
    item.splice(index, 1);
    setItem([...item]);
  };

  const editItem = (id) => {
    let newEditItem = item.find((ele) => {
      return ele.id === id;
    });
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setEditInstance(id);
  };

  return (
    <>
      <div className="main">
        <h1 className="main-heading">To-Do List</h1>
        <div className="fields">
          <input
            type="text"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          ></input>

          {toggleSubmit ? (
            <button className="btnAdd" onClick={addItem}>
              +
            </button>
          ) : (
            <i
              className="fa fa-pencil-square-o"
              id="editing"
              aria-hidden="true"
              onClick={addItem}
            ></i>
          )}

          <button className="clr" onClick={clearItem}>
            clear
          </button>
        </div>
        {item.map((ele, idx) => {
          return (
            <div className="spacing" key={ele.id}>
              <div className="list-div" key={ele.id}>
                <p className="list" key={ele.id}>
                  {ele.name}
                </p>

                <div className="list-icons">
                  <i
                    className="fa fa-trash"
                    aria-hidden="true"
                    onClick={(idx) => deleteItem(idx)}
                  ></i>
                  <i
                    className="fa fa-pencil-square-o"
                    aria-hidden="true"
                    onClick={() => editItem(ele.id)}
                  ></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TodoList;
