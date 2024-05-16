import Modal from "./Modal";
import "./taskItem.css";

function TaskItem({ onClose, open, title, description, Permissions }) {
  return (
    <Modal modalLable="Role Details" onClose={onClose} open={open}>
      <div className="taskItem">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>{Permissions}</p>
      </div>
    </Modal>
  );
}

export default TaskItem;
