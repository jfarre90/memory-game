import React from 'react';
import PropTypes from 'prop-types';
import './Box.css';


const Box = (props) => {
  let style = {};
  if (props.showing && !props.matched) {
    style.backgroundColor = props.backgroundColor;
  } else if (props.matched) {
    style.opacity = 0;
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
  matched: PropTypes.bool.isRequired,
  showing: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Box;