import React, {useState, useEffect, useContext} from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = props => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const {isAuthenticated, login, error, clearErrors} = authContext;
    const {setAlert} = alertContext;

    useEffect(()=> {
        if(isAuthenticated){
            props.history.push('/');
        }
        if(error === 'Invalid Credentials') {
            setAlert(error, 'danger');    
            clearErrors();
        }
        if(error === 'Invalid Password') {
            setAlert(error, 'danger');    
            clearErrors();
        }
        if(error === 'Invalid Email Id') {
            setAlert(error, 'danger');    
            clearErrors();
        }
    }, [isAuthenticated, error, props.history])

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
        if(email === '' || password === "") {
            setAlert('Please enter all fields', 'danger');
        }
        else {
            login({
                email,
                password
            });
        }
    }

    return (
        <center>
        <div className='login'>
            <h1 className='login-heading'>Login</h1>
            <form onSubmit={onSubmit} className='login-form'>
                <input type='email' value={email} name='email' placeholder='Email' onChange={onChange} required/>
                <input type='password' value={password} name='password' placeholder='Password' minLength='6' onChange={onChange} required/>
                <input type='submit' value='Submit' />
            </form>
        </div>
        </center>
    )
}

export default Login
