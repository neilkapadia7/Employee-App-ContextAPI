import React, {useContext} from 'react';
import TaskContext from '../../context/task/taskContext';

const TaskItem = ({ task }) => {
    const taskContext = useContext(TaskContext);
    const {setCurrent, deleteTask} = taskContext;

    const Update = () => {
        setCurrent(task);
    }

    const Delete = () => {
        deleteTask(task._id);
    }
    return (
        <center>
            <div className='task-card'>
                <div className='card-content'>
                    <p className='task-title'>{task.title}</p>
                    <p className='task-body'>{task.body}</p>
                    <p className='task-status'>{task.status}</p>
                    <div className='task-button-div'>
                        <p className='update' onClick={Update}>Update</p>
                        <p className='delete' onClick={Delete}>Delete</p>
                    </div>
                </div>
            </div>
        </center>
    )
}

export default TaskItem
