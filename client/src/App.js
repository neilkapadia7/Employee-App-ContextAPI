import React, {Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './components/tasks/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alerts';

import TaskState from './context/task/TaskState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import AdminState from './context/admin/AdminState';

import AdminRoute from './components/routing/AdminRoute';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';

import AdminLogin from './components/admin/AdminLogin';
import AdminHome from './components/admin/Home';
import UserTasks from './components/admin/UserTasks';


if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AdminState>
    <AuthState>
    <TaskState>
    <AlertState>
      
      <Router>
        <Fragment>
          <Navbar />
          <div style={{paddingTop: '80px'}}><Alert /></div>
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute exact path='/about' component={About} />
            <AdminRoute exact path='/admin' component={AdminHome} />
            <AdminRoute exact path='/admin/user-task/:id' component={UserTasks} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/admin-login' component={AdminLogin} />
            <Route exact path='*' component={NotFound} />
          </Switch>
        </Fragment>
      </Router>

    </AlertState>
    </TaskState>
    </AuthState>
    </AdminState>
  );
}

export default App;
