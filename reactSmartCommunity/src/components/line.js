import React from 'react'
import '../style/line.css'

class Line extends React.Component {
  render() {
    return (
      <div className='line'>
        <p>{this.props.para}</p>
      </div>
    )
  }
}

export default Line
