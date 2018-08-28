import React from 'react';
import { Layout, Form, Input, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
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
  // state = {
  //   data: [],
  //   pagination: { current: 0 },
  //   loading: false,
  // };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }

  fetch = (params = {}) => {
    let that = this;
    const { searchText } = this.state;
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      // data: resultdata.enterprises.map((record) => {
      //   const match = record.name.match(reg);
      //   if (!match) {
      //     return null;
      //   }
      //   return {
      //     ...record,
      //     name: (
      //       <span>
      //         {record.name.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((text, i) => (
      //           text.toLowerCase() === searchText.toLowerCase() ?
      //             <span key={i} className="highlight">{text}</span> : text // eslint-disable-line
      //         ))}
      //       </span>
      //     ),
      //   };
      // }).filter(record => !!record),
    });
    console.log('params:', params);

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
        const pagination = { ...that.state.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 200;
        that.setState({
          loading: false,
          data: data,
          pagination,
        });
      })
      .then(function (data) {
        fetch(GetUserCountURL, userData)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            const pagination = { ...that.state.pagination };
            // // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = data;
            that.setState({
              pagination
            });
          });
      });
  }
  searchUser = (searchTextt) => {
    this.fetch({
      page: 0
    });
  }


  componentDidMount() {
    // let that = this;
    this.fetch({
      page: 0
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
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
      { text: '用户情况', link: '#/cloudplus/index' }
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
      // render: name => `${name.first} ${name.last}`,
      // filters: [
      //   { text: '仪思奇', value: '仪思奇' },
      // ],
      // onFilter: (value, record) => record.real_name === value,
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.searchUser}
          />
          <Button type="primary" onClick={() => this.searchUser(this.state.searchText)}>Search</Button>
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
            <div className="col-md-3 col-sm-3 col-xs-12 profile_left">
              <div className="profile_img">
                <div id="crop-avatar">
                  <img className="img-responsive avatar-view" src={require('../imgs/img.jpg')} alt="用户" title="用户" />
                </div>
              </div>
              <h3>用户</h3>

              <ul className="list-unstyled user_data">
                <li><i className="fa fa-map-marker user-profile-icon"></i> 中国, 山东, 济南
                        </li>

                <li>
                  <i className="fa fa-briefcase user-profile-icon"></i> 经理
                        </li>

                <li className="m-top-xs">
                  <i className="fa fa-external-link user-profile-icon"></i>
                  <a href="http://www.kimlabs.com/profile/" target="_blank">user@inspur.com</a>
                </li>
              </ul>

              <h4>用户活跃度</h4>
              <ul className="list-unstyled user_data">
                <li>
                  <p>历史访问总量</p>
                  <div className="progress progress_sm">
                    <div className="progress-bar bg-green" role="progressbar" data-transitiongoal="50"></div>
                  </div>
                </li>
                <li>
                  <p>最近一个月访问总量</p>
                  <div className="progress progress_sm">
                    <div className="progress-bar bg-green" role="progressbar" data-transitiongoal="70"></div>
                  </div>
                </li>
                <li>
                  <p>平均每天访问频率</p>
                  <div className="progress progress_sm">
                    <div className="progress-bar bg-green" role="progressbar" data-transitiongoal="30"></div>
                  </div>
                </li>
              </ul>

            </div>
            <div className="col-md-9 col-sm-9 col-xs-12">

              <div className="profile_title">
                <div className="col-md-6">
                  <h2>用户PV折线图</h2>
                </div>
                <div className="col-md-6">
                  <div id="reportrange" className="pull-right" style={{ margintop: '5px', background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #E6E9ED' }}>
                    <i className="glyphicon glyphicon-calendar fa fa-calendar"></i>
                    <span>December 30, 2014 - January 28, 2015</span> <b className="caret"></b>
                  </div>
                </div>
              </div>
              <div id="graph_bar" style={{ width: '100%', height: '280px' }}></div>

              <div className="" role="tabpanel" data-example-id="togglable-tabs">
                <ul id="myTab" className="nav nav-tabs bar_tabs" role="tablist">
                  <li role="presentation" className="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">最近一天访问云+功能</a>
                  </li>
                  <li role="presentation" className=""><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">常用云+功能列表</a>
                  </li>
                  <li role="presentation" className=""><a href="#tab_content3" role="tab" id="profile-tab2" data-toggle="tab" aria-expanded="false">访问高峰时段</a>
                  </li>
                </ul>
                <div id="myTabContent" className="tab-content">
                  <div role="tabpanel" className="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">

                    <ul className="messages">
                      <li>
                        <img src={"images/img.jpg"} className="avatar" alt="Avatar" />
                        <div className="message_date">
                          <h3 className="date text-info">24</h3>
                          <p className="month">May</p>
                        </div>
                        <div className="message_wrapper">
                          <h4 className="heading">Desmond Davison</h4>
                          <blockquote className="message">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher synth.</blockquote>
                          <br />
                          <p className="url">
                            <span className="fs1 text-info" aria-hidden="true" data-icon=""></span>
                            <a href="#"><i className="fa fa-paperclip"></i> User Acceptance Test.doc </a>
                          </p>
                        </div>
                      </li>
                      <li>
                        <img src="images/img.jpg" className="avatar" alt="Avatar" />
                        <div className="message_date">
                          <h3 className="date text-error">21</h3>
                          <p className="month">May</p>
                        </div>
                        <div className="message_wrapper">
                          <h4 className="heading">Brian Michaels</h4>
                          <blockquote className="message">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher synth.</blockquote>
                          <br />
                          <p className="url">
                            <span className="fs1" aria-hidden="true" data-icon=""></span>
                            <a href="#" data-original-title="">Download</a>
                          </p>
                        </div>
                      </li>
                      <li>
                        <img src="images/img.jpg" className="avatar" alt="Avatar" />
                        <div className="message_date">
                          <h3 className="date text-info">24</h3>
                          <p className="month">May</p>
                        </div>
                        <div className="message_wrapper">
                          <h4 className="heading">Desmond Davison</h4>
                          <blockquote className="message">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher synth.</blockquote>
                          <br />
                          <p className="url">
                            <span className="fs1 text-info" aria-hidden="true" data-icon=""></span>
                            <a href="#"><i className="fa fa-paperclip"></i> User Acceptance Test.doc </a>
                          </p>
                        </div>
                      </li>
                      <li>
                        <img src="images/img.jpg" className="avatar" alt="Avatar" />
                        <div className="message_date">
                          <h3 className="date text-error">21</h3>
                          <p className="month">May</p>
                        </div>
                        <div className="message_wrapper">
                          <h4 className="heading">Brian Michaels</h4>
                          <blockquote className="message">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher synth.</blockquote>
                          <br />
                          <p className="url">
                            <span className="fs1" aria-hidden="true" data-icon=""></span>
                            <a href="#" data-original-title="">Download</a>
                          </p>
                        </div>
                      </li>

                    </ul>
                  </div>
                  <div role="tabpanel" className="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab">

                    <table className="data table table-striped no-margin">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Project Name</th>
                          <th>Client Company</th>
                          <th className="hidden-phone">Hours Spent</th>
                          <th>Contribution</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>New Company Takeover Review</td>
                          <td>Deveint Inc</td>
                          <td className="hidden-phone">18</td>
                          <td className="vertical-align-mid">
                            <div className="progress">
                              <div className="progress-bar progress-bar-success" data-transitiongoal="35"></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>New Partner Contracts Consultanci</td>
                          <td>Deveint Inc</td>
                          <td className="hidden-phone">13</td>
                          <td className="vertical-align-mid">
                            <div className="progress">
                              <div className="progress-bar progress-bar-danger" data-transitiongoal="15"></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Partners and Inverstors report</td>
                          <td>Deveint Inc</td>
                          <td className="hidden-phone">30</td>
                          <td className="vertical-align-mid">
                            <div className="progress">
                              <div className="progress-bar progress-bar-success" data-transitiongoal="45"></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>New Company Takeover Review</td>
                          <td>Deveint Inc</td>
                          <td className="hidden-phone">28</td>
                          <td className="vertical-align-mid">
                            <div className="progress">
                              <div className="progress-bar progress-bar-success" data-transitiongoal="75"></div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                  <div role="tabpanel" className="tab-pane fade" id="tab_content3" aria-labelledby="profile-tab">
                    <p>xxFood truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui
                              photo booth letterpress, commodo enim craft beer mlkshk </p>
                  </div>
                </div>
              </div>
            </div>
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
