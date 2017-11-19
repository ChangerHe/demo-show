import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

// 引入amazeUI的文件
import 'amazeui-touch/dist/amazeui.touch.min.css';

// 引入amaze组件
// import {Icon} from 'amazeui-touch'

// ReactDOM.render(
// 	<Icon name='back'></Icon>,
// 	document.getElementById('app')
// )

import Login from './components/login';
import Register from './components/register';
import Index from './components/index';

// console.log(Router, Route, hashHistory)

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={Login}/>
    <Route path='/register' component={Register}/>
    <Route path='/index' component={Index}/>
  </Router>, document.getElementById('app')
)

// Render the main component into the dom
// ReactDOM.render(<Index />, document.getElementById('app'));
