// Modules
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import AxiosInstance from '../helpers/AxiosInstance';
// Components
import { Button, Input, message } from 'antd';
import { ReactComponent as Phone } from '../assets/phone.svg';
import { ReactComponent as Lock } from '../assets/lock.svg';
// Styles
import '../styles/auth/SignupPhone.css';

function SignupPhone() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCon, setPasswordCon] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSignup = async () => {
    if(password !== passwordCon) {
      message.error('Password not match!');
    } else {
      setLoading(true);
      await AxiosInstance().post('/registerbyphone', {
        phone: ('+855' + phone.replace(/^0+/, '')),
        password
      })
      .then((res) => {
        if(res.data.message === "Successfully registered!") {
          message.success(res.data.message);
          Cookie.set('phone', phone);
          history.push('/verifyphone');
        } else {
          message.error(res.data.message);
        }
      })
      setLoading(false);
    }
  }

  return (
    <div className='signupPhone__field'>
      <div className='signupPhone__input'>
        <Input 
          placeHolder='Phone'
          onChange={ e => setPhone(e.target.value) }
          value={phone}
        ></Input>
        <Phone className='icon'/>
      </div>
      <div className='signupPhone__input'>
        <Input 
          placeHolder='Password'
          type='password'
          onChange={ e => setPassword(e.target.value) }
          value={password}
        ></Input>
        <Lock className='icon'/>
      </div>
      <div className='signupPhone__input'>
        <Input 
          placeHolder='Confirm Password'
          type='password'
          onChange={ e => setPasswordCon(e.target.value) }
          value={passwordCon}
        ></Input>
        <Lock className='icon'/>
      </div>
      <div className='signupPhone__btn'>
        <Button onClick={handleSignup} loading={loading}>Sign Up</Button>
      </div>
    </div>
  )
}

export default SignupPhone;
