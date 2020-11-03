import React from 'react';
import '../styles/Loading.css';

function Loading() {
  return (
    <div className='loading'>
      <div className='loading__ring'>
        <div className="loadingio-spinner-blocks-bfgut7eqxcv">
          <div className="ldio-hzph9zkj0bm">
            <div style={{left: '38px', top: '38px', animationDelay: '0s'}}></div>
            <div style={{left: '80px', top: '38px', animationDelay: '0.125s'}}></div>
            <div style={{left: '122px', top: '38px', animationDelay: '0.25s'}}></div>
            <div style={{left: '38px', top: '80px', animationDelay: '0.875s'}}></div>
            <div style={{left: '122px', top: '80px', animationDelay: '0.375s'}}></div>
            <div style={{left: '38px', top: '122px', animationDelay: '0.75s'}}></div>
            <div style={{left: '80px', top: '122px', animationDelay: '0.625s'}}></div>
            <div style={{left: '122px', top: '122px', animationDelay: '0.5s'}}></div>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default Loading;
