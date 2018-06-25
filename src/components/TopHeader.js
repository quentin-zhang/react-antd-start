import React from 'react';
import {Layout, Menu} from 'antd';
const {Header} = Layout;

export default class TopHeader extends React.Component {
  render() {
    return (
      <Header className="header topheader">
        <div className="logo"/>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{lineHeight: '64px', position: 'fixed', width: '100%', zIndex: 3}}
        >
          <Menu.Item key="1">&nbsp;</Menu.Item>
        </Menu>
      </Header>
    );
  }
}
