import React from 'react';
import {Layout, Form, Input, Button, Select, InputNumber} from 'antd';
import ContentHeader from './../components/ContentHeader';
const FormItem = Form.Item;
const {Content} = Layout;
const Option = Select.Option;
const grantType = ['Authorization Code', 'Resource Owner Password Credentials', 'Implicit', 'Client Credentials'];

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    const selCurRowInfo = this.props.location.query ? this.props.location.query : null;
    const isShowurl = selCurRowInfo ? this.isShowUrlByObj(selCurRowInfo) : true;
    this.state = {
      Registerinfo: selCurRowInfo,
      isShowurl: isShowurl,
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
    if (this.state.Registerinfo) {
      //const reg = /(http[s]?:\/\/([\w-]+.)+([:\d+])?(\/[\w-\.\/\?%&=]*)?)/gi;
      //const url = reg.test(.match);
      const urlArr = this.state.Registerinfo.callbackUri[0].split("/");
      let portindex = urlArr[2].indexOf(':');
      let hostname;
      if (portindex > -1) {
        hostname = urlArr[2].slice(0, portindex)
      } else {
        hostname = urlArr[2];
      }

      this.props.form.setFieldsValue({
        name: this.state.Registerinfo.name,
        description: this.state.Registerinfo.description,
        grantType: this.state.Registerinfo.grantType,
        Callback_url: hostname,
      })
    }

  }

  // showPwd = () => {
  //   this.props.form.setFields({
  //     client_secret: {
  //       value: this.state.clientinfo.clientsecret,
  //       type: "text",
  //     },
  //   });
  // }

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
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 6,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: 'http://',
    })(
      <Select style={{width: 90}}>
        <Option value="https://">https://</Option>
        <Option value="http://">http://</Option>
      </Select>
    );
    const suffixselector = getFieldDecorator('suffix', {
      initialValue: 80,
    })(
      <InputNumber className="portinput" min={0}/>
    );
    const breadcrumb = [
      {text: '应用接入', link: ''},
      {text: '申请接入', link: '#/application/register'},
      {text: '应用注册', link: '#' + this.props.location.pathname},
    ];
    return (
      <Content className="maincontent fromwarper">
        <ContentHeader datasource={breadcrumb} contenttitle="添加/编辑应用注册：" />
        <div className="pagecontent">
          <Form onSubmit={this.handleSubmit} className="registerform">
            <legend>基本信息</legend>
            <FormItem
              {...formItemLayout}
              label="名称"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入应用名称',
                }],
              })(
                <Input placeholder="请输入应用名称"/>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="描述信息"
            >
              {getFieldDecorator('description', {
                rules: [{
                  required: true, message: '请输入应用描述信息',
                }],
              })(
                <Input placeholder="请输入应用描述信息"/>
              )}
            </FormItem>
            {/*<FormItem*/}
            {/*{...formItemLayout}*/}
            {/*label="client_id"*/}
            {/*>*/}
            {/*{getFieldDecorator('client_id')(*/}
            {/*<Input disabled={true}/>*/}
            {/*)}*/}
            {/*</FormItem>*/}
            {/*<FormItem*/}
            {/*{...formItemLayout}*/}
            {/*label="client_secret"*/}
            {/*ref="formitempwd"*/}
            {/*>*/}
            {/*<Row gutter={8}>*/}
            {/*<Col span={18}>*/}
            {/*{getFieldDecorator('client_secret')(*/}
            {/*<Input type="password" disabled={true}/>*/}
            {/*)}*/}
            {/*</Col>*/}
            {/*<Col span={6}>*/}
            {/*<Button className="showpwdbtn" onClick={this.showPwd}>查看密码</Button>*/}
            {/*</Col>*/}
            {/*</Row>*/}
            {/*</FormItem>*/}
            <legend>授权流程</legend>
            <FormItem
              {...formItemLayout}
              label="授权类型"
            >
              {getFieldDecorator('grantType', {
                initialValue: 'Authorization Code',
                rules: [{required: true, message: '请输入授权类型'}],
              })(
                <Select
                  placeholder="请输入授权类型"
                  onChange={this.handleSelectChange}
                >
                  {
                    grantType.map((type, index) => {
                      return (
                        <Option key={'granttype' + index} value={type}
                                disabled={type !== 'Authorization Code'}>{type}</Option>
                      )

                    })
                  }
                </Select>
              )}
            </FormItem>
            {
              this.state.isShowurl ?
                <FormItem className='inputgroup'
                          {...formItemLayout}
                          label="应用地址"
                >
                  {getFieldDecorator('Callback_url', {
                    rules: [{required: true, message: '请输入应用地址'}],
                  })(
                    <Input addonBefore={prefixSelector} addonAfter={suffixselector} placeholder="请输入应用地址"/>
                  )}
                </FormItem> :
                null
            }

            {/*<FormItem*/}
            {/*{...formItemLayout}*/}
            {/*label="是否生成 refresh_token"*/}
            {/*>*/}
            {/*{getFieldDecorator('refresh_token', {valuePropName: 'checked', initialValue: true})(*/}
            {/*<Switch />*/}
            {/*)}*/}
            {/*</FormItem>*/}
            {/*<FormItem*/}
            {/*{...formItemLayout}*/}
            {/*label="Invalid_time"*/}
            {/*>*/}
            {/*{getFieldDecorator('Invalid_time', {*/}
            {/*rules: [{type: 'number', required: true, message: '请输入正整数'}],*/}
            {/*})(*/}
            {/*<InputNumber min={1} placeholder="请输入token失效时间" className="numberinput"/>*/}
            {/*)}*/}
            {/*</FormItem>*/}
            <FormItem {...tailFormItemLayout} className='formlastitem'>
              <Button type="primary" htmlType="submit" size="large">申请接入</Button>
            </FormItem>
          </Form>
          <div className="divider"></div>
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
