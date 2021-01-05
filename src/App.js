import React from 'react';
import { 
  Dashboard,
  Login,
  Signup, 
  VerifyPhone, 
  Transaction, 
  Send, 
  Receive, 
  Profile, 
  VerifyAddPhone, 
  VerifyUser, 
  Getwallet 
} from './pages';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import './styles/App.css';
import { ProtectedRoute } from './helpers/routes';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/verifyphone' component={VerifyPhone}/>
        <Route exact path='/verifyaddphone' component={VerifyAddPhone}/>
        <ProtectedRoute 
          exact
          path='/'
          component={Dashboard}
        />
        <ProtectedRoute 
          exact
          path='/transaction'
          component={Transaction}
        />
        <ProtectedRoute 
          exact
          path='/send'
          component={Send}
        />
        <ProtectedRoute 
          exact
          path='/receive'
          component={Receive}
        />
        <ProtectedRoute 
          exact
          path='/profile'
          component={Profile}
        />
        <ProtectedRoute 
          exact
          path='/getwallet'
          component={Getwallet}
        />
        <ProtectedRoute 
          exact
          path='/verifyuser'
          component={VerifyUser}
        />
      </Switch>
    </Router>
  )
}