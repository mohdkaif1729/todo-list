import { useEffect, useState } from "react";
import { TodoProvider } from "./Contexts/Index";

import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";

import EmptyTodo from "../public/EmptyTodo.avif"

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };
  

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));


    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

 

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      {/* #172842 */}
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="bg-slate-700 w-full max-w-[92%] md:max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
        </div>
        {todos.length ? <div className="flex flex-wrap gap-y-3 max-w-[75%] mx-auto mt-10">
          {/*Loop and Add TodoItem here */}
          {console.log(todos)}
          {todos.map((todo) => (
            <div key={todo.id} className="w-full">
              <TodoItem todoitems={todo} />
            </div>
          ))}
        </div>:
        <div className="flex flex-col items-center gap-y-4 w-screen mt-10 ">
          <img src={EmptyTodo} alt="" className="shadow-2xl rounded-md w-56"  />
          <p className="text-xl text-white font-bold">No Todo Found</p>
        </div>
        }
      </div>
    </TodoProvider>
  );
}

export default App;
