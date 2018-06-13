import React from 'react';
import {Layout} from 'antd';
import ContentHeader from './../components/ContentHeader';
const {Content} = Layout;

export default class CreateAccount extends React.Component {

  render() {
    const breadcrumb = [
      {text: '账户管理', link: ''},
      {text: '创建账户', link: '#/accountmanage/create'},
    ];
    return (
      <Content className="maincontent">
        <ContentHeader datasource={breadcrumb} contenttitle="创建账户：" />
        <div className="pagecontent">
          这是创建账户创建账户创建账户内容区
        </div>
      </Content>
    )
      ;
  }
}
