import React, {useReducer} from 'react';
import AdminContext from './adminContext';
import AdminReducer from './adminReducer';
import { CLEAR_ERRORS, LOGOUT, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, USER_ERROR, REMOVE_ERROR, GET_USERS, GET_TASKS, TASK_ERROR, REMOVE_TASKS } from '../types';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

const AdminState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated2: null,
        users: null,
        user2: null,
        tasks: null,
        error: null,
        loading2: true
    }

    const [state, dispatch] = useReducer(AdminReducer, initialState);
    
    // Load Admin
    const loadUser = async () => {
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('/api/admin');

            dispatch({type: USER_LOADED, payload: res.data});
        } 
        catch (err) {
            dispatch({ type: AUTH_ERROR });
        }
    }

    // Login
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await  axios.post('/api/admin', formData, config);
            
            dispatch({ type: LOGIN_SUCCESS, payload: res.data});             
           
            loadUser();
        } 
        catch (err) {
            dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg}) ;           
        }
    }

    // Logout
    const logout2 = () => {
        dispatch({ type: LOGOUT });
    }

    //  Clear Error
    const clearError = () => {
        dispatch({ type: CLEAR_ERRORS });
    }   
    
    // Get Users
    const getUsers = async () => {
        try {
            const res = await axios.get('/api/admin/users');
            dispatch({ type: GET_USERS , payload: res.data});
        }    
        catch (err) {
            dispatch({ type: USER_ERROR, payload: 'There was an error while fetching the users' });
            
            setTimeout(() => dispatch({ type: REMOVE_ERROR }), 3000);
        }
    }

    // Get User's Tasks
    const userTask = async id => {
        try {
            const res = await axios.get(`/api/admin/users/${id}`);
            dispatch({ type: GET_TASKS, payload: res.data });    
        } 
        catch (err) {
            dispatch({ type: TASK_ERROR, payload: 'Server Error' });
            setTimeout(() => dispatch({ type: REMOVE_ERROR }), 3000);
        }
    }

    // Remove Tasks
    const removeTasks = () => {
        dispatch({ type: REMOVE_TASKS })
    }




    return (
        <AdminContext.Provider value={{
            token: state.token,
            isAuthenticated2: state.isAuthenticated2,
            users: state.users,
            user2: state.user2,
            tasks: state.tasks,
            error: state.error,
            loading2: state.loading2,
            loadUser,
            login,
            logout2,
            clearError,
            getUsers,
            userTask,
            removeTasks
        }}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminState
