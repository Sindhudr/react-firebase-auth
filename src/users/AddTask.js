import Modal from "./Modal";
import { useState } from "react";
import "./addTask.css";
import { db } from "../components/auth/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import DataTable from "react-data-table-component";
import "../users/modal.css";
import RolesInput from "../muidashboard/RolesInput";

function AddTask({ onClose, open }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [role, setRole] = useState("");

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Users"), {
        title: title,
        description: description,
        email: email,
        designation: designation,
        role: role,
        created: Timestamp.now(),
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal modalLable="Add User" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className="addTask" name="addTask">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
          placeholder="Enter Name"
        />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter Email"
        />
        <input
          type="text"
          onChange={(e) => setDesignation(e.target.value.toUpperCase())}
          value={designation}
          placeholder="Enter Designation"
        />
        {/* <input
          type="text"
          onChange={(e) => setRole(e.target.value.toUpperCase())}
          value={role}
          placeholder="Enter Role"
        /> */}
        <RolesInput
          onChange={(e, v) => {
            var names = v.map(function (item) {
              return item.title;
            });
            setRole(names);
          }}
          value={role}
        />

        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="About User"
          value={description}
        ></textarea>

        <button type="submit">Done</button>
      </form>
    </Modal>
  );
}

export default AddTask;
