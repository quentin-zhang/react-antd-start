import React from 'react';
import {Layout} from 'antd';
import {getQueryString} from './../util/util';
import ContentHeader from './../components/ContentHeader';
const {Content} = Layout;

export default class AccountCard extends React.Component {

  render() {
    const user = {
      name: "默认用户",
      key: "0",
      age: 10,
      address: 'langchao'
    };
    const userinfo = this.props.location.query ? this.props.location.query : user;
    const breadcrumb = [
      {text: '账户管理', link: ''},
      {text: '账户查看', link: '#/accountmanage/see'},
      {text: '账户明细', link: '#' + this.props.location.pathname + this.props.location.search},
    ];
    return (
      <Content className="maincontent">
        <ContentHeader datasource={breadcrumb} contenttitle="accountcard组件：" />
        <div className="pagecontent">
          <p>查看用户列表中的key为：{this.props.match.params.userid} 的人员;</p>
          <p>查看用户列表中的search字段为：{this.props.location.search} 的人员;</p>
          <p>url传递参数sort为：{getQueryString(this.props.location.search, 'sort')}</p>
          <p>url传递参数b为：{getQueryString(this.props.location.search, 'b')}</p>
          <p></p>
          <p>查看用户详细信息为：</p>
          <p>用户key:&nbsp;&nbsp;{userinfo.key}</p>
          <p>用户name:&nbsp;&nbsp;{userinfo.name}</p>
          <p>用户age:&nbsp;&nbsp;{userinfo.age}</p>
          <p>用户address:&nbsp;&nbsp;{userinfo.address}</p>
        </div>
      </Content>

    );
  }
}
