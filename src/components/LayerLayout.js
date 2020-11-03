import { Layout, Menu, Button } from 'antd';
import React, {
  useState
} from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ReactComponent as Burger } from '../assets/menu.svg';
import { ReactComponent as Wallet } from '../assets/wallet.svg';
import { ReactComponent as Transaction } from '../assets/transaction.svg';
import { ReactComponent as Send } from '../assets/arrowup.svg';
import { ReactComponent as Receive } from '../assets/arrowdown.svg';
import { ReactComponent as Setting } from '../assets/cog.svg';



import '../styles/LayerLayout.css';
import logo from '../assets/Selendra.png';

function LayerLayout(props) {
  const { Header, Content, Footer, Sider } = Layout;

  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  }

  const location = useLocation();
  return (
    <div>
      <Layout className='ant-layout'>
        <Sider width='290' collapsed={collapsed} className='ant-layout-sider'>
          <div className='layout__header'>
            <img src={logo} alt='logo' className='layout__logo'/>
            {!collapsed && (
              <span>SELENDRA</span>
            )}
          </div>
          <Menu mode='inline' className='ant-menu' defaultSelectedKeys={[location.pathname]}>
            <Menu.Item key='/' className='ant-menu-item' icon={<Wallet className='iconZ'/>} style={collapsed && {paddingLeft: '0 20px'}}>
              <Link to='/'>
                <span>Wallet</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='/transaction' className='ant-menu-item' icon={<Transaction className='iconZ'/>} style={collapsed && {paddingLeft: '0 20px'}}>
              <Link to='/transaction'>
                <span>Transaction</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='/send' className='ant-menu-item' icon={<Send className='iconZ'/>} style={collapsed && {paddingLeft: '0 20px'}}>
              <Link to='/send'>
                <span>Send</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='/receive' className='ant-menu-item' icon={<Receive className='iconZ'/>} style={collapsed && {paddingLeft: '0 20px'}}>
              <Link to='/receive'>
                <span>Receive</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='/setting' className='ant-menu-item' icon={<Setting className='iconZ'/>} style={collapsed && {paddingLeft: '0 20px'}}>
              <Link to='/setting'>
                <span>Setting</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Burger onClick={toggle} className='layout__burger'/>
            <span className='layout__profile'>Piset Heang</span>
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
