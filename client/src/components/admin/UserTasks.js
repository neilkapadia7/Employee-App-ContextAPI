import React, {useContext, useEffect} from 'react';
import AdminContext from '../../context/admin/adminContext';
import Spinner from './spinner.gif';
import Task from './Task';

const UserTasks = (id) => {
    const adminContext = useContext(AdminContext);
    const {userTask, tasks, loadUser, removeTasks} = adminContext;

    useEffect(() => {
        loadUser();
        userTask(id.match.params.id);

        return () => {
            removeTasks();
        }
        
        // eslint-disable-next-line
    }, []);

    const result = () => {
        if(tasks === null) {
            return <img src={Spinner} alt='loading'/>
        }
        else if(tasks !== null && tasks.length === 0) {
            return <h1>No Posts</h1>
        }
        else{
            return(
                <div >
                    {tasks.map(task => 
                        <Task key={task._id} task={task}/>
                    )}
                </div>
            )
        }
    }

    return (
        <div className='admin-div'>
            {result()}
        </div>
    )
}

export default UserTasks;
