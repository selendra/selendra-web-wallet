import React, { useState } from 'react';
import { Row, Col, Card, Button, message, Modal, Alert } from 'antd';
import PinField from 'react-pin-field';
import '../../styles/pin-field.scss';
import { Dlayout } from '../../components';
import AxiosInstance from '../../helpers/AxiosInstance';
import { useHistory, Link } from 'react-router-dom';
import './styles/getwallet.css';
import { ReactComponent as X } from '../../assets/x.svg';
import { ReactComponent as Information } from '../../assets/information.svg';
import { ReactComponent as Thick } from '../../assets/thick.svg';


export default function Getwallet() {
  const card = {
    background: '#181C35',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    width: '100%',
    height: '100%',
  }

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleGetWallet = () => {
    if(pin === '' || pin === '') {
      setErrorMsg('PIN is required!');
    } else if(pin !== confirmPin) {
      setErrorMsg('PIN not match!');
    } else {
      setLoading(true);
      AxiosInstance().post('/getwallet', {
        pin
      })
      .then((res)=> {
        setLoading(false);
        if(res.data.message) {
          const msg = res.data.message;
          if (msg === 'Opp! look like you already had a wallet') {
            message.error(msg);
            history.push('/');
          } else if (msg === 'Opp! You need to verify your phone number first') {
            setModalErr(true);
          } else {
            setVisi(true);
            setValue(msg);
          }
        } else if(res.data.error.message) {
          message.error(res.data.error.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        message.error('something wrong at our end!');
      })
    }
  }

  // Modal State
    const modalStyle = {
      color: '#fff',
      background: '#181C35',
      borderRadius: '8px',
      textAlign: 'center'
    }

    const [visible, setVisi] = useState(false);
    const [ModalErr, setModalErr] = useState(false);
    const [value, setValue] = useState([]);

    const handleSavePdf = () => {}
  // End Modal State

  return (
    <Dlayout>
      <div>
        <Row justify='center'>
          <Col>
            <Card style={card}>
              <p className='getwallet__title'>Enter PIN Code</p>
              {errorMsg && (
                <Alert message={errorMsg} type="error" showIcon />
              )}
              <p className='getwallet__description'>PIN</p>
              <PinField 
                className="field-a"
                validate="0123456789"
                length="4"
                type="password"
                onChange={setPin}
              />
              <p className='getwallet__description'>Confirm PIN</p>
              <PinField 
                className="field-a"
                validate="0123456789"
                length="4"
                type="password"
                onChange={setConfirmPin}
              />
              <div className='getwallet__btn'>
                <Button loading={loading} onClick={handleGetWallet}>Get Wallet</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      {/* Modal Err */}
      <Modal
        title=""
        visible={ModalErr}
        footer={null}
        closable={false}
        centered
        bodyStyle={modalStyle}
        width={880}
      >
        <div className='getwallet__modalClose'>
          <Button type='text' onClick={() => setModalErr(false)}><X /></Button>
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
          <Button type='text' onClick={() => setVisi(false)}><X /></Button>
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
            <p className='getwallet__modalKey'>Wallet key: <span>{value.wallet}</span></p>
            <p className='getwallet__modalKey'>Secret key: <span>{value.seed}</span></p>
          </div>
        </div>
        <div className='getwallet__modalButton'>
          <Button onClick={handleSavePdf}>Save PDF</Button>
        </div>
      </Modal>
    </Dlayout>
  )
}