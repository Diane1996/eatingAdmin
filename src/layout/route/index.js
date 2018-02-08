import React from 'react';
import { Breadcrumb } from 'antd';

export default class Route extends React.Component {
  render() {
    return (
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Application1</Breadcrumb.Item>
        <Breadcrumb.Item>Application2</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}
