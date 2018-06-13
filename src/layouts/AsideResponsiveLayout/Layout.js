import React from 'react';
import {Layout} from 'antd';
//import TopHeader from './../../components/TopHeader';
import SiderBar from './../../components/SiderBar';
import PageHeader from './../../components/PageHeader';


const {Content} = Layout;

class AsideResponsiveLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize = () => {
    if (window.innerWidth <= 960) {
      this.setState({
        collapsed: true,
      });
    } else {
      this.setState({
        collapsed: false,
      });
    }
  }

  render() {
    return (
      <Layout className="wraper">
        {/*<TopHeader />*/}
        {/*<Layout>*/}
        <SiderBar collapsed={this.state.collapsed} {...this.props}/>
        <Layout className="pagewraper">
          <PageHeader collapsed={this.state.collapsed} hanlderToggle={this.toggle}  {...this.props}/>
          <Content className="pagecontentwraper">
            {this.props.children}
          </Content>
        </Layout>
        {/*</Layout>*/}
      </Layout>
    )
  }

}

export default AsideResponsiveLayout;

