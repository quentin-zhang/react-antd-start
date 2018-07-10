import React from 'react';
import { Layout, Form, Row, Col } from 'antd';
import ContentHeader from './../components/ContentHeader';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend } from "bizcharts";
import { View } from '@antv/data-set';
import { GetPVChangeURL, GetEnterpriseInfoURL, GetDeviceRatioURL, GetFunctionTopURL } from './../util/const';
import moment from 'moment';

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
    //注册企业数、注册用户数、活跃用户数、移动设备数

    fetch(GetEnterpriseInfoURL)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (data) {
        that.setState({ EnterpriseCount: data.EnterpriseCount });
        that.setState({ ECMUsers: data.ECMUsers });
        that.setState({ ActiveUserCount: data.ActiveUserCount });
        that.setState({ DeviceCount: data.DeviceCount });
      });
    //PV趋势图
    var formData = new FormData();
    let startTime = moment().subtract(31, 'days').format('YYYY-MM-DD');
    let endTime = moment().format('YYYY-MM-DD');
    formData.append('startTime', startTime);
    formData.append('endTime', endTime);
    formData.append('timeType', 'dayFormat');
    formData.append('projectName', 'INSPURECM');

    const countData = {
      method: 'POST',
      body: formData
    };
    fetch(GetPVChangeURL, countData)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (data) {
        for (var obj of data) {
          obj.ViewCount = Number.parseInt(obj.ViewCount, 10);
        }
        that.setState({ chartdata: data });
      });

    //移动设备对比
    let vdata = [
      { item: 'iOS设备', count: 0 },
      { item: '安卓设备', count: 0 }
    ];
    let dv = new View();
    dv.source(vdata).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent'
    });
    const cols2 = {
      percent: {
        formatter: val => {
          val = (val * 100) + '%';
          return val;
        }
      }
    };
    fetch(GetDeviceRatioURL)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (data) {
        vdata = [
          { item: 'iOS设备', count: data.iOSCount },
          { item: '安卓设备', count: data.AndroidCount }
        ];
        dv.source(vdata).transform({
          type: 'percent',
          field: 'count',
          dimension: 'item',
          as: 'percent'
        });
        that.setState({ chartdata2: dv });
        that.setState({ cols2: cols2 });
      });

    //云+应用排名
    let data3 = [];
    const cols3 = {
      'ViewCount': {alias: '访问次数'},
    };
    that.setState({ chartdata3: data3 });
    that.setState({ cols3: cols3 });
    var formData3 = new FormData();
    let startTime3 = moment().subtract(31, 'days').format('YYYY-MM-DD');
    let endTime3 = moment().format('YYYY-MM-DD');
    formData3.append('startTime', startTime3);
    formData3.append('endTime', endTime3);
    const functionData = {
      method: 'POST',
      body: formData3
    };
    fetch(GetFunctionTopURL, functionData)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (data4) {
        that.setState({ chartdata3: data4 });
      });
  }

  handleSelectChange = (value) => {
    if (value !== 'Authorization Code') {
      this.setState({
        isShowurl: false,
      })
    } else {
      this.setState({
        isShowurl: true,
      })
    }
  }

  render() {
    const breadcrumb = [
      { text: '云+分析', link: '' },
      { text: '概览', link: '#/cloudplus/index' }
    ];
    // 数据源
    const cols = {
      'ViewCount': {alias: '访问次数'},
      'CreateTime': {}
    };

    return (
      <Content className="maincontent fromwarper">
        <ContentHeader datasource={breadcrumb} />
        <div className="pagecontent">
          <div className="row top_tiles">
            <div className="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="tile-stats">
                <div className="icon"><i className="fa fa-institution"></i></div>
                <div className="count">{this.state.EnterpriseCount}</div>
                <h3>注册企业数</h3>
                <p>企业总数.</p>
              </div>
            </div>
            <div className="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="tile-stats">
                <div className="icon"><i className="fa fa-users"></i></div>
                <div className="count">{this.state.ECMUsers}</div>
                <h3>注册用户数</h3>
                <p>注册用户总数.</p>
              </div>
            </div>
            <div className="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="tile-stats">
                <div className="icon"><i className="fa fa-user"></i></div>
                <div className="count">{this.state.ActiveUserCount}</div>
                <h3>活跃用户数</h3>
                <p>活跃用户总数.</p>
              </div>
            </div>
            <div className="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="tile-stats">
                <div className="icon"><i className="fa fa-mobile-phone"></i></div>
                <div className="count">{this.state.DeviceCount}</div>
                <h3>移动设备数</h3>
                <p>移动设备总数.</p>
              </div>
            </div>
          </div>
          <div>
            <br />
            <div id="mainChart">
              <h2><center>用户PV趋势图</center></h2>
              <Chart height={400} data={this.state.chartdata} scale={cols} forceFit>
                <Axis name="CreateTime" />
                <Axis name="ViewCount" visible={true} />
                <Tooltip crosshairs={{ type: "y" }} />
                <Geom type="area" position="CreateTime*ViewCount" />
                <Geom type='point' position="CreateTime*ViewCount" shape={'circle'} />
              </Chart>
            </div>
            <Row >
              <Col span={12} >
                <h2><center>移动设备对比</center></h2>
                <Chart height={400} width={400} data={this.state.chartdata2} scale={this.state.cols2} padding={[80, 100, 80, 80]} forceFit>
                  <Coord type='theta' radius={0.75} />
                  <Axis name="percent" />
                  <Legend position='right' offsetY={-window.innerHeight / 2 + 120} offsetX={-100} />
                  <Tooltip
                    showTitle={false}
                    itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                  />
                  <Geom
                    type="intervalStack"
                    position="percent"
                    color='item'
                    tooltip={['item*percent', (item, percent) => {
                      percent = (percent * 100).toFixed(2) + '%';
                      return {
                        name: item,
                        value: percent
                      };
                    }]}
                    style={{ lineWidth: 1, stroke: '#fff' }}
                  >
                    <Label content='percent' formatter={(val, item) => {
                      return item.point.item + ': ' + item.point.count + '(部)  ' + parseFloat(val).toFixed(2) + '%';
                    }} />
                  </Geom>
                </Chart>
              </Col>
              <Col span={12} >
                <h2><center>云+应用排名(30天)</center></h2>
                <Chart height={400} data={this.state.chartdata3} scale={this.state.cols3} forceFit>
                  <Axis name="FunctionName" />
                  <Axis name="ViewCount" />
                  <Tooltip crosshairs={{ type: "y" }} />
                  <Geom color={['#26B99A']} type="interval" position="FunctionName*ViewCount" />
                </Chart>
              </Col>
            </Row>
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
