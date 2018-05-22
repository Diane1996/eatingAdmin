import React from 'react';
import classnames from 'classnames';
import css from './index.less';
import { Layout } from 'antd';

// import Btn from './button/index';
import Menu from './menu/index';
import Login from './loginForm/index';
import Route from './route/index';
import Restaurant from './components/restaurant/index';
import Category from './components/category/index';
import Order from './components/orderList/index';
import OrderItem from './components/orderItem/index';
import AddCategory from './components/addCategory/index';
import AddFood from './components/addFood/index';

import Admin from './components/administator/index';

const { Header, Footer, Sider, Content } = Layout;

class LLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  memberSetting(key) {
    console.log(key, typeof key);
    this.setState({
      renderComponent: key,
    });
  }

  render() {
    let setPlane = () => {
      switch (this.state.renderComponent) {
        case '1':
          console.log('人员管理');
          renderComponent = <Admin/>;
          break;
        case '2':
          console.log('订单管理');
          renderComponent = <Order/>;
          break;
        case '3':
          console.log('餐馆信息管理');
          renderComponent = <Restaurant />;
          break;
        default :
          console.log('餐馆信息管理');
          renderComponent = <Restaurant />;
      }
      return renderComponent;
    };
    let renderComponent = setPlane();

    return (
      <div className={css.outer}>
        <Layout style={{height: '100%'}}>
          <Header>
            <Login/>
          </Header>
          <Layout style={{height: '100%'}}>
            <Sider
              // trigger={null}
              breakpoint="lg"
              collapsedWidth="0"
            >
              <Menu memberSetting={this.memberSetting.bind(this)}/>
            </Sider>
            <Content style={{padding: 24}}>
              {renderComponent}
              {/* <Route/> */}
              {/* <Restaurant /> */}
              {/* <Category/> */}
              {/* <Order/> */}
              {/* <OrderItem/> */}
              {/* <AddCategory/> */}
              {/* /!*<AddFood/>*!/ */}
            </Content>
          </Layout>
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </div>
    );
  }
}

export default LLayout;
