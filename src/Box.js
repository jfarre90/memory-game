import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Box.css';

class Box extends Component {
  static PropTypes = {
    id: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    showing: PropTypes.bool.isRequired
  }
  
  render() {
    let style = {};
    if (this.props.showing) {
      style.backgroundColor = this.props.backgroundColor;
    }
    
    return (
      <div className="box" style={style}></div>
    );
  }
}

export default Box;