import React from 'react';
import { Layout, Menu, Dropdown, Button, Icon, Row, Col } from 'antd'
const { Header } = Layout;

export default class TopHeader extends React.Component {

  render() {
    const userinfo = JSON.parse(sessionStorage.getItem('userinfo')) || {}
    const roles = []
    userinfo && userinfo.roles && userinfo.roles.map((item) => {
      roles.push(item.roleName)
    })
    const userCenter = (
      <Menu className="nav-dropmenu">
        <Menu.Item key="1">
          <Icon type="caret-up" />
          <span className="label">角色： </span><span className="value" title={roles.join(',')}>{roles.join(',') || '管理员'}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
          <span className="label">企业名称： </span><span className="value">{userinfo.policeCode || '浪潮集团'}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <span className="label">用户编号： </span><span className="value">{userinfo.duty || '000001'}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="4">
          <Row>
          <Col span={6}/>
            <Col span={12}>
              <Button type="primary" size="small" onClick={this.handleLogout}>退出登录</Button>
            </Col>
            <Col span={6}/>
          </Row>
        </Menu.Item>
      </Menu>
    )
    return (
      <Header className="header topheader">
        <div className="navbar nav_title">
          <a href="index.html" className="site_title">
            <i className="fa fa-paw"></i>
            <span>用户行为分析</span>
          </a>
        </div>
        <Row className="row">
           <Col span={23}>
          </Col>
          <Col span={1} className="col">
            <ul>
              <li>
                <Dropdown overlay={userCenter}>
                  <a className="ant-dropdown-link"><Icon type="user" style={{ fontSize: '20px', color: '#fff' }} />{userinfo.chineseName || userinfo.username}</a>
                </Dropdown>
              </li>
            </ul>
          </Col>
        </Row>
      </Header>
    );
  }
}
