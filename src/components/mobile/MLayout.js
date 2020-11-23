import React from 'react';
import '../../styles/mobile/MLayout.css';
import { ReactComponent as Down } from '../../assets/arrowdown.svg';
import { ReactComponent as Up } from '../../assets/arrowup.svg';
import { ReactComponent as Transaction } from '../../assets/transaction.svg';
import { Link } from 'react-router-dom';
import { ReactComponent as User } from '../../assets/user.svg';

function MLayout(props) {
  return (
    <div className='mlayout'>
      <div className='mlayout__header'>
        <div className='mlayout__headerContainer'>
          <Link to='/setting'>
            <User />
          </Link>
        </div>
      </div>
      <div className='mlayout__container'>
        <div className='mlayout__children'>{props.children}</div>
        <div className='mlayout__footer'>
          <div className='mlayout__footerContainer'>
            <div className='mlayout__item'>
              <Link to='/receive'>
                <Down className='mlayout__icon'/>
                <span>Receive</span>
              </Link>
            </div>
            <div className='mlayout__item'>
              <Link to='/send'>
                <Up className='mlayout__icon'/>
                <span>Send</span>
              </Link>
            </div>
            <div className='mlayout__item'>
              <Link to='/transaction'>
                <Transaction className='mlayout__icon'/>
                <span>Transaction</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MLayout;
