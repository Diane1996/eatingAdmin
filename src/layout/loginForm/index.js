import React from 'react';
import { Form, Icon, Input, Button, Modal } from 'antd';
import $ from 'jquery';

import classnames from 'classnames';

import css from './index.less';
const FormItem = Form.Item;
const config = 'http://127.0.0.1:8360';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends React.Component {

  constructor() {
    super();
    this.state = {
      isLogin: false,
      userName: ''
    };
  }

  componentDidMount() {
    this.props.form.validateFields();
    this.handleSubmit = this.handleSubmit.bind(this);
    $.ajax({
      method: 'post',
      url: config + '/admin/login/getLoginState',
      // dataType: 'jsonp',
      success: (res) => {
        if (res.username) {
          this.setState({
            userName: res.username,
            isLogin: true
          });
        }
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form:', values);
        $.ajax({
          method: 'get',
          url: config + '/admin/login/login',
          data: {
            username: values.userName,
            password: values.password
          },
          dataType: 'jsonp',
          success: (res) => {
            if (res == 401) {
              Modal.info({
                title: '提示',
                content: (
                  <div>
                    <p>账号或密码错误，请重试</p>
                  </div>
                )
              });
            } else {
              this.setState({
                isLogin: true,
                userName: values.userName
              });
            }
          }
        });
      }
    });
  }

  loginOut() {
    $.ajax({
      method: 'get',
      url: config + '/admin/login/loginOut',
      dataType: 'jsonp',
      success: (res) => {
        var that = this;
        Modal.info({
          title: '提示',
          content: (
            <div>
              <p>已退出</p>
            </div>
          ),
          onOk() {
            that.setState({
              isLogin: false,
              userName: ''
            });
          }
        });
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const usernameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit} className={classnames({[css.hide]: this.state.isLogin})}>
          <FormItem
            validateStatus={usernameError ? 'error' : ''}
            help={usernameError || ''}
          >
            {getFieldDecorator('userName', {
              rules: [{required: true, message: 'Please input your username!'}],
            })(
              <Input type="text" prefix={<Icon type="user" style={{color: 'rgba(0,0,0,0.25)'}} />} placeholder="Username"/>
            )}
          </FormItem>
          <FormItem
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your Password!'}],
            })(
              <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,0.25)'}}/>} placeholder="Password" type="password"/>
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              登陆
            </Button>
          </FormItem>
        </Form>

        <div className={classnames({[css.hide]: !this.state.isLogin, [css.textColor]: true})}>
          <span className={css.marginLeft}>你好，{this.state.userName}</span>
          <Button onClick={this.loginOut.bind(this)}>退出</Button>
        </div>
      </div>
    );
  }
}

const Login = Form.create()(LoginForm);

export default Login;
