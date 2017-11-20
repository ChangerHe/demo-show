import React from 'react';
import Header from './header'
import Servicesub from './servicesub'
// import Subtab from './subtab'

import '../style/service.css'
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

const Service = React.createClass({
  render() {
    return (
      <Container className='service-content'>
        {/* 头部 */}
        <Header ico='' title='服务' className='index-title'></Header>
        {/* 中间的大容器 */}
        <Container className='big-content'>
          <h1 className='service-title'>政务服务</h1>
          <div className='service-ad'>
            <Servicesub image='../images/s1.jpg' title='政府公告'/>
            <Servicesub image='../images/s2.jpg' title='政府公告'/>
            <Servicesub image='../images/s3.png' title='政府公告'/>
            <Servicesub image='../images/s4.png' title='政府公告'/>
            <Servicesub image='../images/s5.jpg' title='政府公告'/>
            <Servicesub image='../images/s6.jpg' title='政府公告'/>
            <Servicesub image='../images/more.jpg' title='政府公告'/>
          </div>
          <h1 className='service-title'>生活服务</h1>
          <div className='service-ad'>
            <Servicesub image='../images/l1.jpg' title='政府公告' />
            <Servicesub image='../images/l2.jpg' title='政府公告' />
            <Servicesub image='../images/l3.jpg' title='政府公告' />
            <Servicesub image='../images/l4.jpg' title='政府公告' />
            <Servicesub image='../images/l5.jpg' title='政府公告' />
            <Servicesub image='../images/l6.png' title='政府公告' />
            <Servicesub image='../images/l7.jpg' title='政府公告' />
            <Servicesub image='../images/l8.jpg' title='政府公告' />
            <Servicesub image='../images/l9.jpg' title='政府公告' />
            <Servicesub image='../images/l10.jpg' title='政府公告' />
            <Servicesub image='../images/more.jpg' title='政府公告' />
          </div>
        </Container>
        {/* 下方的底部tab */}
        {/* <Subtab className='service-footer' /> */}
      </Container>
    );
  }
});
// test
export default Service;
