import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Box from 'Box';
import './DisplayBoxes.css';

class DisplayBoxes extends Component {
  
  static PropTypes = {
    boxes: PropTypes.arrayOf(PropTypes.object).isRequired
  }
  
  render() {
    const boxes = this.props.boxes.map((b,i) => (
      <Box key={b.id} {...b} /> 
    ));
    
    return (
      <div className="box-display">
        {boxes}
      </div>
    )
  
  }
}

export default DisplayBoxes;