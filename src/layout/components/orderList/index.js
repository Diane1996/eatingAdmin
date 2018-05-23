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
      address: [],
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
                <Button onClick={() => {
                  this.orderAction(record);
                  // this.handleCancel();
                }}>{actionName}</Button>
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
      ],
      addressColumns: [
        {
          title: '名字',
          dataIndex: 'name',
          key: 'name'
        }, {
          title: '电话',
          dataIndex: 'phone',
          key: 'phone'
        }, {
          title: '地址',
          dataIndex: 'address',
          key: 'address'
        }
      ]
    };
  }

  showModal = (record) => {
    // $.ajax({
    //   method: 'get',
    //   url: config + '/admin/order/getOneDetail?order_id=' + record.order_id,
    //   dataType: 'jsonp',
    //   success: (res) => {
    //     let orderList = [];
    //     res.orderDetail.map((item, index) => {
    //       item.key = index + 1;
    //       orderList.push(item);
    //     });
    //     this.setState({
    //       list: orderList,
    //       address: res.addressDetail
    //     });
    //   }
    // });
    // this.setState({
    //   visible: true,
    // });
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

  getOrderList() {
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
          // switch (item.status) {
          //   case 1:
          //     item.status = '已付款';
          //
          // }
          orderList.push(item);
        });
        console.log(orderList);
        this.setState({
          orderList: orderList
        });
      }
    });
  }

  componentDidMount() {
    this.getOrderList();
    // 定时获取最新内容
    let timer;
    let repeat;
    // setTimeout(repeat = () => {
    //   setTimeout(repeat, 5000);
    //   this.getOrderList();
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
    console.log(code, item.order_id);
    $.ajax({
      method: 'get',
      url: config + '/admin/order/order',
      data: {
        code: code,
        order_id: item.order_id
      },
      dataType: 'jsonp',
      success: (res) => {
        this.getOrderList();
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
        <Modal
          title="点单列表"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Table dataSource={this.state.list} columns={this.state.orderColumns}/>
          <Table dataSource={this.state.address} columns={this.state.addressColumns}/>
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
