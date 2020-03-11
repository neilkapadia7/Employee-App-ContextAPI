import React, {useState, useContext, useEffect} from 'react';
import TaskContext from '../../context/task/taskContext'; 

const TaskForm = () => {
    const taskContext = useContext(TaskContext);
    const {addTask, current, clearCurrent, updateTask} = taskContext;

    useEffect(() => {
        if(current !== null) {
            setTask(current);
        }
        else {
            setTask({
                title: '',
                body: '',
                status: ''
            })
        }
        // eslint-disable-next-line
    }, [current]);

    const [task, setTask] = useState({
        title: '',
        body: '',
        status: ''
    })

    const {title, body, status} = task;

    const onChange = e => {
        setTask({...task, [e.target.name] : e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();

        if(current === null) {
            addTask(task);
        }
        else{
            updateTask(task);
        }
                
        setTask({
            title: '',
            body: '',
            status: ''
        })
    }

    const clearAll = () => {
        clearCurrent();
    }

    return (
        <center>
        <div className='task-form'>
            <form className='task-form2' onSubmit={onSubmit}>
                {current ? <h3>Update Task</h3> :<h3>Add Task</h3>}
                <input type='text' placeholder='Enter Title' name='title' value={title} onChange={onChange} required/>
                <input type='text' placeholder='Enter Description' name='body' value={body} onChange={onChange} required/>
                <h5>Task Update</h5>
                <div className='radio-div'> 
                    <div className='radio'>
                        <input type='radio' name='status' value='pending' checked={status === 'pending'} onChange={onChange} required/> Pending{'  '}
                    </div>
                    <div className='radio'>
                        <input type='radio' name='status' value='done' checked={status === 'done'} onChange={onChange} /> Done
                    </div>
                </div>
                {current && <div>
                    <button onClick={clearAll} className='clear-button'>Clear</button>    
                </div>}
                <input type='submit' value={current ? 'Update Task' : 'Submit'} />
                
            </form>
        </div>
        </center>
    )
}

export default TaskForm;
