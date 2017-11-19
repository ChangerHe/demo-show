import React from 'react'
// import ReactDOM from 'react-dom'

// 引入amazeUI的文件
// import 'amazeui-touch/dist/amazeui.touch.min.css';
import {
  Grid,
  Col,
  Group
} from 'amazeui-touch';
import '../style/singlead.css'

class SingleAD extends React.Component {
  render() {
    return (
      // <div>111111111111111111111</div>
      <section className='single-adv'>
        <Group>
          <Grid>
            <Col cols={2}>
              <img src='../images/ad_03.jpg' />
            </Col>
            <Col cols={4}>
              <p>周边幸福, 五折起秒, 最后三天, 买到就是赚到, 老板带着小姨子跑啦</p>
            </Col>
          </Grid>
        </Group>
      </section>
    )
  }
}

export default SingleAD
