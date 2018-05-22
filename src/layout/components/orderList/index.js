import React from 'react';
import { Card, Table, Button, Modal } from 'antd';
// const Panel = Collapse.Panel;
import $ from 'jquery';
import axios from 'axios';
import qs from 'qs';

const config = 'http://127.0.0.1:8360';

const ORDER_CODE = {
  PAY_NO: 0,
  PAYMENT: 1,
  RECEIVE: 2,
  DELIVER: 3,
  END: 4,
  CANCEL: 5,
  REFUND: 6
};

export default class Order extends React.Component {

  constructor() {
    super();
    this.state = {
      index: 1,
      orderList: [],
      visible: false,
      list: [],
      columns: [
        {
          title: '交易时间',
          dataIndex: 'createdTime',
          key: 'createdTime'
        }, {
          title: '用户名',
          dataIndex: 'username',
          key: 'username'
        }, {
          title: '用户Id',
          dataIndex: 'open_id',
          key: 'open_id'
        }, {
          title: '进餐类型',
          dataIndex: 'eatingType',
          key: 'eatingType'
        }, {
          title: '总价',
          dataIndex: 'total',
          key: 'total'
        }, {
          title: '订单状态',
          dataIndex: 'status',
          key: 'status'
        }, {
          title: '结束订单',
          key: 'end',
          render: (text, record, index) => {
            return (
              <Button onClick={() => {
                this.endOrder(record);
              }}>结束订单</Button>
            );
          }
        }, {
          title: '',
          key: 'action',
          render: (text, record, index) => {
            let actionName = '接单';
            switch (status) {
              case 1:
                actionName = '接单';
                break;
              case 2:
                actionName = '开始配送';
                break;
              case 3:
                actionName = '订单完成';
                break;
              case 4:
                actionName = '用户申请退款';
            }
            return (
                <button onClick={() => {
                  this.orderAction(record);
                  // this.handleCancel();
                }}>{actionName}</button>
            );
          }
        }
      ],
      orderColumns: [
        {
          title: '菜名',
          dataIndex: 'name',
          key: 'name'
        }, {
          title: '菜品id',
          dataIndex: 'food_id',
          key: 'food_id'
        }, {
          title: '数量',
          dataIndex: 'count',
          key: 'count'
        }
      ]
    };
  }

  showModal = (record) => {
    $.ajax({
      method: 'get',
      url: config + '/admin/order/getOneDetail?order_id=' + record.order_id,
      dataType: 'jsonp',
      success: (res) => {
        console.log(typeof res)
        let orderList = [];
        res.result.map((item, index) => {
          item.key = index + 1;
          orderList.push(item);
        });
        console.log(orderList);
        this.setState({
          list: orderList
        });
      }
    });

    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    $.ajax({
      method: 'get',
      url: config + '/admin/order/getAllOrderList',
      data: {
        username: 'admin',
        password: 'admin'
      },
      dataType: 'jsonp',
      success: (res) => {
        let orderList = [];
        res.map((item, index) => {
          item.key = index + 1;
          item.createdTime = item.create_time;
          item.total = item.total_price;
          orderList.push(item);
        });
        console.log(orderList);
        this.setState({
          orderList: orderList
        });
      }
    });

    // 定时获取最新内容
    let timer;
    let repeat;
    // setTimeout(repeat = () => {
    //   setTimeout(repeat, 5000);
    //   $.ajax({
    //     method: 'get',
    //     url: config + '/admin/order/getAllOrderList',
    //     data: {
    //       username: 'admin',
    //       password: 'admin'
    //     },
    //     dataType: 'jsonp',
    //     success: (res) => {
    //       let orderList = [];
    //       res.map((item, index) => {
    //         item.key = index + 1;
    //         item.createdTime = item.create_time;
    //         item.total = item.total_price;
    //         orderList.push(item);
    //       });
    //       // console.log(orderList);
    //       this.setState({
    //         orderList: orderList
    //       });
    //     }
    //   });
    // }, 5000);
  }

  endOrder(record) {
    if (record.status > 2) {
      console.log('结束订单哦', record);
    } else {
      console.log('不能进行此操作');
    }
  }

  orderAction(item) {
    console.log('item: ', item.status);
    let code;
    switch (item.status) {
      case 1:
        // 接单
        code = ORDER_CODE.RECEIVE;
        break;
      case 2:
        // 开始配送
        code = ORDER_CODE.RECEIVE;
        break;
      case 3:
        // 订单完成
        code = ORDER_CODE.RECEIVE;
        break;
      case 4:
        // 用户申请退款(同意，拒绝)
        code = ORDER_CODE.RECEIVE;
    }
    $.ajax({
      method: 'get',
      url: config + '/admin/order/order',
      dataType: 'jsonp',
      success: (res) => {
        console.log('success:', res);
      }
    });
  }

  render() {
    const customPanelStyle = {
      background: '#024a31',
      width: '300px',
      color: '#fff',
    };

    return (
      <div>
        {/* <Card title={`Order ${this.state.index}`} style={customPanelStyle}>
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
        </Card> */}
        <Modal
          title="点单列表"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Table dataSource={this.state.list} columns={this.state.orderColumns}/>
        </Modal>
        <Table dataSource={this.state.orderList} columns={this.state.columns} onRow={(record) => {
          return {
            onClick: () => {
              this.showModal(record);
            }
          };
        }}/>
      </div>
    );
  }
}
