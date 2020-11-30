// Modules
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import AxiosInstance from '../helpers/AxiosInstance';
// Components
import { Button, Input, message } from 'antd';
import { ReactComponent as Phone } from '../assets/phone.svg';
import { ReactComponent as Lock } from '../assets/lock.svg';
// Styles
import '../styles/auth/LoginPhone.css';

export default function LoginPhone() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async() => {
    setLoading(true);
    await AxiosInstance().post('/loginbyphone', {
      phone: ('+855' + phone.replace(/^0+/, '')),
      password
    })
    .then((res) => {
      if(res.data.token) {
        message.success('Login Successfully');
        Cookie.set('token', res.data.token);
        history.push('/');
      } else if(res.data.message) {
        message.error(res.data.message);
      } else {
        message.error(res.data.error.message);
      }
      setLoading(false);
    })
    .catch((err) => {
      message.error('Something went wrong at our end');
    })
  }

  return (
    <div className='loginPhone__field'>
      <div className='loginPhone__input'>
        <Input 
          placeholder='Phone'
          onChange={ e => setPhone(e.target.value) }
          value={phone}
        ></Input>
        <Phone className='icon'/>
      </div>
      <div className='loginPhone__input'>
        <Input 
          placeholder='Password'
          type='password'
          onChange={ e => setPassword(e.target.value) }
          value={password}
        ></Input>
        <Lock className='icon'/>
        <Button type='text'>Forget Password ?</Button>
      </div>
      <div className='loginPhone__btn'>
        <Button loading={loading} onClick={handleLogin} >Login</Button>
        <Link to='/signup'>
          <Button type='text'>Don't have account?<span>Sign Up</span></Button>
        </Link>
      </div>
    </div>
  )
}