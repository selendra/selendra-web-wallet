import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Loading() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const spin = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }

  return (
    <div style={spin}>
      <Spin indicator={antIcon} />
    </div>
  )
}