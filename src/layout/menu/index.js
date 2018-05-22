import React from 'react';
import { Menu, Icon } from 'antd';
import css from './indec.less';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class mMenu extends React.Component {
  memberSetting(e) {
    console.log(123)
    this.props.memberSetting(e.key);
  }

  render() {
    return (
     <div className={css.outer}>
       <Menu
         style={{height: '100%'}}
         defaultSelectedKeys={['1']}
         defaultOpenKeys={['sub1']}
         mode="inline"
         theme="dark"
       >
       {/*  <SubMenu key="sub1" title={<span><Icon type="user" /><span>权限管理</span></span>}>
           <MenuItemGroup key="g1" title="Item 1">
             <Menu.Item key="2">Option 2</Menu.Item>
           </MenuItemGroup>
         </SubMenu>
     <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>菜品管理</span></span>}>
        <Menu.Item key="5">分类</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </SubMenu> */}
         <Menu.Item key="1" onClick={this.memberSetting.bind(this)}>人员管理</Menu.Item>
         <Menu.Item key="2" onClick={this.memberSetting.bind(this)}>订单管理</Menu.Item>
         <Menu.Item key="3" onClick={this.memberSetting.bind(this)}>餐馆信息管理</Menu.Item>
       </Menu>
     </div>
    );
  }
}
