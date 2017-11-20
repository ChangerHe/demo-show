import React from 'react';
import '../style/servicesub.css'

const Servicesub = React.createClass({
  render() {
    return (
      <div className='servicesub'>
        <img src={this.props.image} />
        <p>{this.props.title}</p>
      </div>
    );
  }
});
// test
export default Servicesub;
