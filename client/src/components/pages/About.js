import React, {useContext, useEffect} from 'react';
import AuthContext from '../../context/auth/authContext';

const About = () => {
    const authContext = useContext(AuthContext);
    const {isAuthenticated, loadUser} = authContext;

    useEffect(() => {
        loadUser();

    }, [isAuthenticated]);

    return (
        <div>
            <h1>About Page</h1>
        </div>
    )
}

export default About
