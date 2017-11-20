import React from 'react'
// import ReactDOM from 'react-dom'
import '../style/header.css'
import {Icon} from 'amazeui-touch'

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      iconName: '',
      iconClass: ''
    }
  }
  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
        <Icon className={this.state.iconClass} name={this.state.iconName}></Icon>
      </header>
    )
  }
  componentDidMount() {
    // console.log(this.props.ico)
    if(this.props.ico === 'search') {
      this.setState( {
        iconName: 'search',
        iconClass: 'header-righticon'
      })
    } else if (this.props.ico === 'plus') {
      this.setState( {
        iconName: 'plus',
        iconClass: 'header-righticon'
      })
    }
  }
}

export default Header
