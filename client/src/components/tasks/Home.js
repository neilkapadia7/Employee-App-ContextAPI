import React, {useEffect, useContext} from 'react';
import AuthContext from '../../context/auth/authContext';
import TaskForm from './TaskForm';
import Tasks from './Tasks';

const Home = () => {
    const authContext = useContext(AuthContext);
    
    const {loadUser, isAuthenticated} = authContext;

    useEffect(() =>{
        loadUser();

    }, [isAuthenticated]);

    return (
        <div className='main-task-div'>
            <div className='form-div'>
                <TaskForm />
            </div>
            <div className='task-div'>
                <Tasks />
            </div>
        </div>
    )
};


export default Home
