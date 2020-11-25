// Modules
import React, { useState } from 'react';
import AxiosInstance from '../helpers/AxiosInstance';
// Components
import { Button, Input, message } from 'antd';
import { ReactComponent as Email } from '../assets/email.svg';
import { ReactComponent as Lock } from '../assets/lock.svg';
// Styles
import '../styles/auth/SignupEmail.css';

function LoginEmail() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCon, setPasswordCon] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if(password !== passwordCon) {
      message.error('Password not match!');
    } else {
      setLoading(true);
      await AxiosInstance().post('/registerbyemail', {
        email,
        password
      })
      .then((res) => {
        if(res.data.message === "Successfully registered!") {
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error('Something went wrong at our end');
      })
      setLoading(false);
    }
  }
  return (
    <div className='signupEmail__field'>
      <div className='signupEmail__input'>
        <Input 
          placeHolder='Email'
          onChange={ e => setEmail(e.target.value) }
          value={email}  
        ></Input>
        <Email className='icon'/>
      </div>
      <div className='signupEmail__input'>
        <Input 
          placeHolder='Password'
          type='password'
          onChange={ e => setPassword(e.target.value) }  
          value={password}
        ></Input>
        <Lock className='icon'/>
      </div>
      <div className='signupEmail__input'>
        <Input 
          placeHolder='Confirm Password'
          type='password'
          onChange={ e => setPasswordCon(e.target.value) }  
          value={passwordCon}
        ></Input>
        <Lock className='icon'/>
      </div>
      <div className='signupEmail__btn'>
        <Button onClick={handleSignup} loading={loading}>Sign Up</Button>
      </div>
    </div>
  )
}

export default LoginEmail;
