import React, {Component} from 'react';
import Shuffle from 'shuffle-array';
import Navbar from './Navbar';
import Box from './Box';
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
    
    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }
  
  handleNewGame() {
    let boxes = this.state.boxes.map(b => ({
      ...b,
      boxState: BoxState.HIDING
    }));
    boxes = Shuffle(boxes);
    this.setState({boxes});
  }
  
  handleClick(id) {
    this.setState(prevState => {
      let boxes = prevState.boxes.map(b => (
        b.id === id ? {
          ...b,
          boxState: b.boxState === BoxState.HIDING ? BoxState.MATCHING : BoxState.HIDING
        }  : b
      ));
      return {boxes};
    })
  }
  
  render() {
    const boxes = this.state.boxes.map((b) => (
      <Box 
        key={b.id} 
        showing={b.boxState !== BoxState.HIDING} 
        backgroundColor={b.backgroundColor}
        onClick={()=>this.handleClick(b.id)}
      /> 
    ));
    
    return (
      <div>
        <Navbar onNewGame={this.handleNewGame} />
        {boxes}
      </div>
    );
  }
}

export default App;
