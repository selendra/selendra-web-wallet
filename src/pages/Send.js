import React, { useState, useEffect } from 'react';
import { Button, Input, message, Select, Spin, Modal } from 'antd';
import '../styles/Send.css';
import { ReactComponent as To } from '../assets/arrowright.svg';
import sel from '../assets/Selendra.png';
import AxiosInstance from '../helpers/AxiosInstance';
import PinField from "react-pin-field";
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ReactComponent as Warning } from '../assets/warning.svg';

function Send() {
  const modalStyle = {
    color: '#fff',
    background: '#181C35',
    borderRadius: '8px',
    textAlign: 'center'
  }

  const { TextArea } = Input;
  const { Option, OptGroup } = Select;
  let today = new Date().toISOString().slice(0, 10);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [pin, setPin] = useState('');
  const [asset_code, SetAssetcode] = useState('');
  const [destination, SetDestination] = useState('');
  const [amount, SetAmount] = useState('');
  const [memo, SetMemo] = useState('');
  const [loading, setLoading] = useState(false);

  const [pinField, setPinField] = useState(false);
  const [visible, setVisi] = useState(false);

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

  const [portfolio, setPortfolio] = useState({
    portfolio: null,
    loading: true
  });

  const [userprofile, setUserprofile] = useState({
    userprofile: null,
    loading: true
  })

  useEffect(() => {
    const reqOne = AxiosInstance().get('/userprofile');
    const reqTwo = AxiosInstance().get('/portforlio');

    axios.all([reqOne, reqTwo])
    .then(axios.spread((...res) => {
      const userprofile = res[0].data;
      const portfolio = res[1].data;
      if(portfolio.error) {
        setVisi(true)
      } else {
        setPortfolio({
          portfolio,
          loading: false
        })
        setUserprofile({
          userprofile,
          loading: false
        })
      }
    }))
  }, [])

  return (
    <div className='send'>
      {portfolio.loading && userprofile.loading && (<Spin indicator={antIcon} />)}
      {!portfolio.loading && !userprofile.loading && (
      <div className='send__container'>
        <div className='send__field'>
          <p>Send Transaction</p>
          <p>Balance: <span>{portfolio.portfolio.data.balance}</span></p>
          <div className='send__wallet'>
            <Input 
              placeholder='From'
              readOnly
              value={userprofile.userprofile.wallet}
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
                  <p>{sliceStr(userprofile.userprofile.wallet)}</p>
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
                  <p>{amount !== '' ?  amount : '...'}</p>
                  <p>{today}</p>
                  <p>{memo !=='' ? memo : '...'}</p>
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
      <Modal
        title=""
        visible={visible}
        footer={null}
        closable={false}
        centered
        bodyStyle={modalStyle}
        width={880}
      >
        <p className='wallet__modalTitle'>
          <Warning className='wallet__modalIcon'/> Warning
        </p>
        <div className='wallet__modalContainer'>
          <div className='wallet__modalDescription'>
            <p>Look like you don't have wallet yet!!</p>
          </div>
        </div>
        <div className='wallet__modalButton'>
          <Link to='/getwallet'>
            <Button>Get Wallet</Button>
          </Link>
        </div>
      </Modal>
    </div>
  )
}

export default Send;
