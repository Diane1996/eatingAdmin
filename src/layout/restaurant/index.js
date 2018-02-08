import React from 'react';
import css from './index.less';
import { Form, Icon, Input, Button, Tooltip, Cascader, Select, Row, Col, Checkbox, AutoComplete } from 'antd';
const FormItem = Form.Item;

class Restaurant extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.form.validateFields();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {

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

    const { getFieldDecorator } = this.props.form;
    return (
      <div className={css.form}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="名字" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{
                // required: true, message: 'Please input your restaurant name',
              }]
            })(
              <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,0.25)'}}/>}/>
            )}
          </FormItem>
          <FormItem label="联系电话" {...formItemLayout}>
            {getFieldDecorator('telephone', {
              rules: [{
                // required: true, message: 'Please input your restaurant telephone',
              }]
            })(
              <Input prefix={<Icon type="phone" style={{color: 'rgba(0,0,0,0.25)'}}/>}/>
            )}
          </FormItem>
          <FormItem label="地址" {...formItemLayout}>
            {getFieldDecorator('address', {
              rules: [{
                // required: true, message: 'Please input your restaurant address',
              }]
            })(
              <Input prefix={<Icon type="environment" style={{color: 'rgba(0,0,0,0.25)'}}/>}/>
            )}
          </FormItem>
          <FormItem label="详情" {...formItemLayout}>
            {getFieldDecorator('detail', {
              rules: [{
                // required: true, message: 'Please input your restaurant detail',
              }]
            })(
              <Input.TextArea rows={4}/>
            )}
          </FormItem>
          <FormItem {...formItemLayout}>
            {/* 身份体验 */}
            <Button type="danger" disabled="false">修改</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const rRestaurant = Form.create({})(Restaurant);

export default rRestaurant;
