import React from 'react';

import Header from './header'
import Line from './line'
import Singlead from './singlead'
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


// 轮播相关

// const onAction = function (index, direction) {
//   console.log('激活的幻灯片编号：', index, '，滚动方向：', direction);
// };
const data = [
  {
    img: 'http://s.amazeui.org/media/i/demos/bing-1.jpg'
  },
  {
    img: 'http://s.amazeui.org/media/i/demos/bing-2.jpg'
  },
  {
    img: 'http://s.amazeui.org/media/i/demos/bing-3.jpg'
  },
  {
    img: 'http://s.amazeui.org/media/i/demos/bing-4.jpg'
  }
];
const sliderCaption = (
  <Slider>
    {data.map(function (item, i) {
      return (
        <Slider.Item key={i}>
          <img src={item.img} />
        </Slider.Item>
      )
    })}
  </Slider>
)

const TabBarExample = React.createClass({
  render() {
    return (
      <Container className='index-content'>
        {/* 头部 */}
        <Header ico='search' title='购物' className='index-title'></Header>
        {/* 中间的大容器 */}
        <Container className='big-content'>
          {/* 轮播图 */}
          <Container>
            {sliderCaption}
          </Container>
          <Container className='image-com'>
            <div>
              <div className='image'>
                <img src='../images/01.jpg' />
                <span>周边</span>
              </div>
              <div className='image'>
                <img src='../images/02.jpg' />
                <span>周边</span>
              </div>
              <div className='image'>
                <img src='../images/03.jpg' />
                <span>周边</span>
              </div>
              <div className='image'>
                <img src='../images/04.jpg' />
                <span>周边</span>
              </div>
            </div>
            <div>
              <div className='image'>
                <img src='../images/05.jpg' />
                <span>周边</span>
              </div>
              <div className='image'>
                <img src='../images/06.jpg' />
                <span>周边</span>
              </div>
              <div className='image'>
                <img src='../images/07.jpg' />
                <span>周边</span>
              </div>
              <div className='image'>
                <img src='../images/08.jpg' />
                <span>周边</span>
              </div>
            </div>
          </Container>
          {/* 线 */}
          <Line para='' />
          {/* 三栏广告部分 */}
          <Container className='index-ad'>
            <img src='../images/ad_01.jpg' />
            <img src='../images/ad_02.jpg' />
            <img src='../images/ad_03.jpg' />
          </Container>
          {/* 线 */}
          <Line para='猜你喜欢' />
          {/* 单栏广告部分 */}
          <Singlead />
          <Singlead />
          <Singlead />
          <Singlead />
          <Singlead />
          <Singlead />
          <Singlead />
        </Container>
        {/* 下方的底部tab */}
        <Group noPadded className='index-footer'>
          <TabBar>
            <TabBar.Item selected icon="home" title="购物" />
            <TabBar.Item icon="gear" title="服务" />
            <TabBar.Item icon="pages" title="社交" />
            <TabBar.Item icon="person" title="我的" />
          </TabBar>
        </Group>
      </Container>
    );
  }
});
// test
export default TabBarExample;
