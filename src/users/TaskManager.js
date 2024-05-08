import "./taskManager.css";
import Task from "./Task";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../components/auth/firebase";
import AddTask from "./AddTask";
import { FaPen } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import TaskItem from "./TaskItem";
import EditTask from "./EditTask";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

function TaskManager() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState({ edit: false, view: false });
  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  const handleDelete = (id) => async () => {
    const taskDocRef = doc(db, "Users", id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const taskColRef = query(
      collection(db, "Users"),
      orderBy("created", "desc")
    );
    onSnapshot(taskColRef, (snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="taskManager">
      {/* <header>Users Manager</header> */}
      <div className="taskManager__container">
        <div className="btn">
          <button onClick={() => setOpenAddModal(true)}>Add User +</button>
        </div>
        <div className="taskManager__tasks">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th className="expand">Description</th>
                <th>View/Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr>
                  <td>{task.data.title}</td>
                  <td>{task.data.email}</td>
                  <td>{task.data.designation}</td>
                  <td>{task.data.description}</td>
                  <td className="actions">
                    <FaEye onClick={() => setOpen({ ...open, view: true })} />
                    <FaPen onClick={() => setOpen({ ...open, edit: true })} />

                    <MdDelete onClick={handleDelete(task.id)} />
                  </td>

                  {open.view && (
                    <TaskItem
                      onClose={handleClose}
                      title={task.data.title}
                      description={task.data.description}
                      open={open.view}
                      email={task.data.email}
                      designation={task.data.designation}
                    />
                  )}

                  {open.edit && (
                    <EditTask
                      onClose={handleClose}
                      toEditTitle={task.data.title}
                      toEditDescription={task.data.description}
                      open={open.edit}
                      id={task.data.id}
                      email={task.data.email}
                      designation={task.data.designation}
                    />
                  )}

                  {/* <Task
                    id={task.id}
                    key={task.id}
                    title={task.data.title}
                    description={task.data.description}
                    email={task.data.email}
                    designation={task.data.designation}
                  /> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      

      {openAddModal && (
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )}
    </div>
  );
}

export default TaskManager;
