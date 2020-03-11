import React, {useContext, useEffect} from 'react';
import AdminContext from '../../context/admin/adminContext';
import User from './User';
import AlertContext from '../../context/alert/alertContext';

const Home = () => {
    const adminContext = useContext(AdminContext);
    const {isAuthenticated2, loadUser, getUsers, error, users} = adminContext;

    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;

    useEffect(() => {
        loadUser();
        getUsers();

        if(error) {
            setAlert(error, 'danger');
        }


    }, [isAuthenticated2]);

    return (
        <div className='admin-div'>
            <h1>Admin Home</h1>
            <div style={{marginTop: '30px'}}>
            {users !== null 
                ? users.map(user => 
                    <User key={user._id} user={user}/>    
                )
                : (<h1>No Users</h1>)    
            }    
            </div>
        </div>
    )
}

export default Home;
