import React from 'react';
import {Layout, Icon} from 'antd';

const {Header} = Layout;

export default class PageHeader extends React.Component {

  hanlderToggle = () => {
    this.props.hanlderToggle();
  }

  render() {
    return (
      <Header style={{height: '50px'}} className="triggerbtn">
        <Icon
          className="trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.hanlderToggle}
        />
      </Header>
    );
  }
}
