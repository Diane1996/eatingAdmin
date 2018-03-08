import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, Router, Route } from 'react-router';

import AddFood from './../components/addFood';

// const routes = [{
//   path: 'index',
//   breadcrumbName: '首页'
// }, {
//   path: 'first',
//   breadcrumbName: '一级面包屑'
// }, {
//   path: 'second',
//   breadcrumbName: '当前页面'
// }];

// function itemRender(route, params, routes, paths) {
//   const last = routes.indexOf(route) === routes.length - 1;
//   return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
// }

export default class MyRoute extends React.Component {

  // itemRender(route, params, routes, paths) {
  //   const last = routes.indexOf(route) === routes.length - 1;
  //   return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
  // }

  render() {
    // return (
    //   <Breadcrumb>
    //     <Breadcrumb.Item>Home</Breadcrumb.Item>
    //     <Breadcrumb.Item>Application1</Breadcrumb.Item>
    //     <Breadcrumb.Item>Application2</Breadcrumb.Item>
    //   </Breadcrumb>
    // );

    return (
       <Router>
         <Route path="/">
           <Route path="about" component={AddFood}/>
            {/*<Route path="index" component={Index}/>*/}
         </Route>
       </Router>
    );

    // return <Breadcrumb itemRender={itemRender} routes={routes}/>;
  }
}
