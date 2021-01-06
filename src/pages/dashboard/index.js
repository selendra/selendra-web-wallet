import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import { Dlayout, Loading, MTableTrx, TableTrx } from '../../components';
import { Doughnut } from 'react-chartjs-2';
import { ReactComponent as Plus } from '../../assets/plus.svg'
import axios from 'axios';
import AxiosInstance from '../../helpers/AxiosInstance';
import selendra from '../../assets/selendra.png';
import './styles/dashboard.css';

export default function Dashboard() {
  const card = {
    background: '#181C35',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    width: '100%',
    height: '100%'
  }
  
  const [datacollection, setdatacollection] = useState({});
  const [visible, setVisible] = useState(false);
  const [payload, setPayload] = useState({
    portfolio: null,
    trx: null,
    loading: true
  });

  useEffect(() => {
    const reqOne = AxiosInstance().get('/trx-history');
    const reqTwo = AxiosInstance().get('/portforlio');

    axios.all([reqOne, reqTwo])
    .then(axios.spread((...res) => {
      const portfolio = res[1].data;
      if(portfolio.error) {
        setVisible(true);
      } else {
        setPayload({
          loading: false,
          trx: res[0].data,
          portfolio: res[1].data,
        }); 
        let balance = res[1].data.token;
        setdatacollection({
          labels: ['SEL'],
          options: {
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                width: 100
              }
            }
          },
          datasets: [
            {
              label: 'Portfolio',
              data: [balance],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        })
      }
    }))
  }, [])

  return (
    <Dlayout>
      {payload.loading && (<Loading />)}
      {!payload.loading && (
      <div>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Card style={card} className='dashboard__totalBalance'>
              <p>Total Balance</p>
              <Row>
                <Col span={14}>
                  <Doughnut data={datacollection} width={260}/>
                </Col>
                <Col span={10}>
                  <Row justify='center'>
                    <p>SEL: {payload.portfolio.token}</p>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} className='dashboard__asset'>
            <Row justify='space-around' style={{height: '100%'}}>
              <Col>
                <Card style={card} className='dashboard__onceAsset'>
                  <Row align='middle'>
                    <Col xs={12} sm={12} md={12} lg={24} xl={24}>
                      <img src={selendra} alt='selendra' />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={24} xl={24}>
                      <p>{payload.portfolio.token}</p>
                      <span>SEL</span>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col offset={2} className='dashboard__addAssetContainer'>
                <Card style={card}>
                  <Row className='dashboard__addAsset' justify='center' align='middle' style={{height: '100%'}}>
                    <Plus />
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='dashboard__trx'>
          <div>
            <p>Transaction</p>
            <Row>
              <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                <TableTrx trx={payload.trx} />
              </Col>
              <Col xs={24} sm={24} md={24} lg={0} xl={0}>
                <MTableTrx trx={payload.trx} />
              </Col>
            </Row>
          </div>
        </Row>
      </div>
      )}
    </Dlayout>
  )
}