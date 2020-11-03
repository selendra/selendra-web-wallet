import { Button } from 'antd';
import React from 'react';
import '../styles/Setting.css'

function Setting() {
  return (
    <div className='setting'>
      <div className='setting__container'>
        <div className='setting__left'>
          <div className='setting__profile'>
            <div className='setting__profilePic'>
              <div className='setting__circle'>
                <span>PH</span>
              </div>
            </div>
            <p>Piset Heang</p>
          </div>
          <div className='setting__option'>
            <Button block>Change Password</Button>
            <Button block>Change PIN</Button>
          </div>
        </div>  
        <div className='setting__right'>
          <p>User Information</p>
          <p>Email: <span>blahblah@gmail.com</span></p>
          <p>Gender: <span>Male</span></p>
          <p>Wallet: <span>XXXXXXXXXX</span></p>
        </div>
      </div>
    </div>
  )
}

export default Setting
