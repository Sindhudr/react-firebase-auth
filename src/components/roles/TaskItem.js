import Modal from "./Modal"
import './taskItem.css'

function TaskItem({onClose, open, title, description}) {

  return (
    <Modal modalLable='Role Details' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </Modal>
  )
}

export default TaskItem
