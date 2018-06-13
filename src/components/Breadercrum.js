import React from 'react';
import {Breadcrumb} from 'antd';

export default class Breadercrum extends React.Component {
  render() {
    const dataSource = this.props.datasource;
    return (
      <Breadcrumb className="breadcrumbpath">
        {dataSource.map((item, index) => {
          return (
            item.link ? (
              <Breadcrumb.Item key={index} href={item.link}>
                {item.text}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={index}>
                {item.text}
              </Breadcrumb.Item>
            )
          );
        })}
      </Breadcrumb>
    );
  }
}
