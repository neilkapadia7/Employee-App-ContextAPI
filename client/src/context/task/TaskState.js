import React, {useReducer} from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import axios from 'axios';
import { ADD_TASK, TASK_ERROR, GET_TASKS, UPDATE_TASK, DELETE_TASK, SET_CURRENT, CLEAR_CURRENT } from '../types';

const TaskState = props => {
    
    const initialState = {
        tasks: null,
        error: null,
        current: null,
        loading: true
    }

    const [state, dispatch] = useReducer(TaskReducer, initialState);
    
    // Add a task
    const addTask = async task => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/task', task, config);
            dispatch({ type: ADD_TASK, payload: res.data});     
        } 
        catch (err) {
            dispatch({ type: TASK_ERROR, payload: err.response });
        }
    }

    // Get tasks
    const getTasks = async () => {
        try {
            const res = await axios.get('/api/task');
            dispatch({ type: GET_TASKS, payload: res.data});     
        } 
        catch (err) {
            dispatch({ type: TASK_ERROR, payload: err.response });
        }
    }

    // Set Current
    const setCurrent = task => {
        dispatch({ type: SET_CURRENT, payload: task})
    }

    // Remove Current
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }

    // Update Task
    const updateTask = async task => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put(`api/task/${task._id}`, task, config);
            dispatch({ type: UPDATE_TASK, payload: res.data});    
        } 
        catch (err) {
            dispatch({ type: TASK_ERROR, payload: err.response.msg });
        }
        
    }

    // Delete Task
    const deleteTask = async id => {
        try {
            await axios.delete(`api/task/${id}`);
            dispatch({ type: DELETE_TASK, payload: id});
        } 
        catch (err) {
            dispatch({ type: TASK_ERROR, payload: err.response.msg });
        }
    }

    return (
        <TaskContext.Provider value={{
            tasks: state.tasks,
            error: state.error,
            current: state.current,
            addTask,
            getTasks,
            updateTask,
            deleteTask,
            setCurrent,
            clearCurrent
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;
