import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute} from 'react-router';

// 引入amazeUI的文件
import 'amazeui-touch/dist/amazeui.touch.min.css';
import './style/style-fixed.css'

// import Index from './components/index'
import Login from './components/login';
import Register from './components/register';
import Indexs from './components/index';
import Service from './components/service';
import Community from './components/community';
import Mine from './components/mine';
import Indextab from './components/indextab';

// console.log(Router, Route, hashHistory)

// ReactDOM.render(
//   <Router history={hashHistory}>
//     <Route path='/' component={Login}/>
//     <Route path='/register' component={Register}/>
//     <Route path='/index' component={Index}>
//       <IndexRoute component={Indextab} />
//       <Route path='service' component={Service} />
//       <Route path='community' component={Community} />
//       <Route path='mine' component={Mine} />
//       <Route path='index-content' component={Indextab}/>
//     </Route>
//   </Router>, document.getElementById('app')
// )
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={Login}/>
    <Route path='/register' component={Register}/>
    <Route path='/index' component={Indexs}>
      <IndexRoute component={Indextab} />
      <Route path='service' component={Service} />
      <Route path='community' component={Community} />
      <Route path='mine' component={Mine} />
      <Route path='indextab' component={Indextab}/>
    </Route>
  </Router>, document.getElementById('app')
)

// Render the main component into the dom
// ReactDOM.render(<Index />, document.getElementById('app'));
