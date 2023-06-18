import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./index";

function TodoList() {
  const [todos, setTodos] = useState([]);

//   const [titleToDo,setTitleToDo] = useState("")

// const handleTitle = (e) => {
//   e.preventDefault()
//   setTitleToDo(e.target.value)}

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <div className="title-container" >
      <h3 className="editorText__title" >My First To-do List</h3>
      {/* <input
          className="editorText__title"
          type="text"
          value={titleToDo}
          onChange={handleTitle}
          placeholder="Ma to-do list . . ."
        /> */}
      <TodoForm onSubmit={addTodo} />
      </div>
      <div className="todo-tasks">
        <Todo
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      </div>
    </div>
  );
}

export default TodoList;
