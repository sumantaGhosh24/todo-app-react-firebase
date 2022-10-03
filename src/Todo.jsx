import React, {useState} from "react";

import db from "./firebase";

const Todo = (props) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      {merge: true}
    );

    setOpen(false);
  };

  return (
    <div>
      <div style={{display: open ? "block" : "none"}}>
        <i onClick={handleClose}>X</i>
        <input
          placeholder={props.todo.todo}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={updateTodo}>update</button>
      </div>
      <p>{props.todo.todo}</p>
      <button
        onClick={(e) => db.collection("todos").doc(props.todo.id).delete()}
      >
        delete
      </button>
      <button onClick={handleOpen}>edit</button>
    </div>
  );
};

export default Todo;
