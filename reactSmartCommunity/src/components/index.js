import React from 'react';

import Header from './header'
// import Line from './line'
// import Singlead from './singlead'
import Subtab from './subtab'
import '../style/index.css'
// 引入amazeUI的文件
import 'amazeui-touch/dist/amazeui.touch.min.css';
import {
  Container,
  Group,
  TabBar,
  // Icon,
  // Badge,
  // amStyles,
  Slider
} from 'amazeui-touch';

const TabBarExample = React.createClass({
  propTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return {
      selected: 0
    }
  },
  getDefaultProps() {
    return {

    }
  },
  handleClick(key, e) {
    e.preventDefault();
    console.log(key, e)
    this.setState({
      selected: key
    }, function () {
      console.log('选中了： %s', this.state.selected);
    });
  },
  render() {
    console.log('this.props', this.props)
    //从父组件中接收所有的传入属性
    var location = this.props.location;
    var children = this.props.children;
    console.log(location, children)
    return (
      <Container className='index-content'>
        {/* 头部 */}
        <Header ico='search' title='购物' className='index-title'></Header>
        {/* 中间的大容器 */}
        <Container className='big-content'>
          {/* {React.cloneElement(children, { key: location.key })} */}
          {this.props.children}
        </Container>
        {/* 下方的底部tab */}
        <Subtab className='index-footer'/>


      </Container>
    );
  }

});
// test
export default TabBarExample;
