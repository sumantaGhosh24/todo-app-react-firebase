import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import React, {useState} from "react";

import {db} from "./firebase";

const Todo = (props) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async (id) => {
    await updateDoc(
      doc(db, "todos", id),
      {
        todo: input,
      },
      {merge: true}
    );

    setOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="todo__item">
      <div style={{display: open ? "block" : "none"}}>
        <input
          className="todo__updateInput"
          placeholder={props.todo.todo}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button disabled={!input} onClick={() => handleUpdate(props.todo.id)}>
          update
        </button>
        <i onClick={handleClose} className="todo__updateClose">
          &times;
        </i>
      </div>
      <div className="todo__single">
        <div>
          <p className="todo__todo">{props.todo.todo}</p>
          <p className="todo__timestamp">
            {props.todo.timestamp.toDate().toDateString()}
          </p>
        </div>
        <div>
          <button onClick={() => handleDelete(props.todo.id)}>delete</button>
          <button onClick={handleOpen}>edit</button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
