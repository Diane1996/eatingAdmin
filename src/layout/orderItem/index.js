import React from 'react';
import { Steps, Card } from 'antd';
const Step = Steps.Step;

export default class OrderItem extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     index: this.state.index + 1
    //   })
    // }, 1000);
  }

  render() {
    return (
      <div>
        <Steps current={this.state.index} size="small">
          <Step title="Finished" description="description"/>
          <Step title="Finished" description="description"/>
          <Step title="Finished" description="description"/>
          <Step title="Finished" description="description"/>
        </Steps>
        <Card title="订单详情">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card title="用户信息">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    );
  }
}
