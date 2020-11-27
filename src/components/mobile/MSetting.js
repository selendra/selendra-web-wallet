import { Select, Input, Button, message } from 'antd';
import React, { useState } from 'react';
import AxiosInstance from '../../helpers/AxiosInstance';
import '../../styles/mobile/MSetting.css';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import PinField from 'react-pin-field';
import Icon from '@ant-design/icons';
import { ReactComponent as Exit } from '../../assets/exit.svg';

function MSetting(props) {
  const history = useHistory();
  const { Option, OptGroup } = Select;
  const ExitIcon = props => <Icon component={Exit} {...props} />;
  const sliceStr = (str) => {
    if(str !== undefined) {
      const first = str.slice(0, 1);
      return (`${first}`);
    }
  }
  const handleLogout = () => {
    Cookies.remove('token');
    history.push('/login');
  }

  const handleIsChangePass = () => {
    if(isChangePin) setIsChangePin(false);
    setIsUserprofile(false);
    return setIsChangePass(true);
  }

  const handleIsChangePin = () => {
    if(isChangePass) setIsChangePass(false);
    setIsUserprofile(false);
    return setIsChangePin(true);
  }

  const [readable, setReadable] = useState(true);
  const [first_name, setFirstname] = useState('');
  const [mid_name, setMidname] = useState('');
  const [last_name, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChangePass, setIsChangePass] = useState(false);
  const [isChangePin, setIsChangePin] = useState(false);
  const [isUserprofile, setIsUserprofile] = useState(true);

  const handleSave = () => {
    setLoading(true);
    AxiosInstance().post('/userprofile', {
      first_name,
      mid_name,
      last_name,
      gender
    })
    .then((res)=> {
      message.success(res.data.message);
      setLoading(false);
      setTimeout(() => {
        window.location.reload(true);
      }, 1500);
    })
  }

  const [current_password, setCurrentPass] = useState('');
  const [new_password, setNewPass] = useState('');
  const [new_password1, setNewPass1] = useState('');

  const handleChangePass = () => {
    setLoading(true);
    AxiosInstance().post('/change-password',{
      current_password,
      new_password
    })
    .then((res) => {
      if(res.data.message) {
        message.success(res.data.message);
      } else {
        message.error(res.data.error.message);
      }
      setLoading(false);
    })
  }

  const [current_pin, setCurrentPin] = useState('');
  const [new_pin, setNewPin] = useState('');
  const [new_pin1, setNewPin1] = useState('');

  const handleChangePin = () => {
    setLoading(true);
    AxiosInstance().post('/change-pin', {
      current_pin,
      new_pin
    })
    .then((res) => {
      if(res.data.message) {
        message.success(res.data.message);
      } else {
        message.error(res.data.error.message);
      }
      setLoading(false);
    })
  }

  return (
    <div className='msetting'>
      { isUserprofile && (
      <div className='msetting__container'>
        <p>Profile</p>
        <div className='msetting__profile'>
          <div className='msetting__profilePic'>
            <div className='msetting__circle'>
              { props.first_name && props.last_name && (
                <span>{sliceStr(props.first_name) + sliceStr(props.last_name)}</span>
              )}
            </div>
          </div>
          <span onClick={() => setReadable(false)}>Edit Profile</span>
        </div>
        <div className='msetting__field'>
          <div className='msetting__item msetting__username'>
            <div>
              <p>First Name</p>
              { readable ? (
                <Input
                  value={props.first_name}
                ></Input>
              ) : (
                <Input
                  value={first_name}
                  onChange={ e => setFirstname(e.target.value) }
                ></Input>
              )}
            </div>
            <div style={{padding: "0 10px"}}></div>
            <div>
              <p>Last Name</p>
              { readable ? (
                <Input
                  value={props.last_name}
                ></Input>
              ) : (
                <Input
                  value={last_name}
                  onChange={ e => setLastname(e.target.value) }
                ></Input>
              )}
            </div>
          </div>
          <div className='msetting__item msetting__select'>
            <span>Gender</span>
            <Select placeholder={props.gender} disabled={readable} onChange={setGender}>
              <OptGroup label="Gender">
                <Option value="M">Male</Option>
                <Option value="F">Female</Option>s
              </OptGroup>
            </Select>
          </div>
          <div className='msetting__item'>
            <p>Email:</p>
            <Input
              readOnly
              value={props.email ? props.email : 'None'}
            ></Input>
          </div>
          <div className='msetting__item'>
            <p>Wallet:</p>
            <Input
              readOnly
              value={props.wallet}
            ></Input>
          </div>
          {!readable && (
            <div className='msetting__btnSave' style={{marginTop: '20px'}}>
              <Button block loading={loading} onClick={handleSave}>Save</Button>
            </div>
          )}
        </div>
      </div>
      )}
      {isChangePass && (      
      <div className='msetting__changePass'>
        <div className='msetting__changePassContainer'>
          <div className='msetting__itemOne'>
            <p>Current Password</p>
            <Input 
              placeholder='Current Password'
              onChange={ e => setCurrentPass(e.target.value) }
              value={current_password}
            ></Input>
          </div>
          <div className='msetting__itemTwo'>
            <div>
              <p>New Password</p>
              <Input 
                placeholder='New Password'
                onChange={ e => setNewPass(e.target.value) }
                value={new_password}
              ></Input>
            </div>
            <div>
              <p>Confirm New Password</p>
              <Input 
                placeholder='Confirm New Password'
                onChange={ e => setNewPass1(e.target.value) }
                value={new_password1}
              ></Input>
            </div>
            <div style={{marginTop: '20px'}}>
              <Button loading={loading} onClick={handleChangePass}>Change Password</Button>
            </div>
          </div>
        </div>
      </div>
      )}
      {isChangePin && (
      <div className='msetting__changePin'>
        <div className='msetting__changePinContainer'>
          <div>
            <p>Current PIN</p>
            <PinField 
              className="field-a"
              validate="0123456789"
              length="4"
              type="password"
              onChange={setCurrentPin}
            />
          </div>
          <div>
            <div>
              <p>New PIN</p>
              <PinField 
                className="field-a"
                validate="0123456789"
                length="4"
                type="password"
                onChange={setNewPin}
              />
            </div>
            <div>
              <p>Confirm New Password</p>
              <PinField 
                className="field-a"
                validate="0123456789"
                length="4"
                type="password"
                onChange={setNewPin1}
              />
            </div>
            <div style={{marginTop: '20px'}}>
              <Button loading={loading} onClick={handleChangePin}>Change PIN</Button>
            </div>
          </div>
        </div>
      </div>
      )}
      <div className='msetting__setting'>
        <div className='msetting__settingContainer'>
          <p>Setting</p>
          <div className='msetting__btn'>
            <div>
              <Button onClick={handleIsChangePass}>Change Password</Button>
            </div>
            <div>
              <Button onClick={handleIsChangePin}>Change PIN</Button>
            </div>
            <div className='msetting__btnLogout'>
              <Button type='text' onClick={handleLogout} icon={<ExitIcon/>}>Log Out</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MSetting;