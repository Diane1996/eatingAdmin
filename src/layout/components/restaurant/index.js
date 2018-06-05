import React from 'react';
import css from './index.less';
import { Form, Icon, Input, Button, Modal } from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
const config = 'http://127.0.0.1:8360';

class Restaurant extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      phone: '',
      address: '',
      detail: '',
    };
  }

  componentDidMount() {
    this.getRestaurantData();
  }

  getRestaurantData() {
    $.ajax({
      method: 'get',
      url: config + '/admin/restaurant/index',
      dataType: 'jsonp',
      success: (res) => {
        if (res === 403) {
          var that = this;
          Modal.info({
            title: '提示',
            content: (
              <div>
                <p>您没有权限</p>
              </div>
            ),
            onOk() {
              that.props.memberSetting('2');
            },
          });
        } else {
          this.setState({
            name: res.result[0].name,
            phone: res.result[0].phone,
            address: res.result[0].address,
            detail: res.result[0].remark,
          });
        }
      }
    });
  }

  saveRestaurant() {
    var name = this.state.name;
    var phone = this.state.phone;
    var address = this.state.address;
    var detail = this.state.detail;

    $.ajax({
      method: 'get',
      url: config + '/admin/restaurant/update',
      data: {
        name: this.state.name,
        phone: this.state.phone,
        address: this.state.address,
        remark: this.state.detail
      },
      dataType: 'jsonp',
      success: () => {
        this.getRestaurantData();
      }
    });
  }

  nameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  phoneChange(e) {
    this.setState({
      phone: e.target.value
    });
  }

  addressChange(e) {
    this.setState({
      address: e.target.value
    });
  }

  detailChange(e) {
    this.setState({
      detail: e.target.value
    });
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24},
        sm: { span: 20}
      }
    };

    return (
      <div className={css.form}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="名字" {...formItemLayout}>
            <Input onChange={(e) => this.nameChange(e)} value={this.state.name} prefix={<Icon type="user" style={{color: 'rgba(0,0,0,0.25)'}}/>}/>
          </FormItem>
          <FormItem label="联系电话" {...formItemLayout}>
            <Input onChange={(e) => this.phoneChange(e)} value={this.state.phone} prefix={<Icon type="phone" style={{color: 'rgba(0,0,0,0.25)'}}/>}/>
          </FormItem>
          <FormItem label="地址" {...formItemLayout}>
            <Input onChange={(e) => this.addressChange(e)} value={this.state.address} prefix={<Icon type="environment" style={{color: 'rgba(0,0,0,0.25)'}}/>}/>
          </FormItem>
          <FormItem label="详情" {...formItemLayout}>
            <Input.TextArea onChange={(e) => this.detailChange(e)} value={this.state.detail} rows={4}/>
          </FormItem>
          <FormItem {...formItemLayout}>
            {/* 身份体验 */}
            <Button type="danger" onClick={this.saveRestaurant.bind(this)}>修改</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const rRestaurant = Form.create({})(Restaurant);

export default rRestaurant;
