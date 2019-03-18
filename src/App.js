import React, {Component} from 'react';
import Shuffle from 'shuffle-array';
import Navbar from './Navbar';
import DisplayBoxes from 'DisplayBoxes';
import './App.css';


//Each box can be either hiding, showing or matching, hence the following 3 states:
const BoxState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
}

class App extends Component {
  constructor(props) {
    super(props);
    
    let boxes = [
      {id:0, boxState: BoxState.HIDING, backgroundColor: 'red'},
      {id:1, boxState: BoxState.HIDING, backgroundColor: 'red'},
      {id:2, boxState: BoxState.HIDING, backgroundColor: 'navy'},
      {id:3, boxState: BoxState.HIDING, backgroundColor: 'navy'},
      {id:4, boxState: BoxState.HIDING, backgroundColor: 'green'},
      {id:5, boxState: BoxState.HIDING, backgroundColor: 'green'},
      {id:6, boxState: BoxState.HIDING, backgroundColor: 'yellow'},
      {id:7, boxState: BoxState.HIDING, backgroundColor: 'yellow'},
      {id:8, boxState: BoxState.HIDING, backgroundColor: 'black'},
      {id:9, boxState: BoxState.HIDING, backgroundColor: 'black'},
      {id:10, boxState: BoxState.HIDING, backgroundColor: 'purple'},
      {id:11, boxState: BoxState.HIDING, backgroundColor: 'purple'},
      {id:12, boxState: BoxState.HIDING, backgroundColor: 'pink'},
      {id:13, boxState: BoxState.HIDING, backgroundColor: 'pink'},
      {id:14, boxState: BoxState.HIDING, backgroundColor: 'lightskyblue'},
      {id:15, boxState: BoxState.HIDING, backgroundColor: 'lightskyblue'}
    ];
    
    boxes= Shuffle(boxes);
    this.state = {boxes, noClick:false};
    
    this.onSelection = this.onSelection.bind(this);
  }
  
  render() {
    return (
      <div className="App">
        <Navbar />
        <DisplayBoxes boxes={this.state.boxes} />
      </div>
    );
  }
}

export default App;
