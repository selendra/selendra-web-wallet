// Modules
import React, { useState } from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
// Components
import { Layout, Menu } from 'antd';
import { ReactComponent as Burger } from '../assets/menu.svg';
import { ReactComponent as Wallet } from '../assets/wallet.svg';
import { ReactComponent as Transaction } from '../assets/transaction.svg';
import { ReactComponent as Send } from '../assets/arrowup.svg';
import { ReactComponent as Receive } from '../assets/arrowdown.svg';
import { ReactComponent as Setting } from '../assets/cog.svg';
import { ReactComponent as Exit } from '../assets/exit.svg';
import Icon from '@ant-design/icons';
import logo from '../assets/Selendra.png';
// Styles
import '../styles/LayerLayout.css';


function LayerLayout(props) {
  const { Header, Content, Sider } = Layout;
  const history = useHistory();

  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  }

  const handleLogout = () => {
    Cookies.remove('token');
    history.push('/login');
  }

  const location = useLocation();
  const WalletIcon = props => <Icon component={Wallet} {...props} />;
  const TransactionIcon = props => <Icon component={Transaction} {...props} />;
  const SendIcon = props => <Icon component={Send} {...props} />;
  const ReceiveIcon = props => <Icon component={Receive} {...props} />;
  const SettingIcon = props => <Icon component={Setting} {...props} />;
  const ExitIcon = props => <Icon component={Exit} {...props} />

  // const username = state.user.first_name + state.user.mid_name + state.user.last_name;

  return (
    <div className='layout'>
      <Layout className='ant-layout'>
        <Sider width='290px' collapsed={collapsed} className='ant-layout-sider layout__sider'>
          <div className='layout__header'>
            <img src={logo} alt='logo' className='layout__logo'/>
            {!collapsed && (
              <span>SELENDRA</span>
            )}
          </div>
          <Menu mode='inline' className='ant-menu' defaultSelectedKeys={[location.pathname]}>
            <Menu.Item key='/' className='layout__menuItem' icon={<WalletIcon/>}>
              <Link to='/'>
                <span>Wallet</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='/transaction' className='layout__menuItem' icon={<TransactionIcon/>}>
              <Link to='/transaction'>
                <span>Transaction</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='/send' className='layout__menuItem' icon={<SendIcon/>}>
              <Link to='/send'>
                <span>Send</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='/receive' className='layout__menuItem' icon={<ReceiveIcon/>}>
              <Link to='/receive'>
                <span>Receive</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='/setting' className='layout__menuItem' icon={<SettingIcon/>}>
              <Link to='/setting'>
                <span>Setting</span>
              </Link>
            </Menu.Item>
            <Menu.Item className='layout__menuItem' onClick={handleLogout} icon={<ExitIcon/>}>
              <span>Log Out</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background layout__burgerHeader" style={{ padding: 0 }}>
            <Burger onClick={toggle} className='layout__burger'/>
              {/* { !state.loading && ( */}
                <>
                  {/* <span className='layout__profile'>{state.user.first_name + state.user.mid_name + state.user.last_name}</span> */}
                  {/* <Button type='text' onClick={handleLogout}><Exit /></Button> */}
                </>
              {/* )} */}
          </Header>
          <Content
            className="site-layout-background"
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default LayerLayout;
