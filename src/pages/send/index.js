import React, { useState, useEffect, useRef } from 'react';
import { Dlayout, Loading } from '../../components';
import { Row, Col, Button, Input, Card, Select, message, Modal } from 'antd';
import { ReactComponent as Arrowright } from '../../assets/arrowright.svg';
import { ReactComponent as QR } from '../../assets/qr.svg';
import AxiosInstance from '../../helpers/AxiosInstance';
import axios from 'axios';
import './styles/send.css';
import selendra from '../../assets/selendra.png';
import PinField from 'react-pin-field';
import Icon from '@ant-design/icons';
import QrReader from 'react-qr-reader';

export default function Send() {
  const card = {
    background: '#181C35',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    width: '100%',
    height: '100%'
  }
  const QRIcon = props => <Icon component={QR} {...props} />;
  const { Option, OptGroup } = Select;
  const { TextArea } = Input;
  let today = new Date().toISOString().slice(0, 10);
  const sliceStr = (str) => {
    if(str !== undefined) {
      const first = str.slice(0, 10);
      const last = str.slice(-2);
      return (`${first}...${last}`);
    }
  }

  const [visible, setVisible] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [portfolio, setPortfolio] = useState({
    portfolio: null,
    loading: true
  })
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
        setVisible(true)
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

  // handle send
  const [pin, setPin] = useState('');
  const [asset_code, SetAssetcode] = useState('');
  const [destination, SetDestination] = useState('');
  const [amount, SetAmount] = useState('');
  const [memo, SetMemo] = useState('');

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
  // end handle send
    const modalStyle = {
      background: '#181C35',
      borderRadius: '8px'
    }
    const [modalScan, setModalScan] = useState(false);

    const openScan = () => {
      setModalScan(true);
    }
    const handleCancel = () => {
      setModalScan(false);
    }
    const handleError = () => {
      console.log('sth went wrong');
    }
    const handleScan = (data) => {
      if(data) {
        SetDestination(data);
        setModalScan(false);
      } else {
        return null
      }
    }

  return (
    <Dlayout>
      {portfolio.loading && userprofile.loading && (<Loading />)}
      {(!portfolio.loading && !userprofile.loading ) && ( 
      <div>
        <Modal
          footer={null}
          visible={modalScan}
          style={modalStyle}
          onCancel={handleCancel}
        >
          <QrReader 
            delay={300}
            onError={handleError}
            onScan={handleScan}
          />
        </Modal>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div className='send__title'>
              <p>Send Transaction</p>
              <p>Balance: <span>{portfolio.portfolio.token}</span></p>
            </div>
            { !isNext && (
            <div className='send__field'>
              <Row align='middle' justify='space-around'>
                <Col span={10}>
                  <Input 
                    readOnly 
                    placeholder='From' 
                    value={userprofile.userprofile.wallet}
                  />
                </Col>
                <Col span={2} offset={1}>
                  <Arrowright />
                </Col>
                <Col span={10}>
                  <Input 
                    placeholder='To'
                    value={destination}
                    onChange={e => SetDestination(e.target.value)}  
                    addonAfter={<QRIcon onClick={openScan}/>}
                  />
                </Col>
              </Row>
              <Select placeholder='Asset Type' style={{width: '100%'}} onChange={SetAssetcode}>
                <OptGroup label="Asset Type">
                  <Option value='SEL'>SEL</Option>
                </OptGroup>
              </Select>
              <Input 
                placeholder='amount'
                type='number'
                value={amount}
                onChange={e => SetAmount(e.target.value)}
                />
              <TextArea 
                placeholder='Memo' 
                className='textarea'
                value={memo}
                onChange={e => SetMemo(e.target.value)}
              ></TextArea>
              <Row>
                <Col xs={24} sm={24} md={24} lg={0} xl={0}>
                  <div className='send__btnNext'>
                    <Button onClick={() => setIsNext(true)}>Next</Button>
                  </div>
                </Col>
              </Row>
            </div>
            )}
          </Col>
          <Col xs={0} sm={0} md={0} lg={{span: 11, offset: 1}} xl={{span: 11, offset: 1}}>
            <Card style={card}>
              { !isConfirm ? (
              <div className='send__detail'>
                <p>Transaction Detail</p>
                <Row>
                  <Col span={12}>
                    {/* <p>{sliceStr(userprofile.userprofile.wallet)}</p> */}
                    <p><img src={selendra} alt='sel'/>SEL</p>
                  </Col>
                  <Col span={12}>
                    <p>{sliceStr(destination)}</p>
                    <p><img src={selendra} alt='sel'/>SEL</p>
                  </Col>
                </Row>
                <hr /><br />
                <Row>
                  <Col span={12}>
                    <p>Amount:</p>
                    <p>Date:</p>
                    <p>Memo:</p>
                  </Col>
                  <Col span={12}>
                    <p>{amount !== '' ?  amount : '...'}</p>
                    <p>{today}</p>
                    <p>{memo !=='' ? memo : '...'}</p>
                  </Col>
                </Row>
                <Row style={{paddingTop: '24px'}}>
                  <div className='send__btn'>
                    <Button onClick={() => setIsConfirm(true)}>Confirm</Button>
                  </div>
                </Row>
              </div>
              ) : (
                <Row justify='center'>
                  <Col>
                    <div className='send__pin'>
                      <p>Enter PIN Code</p>
                      <PinField 
                        className="field-a"
                        validate="0123456789"
                        length="4"
                        type="password"
                        onChange={setPin}
                      />
                      <div className='send__btn' style={{paddingTop: '24px'}}>
                        <Button loading={loading} onClick={handleSend}>Send</Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
            </Card>
          </Col>
          { isNext && (
          <Col xs={24} sm={24} md={24} lg={0} xl={0}>
            <Row justify='center'>
              <Col>
                <div className='send__pin'>
                  <p>Enter PIN Code</p>
                  <PinField 
                    className="field-a"
                    validate="0123456789"
                    length="4"
                    type="password"
                    onChange={setPin}
                  />
                  <div className='send__btn' style={{paddingTop: '24px'}}>
                    <Button loading={loading} onClick={handleSend}>Send</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          )}
        </Row>
      </div>
      )}
    </Dlayout>
  )
}