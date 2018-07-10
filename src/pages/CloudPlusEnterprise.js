import React from 'react';
import { Layout, Form, Table } from 'antd';
import ContentHeader from './../components/ContentHeader';
import { GetEnterpriseDeviceURL } from './../util/const';

const { Content } = Layout;

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    const selCurRowInfo = this.props.location.query ? this.props.location.query : null;
    const isShowurl = selCurRowInfo ? this.isShowUrlByObj(selCurRowInfo) : true;

    this.state = {
      Registerinfo: selCurRowInfo,
      isShowurl: isShowurl,
      chartdata: [],
      EnterpriseCount: 0,
      ECMUsers: 0,
      ActiveUserCount: 0,
      DeviceCount: 0
    };
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  isShowUrlByObj = (obj) => {
    const type = obj.grantType;
    let isSHow;
    switch (type) {
      case 'Authorization Code':
        isSHow = true;
        break;
      case 'Resource Owner Password Credentials':
        isSHow = false;
        break;
      case 'Implicit':
        isSHow = true;
        break;
      case 'Client Credentials':
        isSHow = false;
        break;
      default:
        isSHow = true;
    }
    return isSHow;
  }

  componentDidMount() {
    let that = this;

    fetch(GetEnterpriseDeviceURL)
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function (data) {
      that.setState({ dataSource: data });
    });
  }




  render() {
    const breadcrumb = [
      { text: '云+分析', link: '' },
      { text: '企业情况', link: '#/cloudplus/index' }
    ];
    const columns = [{
      title: '序号',
      dataIndex: 'No',
      key: 'No',
      sorter: function(a, b) {
        return a.No - b.No
      }
    }, {
      title: '企业名称',
      dataIndex: 'EnterpriseName',
      key: 'EnterpriseName',
      sorter: function(a, b) {
        return a.EnterpriseName.localeCompare(b.EnterpriseName)
      },
      filters: [{
        text: '浪潮集团',
        value: '浪潮集团',
      }],
      onFilter: (value, record) => record.EnterpriseName === value,
    }, {
      title: '设备数量',
      dataIndex: 'DeviceCount',
      key: 'DeviceCount',
      sorter: function(a, b) {
        return a.DeviceCount - b.DeviceCount
      }
    },{
      title: '用户数量',
      dataIndex: 'UserCount',
      key: 'UserCount',
      sorter: function(a, b) {
        return a.UserCount - b.UserCount
      }
    },{
      title: '活跃用户数',
      dataIndex: 'ActiveUserCount',
      key: 'ActiveUserCount',
      sorter: function(a, b) {
        return a.ActiveUserCount - b.ActiveUserCount
      }
    },{
      title: 'iOS',
      dataIndex: 'iOSCount',
      key: 'iOSCount',
      sorter: function(a, b) {
        return a.iOSCount - b.iOSCount
      }
    },{
      title: 'Android',
      dataIndex: 'AndroidCount',
      key: 'AndroidCount',
      sorter: function(a, b) {
        return a.AndroidCount - b.AndroidCount
      }
    }];

    return (
      <Content className="maincontent fromwarper">
        <ContentHeader datasource={breadcrumb} />
        <div className="pagecontent">
          <Table dataSource={this.state.dataSource} columns={columns} />
        </div>
      </Content>
    );
  }
}

const
  RegisterCard = Form.create()(RegistrationForm);

export
  default
  RegisterCard;
