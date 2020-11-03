import React from 'react';
import { Button, Input } from 'antd';
import '../styles/Send.css';
import { ReactComponent as To } from '../assets/arrowright.svg';
import sel from '../assets/Selendra.png'

function Send() {
  const { TextArea } = Input;

  return (
    <div className='send'>
      <div className='send__container'>
        <div className='send__field'>
          <p>Send Transaction</p>
          <p>Balance: <span>$1115</span></p>
          <div className='send__wallet'>
            <Input placeholder='From'></Input>
            <To className='send__icon'/>
            <Input placeholder='To'></Input>
          </div>
          <Input placeholder='Date'></Input>
          <Input placeholder='Asset Type'></Input>
          <Input placeholder='Amount'></Input>
          <TextArea placeholder='Memo' className='textarea'></TextArea>
        </div>
        <div className='send__invoice'>
          <p>Transaction Details</p>
          <div className='send__invoiceWallet'>
            <div className='send__from'>
              <p>XXXXXXXXX</p>
              <p><img src={sel} alt='sel'/> SEL</p>
            </div>
            <div className='send__to'>
              <p>XXXXXXXXX</p>
              <p><img src={sel} alt='sel'/> SEL</p>
            </div>
          </div>
          <hr style={{ margin: '4rem 0' }}/>
          <div className='send__invoiceDetail'>
            <div className='send__invoiceLeft'>
              <p>Amount:</p>
              <p>Date:</p>
              <p>Memo:</p>
            </div>
            <div className='send__invoiceRight'>
              <p>10$</p>
              <p>DD MM YYYY</p>
              <p>lorem10</p>
            </div>
          </div>
          <div className='send__btn'>
            <Button>Confirm</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Send;
