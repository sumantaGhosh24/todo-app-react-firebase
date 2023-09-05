import React, {useEffect, useState} from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import "./App.css";
import {db} from "./firebase";
import Todo from "./Todo";

function App() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "todos"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({id: doc.id, ...doc.data()});
        });
        setTodos(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [input]);

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "todos"), {
        todo: input,
        timestamp: serverTimestamp(),
      });
      setInput("");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="todo">
      <h1 className="todo__heading">Basic ToDo List Application</h1>
      {error && <p className="todo__subHeading">{error}</p>}
      <form className="todo__addForm">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="todo__addInput"
        />
        <button
          type="submit"
          onClick={addTodo}
          disabled={!input}
          className="todo__addButton"
        >
          Add Todo
        </button>
      </form>
      <ul className="todo__list">
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
}

export default App;
