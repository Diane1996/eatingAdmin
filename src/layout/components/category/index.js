import React from 'react';
import {Table, Icon, Divider} from 'antd';

export default class Category extends React.Component {
  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="#">{text}</a>
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        // render: text => <a href="#">{text}</a>
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        // render: text => <a href="#">{text}</a>
      }, {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a href="#">Delete</a>
      }];
    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No.1 Lake Park'
      }, {
        key: '2',
        name: 'John Brown',
        age: 32,
        address: 'New York No.1 Lake Park'
      }, {
        key: '3',
        name: 'John Brown',
        age: 32,
        address: 'New York No.1 Lake Park'
      }];
    return (
      <div>
        <Table columns={columns} dataSource={data}/>
      </div>
    );
  }
}
