import React from 'react';
import { Layout, Form, Table, Input, Button, Icon } from 'antd';
import {Link} from 'react-router-dom';
import ContentHeader from './../components/ContentHeader';
import { GetUserPaginationURL, GetUserCountURL } from './../util/const';

const { Content } = Layout;

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    const selCurRowInfo = this.props.location.query ? this.props.location.query : null;
    const isShowurl = selCurRowInfo ? this.isShowUrlByObj(selCurRowInfo) : true;

    this.state = {
      Registerinfo: selCurRowInfo,
      isShowurl: isShowurl,
      filterDropdownVisible: false,
      data: [],
      searchText: '',
      filtered: false,
      pagination: { current: 0 }
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

  Myfetch = (params = {}) => {
    let that = this;
    const { searchText } = this.state;
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
    });

    var formData = new FormData();
    formData.append('userName', searchText);
    formData.append('topN', '10');
    formData.append('pageNum', params.page);

    var formDataUser = new FormData();
    formDataUser.append('userName', searchText);

    const countData = {
      method: 'POST',
      body: formData
    };
    const userData = {
      method: 'POST',
      body: formDataUser
    };
    fetch(GetUserPaginationURL, countData)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (data) {
        let paginationP = that.state.pagination;
        paginationP.total = 200;
        that.setState({
          loading: false,
          data: data,
          pagination:paginationP
        });
      })
      .then(function (data) {
        fetch(GetUserCountURL, userData)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            let paginationC = that.state.pagination ;
            paginationC.total = data;
            that.setState
            that.setState({
              pagination:paginationC
            });
          });
      });
  }
  searchUser = () => {
    this.Myfetch({
      page: 0
    });
   }


  componentDidMount() {
    this.Myfetch({
      page: 0
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.Myfetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }
  render() {
    const breadcrumb = [
      { text: '云+分析', link: '' },
      { text: '用户情况', link: '#/cloudplus/cpuser' }
    ];

    const columns = [{
      title: '姓名',
      dataIndex: 'real_name',
      sorter: true,
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
            placeholder="姓名..."
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.searchUser}
          />
          <Button type="primary" onClick={() => this.searchUser()}>搜索</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible,
        }, () => this.searchInput && this.searchInput.focus());
      },
      width: '20%',
    }, {
      title: '联系方式',
      dataIndex: 'mobile',

      width: '20%',
    }, {
      title: '邮箱',
      dataIndex: 'email',
    }, {
      title: 'inspur_id',
      dataIndex: 'inspur_id',
    }];

    return (
      <Content className="maincontent fromwarper">
        <ContentHeader datasource={breadcrumb} />
        <div className="pagecontent">
          <Table
            columns={columns}
            rowKey={record => record.inspur_id}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />
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
