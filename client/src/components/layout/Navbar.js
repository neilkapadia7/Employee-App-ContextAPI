import React, {useContext, Fragment} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import AdminContext from '../../context/admin/adminContext';

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const adminContext = useContext(AdminContext);

    const {isAuthenticated, logout, user} = authContext;
    const {isAuthenticated2, logout2} = adminContext;
    
    const onLogout = () => {
        logout();
        logout2();
    }

    const authLinks = (
        <Fragment>
            <li><a href='#!'>{ user && user.name}!</a></li>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><a href='#!' onClick={onLogout}>Log Out</a></li> 
        </Fragment>
    );

    const authLinks2 = (
        <Fragment>
            <li><a href='#!'>Welcome Admin!</a></li>
            <li><Link to='/admin'>Home</Link></li>
            <li><a href='#!' onClick={onLogout}>Log Out</a></li> 
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </Fragment>
    );

    const result = () => {
        if(isAuthenticated){
            return authLinks;
        }
        else if(isAuthenticated2) {
            return authLinks2;
        }
        else {
            return guestLinks;
        }
    }

    return (
        <div className='Nav'>
            <div className='navtitle'>Company Name</div>
            <div className='navroute'>
                <ul>
                    {/* {isAuthenticated ? authLinks : guestLinks} */}
                    {result()}
                </ul>
            </div>
        </div>
    )
}

export default Navbar
