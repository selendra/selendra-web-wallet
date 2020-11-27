// Modules
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import AxiosInstance from '../helpers/AxiosInstance';
// Components
import { Button, Input, message, Row } from 'antd';
import { ReactComponent as Email } from '../assets/email.svg';
import { ReactComponent as Lock } from '../assets/lock.svg';
// Styles
import '../styles/auth/LoginEmail.css';

function LoginEmail() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = () => {
    setLoading(true);
    AxiosInstance().post('/loginbyemail', {
      email,
      password
    })
    .then((res) => {
      setLoading(false);
      if(res.data.token) {
        message.success('Login Successfully');
        Cookie.set('token', res.data.token);
        history.push('/');
      } else if(res.data.message) {
        message.error(res.data.message);
      } else {
        message.error(res.data.error.message);
      }
    })
  }

  return (
    <div className='loginEmail__field'>
      <div className='loginEmail__input'>
        <Input 
          placeholder='Email' 
          onChange={ e => setEmail(e.target.value) }
          value={email}
        ></Input>
        <Email className='icon'/>
      </div>
      <div className='loginEmail__input'>
        <Input 
          placeholder='Password'
          type='password'
          onChange={ e => setPassword(e.target.value) } 
          value={password}
        ></Input>
        <Lock className='icon'/>
        <Button type='link'>Forget Password ?</Button>
      </div>
      <div className='loginEmail__btn'>
        <Button loading={loading} onClick={handleLogin}>Login</Button>
        <Link to='/signup'>
          <Button type='text'>Don't have account?<span>Sign Up</span></Button>
        </Link>
      </div>
    </div>
  )
}

export default LoginEmail;
