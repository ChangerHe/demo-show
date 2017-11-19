import React from 'react'

import '../style/login.css'

class Login extends React.Component {
  toIndex() {
    window.location.href = '#/index'
  }
	render() {
		return (
			<section id='login'>
				<header>
					<img src='../images/logo.jpg' />
					<h1 className='login-title'>智  天  下</h1>
				</header>
				<form className='login-form'>
          {/* <i className="fa fa-mobile ico"></i> */}
					<input className='login-input' type='text' placeholder='18576474883' />
          <i className='ico icon-mobile'></i>
          <input className='login-input' type='password' placeholder='******' />
          <i className='ico icon-lock'></i>
          <input className='login-input login-button' type='button' value='登陆' onClick={this.toIndex}/>
				</form>
				<p className='login-forget'>
          <a href='#'>忘记密码 ?</a>
        </p>
				<div className='login-sign' id='test'>
					<a href='#/register'>免费注册</a>
					<a href='#'>游客登陆</a>
				</div>
			</section>
		)
	}
}

export default Login
