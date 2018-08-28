import React from 'react';
import { Layout, Form, Table,Input, Button, Icon  } from 'antd';
import {Link} from 'react-router-dom';
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
      DeviceCount: 0,
      searchText:"",
      dataSource:[],
      searchedDataSource:[]
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

  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
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
      that.setState({ searchedDataSource: data });
    });
  }

  searchEP = () => {
    let searchtxt = this.state.searchText;
    const reg = new RegExp(searchtxt, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchtxt,
      searchedDataSource: this.state.dataSource.map((record) => {
        const match = record.EnterpriseName.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record
        };
      }).filter(record => !!record),
    });
  }


  render() {
    const breadcrumb = [
      { text: '云+分析', link: '' },
      { text: '企业情况', link: '#/cloudplus/index/enterprise' }
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
      render: (text, record) => <Link
      to={{
        pathname: this.props.match.url + "/" + record.inspur_id,
        search: '?sort=name&b=123',
        query: record
      }}>{text}</Link>,
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="企业名称..."
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.searchEP}
          />
          <Button type="primary" onClick={() => this.searchEP()}>搜索</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible,
        }, () => this.searchInput && this.searchInput.focus());
      },
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
          <Table dataSource={this.state.searchedDataSource} columns={columns} />
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
