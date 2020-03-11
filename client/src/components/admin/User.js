import React from 'react';
import {Link} from 'react-router-dom';

const Users = ({ user }) => {
    
    const {_id,name, email, phone} = user;

    return (
        <div class='user-card'>
            <div className='admin-card-content'>
                <p className='user-name'>{name}</p>
                <p className='user-email'>{email}</p>
                <p className='user-phone'>{phone}</p>
                <Link className='user-button' to={`/admin/user-task/${_id}`}>View Task</Link>
            </div>
        </div>
    )
}

export default Users
