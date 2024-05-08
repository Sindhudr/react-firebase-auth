import Modal from "./Modal";
import "./taskItem.css";

function TaskItem({ onClose, open, title, description, email, designation }) {
  return (
    <Modal modalLable="User Details" onClose={onClose} open={open}>
      <div className="taskItem">
        <h2>Name: {title}</h2>
        <h4>Email: {email}</h4>
        <h4>Designation: {designation}</h4>

        <p>About: {description}</p>
      </div>
    </Modal>
  );
}

export default TaskItem;
