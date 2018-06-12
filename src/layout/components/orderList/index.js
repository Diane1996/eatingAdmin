import React from 'react';
import { Card, Table, Button, Modal } from 'antd';
// const Panel = Collapse.Panel;
import $ from 'jquery';

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
          title: '详情',
          key: 'detail',
          render: (text, record, index) => {
            return (
              <Button onClick={() => {
                this.showModal(record);
              }}>订单详情</Button>
            );
          }
        }, {
          title: '',
          key: 'action',
          render: (text, record, index) => {
            console.log('status: ', record.status);
            let actionName = '接单';
            switch (record.status) {
              case 1:
                actionName = '接单';
                break;
              case 2:
                if (record.eatingType === '外卖') {
                  actionName = '开始配送';
                } else {
                  actionName = '结束订单';
                }
                break;
              case 3:
                actionName = '结束订单';
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
      ],
      isHistory: false,
    };
  }

  showModal = (record) => {
    $.ajax({
      method: 'get',
      url: config + '/admin/order/getOneDetail?order_id=' + record.order_id,
      dataType: 'jsonp',
      success: (res) => {
        let orderList = [];
        res.orderDetail.map((item, index) => {
          item.key = index + 1;
          orderList.push(item);
        });
        this.setState({
          list: orderList,
          address: res.addressDetail,
          remark: res.orderRemark[0].remark
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
    this.getOrderList();
    // 定时获取最新内容
    let timer;
    let repeat;
    // setTimeout(repeat = () => {
    //   setTimeout(repeat, 1000);
    //   var isHistory = this.state.isHistory;
    //   if (isHistory) {
    //     this.getHistory();
    //   } else {
    //     this.getOrderList();
    //   }
    // }, 1000);
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
    let code, tips;
    switch (item.status) {
      case 1:
        // 接单
        code = ORDER_CODE.RECEIVE;
        tips = '已接单';
        break;
      case 2:
        if (item.eatingType === '外卖') {
          // 开始配送
          code = ORDER_CODE.DELIVER;
          tips = '开始配送';
        } else {
          // 订单完成
          code = ORDER_CODE.END;
          tips = '订单已完成';
        }
        break;
      case 3:
        // 订单完成
        code = ORDER_CODE.END;
        tips = '订单已完成';
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
        var that = this;
        Modal.info({
          title: '提示',
          content: (
            <div>
              <p>{tips}</p>
            </div>
          ),
          onOk() {
            this.getOrderList();
          },
        });
      }
    });
  }

  getOrderList() {
    this.setState({
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
          title: '详情',
          key: 'detail',
          render: (text, record, index) => {
            return (
              <Button onClick={() => {
                this.showModal(record);
              }}>订单详情</Button>
            );
          }
        }, {
          title: '',
          key: 'action',
          render: (text, record, index) => {
            let actionName = '接单';
            switch (record.status) {
              case 1:
                actionName = '接单';
                break;
              case 2:
                if (record.eatingType === '外卖') {
                  actionName = '开始配送';
                } else {
                  actionName = '结束订单';
                }
                break;
              case 3:
                actionName = '结束订单';
                break;
              case 4:
                actionName = '用户申请退款';
            }
            return (
              <Button onClick={() => {
                this.orderAction(record);
              }}>{actionName}</Button>
            );
          }
        }
      ],
    });
    $.ajax({
      method: 'get',
      url: config + '/admin/order/getAllOrderList',
      // dataType: 'jsonp',
      success: (res) => {
        if (res) {
          let orderList = [];
          res.data.map((item, index) => {
            item.key = index + 1;
            item.createdTime = item.create_time;
            item.total = item.total_price;
            orderList.push(item);
          });
          this.setState({
            orderList: orderList
          });
        } else {
          this.setState({
            orderList: []
          });
        }
      }
    });
  }

  getHistory() {
    this.setState({
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
          title: '详情',
          key: 'detail',
          render: (text, record, index) => {
            return (
              <Button onClick={() => {
                this.showModal(record);
              }}>订单详情</Button>
            );
          }
        }
      ],
    });
    $.ajax({
      method: 'get',
      url: config + '/admin/order/getHistoryOrderList',
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
        this.setState({
          orderList: orderList
        });
      }
    });
  }

  toggleHistory() {
    var isHistory = this.state.isHistory;
    this.setState({
      isHistory: isHistory = isHistory ? false : true,
    });
    if (isHistory) {
      this.getHistory();
    } else {
      this.getOrderList();
    }
  }

  render() {
    const customPanelStyle = {
      background: '#024a31',
      width: '300px',
      color: '#fff',
    };

    return (
      <div>
        <Button onClick={this.toggleHistory.bind(this)}>{this.state.isHistory ? '已完成订单' : '未完成订单'}</Button>
        <Modal
          title="点单列表"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Table dataSource={this.state.list} columns={this.state.orderColumns} pagination={false}/>
          <Table dataSource={this.state.address} columns={this.state.addressColumns} pagination={false}/>
          <div>
            <div>备注</div>
            <div>{this.state.remark}</div>
          </div>
        </Modal>
        <Table dataSource={this.state.orderList} columns={this.state.columns} pagination={false}/>
      </div>
    );
  }
}
