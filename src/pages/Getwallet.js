import React, { useState } from 'react';
import '../styles/Getwallet.css';
import PinField from "react-pin-field";
import '../styles/pin-field.scss';
import { Button, message, Modal } from 'antd';
import { ReactComponent as Thick } from '../assets/thick.svg';
import { ReactComponent as X } from '../assets/x.svg';
import { ReactComponent as Information } from '../assets/information.svg';
import AxiosInstance from '../helpers/AxiosInstance';
import { useHistory, Link } from 'react-router-dom';

function Getwallet() {
  const [visible, setVisi] = useState(false);
  const [ModalErr, setModalErr] = useState(false);
  const [value, setValue] = useState([]);
  const [pin, setPin] = useState('');
  const [pinCon, setPinCon] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleGetwallet = () => {
    if(pin === '' || pin === '') {
      message.error('PIN is required!')
    } else if(pin !== pinCon) {
      message.error('PIN not match!')
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
        message.error('something wrong at our end!');
      })
    }
  }

  const handleSavePdf = () => {
    const jsPDF = require("jspdf");
    const doc = new jsPDF({
      orientation: "landscape"
    });
    doc.setFontSize(14);
    doc.text("Wallet: " + value.wallet, 10, 10);
    doc.text("Private Key: " + value.seed, 10, 20);
    doc.save("Keys.pdf");
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
            onChange={setPin}
          />
          <span className='getwallet__txt'>Confirm PIN</span>
          <PinField 
            className="field-a"
            validate="0123456789"
            length="4"
            type="password"
            onChange={setPinCon}
          />
          <div className='getwallet__button'>
            <Button onClick={handleGetwallet} loading={loading}>Get Wallet</Button>
          </div>
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
            <Link to='/verifyphone'>
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
      </div>
    </div>
  )
}

export default Getwallet;
