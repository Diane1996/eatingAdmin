import React from 'react';
import classnames from 'classnames';
import css from './index.less';
import { Layout } from 'antd';

import Btn from './button/index';
import Menu from './menu/index';
import Login from './loginForm/index';
import Route from './route/index';
import Restaurant from './components/restaurant/index';
import Category from './components/category/index';
import Order from './components/orderList/index';
import OrderItem from './components/orderItem/index';
import AddCategory from './components/addCategory/index';
import AddFood from './components/addFood/index';

const { Header, Footer, Sider, Content } = Layout;

class LLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
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
              <Menu/>
            </Sider>
            <Content style={{padding: 24}}>
              <Route/>
              {/*<Restaurant />*/}
              {/*<Category/>*/}
              {/*<Order/>*/}
              {/*<OrderItem/>*/}
              {/*<AddCategory/>*/}
              {/*/!*<AddFood/>*!/*/}
            </Content>
          </Layout>
          {/*<Footer>Footer</Footer>*/}
        </Layout>
      </div>
    );
  }
}

export default LLayout;
