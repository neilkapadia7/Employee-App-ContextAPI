import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AdminContext from '../../context/admin/adminContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const adminContext = useContext(AdminContext);
    const {isAuthenticated2, loading2} = adminContext;

    return (
            <Route {...rest} render={props => !isAuthenticated2 && !loading2
                ?(
                    <Redirect to='/admin-login' />
                ) : (
                    <Component {...props} />
                )    
            } />
    )
}

export default PrivateRoute
