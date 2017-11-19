import React from 'react'
import '../style/register.css'

class Register extends React.Component {
  render() {
    return (
      <section id='register'>
        <header>
          <p>注册</p>
        </header>
        <form className='register-form'>
          <div>
            <p className='input-area'>
              <label htmlFor='area'>片&emsp;&emsp;区</label>
              <input type='text' placeholder='泸州政法委' id='area'/>
            </p>
            <p className='input-area'>
              <label htmlFor='area'>手 &nbsp;机 &nbsp;号</label>
              <input type='text' placeholder='泸州政法委' id='area'/>
            </p>
            <p className='input-area'>
              <label htmlFor='area'>密&emsp;&emsp;码</label>
              <input type='text' placeholder='泸州政法委' id='area'/>
            </p>
            <p className='input-area'>
              <label htmlFor='area'>确认密码</label>
              <input type='text' placeholder='泸州政法委' id='area'/>
            </p>
            <p className='input-area'>
              <label htmlFor='area'>验&nbsp; 证 &nbsp;码</label>
              <input type='text' placeholder='泸州政法委' id='area'/>
              <span>请输入验证码</span>
            </p>
          </div>
          <p className='checkbox-area'>
            <input type='checkbox' placeholder='泸州政法委' id='area'/>
            <label htmlFor='area'>同意接受智慧社区Life使用协议</label>
          </p>
          <button>下一步</button>
        </form>
      </section>
    )
  }
}

export default Register
