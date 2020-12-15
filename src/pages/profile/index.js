import React,{ useState, useEffect } from 'react';
import { ChangePassword, ChangePin, Dlayout, Loading } from '../../components';
import { Row, Col, Card, Button } from 'antd';
import AxiosInstance from '../../helpers/AxiosInstance';
import './styles/profile.css';

export default function Profile() {
  const card = {
    background: '#181C35',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    width: '100%',
    height: '100%'
  }
  const sliceStr = (str) => {
    if(str !== undefined) {
      const first = str.slice(0, 1);
      return (`${first}`);
    }
  }

  const [loadingScreen, setLoadingScreen] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    AxiosInstance().get('/userprofile')
    .then((res) => {
      setUser(res.data);
      setLoadingScreen(false);
    })
  }, [])

  const [profileSection, setProfileSection] = useState(true);
  const [isChangePass, setIsChangePass] = useState(false);
  const [isChangePin, setIsChangePin] = useState(false);

  const OpenChangePass = () => {
    if(isChangePin === true) {
      setIsChangePin(false);
    }
    setProfileSection(false);
    setIsChangePass(true);
  }

  const OpenChangePin = () => {
    if(isChangePass === true) {
      setIsChangePass(false);
    }
    setProfileSection(false);
    setIsChangePin(true);
  }

  return (
    <Dlayout>
      {loadingScreen && (<Loading />)}
      {!loadingScreen && (
      <div>
        <Row>
          <Col xs={24} sm={24} md={24} lg={6} xl={6}>
            <Row>
              <Card style={card}>
                <Row justify='center'>
                  <div className='profile__circle'>
                    <div className='profile__circleName'>
                      { user.first_name && user.last_name && (
                        <span>{sliceStr(user.first_name) + sliceStr(user.last_name)}</span>
                      )}
                    </div>
                  </div>
                </Row>
              </Card>
            </Row>
            <br/>
            <Row>
              <Card style={card}>
                <Row className='profile__btnOption'>
                  <Button block onClick={OpenChangePass}>Change Password</Button>
                  <Button block onClick={OpenChangePin}>Change PIN</Button>
                </Row>
              </Card>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={{span: 17, offset83: 1}} xl={{span: 17, offset: 1}}>
            <Card style={card}>
              <div>
                { profileSection && (
                  <div className='profile__info'>
                    <p>User Information</p>
                    { user.email && (
                      <p>Email: <span>{user.email}</span></p>
                    )}
                    { user.gender && (
                      <p>Gender: <span>{user.gender}</span></p>
                    )}
                    { user.wallet && (
                      <p>Wallet: <span className='setting__walletAddress'>{user.wallet}</span></p>
                    )}
                  </div>
                )}
                { isChangePass && (
                  <ChangePassword />
                )}
                { isChangePin && (
                  <ChangePin />
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      )}
    </Dlayout>
  )
}