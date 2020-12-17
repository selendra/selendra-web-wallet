import React from 'react';
import { Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ReactComponent as X } from '../../assets/x.svg';
import { ReactComponent as Information } from '../../assets/information.svg';

export default function MyModal(props) {
  const modalStyle = {
    color: '#fff',
    background: '#181C35',
    borderRadius: '8px',
    textAlign: 'center'
  }

  return (
    <div>
      <Modal
        title=""
        visible={props.isOpen}
        footer={null}
        closable={false}
        centered
        bodyStyle={modalStyle}
        width={880}
      >
        <div className='getwallet__modalClose'>
          <Button type='text' onClick={props.isOpen}><X /></Button>
        </div>
        <p className='getwallet__modalTitle'>
          <Information className='getwallet__modalIcon'/> Opps
        </p>
        <div className='getwallet__modalContainer'>
          <div className='getwallet__modalDescription'>
            <p>Opp! You need to verify your phone number first</p>
          </div>
        </div>
        <div className='getwallet__modalButton'>
          <Link to='/verifyaddphone'>
            <Button>Verify Phone</Button>
          </Link>
        </div>
      </Modal>
    </div>
  )
}