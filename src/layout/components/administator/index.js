import React from 'react';
import { Form, Input, Icon, Button, Checkbox, Table, Modal} from 'antd';
var FormItem = Form.Item;
import $ from 'jquery';
import css from './index.less';

const config = 'http://127.0.0.1:8360';

export default class Order extends React.Component {

  constructor() {
    super();
    this.state = {
      index: 1,
      orderList: [],
      visible: false,
      list: [],
      delVisible: false,
      columns: [
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username'
        }, {
          // title: '密码',
          // dataIndex: 'password',
          // key: 'password'
        }, {
          title: '操作',
          dataIndex: 'password',
          key: 'password',
          render: (text, record, index) => {
            return (
              <Button onClick={() => {
                this.showDeleteModal(record);
              }}>删除</Button>
            );
          }
        }
      ]
    };
  }

  showDeleteModal(record) {
    this.setState({
      delVisible: true,
      curDeleteItem: record
    });
  }

  deleteAdmin = () => {
    $.ajax({
      method: 'get',
      url: config + '/admin/admin/delete',
      data: {
        username: this.state.curDeleteItem.username,
        password: this.state.curDeleteItem.password,
      },
      dataType: 'jsonp',
      success: (res) => {
        if (res.result === 1) {
          console.log('删除成功');
        } else {
          console.log('网络错误，请重试');
        }
        this.getAdminInfo();
      }
    });
    this.setState({
      delVisible: false,
    });
  };

  showModal = (record) => {
    this.setState({
      visible: true,
      username: '',
      password: ''
    });
  };

  handleOk = () => {
    // 创建新的管理员
    $.ajax({
      method: 'get',
      url: config + '/admin/admin/add',
      data: {
        username: this.state.username,
        password: this.state.password
      },
      dataType: 'jsonp',
      success: (res) => {
        this.getAdminInfo();
      }
    });

    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      delVisible: false,
    });
  };

  componentDidMount() {
    this.getAdminInfo();
  }

  usernameChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  passwordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  getAdminInfo() {
    $.ajax({
      method: 'get',
      url: config + '/admin/admin/getAll',
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
          let list = [];
          console.log('res', res, typeof res);
          res.result.map((item, index) => {
            item.key = index + 1;
            list.push(item);
          });
          console.log(list);
          this.setState({
            admin: list
          });
        }
      }
    });
  }

  render() {
    return (
      <div>
        <Modal
          title="添加管理员"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit} className={css.login_form}>
            <FormItem>
              <Input onChange={(e) => this.usernameChange(e)} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} ref="username" placeholder="Username" value={this.state.username} />
            </FormItem>
            <FormItem>
              <Input onChange={(e) => this.passwordChange(e)} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} ref="password" type="password" placeholder="Password" value={this.state.password}/>
            </FormItem>
            <FormItem>
              <Checkbox>Remember me</Checkbox>
              <a className={css.login_form_forgot} href="">Forgot password</a>
              <Button type="primary" htmlType="submit" className={css.login_form_button}>
                Log in
              </Button>
              Or <a href="">register now!</a>
            </FormItem>
          </Form>
        </Modal>
        <Modal visible={this.state.delVisible} onOk={this.deleteAdmin} onCancel={this.handleCancel} >确定删除吗？</Modal>
        <Button onClick={this.showModal.bind(this)}>添加管理员</Button>
        <Table dataSource={this.state.admin} columns={this.state.columns}/>
      </div>
    );
  }
}
