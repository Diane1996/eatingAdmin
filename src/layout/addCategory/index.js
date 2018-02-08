import React from 'react';
import { Form, Input, Icon, Switch, Button } from 'antd';
import css from './index.less';

const FormItem = Form.Item;

class addCategory extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form:', values);
      }
    });
  }

  onChange() {
    console.log('change');
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const formItemLayout = {
      labelCol: {
        sm: {span: 4},
      },
      wrapperCol: {
        sm: {span: 20}
      }
    };
    return (
       <div>
         <Form onSubmit={this.handleSubmit}>
           <FormItem label="分类名" {...formItemLayout}>
             {getFieldDecorator('name')(
               <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,0.25)'}}/>}/>
             )}
           </FormItem>
           <FormItem label="分类图片" {...formItemLayout}>
             {getFieldDecorator('image')(
               <Input prefix={<Icon type="picture" style={{color: 'rgba(0,0,0,0.25)'}}/>}/>
             )}
           </FormItem>
           <FormItem label="是否置顶" {...formItemLayout}>
             {getFieldDecorator('switch')(
               <Switch />
             )}
           </FormItem>
           <FormItem {...formItemLayout}>
               <Button
                 type="primary"
                 htmlType="submit"
               >添加</Button>
           </FormItem>
         </Form>
       </div>
    );
  }
 }

const ExAddCategory = Form.create()(addCategory);
export default ExAddCategory;
