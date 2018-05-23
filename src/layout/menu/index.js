import React from 'react';
import { Menu, Icon } from 'antd';
import css from './indec.less';

export default class mMenu extends React.Component {

  render() {
    return (
     <div className={css.outer}>
       <Menu
         style={{height: '100%'}}
         // defaultSelectedKeys={['1']}
         // defaultOpenKeys={['sub1']}
         mode="inline"
         theme="dark"
         onClick={( item, key, keyPath ) => {
           this.props.memberSetting(item.key);
         }}
       >
         <Menu.Item key="1">人员管理</Menu.Item>
         <Menu.Item key="2">订单管理</Menu.Item>
         <Menu.Item key="3">餐馆信息管理</Menu.Item>
       </Menu>
     </div>
    );
  }
}
