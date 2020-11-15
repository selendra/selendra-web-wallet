import { Table, Modal } from 'antd';
import React, {useEffect, useState} from 'react';
import '../styles/Receive.css';
import { ReactComponent as Copy } from '../assets/copy.svg';
import QRCode from 'qrcode.react';
import { Spin, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import AxiosInstance from '../helpers/AxiosInstance';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ReactComponent as Warning } from '../assets/warning.svg';


function Receive() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const modalStyle = {
    color: '#fff',
    background: '#181C35',
    borderRadius: '8px',
    textAlign: 'center'
  }

  const columns = [
    {
      title: 'Asset',
      dataIndex: 'name',
      key: 'name',
      render: text => <span>SEL</span>,
    },
    {
      title: 'Amount',
      key: 'tags',
      dataIndex: 'amount',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Date',
      key: 'tags',
      dataIndex: 'created_at',
      render: text => <span>{Timecon(text)}</span>,
    },
    {
      title: 'From',
      dataIndex: 'sender',
      render: text => <span>{sliceStr(text)}</span>,
    },
    {
      title: 'To',
      key: 'tags',
      dataIndex: 'destination',
      render: text => <span>{sliceStr(text)}</span>,
    },
    {
      title: 'Status',
      key: 'tags',
      dataIndex: 'tags',
      render: text => <span>complete</span>,
    },
  ];

  const onCopy = () => {
    /* Get the text field */
    var copyText = document.getElementById("receive__wallet");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    /* Copy the text inside the text field */
    document.execCommand("copy");
    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
  }

  const sliceStr = (str) => {
    if(str !== undefined) {
      const first = str.slice(0, 10);
      const last = str.slice(-2);
      return (`${first}...${last}`);
    }
  }

  const Timecon = (time) => {
    const d = new Date(time);
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }); 
    const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d);
    const h = d.getHours();
    const m = d.getMinutes();
    return (`${h}:${m}, ${mo} ${da} ${ye}`);
  }

  const [visible, setVisi] = useState(false);
  const [payload, setPayload] = useState({
    trx: null,
    user: null,
    portfolio: null,
    loading: true
  })

  useEffect(() => {
    const reqOne = AxiosInstance().get('/trx-history');
    const reqTwo = AxiosInstance().get('/userprofile');
    const reqThree = AxiosInstance().get('/portforlio');

    axios.all([reqOne, reqTwo, reqThree])
    .then(axios.spread((...res) => {
      if(res[2].data.error) {
        setVisi(true);
      } else {
        setPayload({
          trx: res[0].data,
          user: res[1].data,
          portfolio: res[2].data,
          loading: false
        })
      }
    }))
  }, [])

  return (
    <div className='receive'>
      {payload.loading && (<Spin indicator={antIcon} />)}
      {!payload.loading && (
      <div className='receive__container'>
        <div className='receive__upper'>
          <div className='receive__qr'>
            <p>Address</p>
            <div className='receive__copy'>
              <Copy className='receive__btnCopy' onClick={onCopy}/>
              <p>{sliceStr(payload.user.wallet)}</p>
            </div>
            <p>QR Code</p>
            <input type="text" id="receive__wallet" readOnly value={payload.user.wallet}/>
            <div className='receive__qrContainer'>
              <div className='receive__qrPic'>
                <QRCode value={payload.user.wallet}/>
              </div>
              <div className='receive__qrDescription'>
                <p>
                  Scan <span>QR Code</span> to get<br/>
                  <span>SEL</span> Address
                </p>
              </div>
            </div>
          </div>
          <div className='receive__balance'>
            <p>Total Balance</p>
            <div className='receive__total'>
              <div className='receive__totalBalance'>
                <span>SEL: {payload.portfolio.data.balance}</span>
              </div>
              <div className='receive__chart'>

              </div>
            </div>
          </div>
        </div>
        <div className='receive__lower'>
          <p>Transaction</p>
          <Table 
            className='ant-table-content'
            columns={columns} 
            dataSource={payload.trx}
            pagination={false}
            rowKey={record => record}
          />
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

export default Receive
