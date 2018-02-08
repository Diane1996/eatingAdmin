import React from 'react';
import { Card } from 'antd';
// const Panel = Collapse.Panel;

export default class Order extends React.Component {

  constructor() {
    super();
    this.state = {
      index: 1,
    };
  }

  render() {
    const customPanelStyle = {
      background: '#024a31',
      width: '300px',
      color: '#fff',
    };

    return (
      <div>
        <Card title={`Order ${this.state.index}`} style={customPanelStyle}>
          <div>
            <p>外卖</p>
            <p>price: <span>12.5</span></p>
            <p>orderList: </p>
            <p>receiverInfo:</p>
            <div>
              <p>name: 王小明</p>
              <p>telephone: 13512341234</p>
              <p>address: 成都</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}
