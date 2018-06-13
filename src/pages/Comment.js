import React from 'react';
import {Layout} from 'antd';
import ContentHeader from './../components/ContentHeader';
const {Content} = Layout;

export default class Comment extends React.Component {

  render() {
    const breadcrumb = [
      {text: '系统设置', link: ''},
      {text: '评论设置', link: '#/setting/comment'},
    ];
    return (
      <Content className="maincontent">
        <ContentHeader datasource={breadcrumb} contenttitle="comment组件："/>
        <div className="pagecontent">
          这是comment组件内容
        </div>
      </Content>

    );
  }
}
