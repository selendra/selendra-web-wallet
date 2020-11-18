// Modules
import React, { useEffect, useState } from 'react';
import AxiosInstance from '../helpers/AxiosInstance';
import { Link } from 'react-router-dom';
// Components
import { Button, Input, message, Spin } from 'antd';
import PinField from "react-pin-field";
import { LoadingOutlined } from '@ant-design/icons';
import MSetting from '../components/mobile/MSetting';
// Styles
import '../styles/Setting.css';


function Setting() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [loading, setLoading] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [user, setUser] = useState([]);
  const [current_password, setCurrentPass] = useState('');
  const [new_password, setNewPass] = useState('');
  const [new_password1, setNewPass1] = useState('');
  const [current_pin, setCurrentPin] = useState('');
  const [new_pin, setNewPin] = useState('');
  const [new_pin1, setNewPin1] = useState('');

  const [userProfile, setUserProfile] = useState(true);
  const [changePasswordField, setChangePassField] = useState(false);
  const [changePinField, setChangePinField] = useState(false);

  const sliceStr = (str) => {
    if(str !== undefined) {
      const first = str.slice(0, 1);
      return (`${first}`);
    }
  }

  useEffect(() => {
    AxiosInstance().get('/userprofile')
    .then((res) => {
      setUser(res.data);
      setLoadingScreen(false);
    })
  }, [])

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

  const handleOpenPass = () => {
    if(userProfile) setUserProfile(false);
    if(changePinField) setChangePinField(false);
    return setChangePassField(true);
  }

  const handleOpenPin = () => {
    if(userProfile) setUserProfile(false);
    if(changePasswordField) setChangePassField(false);
    return setChangePinField(true);
  }

  return (
    <div className='setting'>
      {loadingScreen && (<Spin indicator={antIcon} />)}
      {!loadingScreen && (
      <MSetting 
        first_name={user.first_name}
        last_name={user.last_name}
        gender={user.gender}
        email={user.email}
        wallet={user.wallet}
      />
      // <div className='setting__container'>
      //   <div className='setting__left'>
      //     <div className='setting__profile'>
      //       <div className='setting__profilePic'>
      //         <div className='setting__circle'>
      //           { user.first_name && user.last_name && (
      //             <span>{sliceStr(user.first_name) + sliceStr(user.last_name)}</span>
      //           )}
      //         </div>
      //       </div>
      //       { user.first_name || user.last_name ? (
      //         <p>{user.first_name + user.mid_name + user.last_name}</p>
      //       ) : (
      //         <Link to='/userverify' style={{marginTop: '20px'}}>Update Profile</Link>
      //       )}
      //     </div>
      //     <div className='setting__option'>
      //       <Button block onClick={handleOpenPass}>Change Password</Button>
      //       <Button block onClick={handleOpenPin}>Change PIN</Button>
      //     </div>
      //   </div>  
      //   <div className='setting__right'>
      //     { userProfile && (
      //     <div className='setting__profileInfo'>
      //       <p>User Information</p>
      //       { user.email && (
      //         <p>Email: <span>{user.email}</span></p>
      //       )}
      //       { user.gender && (
      //         <p>Gender: <span>{user.gender}</span></p>
      //       )}
      //       { user.wallet && (
      //         <p>Wallet: <span>{user.wallet}</span></p>
      //       )}
      //     </div>
      //     )}
      //     { changePasswordField && (
      //     <div className='setting__changePass'>
      //       <p>Change Password</p>
      //       <Input 
      //         placeholder='Current Password'
      //         onChange={ e => setCurrentPass(e.target.value) }
      //         value={current_password}
      //       ></Input>
      //       <Input 
      //         placeholder='New Password'
      //         onChange={ e => setNewPass(e.target.value) }
      //         value={new_password}
      //       ></Input>
      //       <Input 
      //         placeholder='Confirm New Password'
      //         onChange={ e => setNewPass1(e.target.value) }
      //         value={new_password1}
      //       ></Input>
      //       <div className='setting__btnChangePass'>
      //         <Button onClick={handleChangePass} loading={loading}>Change Password</Button>
      //       </div>
      //     </div>
      //     )}
      //     { changePinField && (
      //     <div className='setting__changePin'>
      //       <p>Change PIN</p>
      //       <div className='setting__changePinContainer'>
      //         <div>
      //           <p>Current PIN</p>
      //           <PinField 
      //             className="field-a"
      //             validate="0123456789"
      //             length="4"
      //             type="password"
      //             onChange={setCurrentPin}
      //           />
      //         </div>
      //         <div>
      //           <p>New PIN</p>
      //           <PinField 
      //             className="field-a"
      //             validate="0123456789"
      //             length="4"
      //             type="password"
      //             onChange={setNewPin}
      //           />
      //         </div>
      //         <div>
      //           <p>Confirm New PIN</p>
      //           <PinField 
      //             className="field-a"
      //             validate="0123456789"
      //             length="4"
      //             type="password"
      //             onChange={setNewPin1}
      //           />
      //         </div>
      //         <div className='setting__btnChangePin'>
      //           <Button onClick={handleChangePin} loading={loading}>Change PIN</Button>
      //         </div>
      //       </div>
      //     </div>
      //     )}
      //   </div>
      // </div>
      )}
    </div>
  )
}

export default Setting;
