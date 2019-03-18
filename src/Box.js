import React from 'react';
import PropTypes from 'prop-types';
import './Box.css';


const Box = (props) => {
  let style = {};
  if (props.showing) {
    style.backgroundColor = props.backgroundColor;
  }
  
  return (
    <div 
      onClick= {props.onClick} 
      className="box" 
      style={style}
    />
  );
  
}


Box.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  showing: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Box;