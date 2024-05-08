import "./taskManager.css";
import Task from "./Task";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../auth/firebase";
import AddTask from "./AddTask";

function TaskManager() {
  const [openAddModal, setOpenAddModal] = useState(false);


  
  const [roles, setRoles] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const taskColRef = query(
      collection(db, "Roles"),
      orderBy("created", "desc")
    );
    onSnapshot(taskColRef, (snapshot) => {
      setRoles(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data.title,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="taskManager">
      <header>Roles Manager</header>
      <div className="taskManager__container">
        <button onClick={() => setOpenAddModal(true)}>Add Role +</button>
        <div className="taskManager__tasks">
          {roles.map((task) => (
            <Task
              id={task.id}
              key={task.id}
              completed={task.data.completed}
              title={task.data.title}
              description={task.data.description}
            />
          ))}
        </div>
      </div>

      {openAddModal && (
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )}
    </div>
  );
}

export default TaskManager;
