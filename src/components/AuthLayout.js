// Modules
import React from 'react';
// Components
import { ReactComponent as LoginAI } from '../assets/Login-ai.svg';
import selendra from '../assets/Selendra.png';
// Styles
import '../styles/auth/AuthLayout.css';

function AuthLayout(props) {
  return (
    <div className='authlayout'>
      <div className='authlayout__container'>
        <div className='authlayout__sectionOne'>
          <img src={selendra} alt='sel_logo' />
          <p>SELENDRA</p>
          <span>
            A multi-use cases blockchain <br/>
            super-app for the Internet 2.0
          </span>
          <LoginAI className='authlayout__ai'/>
        </div>
        <div className='authlayout__sectionTwo'>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout;
