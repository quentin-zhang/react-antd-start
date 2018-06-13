import React from 'react';
import Logo from './Logo';
import {Layout} from 'antd';
const {Footer} = Layout;

export default class BottomFooter extends React.Component {
  render() {
    return (
      <Footer >
        <div className="ice-design-layout-footer-body">
          <div style={{ filter: 'grayscale(100%)', opacity: 0.3 }}>
            <Logo />
          </div>
          <div className="copyright">
            © 2018 Theme designed by{' '}
            <a
              href="https://github.com/alibaba/ice"
              target="_blank"
              className="copyright-link"
              rel="noopener noreferrer"
            >
              ICE
            </a>
          </div>
        </div>
      </Footer>
    );
  }
}
