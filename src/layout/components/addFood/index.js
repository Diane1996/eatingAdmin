import React from 'react';
import { Form, Input, Button, Upload, Icon, Select } from 'antd';
import axios from 'axios';
const FormItem = Form.Item;
const Option = Select.Option;

class addFood extends React.Component {
  constructor() {
    super();
  }

  handleSubmit() {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        console.log('数据：', value);
        axios.get('http://192.168.1.110:8360/admin/food/getFile', {
          params: value
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
      }
    });
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const formItemLayout = {
      labelCol: {
        sm: {span: 4},
      },
      wrapperCol: {
        sm: {span: 20},
      }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <FormItem label="菜品名" {...formItemLayout}>
          {getFieldDecorator('name')(
            <Input/>
          )}
        </FormItem>
        <FormItem label="分类" {...formItemLayout}>
          {getFieldDecorator('category')(
            <Select>
              <Option value="jack">Jack</Option>
              <Option value="lucy">lucy</Option>
              <Option value="disabled">disabled</Option>
              <Option value="Yiminghe">Yiminghe</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="图片" {...formItemLayout}>
          {getFieldDecorator('image')(
            <Input/>
          )}
        </FormItem>
        <FormItem label="价格" {...formItemLayout}>
          {getFieldDecorator('price')(
            <Input prefix={<Icon type="pay-circle-o"/>}/>
          )}
        </FormItem>
        <FormItem label="描述" {...formItemLayout}>
          {getFieldDecorator('description')(
            <Input.TextArea rows={4}/>
          )}
        </FormItem>
        <FormItem label="上传" {...formItemLayout}>
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            /* action 填写后端接收图片的地址 */
            <Upload name="logo" listType="picture" action="/admin/food/getFile">
              <Button>
                <Icon type="upload"/>Click to upload
              </Button>
            </Upload>
          )}
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
          >提交</Button>
        </FormItem>
      </Form>
    );
  }
}

const wrapperAddFood = Form.create()(addFood);

export default wrapperAddFood;
