import Modal from "./Modal";
import { useState } from "react";
import "./editTask.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../components/auth/firebase";

function EditTask({
  open,
  onClose,
  toEditTitle,
  toEditDescription,
  id,
  toEditemail,
  toEditDesignation,
}) {
  const [title, setTitle] = useState(toEditTitle);
  const [description, setDescription] = useState(toEditDescription);
  const [email, setEmail] = useState(toEditemail);
  const [designation, setDesignation] = useState(toEditDesignation);

  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "Users", id);
    try {
      await updateDoc(taskDocRef, {
        title: title,
        description: description,
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal modalLable="Edit User" onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className="editTask">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
        />
        <input
          type="email"
          name="title"
          onChange={(e) => setEmail(e.target.value.toUpperCase())}
          value={email}
        />
        <input
          type="text"
          name="title"
          onChange={(e) => setDesignation(e.target.value.toUpperCase())}
          value={designation}
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
    </Modal>
  );
}

export default EditTask;
