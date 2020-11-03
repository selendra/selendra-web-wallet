import React, { useState } from 'react';
import '../styles/Getwallet.css';
import PinField from "react-pin-field";
import '../styles/pin-field.scss';
import { Button, Modal } from 'antd';
import { ReactComponent as Thick } from '../assets/thick.svg';
import { ReactComponent as X } from '../assets/x.svg';

function Getwallet() {
  const [visible, setVisi] = useState(true);
  const onClose = () => {
    setVisi(false);
  }
  const modalStyle = {
    color: '#fff',
    background: '#181C35',
    borderRadius: '8px',
    textAlign: 'center'
  }
  return (
    <div className='getwallet'>
      <div className='getwallet__container'>
        <div className='getwallet__card'>
          <span>Enter PIN Code</span>
          <span className='getwallet__txt'>PIN</span>
          <PinField 
            className="field-a"
            validate="0123456789"
            length="4"
            type="password"
          />
          <span className='getwallet__txt'>Confirm PIN</span>
          <PinField 
            className="field-a"
            validate="0123456789"
            length="4"
            type="password"
          />
          <div className='getwallet__button'>
            <Button>Get Wallet</Button>
          </div>
        </div>
      {/* Modal */}
        <Modal
          title=""
          visible={visible}
          footer={null}
          closable={false}
          centered
          bodyStyle={modalStyle}
          width={880}
        >
          <div className='getwallet__modalClose'>
            <Button type='text' onClick={onClose}><X /></Button>
          </div>
          <p className='getwallet__modalTitle'>
            <Thick className='getwallet__modalIcon'/> Successfully
          </p>
          <div className='getwallet__modalContainer'>
            <div className='getwallet__modalDescription'>
              <p>
                Please keep your key secure. This secret key will only be showed to you once.<br/>
                Selendra will not be able to help you recover it if lost.
              </p>
              <p className='getwallet__modalKey'>Wallet key: <span>xxxxxxxxx</span></p>
              <p className='getwallet__modalKey'>Secret key: <span>xxxxxxxxx</span></p>
            </div>
          </div>
          <div className='getwallet__modalButton'>
            {/* <Link to='/getwallet'> */}
              <Button>Save PDF</Button>
            {/* </Link> */}
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Getwallet;
