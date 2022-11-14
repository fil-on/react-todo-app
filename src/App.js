import React, { useState, useEffect } from "react";
import "./style.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState("");

  const handleInput = (e) => {
    setInputTodo(e.target.value);
  };

  const handleChange = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id == id);
    todo.complete = !todo.complete;

    setTodos(newTodos);
  };

  const checkAll = (value) => {
    const newTodos = [...todos].map((e) => {
      return { ...e, complete: !value };
    });

    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = [...todos].filter((todo) => todo.id != id);
    setTodos(newTodos);
  };

  const deleteAll = () => {
    const newTodos = [...todos].filter((todo) => !todo.complete);
    setTodos(newTodos);
  };
  const handleSubmit = (e) => {
    if (inputTodo == "") {
      e.preventDefault();
      return;
    } else {
      setTodos((prev) => {
        return [
          {
            id: Math.random().toString(36),
            content: inputTodo,
            complete: false,
          },
          ...prev,
        ];
      });
    }
    setInputTodo("");
    e.preventDefault();
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="inputDiv">
          <input
            onChange={handleInput}
            value={inputTodo}
            placeholder="Add new todo..."
            type="text"
          />
          <button className="addBtn">
            <AiOutlinePlusCircle className="addIcon" />
          </button>
        </form>
        <TodoList
          deleteAll={deleteAll}
          deleteTodo={deleteTodo}
          checkAll={checkAll}
          handleChange={handleChange}
          todos={todos}
        />
      </div>
    </>
  );
};

const TodoList = ({ todos, handleChange, checkAll, deleteTodo, deleteAll }) => {
  const [check, setCheck] = useState(false);

  const handleCheckAll = (e) => {
    const value = check;
    setCheck(!value);
    checkAll(check);
  };

  const handleDeleteAll = () => {
    deleteAll();
    setCheck(false);
  };
  return (
    <>
      <div className="todoListDiv">
        <h3>Todos</h3>
        <p className="status">
          {todos.length} total, {todos.filter((e) => e.complete).length}{" "}
          complete and {todos.filter((e) => !e.complete).length} pending
        </p>
        <div className="tableDiv">
          <div className="tableHeadDiv">
            <div className="tableHead">
              <input
                checked={check}
                type="checkbox"
                onChange={handleCheckAll}
              />
              <p>Todo Title</p>
              <p>Status</p>
              <button onClick={handleDeleteAll} className="deleteAll">
                <AiFillDelete />
              </button>
            </div>
          </div>
          {todos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                deleteTodo={deleteTodo}
                handleChange={handleChange}
                todo={todo}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

const TodoItem = ({ todo, handleChange, deleteTodo }) => {
  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const changeComplete = () => {
    handleChange(todo.id);
  };

  return (
    <>
      <div
        className="todoItem"
        style={!todo.complete ? { backgroundColor: "#fff" } : {}}
      >
        <input
          onChange={changeComplete}
          id={todo.id}
          type="checkbox"
          checked={todo.complete}
        />
        <label
          className="todoContent"
          onClick={changeComplete}
          style={
            todo.complete
              ? { textDecoration: `line-through`, color: "grey" }
              : {}
          }
          HTMLfor={todo.id}
        >
          {todo.content}
        </label>
        <div className="todoStatus">
          {todo.complete ? "Complete" : "Pending"}
        </div>
        <button onClick={handleDelete} className="deleteTodo">
          <TiDelete />
        </button>
      </div>
    </>
  );
};

export default App;
