import React from 'react'

const Task = ({task}) => {
    const {title, body, status} = task;

    return (
        <div className='task-card2'>
            <div className='card-content2'>
                <h1 className='task-title'>{title}</h1>
                <p className='task-body'>{body}</p>
                <p className='task-status'>{status}</p>
            </div>
        </div>
    )
}

export default Task
