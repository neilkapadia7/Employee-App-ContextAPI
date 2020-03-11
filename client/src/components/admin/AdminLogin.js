import React, {useState, useContext, useEffect} from 'react';
import AdminContext from '../../context/admin/adminContext';
import AlertContext from '../../context/alert/alertContext';

const AdminLogin = props => {
    const adminContext = useContext(AdminContext);
    const alertContext = useContext(AlertContext);

    const {isAuthenticated2, error, clearError, login } = adminContext;
    const {setAlert} = alertContext;

    useEffect(() =>{
        if(isAuthenticated2){
            props.history.push('/admin');
        }
        if(error === 'Invalid Credentials') {
            setAlert(error, 'danger');    
            clearError();
        }
        if(error === 'Invalid Password') {
            setAlert(error, 'danger');    
            clearError();
        }
        if(error === 'Invalid Email Id') {
            setAlert(error, 'danger');    
            clearError();
        }
    }, [error, isAuthenticated2, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const {email, password} = user;

    const onChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        login(user);
        
    }

    return (
        <center>
        <div className='login'>
            <h1 className='login-heading'>Admin Login</h1>
            <form onSubmit={onSubmit} className='login-form'>
                <input type='email' value={email} name='email' placeholder='Email' onChange={onChange} required/>
                <input type='password' value={password} name='password' placeholder='Password' minLength='6' onChange={onChange} required/>
                <input type='submit' value='submit' />
            </form>
        </div>
        </center>
    )
}

export default AdminLogin
