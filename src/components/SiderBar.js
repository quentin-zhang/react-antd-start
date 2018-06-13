import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import {asideNavs} from '../menuConfig';
import {Link} from 'react-router-dom';
const {SubMenu} = Menu;
const MenuItem = Menu.Item;
const {Sider} = Layout;


export default class SiderBar extends React.Component {
  constructor(props) {
    super(props);
    const openKeys = this.getOpenKeys();
    this.state = {
      current: this.props.location.pathname,
      openKeys,
    }
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      current: nextprops.location.pathname,
    });
  }

  /**
   * 获取当前展开的菜单项
   */
  getOpenKeys = () => {
    const {match} = this.props;
    const matched = match.path;
    let openKeys = [];

    Array.isArray(asideNavs) &&
    asideNavs.forEach((item, index) => {
      if (item.children && item.children.length > 0) {
        if (matched.startsWith(item.path)) {
          openKeys = ['' + index];
        }
      }
    });
    return openKeys;
  };
  /**
   * 当前展开的菜单项
   */
  onOpenChange = (openKeys) => {
    this.setState({
      openKeys,
    });
  };

  render() {
    return (
      <Sider width={200} style={{background: '#fff', overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}
             trigger={null}
             breakpoint="lg"
             collapsible
             collapsed={this.props.collapsed}
             className="enablecollapsebar">
        <Menu
          mode="inline"
          theme="light"
          selectedKeys={[this.state.current]}
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          style={{height: '100%', borderRight: 0}}
        >
          {asideNavs &&
          asideNavs.length > 0 &&
          asideNavs.map((nav, index) => {
            if (nav.children && nav.children.length > 0) {
              return (
                <SubMenu
                  key={index}
                  title={
                    <span>
                            {nav.icon ? (
                              <Icon type={nav.icon}/>
                            ) : null}
                      <span className="nav-text">
                              {nav.name}
                            </span>
                          </span>
                  }
                >
                  {nav.children.map((item) => {
                    const linkProps = {};
                    if (item.newWindow) {
                      linkProps.href = item.path;
                      linkProps.target = '_blank';
                    } else if (item.external) {
                      linkProps.href = item.path;
                    } else {
                      if (item.query) {
                        const paramobj = {};
                        paramobj.pathname = item.path;
                        paramobj.query = item.query;
                        linkProps.to = paramobj;
                      } else {
                        linkProps.to = item.path;
                      }
                    }
                    return (
                      <MenuItem key={item.path}>
                        <Link {...linkProps}>{item.name}</Link>
                      </MenuItem>
                    );
                  })}
                </SubMenu>
              );
            }
            const linkProps = {};
            if (nav.newWindow) {
              linkProps.href = nav.path;
              linkProps.target = '_blank';
            } else if (nav.external) {
              linkProps.href = nav.path;
            } else {
              linkProps.to = nav.path;
            }
            return (
              <MenuItem key={nav.path}>
                <Link {...linkProps}>
                        <span>
                          {nav.icon ? (
                            <Icon type={nav.icon}/>
                          ) : null}
                          <span className="nav-text">
                            {nav.name}
                          </span>
                        </span>
                </Link>
              </MenuItem>
            );
          })}
        </Menu>
      </Sider>
    );
  }
}
