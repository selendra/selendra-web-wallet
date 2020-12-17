import React from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Cookie from 'js-cookie';
import Icon from '@ant-design/icons';
import logo from '../../assets/selendra.png'

import { ReactComponent as Wallet } from '../../assets/wallet.svg';
import { ReactComponent as Transaction } from '../../assets/transaction.svg';
import { ReactComponent as Send } from '../../assets/arrowup.svg';
import { ReactComponent as Receive } from '../../assets/arrowdown.svg';
import { ReactComponent as Setting } from '../../assets/cog.svg';
import { ReactComponent as Exit } from '../../assets/exit.svg';
import './styles/layout.css';

export default function Dlayout({children}) {
  const { Content, Sider } = Layout;
  const history = useHistory();
  const location = useLocation();

  const WalletIcon = props => <Icon component={Wallet} {...props} />;
  const TransactionIcon = props => <Icon component={Transaction} {...props} />;
  const SendIcon = props => <Icon component={Send} {...props} />;
  const ReceiveIcon = props => <Icon component={Receive} {...props} />;
  const SettingIcon = props => <Icon component={Setting} {...props} />;
  const ExitIcon = props => <Icon component={Exit} {...props} />;
  
  const layout = {
    height: '100vh',
    background: '#090D28'
  }
  const my__menu = {
    color: '#fff',
    background: '#181C35',
    height: '100%',
    border: 'none'
  }
  const content = {
    padding: '80px 60px',
    color: '#fff'
  }
  
  const handleLogOut = () => {
    Cookie.remove('token');
    history.push('/login');
  }

  return (
    <div className='layout'>
      <Layout style={layout}>
        <Sider breakpoint="lg" collapsedWidth="0" style={layout}>
          <Menu mode='inline' defaultSelectedKeys={[location.pathname]} style={my__menu}>
            <div className='layout__header'>
              <img src={logo} alt='logo' />
              <span>SELENDRA</span>
            </div>
            <div style={{padding: '10px 0'}}></div>
            <Menu.Item key='/' icon={<WalletIcon/>}>
              <Link to='/'>
                <span>Wallet</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='/transaction' icon={<TransactionIcon/>}>
              <Link to='/transaction'>
                <span>Transaction</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='send' icon={<SendIcon/>}>
              <Link to='send'>
                <span>Send</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='receive' icon={<ReceiveIcon/>}>
              <Link to='receive'>
                <span>Receive</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='/profile' icon={<SettingIcon/>}>
              <Link to='/profile'>
                <span>Setting</span>
              </Link>
            </Menu.Item>
            <Menu.Item icon={<ExitIcon/>} onClick={handleLogOut}>
              <span>Log Out</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={layout}>
          <Content style={content}>{children}</Content>
        </Layout>
      </Layout>
    </div>
  )
}