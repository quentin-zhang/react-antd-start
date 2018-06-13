import React from 'react';
import {Layout} from 'antd';
import ContentHeader from './../components/ContentHeader';
const {Content} = Layout;

export default class Base extends React.Component {

  render() {
    const breadcrumb = [
      {text: '系统设置', link: ''},
      {text: '基本设置', link: '#/setting/base/111'},
    ];
    return (
      <Content className="maincontent">
        <ContentHeader datasource={breadcrumb} contenttitle="base组件：" />
        <div className="pagecontent">
          router传递过来的参数为：{this.props.match.params.id};
          router传递过来的对象为：{JSON.stringify(this.props.location.query)};
        </div>
      </Content>
    );
  }
}
