import React from 'react';
import {Link} from 'react-router'
// import '../style/index.css'

import Service from './service';
import Community from './community';
import Mine from './mine';
import IndexContent from './indextab';
// 引入amazeUI的文件
import 'amazeui-touch/dist/amazeui.touch.min.css';
import {
  Container,
  Group,
  TabBar
  // Icon,
  // Badge,
  // amStyles,
  // Slider
} from 'amazeui-touch';

const Subtab = React.createClass({
  propTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return {
      selected: 0
    };
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
    console.log(this.props.location)
    console.log(this.props.children)
    console.log(Link)
    // 从父组件中接收路由器 router对象
    const { router } = this.context;
    return (
      <Container>
        {/* 下方的底部tab */}
        <Group noPadded className='index-footer'>
          <TabBar amStyle='secondary' onAction={this.handleClick}>
            <TabBar.Item icon="home" title="购物" href='#/index/' selected={this.state.selected === 0} component={IndexContent}/>
            <TabBar.Item icon="gear" title="服务" href='#/service' selected={this.state.selected === 1} component={Service}/>
            <TabBar.Item icon="pages" title="社交" href='#/community' selected={this.state.selected === 2} component={Community}/>
            <TabBar.Item icon="person" title="我的" href='#/mine' selected={this.state.selected === 3} component={Mine}/>
          </TabBar>
        </Group>
      </Container>
    );
  }
});
// test
export default Subtab;
