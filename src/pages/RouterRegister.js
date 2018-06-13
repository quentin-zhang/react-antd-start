import React from 'react';
import {Layout, Form, Input, Select, Button} from 'antd';
import ContentHeader from './../components/ContentHeader';
const FormItem = Form.Item;
const {Content} = Layout;
const Option = Select.Option;
const routenames = [
  'com.inspur.ecm.chat',
  'com.inspur.emm',
  'com.inspur.ecm.cloud-drive',
  'com.inspur.ecm.schedule',
  'com.inspur.ecm',
  'com.inspur.ecm.storage.legacy',
  'com.inspur.ecm.bot',
  'com.inspur.ecm.client-registry',
  'com.inspur.gsp.cloud',
  'com.inspur.ecm.news',
  'com.inspur.ecm.distribution'
];
const routerversion=["v0","v1.0"];
class RouterRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    const selCurRowName = this.props.match.params.enterprisename;
    this.state = {
      routenames: routenames,
      routerversion:routerversion,
      enterprisename: selCurRowName,
    }
  }

  componentDidMount() {
    this.props.form.setFieldsValue({
      en_name: this.state.enterprisename,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
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
          offset: 8,
        },
      },
    };
    const breadcrumb = [
      {text: '路由管理', link: ''},
      {text: '路由查询管理', link: '#/routermanage/see'},
      {text: '注册路由', link: '#' + this.props.location.pathname},
    ];
    const {getFieldDecorator} = this.props.form;
    return (
      <Content className="maincontent fromwarper">
        <ContentHeader datasource={breadcrumb} contenttitle="注册路由：" />
        <div className="pagecontent">
          <Form onSubmit={this.handleSubmit} className="registerform">
            <FormItem
              {...formItemLayout}
              label="企业名称"
            >
              {getFieldDecorator('en_name', {
                rules: [{
                  required: true, message: '请输入企业名称',
                }],
              })(
                <Input placeholder="请输入企业名称" disabled/>
              )}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="路由名称"
            >
              {getFieldDecorator('router_name', {
                rules: [{
                  required: true, message: '请选择路由名称',
                }],
              })(
                <Select
                  placeholder="请选择路由名称"
                >
                  {
                    this.state.routenames.map((name, index) => {
                      return (
                        <Option key={'name' + index} value={name}>{name}</Option>
                      )

                    })
                  }
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="路由版本"
            >
              {getFieldDecorator('router_version', {
                rules: [{
                  required: true, message: '请选择路由版本',
                }],
              })(
                <Select
                  placeholder="请选择路由版本"
                >
                  {
                    this.state.routerversion.map((v, index) => {
                      return (
                        <Option key={'v' + index} value={v}>{v}</Option>
                      )

                    })
                  }
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="路由地址"
            >
              {getFieldDecorator('router_url', {
                rules: [{
                  required: true, type: 'url', message: '请输入路由地址',
                }],
              })(
                <Input placeholder="请输入路由地址"/>
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" size="large">注册路由</Button>
            </FormItem>
          </Form>
          {/*<div className="divider"></div>*/}
        </div>

      </Content>
    );
  }
}

const
  RouterRegister = Form.create()(RouterRegisterForm);

export
default
RouterRegister;