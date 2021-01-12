import React from 'react';
import { Row, Modal, Button } from 'antd';
import { ReactComponent as Warning } from '../../assets/warning.svg'
import './style/modalGetwallet.css';
import { Link } from 'react-router-dom';

export default function ModalGetWallet({visible}) {
  const modalStyle ={
    color: '#fff',
    background: '#181C35',
    borderRadius: '8px',
    textAlign: 'center'
  }

  return (
    <Modal
      title=""
      visible={visible}
      footer={null}
      closable={false}
      centered
      bodyStyle={modalStyle}
      width={880}
      className='modal'
    >
      <Row align='middle' justify='center'>
        <Warning />
        <p className='modal__title'> Warning</p>
      </Row>
      <p className='modal__description'>Look Like You Don't Have Wallet Yet</p>
      <div className='modal__btn'>
        <Button>
          <Link to='/getwallet'>
            Get Wallet
          </Link>
        </Button>
      </div>
    </Modal>
  )
}