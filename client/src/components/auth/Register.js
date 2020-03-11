import React, {useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = props => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const {isAuthenticated, register, error, clearErrors} = authContext;
    const {setAlert} = alertContext;

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/');
        }

        if(error === 'User Already Exists') {
            setAlert(error, 'danger');  
            clearErrors();  
        }
    }, [isAuthenticated, error, props.history]);

    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        password2: '' 
    });

    const {name, email, phone, password, password2} = user;

    const onChange = e => setUser({...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        
        if(name === '' || email === '' || phone === ''|| password === '' || password2 === ''){
            setAlert('Please enter all fields', 'danger');
        }
        else if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        }
        else {
            register({
                name,
                email,
                phone,
                password
            });
        }
    }
    return (
        <center>
        <div className='register'>
            <h1 className='login-heading'>Register</h1>
            <form onSubmit={onSubmit} className='login-form'>
                <input type='text' value={name} name='name' placeholder='Name' onChange={onChange} required/>
                <input type='email' value={email} name='email' placeholder='Email' onChange={onChange} required/>
                <input type='num' value={phone} name='phone' placeholder='Phone Number' minLength='10' onChange={onChange} required/>
                <input type='password' value={password} name='password' placeholder='Password' minLength='6' onChange={onChange} required/>
                <input type='password' value={password2} name='password2' placeholder='Confirm Password' minLength='6' onChange={onChange} required/>
                <input type='submit' value='submit' />
            </form>
        </div>
        </center>
    )
}

export default Register
