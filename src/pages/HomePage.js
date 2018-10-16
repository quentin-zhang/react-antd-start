import React from 'react';
import { Layout, Form, Row, Col } from 'antd';
import ContentHeader from './../components/ContentHeader';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend } from "bizcharts";
import { View } from '@antv/data-set';
import { GetPVChangeURL, GetEnterpriseInfoURL, GetDeviceRatioURL, GetFunctionTopURL, GetECMExceptionURL, GetActiveUserURL } from './../util/const';
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
      PVCount: 0,
      ExceptionCount: 0,
      ActiveUserCount: 0,
      exceptionData: [],
      activeUserData: []
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
        that.setState({ PVCount: data.PVCount });
        that.setState({ ExceptionCount: data.ExceptionCount });
        that.setState({ ActiveUserCount: data.ActiveUserCount });
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

    this.exceptionChart(that);
    this.activeUserChart(that);
  }

  exceptionChart(that) {
    //异常
    var formData = new FormData();
    let startTime = moment().subtract(31, 'days').format('YYYY-MM-DD');
    let endTime = moment().format('YYYY-MM-DD');
    formData.append('startTime', startTime);
    formData.append('endTime', endTime);

    const exCols = {
      'ExceptionCount': { alias: '异常次数' },
      'HappenTime': {}
    }
    const countData = {
      method: 'POST',
      body: formData
    };
    fetch(GetECMExceptionURL, countData)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (data) {
        let exData = [];
        for (var obj of data) {
          exData.push({
            "HappenTime": obj.HappenTime,
            "ExceptionCount": Number.parseInt(obj.ExceptionCount, 10)
          });
        }
        that.setState({ exceptionData: exData });
      });
  }

  devicePie(that) {
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
  }

  funcRanking(that) {
    //云+应用排名
    let data3 = [];
    const cols3 = {
      'ViewCount': { alias: '访问次数' },
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

  activeUserChart(that) {
    //活跃用户数
    var formData = new FormData();
    let startTime = moment().subtract(31, 'days').format('YYYY-MM-DD');
    let endTime = moment().format('YYYY-MM-DD');
    formData.append('startTime', startTime);
    formData.append('endTime', endTime);

    const activeCols = {
      'ViewCount': { alias: '活跃人数' },
      'CreateTime': {}
    }
    const activeParam = {
      method: 'POST',
      body: formData
    };
    fetch(GetActiveUserURL, activeParam)
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
        let activeData = data;
        that.setState({ activeUserData: activeData });
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
      'ViewCount': { alias: '访问次数' },
      'CreateTime': {}
    };
    const exCols = {
      'ExceptionCount': { alias: '异常次数' },
      'HappenTime': {}
    };
    const activeCols = {
      'ViewCount': { alias: '活跃用户数' },
      'CreateTime': {}
    }


    return (
      <Content className="maincontent fromwarper">
        <ContentHeader datasource={breadcrumb} />
        <div className="pagecontent">
        <Row >
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
                <div className="icon"><i className="fa fa-area-chart"></i></div>
                <div className="count">{this.state.PVCount}</div>
                <h3>昨日PV数</h3>
                <p>昨日PV数.</p>
              </div>
            </div>
            <div className="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="tile-stats">
                <div className="icon"><i className="fa fa-exclamation"></i></div>
                <div className="count">{this.state.ExceptionCount}</div>
                <h3>昨日异常数</h3>
                <p>昨日异常数.</p>
              </div>
            </div>
            <div className="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="tile-stats">
                <div className="icon"><i className="fa fa-user"></i></div>
                <div className="count">{this.state.ActiveUserCount}</div>
                <h3>昨日活跃用户数</h3>
                <p>昨日活跃用户数.</p>
              </div>
            </div>
          </div>
          </Row>
          <div>
            <Row >
            <Col span={24} >
              <h2><center>用户PV趋势图</center></h2>
              <Chart height={300} data={this.state.chartdata} scale={cols} forceFit>
                <Axis name="CreateTime" />
                <Axis name="ViewCount" visible={true} />
                <Tooltip crosshairs={{ type: "y" }} />
                <Geom type="area" position="CreateTime*ViewCount" />
                <Geom type='point' position="CreateTime*ViewCount" shape={'circle'} />
              </Chart>
              </Col>
            </Row>
            <Row >
              <Col span={24} >
                <h2><center>异常趋势图</center></h2>
                <Chart height={300} data={this.state.exceptionData} scale={exCols} forceFit>
                  <Axis name="HappenTime" />
                  <Axis name="ExceptionCount" visible={true} />
                  <Tooltip crosshairs={{ type: "y" }} />
                  <Geom color={['#FF6347']} type="line" position="HappenTime*ExceptionCount" />
                  <Geom color={['#FF6347']} type='point' position="HappenTime*ExceptionCount" shape={'circle'} />
                </Chart>
              </Col>
            </Row>
            <Row >
              <Col span={24} >
                <h2><center>活跃用户数</center></h2>
                <Chart height={300} data={this.state.activeUserData} scale={activeCols} forceFit>
                  <Axis name="CreateTime" />
                  <Axis name="ViewCount" visible={true} />
                  <Tooltip crosshairs={{ type: "y" }} />
                  <Geom color={['#26B99A']} type="line" position="CreateTime*ViewCount" />
                  <Geom color={['#26B99A']} type='point' position="CreateTime*ViewCount" shape={'circle'} />
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
                {/* <Chart height={400} width={400} data={this.state.chartdata2} scale={this.state.cols2} padding={[80, 100, 80, 80]} forceFit>
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
                </Chart> */}
                              {/* <Col span={12} >
                <h2><center>云+应用排名(30天)</center></h2>
                <Chart height={400} data={this.state.chartdata3} scale={this.state.cols3} forceFit>
                  <Axis name="FunctionName" />
                  <Axis name="ViewCount" />
                  <Tooltip crosshairs={{ type: "y" }} />
                  <Geom color={['#26B99A']} type="interval" position="FunctionName*ViewCount" />
                </Chart>
              </Col> */}