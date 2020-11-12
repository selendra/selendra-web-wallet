import React, { useState, useEffect } from 'react';
import { Button, Input, message, Select, Spin } from 'antd';
import '../styles/Send.css';
import { ReactComponent as To } from '../assets/arrowright.svg';
import sel from '../assets/Selendra.png';
import AxiosInstance from '../helpers/AxiosInstance';
import PinField from "react-pin-field";
import { useStateValue } from '../StateProvider';
import { LoadingOutlined } from '@ant-design/icons';

function Send() {
  const { TextArea } = Input;
  const { Option, OptGroup } = Select;
  let today = new Date().toISOString().slice(0, 10);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [portfolio, setPortfolio] = useState({
    portfolio: null,
    loading: true
  });

  const [pin, setPin] = useState('');
  const [asset_code, SetAssetcode] = useState('');
  const [destination, SetDestination] = useState('');
  const [amount, SetAmount] = useState('');
  const [memo, SetMemo] = useState('');
  const [loading, setLoading] = useState(false);

  const [pinField, setPinField] = useState(false);

  const handleConfirm = () => {
    setPinField(true);
  }

  const sliceStr = (str) => {
    if(str !== undefined) {
      const first = str.slice(0, 10);
      const last = str.slice(-2);
      return (`${first}...${last}`);
    }
  }

  const handleSend = () => {
    setLoading(true);
    AxiosInstance().post('/sendpayment', {
      pin,
      asset_code,
      destination,
      amount,
      memo
    })
    .then((res) => {
      setLoading(false);
      if(res.data.message) {
        message.success(res.data.message);
      } else {
        message.error(res.data.error.message);
      }
    })
  }

  useEffect(() => {
    AxiosInstance().get('/portforlio') 
    .then(res => {
      setPortfolio({
        portfolio: res.data,
        loading: false
      })
    })
  }, [])

  return (
    <div className='send'>
      {portfolio.loading && (<Spin indicator={antIcon} />)}
      {!portfolio.loading && (
      <div className='send__container'>
        <div className='send__field'>
          <p>Send Transaction</p>
          <p>Balance: <span>{portfolio.portfolio.data.balance}</span></p>
          <div className='send__wallet'>
            <Input 
              placeholder='From'
              readOnly
              // value={state.user.wallet}
            ></Input>
            <To className='send__icon'/>
            <Input 
              placeholder='To'
              onChange={e => SetDestination(e.target.value)}
              value={destination}  
            ></Input>
          </div>
          <Select placeholder='Asset Type' onChange={SetAssetcode}>
            <OptGroup label="Asset Type">
              {/* {
                portfolio.map((portfolio, key) => {
                  const value = portfolio.asset_code !== undefined ? 
                  portfolio.asset_code : portfolio.asset_type;
                  return <Option value={value}>value</Option>
                })
              } */}
              <Option value='SEL'>SEL</Option>
            </OptGroup>
          </Select>
          <Input 
            placeholder='Amount'
            type='number'
            value={amount}
            onChange={e => SetAmount(e.target.value)}
          ></Input>
          <TextArea 
            placeholder='Memo' 
            value={memo}
            onChange={e => SetMemo(e.target.value)}
            className='textarea'
          ></TextArea>
        </div>
        <div className='send__invoice'>
          { !pinField ? (
            <div className='send__detail'>
              <p>Transaction Details</p>
              <div className='send__invoiceWallet'>
                <div className='send__from'>
                  <p></p>
                  <p><img src={sel} alt='sel'/>SEL</p>
                </div>
                <div className='send__to'>
                  <p>{sliceStr(destination)}</p>
                  <p><img src={sel} alt='sel'/>SEL</p>
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
                  <p>{amount}</p>
                  <p>{today}</p>
                  <p>{memo}</p>
                </div>
              </div>
              <div className='send__btn'>
                <Button onClick={handleConfirm}>Confirm</Button>
              </div>
            </div>
          ) : (
            <div className='send__pin'>
              <p>Enter PIN Code</p>
              <div className='send__pinContainer'>
                <div className='send__pinInput'>
                  <PinField 
                    className="field-a"
                    validate="0123456789"
                    length="4"
                    type="password"
                    onChange={setPin}
                  />
                </div>
                <div className='send__btnSend'>
                  <Button onClick={handleSend} loading={loading}>Send</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  )
}

export default Send;
