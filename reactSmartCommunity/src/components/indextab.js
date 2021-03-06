import React from 'react';

import Line from './line'
import Singlead from './singlead'
import '../style/index.css'
// 引入amazeUI的文件
import 'amazeui-touch/dist/amazeui.touch.min.css';
import {
  Container,
  Slider
} from 'amazeui-touch';


// 轮播相关

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

class Indextab extends React.Component {
  render() {
    return (
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
        <div className='index-singlead'>
          <Singlead />
          <Singlead />
          <Singlead />
          <Singlead />
          <Singlead />
          <Singlead />
          <Singlead />
        </div>
      </Container>
    );
  }
}

export default Indextab;
