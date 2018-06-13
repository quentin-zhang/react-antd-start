import React from 'react';
import {Layout, Table} from 'antd';
import {Link} from 'react-router-dom';
import ContentHeader from './../components/ContentHeader';
const {Content} = Layout;

export default class AccountList extends React.Component {
  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link
          to={{
            pathname: this.props.match.url + "/" + record.key,
            search: '?sort=name&b=123',
            query: record
          }}>{text}</Link>,
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      }];

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      }];
    const breadcrumb = [
      {text: '账户管理', link: ''},
      {text: '账户查看', link: '#/accountmanage/see'},
    ];
    return (
      <Content className="maincontent">
        <ContentHeader datasource={breadcrumb} contenttitle="accountlist组件：" />
        <div className="pagecontent">
          <Table columns={columns} dataSource={data}/>
        </div>
      </Content>
    );
  }
}
