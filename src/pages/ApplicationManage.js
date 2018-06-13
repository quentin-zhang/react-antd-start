import React from 'react';
import {Layout, Table} from 'antd';
import ContentHeader from './../components/ContentHeader';
const {Content} = Layout;

export default class ApplicationManage extends React.Component {

  render() {
    const breadcrumb = [
      {text: '应用接入', link: ''},
      {text: '应用管理', link: '#/application/manage'},
    ];
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <span>{text}</span>,
      }, {
        title: '描述信息',
        dataIndex: 'description',
        key: 'description',
      }, {
        title: '准许类型',
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
        description: 'HCM 审批',
        generateRefreshToken: true,
        grantType: 'Authorization Code',
        callbackUri: ["https://ecm.inspur.com"],
        state: 'ACTIVED',
      }, {
        key: '2',
        client_id: '71a11476-16da-4e49-a472-3b1c733a61QW',
        client_secret: '604cdd4a-28df-5b2d-dab3-96095f7898QW',
        name: 'HCM 系统11',
        description: 'HCM 人力管理',
        generateRefreshToken: false,
        grantType: 'Resource Owner Password Credentials',
        callbackUri: ["https://ecm.inspur.com"],
        state: 'SUSPEND',
      }, {
        key: '3',
        client_id: '71a11476-16da-4e49-a472-3b1c733a61ee',
        client_secret: '604cdd4a-28df-5b2d-dab3-96095f7898ew',
        name: 'HCM 系统22',
        description: 'HCM 人力管理，签到',
        generateRefreshToken: true,
        grantType: 'Implicit',
        callbackUri: ["http://10.24.11.2:80"],
        state: 'ACTIVED',
      }, {
        key: '4',
        client_id: '71a11476-16da-4e49-a472-3b1c733a61ff',
        client_secret: '604cdd4a-28df-5b2d-dab3-96095f7898ui',
        name: 'HCM 系统33',
        description: '签到及审批',
        generateRefreshToken: true,
        grantType: 'Client Credentials',
        callbackUri: ["http://10.24.11.2:80"],
        state: 'SUSPEND',
      }];
    return (
      <Content className="maincontent">
        <ContentHeader datasource={breadcrumb} contenttitle="申请应用结果查看：" />
        <div className="pagecontent">
          <Table columns={columns} dataSource={data} pagination={true}/>
        </div>
      </Content>
    );
  }
}
