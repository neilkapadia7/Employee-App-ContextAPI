import { ADD_TASK, GET_TASKS, TASK_ERROR, SET_CURRENT, CLEAR_CURRENT, UPDATE_TASK, DELETE_TASK } from "../types";


export default (state, action) => {
    switch(action.type) {
        default:
            return state;
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
                loading: false
            }
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task._id === action.payload._id ? action.payload : task                    
                ),
                loading: false,
                current: null
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload),
                loading: false
            }
        case TASK_ERROR:
            return {
                ...state,
                error: action.payload 
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT: 
            return {
                ...state,
                current: null
            }
    }   
}