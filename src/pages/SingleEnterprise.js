import React from 'react';
import { Layout, Form, Row, Col } from 'antd';
import ContentHeader from '../components/ContentHeader';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend } from "bizcharts";
import { View } from '@antv/data-set';
import { GetEPPVCountURL, GetEPActiveCountURL, GetEPExceptionCountURL} from '../util/const';
import moment from 'moment';

const { Content } = Layout;

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    const selCurRowInfo = this.props.location.query ? this.props.location.query : null;
    const isShowurl = selCurRowInfo ? this.isShowUrlByObj(selCurRowInfo) : true;

    let defaultEP = {
      code: "inspur_esg",
      id: "10000"
    };

    const tempEPID = this.props.match.params.id ? this.props.match.params.id : defaultEP.id;

    this.state = {
      Registerinfo: selCurRowInfo,
      isShowurl: isShowurl,
      chartdata: [],
      EnterpriseCount: 0,
      PVCount: 0,
      ExceptionCount: 0,
      ActiveUserCount: 0,
      exceptionData: [],
      activeUserData: [],
      epID : tempEPID,
      epName : this.props.match.params.enterprisename
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
    //PV趋势图
    let param1 = {
      "startTime" : "2018-10-05",
      "endTime" : "2018-11-05",
      "conditionKey" : "enterpriseID.keyword",
      "conditionValue" : this.state.epID,
      "indexName" : "cloudplus-clientpv-*",
      "timeKey" : "collectTime"
   };

    const countData = {
      method: 'POST',
      body: JSON.stringify(param1),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(GetEPPVCountURL, countData)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (data) {
        let tempDatas = [];
        for (var obj of data) {
          let tempData = {
            CreateTime : obj.cKey,
            ViewCount : Number.parseInt(obj.cValue, 10)
          }
          tempDatas.push(tempData);
        }
        that.setState({ chartdata: tempDatas });
      });

    this.exceptionChart(that);
    this.activeUserChart(that);
  }

  exceptionChart(that) {
    //异常
    let param1 = {
      "startTime" : "2018-10-05",
      "endTime" : "2018-11-05",
      "conditionKey" : "enterpriseID.keyword",
      "conditionValue" : this.state.epID,
      "indexName" : "cloudplus-exception-*",
      "timeKey" : "happenTime"
   };

   const countData = {
    method: 'POST',
    body: JSON.stringify(param1),
    headers: {
      'Content-Type': 'application/json'
    }
  };
    fetch(GetEPExceptionCountURL, countData)
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
            "HappenTime": obj.cKey,
            "ExceptionCount": Number.parseInt(obj.cValue, 10)
          });
        }
        that.setState({ exceptionData: exData });
      });
  }

  activeUserChart(that) {
    //活跃用户数
    let param1 = {
      "startTime" : "2018-10-05",
      "endTime" : "2018-11-05",
      "conditionKey" : "enterpriseID.keyword",
      "conditionValue" : this.state.epID,
      "indexName" : "cloudplus-clientpv-*",
      "timeKey" : "collectTime"
   };

    const activeParam = {
      method: 'POST',
      body: JSON.stringify(param1),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(GetEPActiveCountURL, activeParam)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (data) {
        let activeUserTemp = [];
        for (var obj of data) {
          activeUserTemp.push({
            "CreateTime": obj.cKey,
            "ViewCount": Number.parseInt(obj.cValue, 10)
          });
        }
        that.setState({ activeUserData: activeUserTemp });
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
      { text: '企业情况', link: '#cloudplus/index/enterprise' },
      { text: this.state.epName, link: '#cloudplus/index/enterprise' + '/' + this.state.epID + '/' + this.state.epName }
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
          <div>
          <h2><center>{this.state.epName}</center></h2>  
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