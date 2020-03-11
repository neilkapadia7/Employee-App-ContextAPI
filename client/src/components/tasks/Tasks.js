import React, {useContext, useEffect} from 'react';
import TaskItem from './TaskItem';
import TaskContext from '../../context/task/taskContext';


const Tasks = () => {
    const taskContext = useContext(TaskContext);
    const {getTasks, tasks} = taskContext;

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className='task-div2'>
            {tasks !== null 
                ? tasks.map(task =>
                    <TaskItem key={task._id} task={task} />
                ) : (
                    <h1>No Tasks Added</h1>
                )
            }
        </div>
    )
}

export default Tasks
