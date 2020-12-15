import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isAuthenticated from '../utils/isAuthenticated';

export function ProtectedRoute({component: Component, ...rest}) {
  return (
    <Route 
      {...rest} 
      render={() => 
        isAuthenticated ? (
          <Component {...rest}/>
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  )
}