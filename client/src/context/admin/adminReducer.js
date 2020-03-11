import { LOGOUT, CLEAR_ERRORS, LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, GET_USERS, USER_ERROR, REMOVE_ERROR, GET_TASKS, TASK_ERROR, REMOVE_TASKS } from "../types";


export default (state, action) => {
    switch(action.type) {
        case USER_LOADED:
            return {
                ...state,
                loading2: false,
                user2: action.payload
            }
        case LOGIN_SUCCESS: 
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated2: true,
                loading2: false
            }
        case LOGOUT:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated2: false,
                loading2: false,
                user2: null,
                users: null,
                error: action.payload,
                tasks: null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload
            }
        case TASK_ERROR:
            return {
                ...state,
                error: action.payload
            } 
        case USER_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case REMOVE_ERROR:
            return {
                ...state,
                error: null
            }
        case REMOVE_TASKS:
            return {
                ...state,
                tasks: null
            }
        default:
            return state
    } 
}