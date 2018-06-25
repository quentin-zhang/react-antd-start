import React from 'react';
import {Layout, Table, Icon} from 'antd';
import {Link} from 'react-router-dom';
import ContentHeader from './../components/ContentHeader';
const {Content} = Layout;

export default class RegisterList extends React.Component {
  render() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link
          to={{
            pathname: this.props.match.url + "/" + record.key,
            query: record
          }}>{text}</Link>,
      }, {
        title: '描述信息',
        dataIndex: 'description',
        key: 'description',
      }, {
        title: '授权类型',
        dataIndex: 'grantType',
        key: 'grantType',
      }, {
        title: '应用地址',
        dataIndex: 'callbackUri',
        key: 'callbackUri',
        render: (text, record) => (
          <span>
          {
            text.map((t, index) => {
              return <p key={index}>{t}</p>
            })
          }
        </span>
        ),
      }, {
        title: '申请状态',
        dataIndex: 'state',
        key: 'state',
      }];
    const data = [
      {
        key: '1',
        client_id: '71a11476-16da-4e49-a472-3b1c733a61e8',
        client_secret: '604cdd4a-28df-5b2d-dab3-96095f78983f',
        name: 'HCM 系统',
        description: 'HCM 人力管理，签到及审批',
        generateRefreshToken: true,
        grantType: 'Authorization Code',
        callbackUri: ["https://ecm.inspur.com"],
        state: 'PENDING',
      }, {
        key: '2',
        client_id: '71a11476-16da-4e49-a472-3b1c733a61QW',
        client_secret: '604cdd4a-28df-5b2d-dab3-96095f7898QW',
        name: 'HCM 系统11',
        description: 'HCM 人力管理，签到及审批11',
        generateRefreshToken: false,
        grantType: 'Resource Owner Password Credentials',
        callbackUri: ["https://ecm.inspur.com"],
        state: 'PENDING',
      }, {
        key: '3',
        client_id: '71a11476-16da-4e49-a472-3b1c733a61ee',
        client_secret: '604cdd4a-28df-5b2d-dab3-96095f7898ew',
        name: 'HCM 系统22',
        description: 'HCM 人力管理，签到及审批22',
        generateRefreshToken: true,
        grantType: 'Implicit',
        callbackUri: ["http://10.24.11.2:80"],
        state: 'PENDING',
      }, {
        key: '4',
        client_id: '71a11476-16da-4e49-a472-3b1c733a61ff',
        client_secret: '604cdd4a-28df-5b2d-dab3-96095f7898ui',
        name: 'HCM 系统33',
        description: 'HCM 人力管理，签到及审批33',
        generateRefreshToken: true,
        grantType: 'Client Credentials',
        callbackUri: ["http://10.24.11.2:80"],
        state: 'PENDING',
      }];
    const breadcrumb = [
      {text: '云+分析', link: ''},
      {text: '概览', link: '#/application/register'},
    ];
    return (
      <Content className="maincontent">
        <ContentHeader datasource={breadcrumb} contenttitle="申请中的应用：" />
        <div className="pagecontent">
          <Link to={this.props.match.url + "/add"} className="addappbtn" type="primary"><Icon type="plus"
                                                                                              className="addbtnicon"/>添加应用注册</Link>
          <Table columns={columns} dataSource={data} pagination={true}/>
        </div>

      </Content>
    );
  }
}
