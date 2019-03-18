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
      {id:0, boxState: BoxState.HIDING, backgroundColor: 'red', borderColor: 'grey'},
      {id:1, boxState: BoxState.HIDING, backgroundColor: 'red', borderColor: 'grey'},
      {id:2, boxState: BoxState.HIDING, backgroundColor: 'navy', borderColor: 'grey'},
      {id:3, boxState: BoxState.HIDING, backgroundColor: 'navy', borderColor: 'grey'},
      {id:4, boxState: BoxState.HIDING, backgroundColor: 'green', borderColor: 'grey'},
      {id:5, boxState: BoxState.HIDING, backgroundColor: 'green', borderColor: 'grey'},
      {id:6, boxState: BoxState.HIDING, backgroundColor: 'yellow', borderColor: 'grey'},
      {id:7, boxState: BoxState.HIDING, backgroundColor: 'yellow', borderColor: 'grey'},
      {id:8, boxState: BoxState.HIDING, backgroundColor: 'black', borderColor: 'grey'},
      {id:9, boxState: BoxState.HIDING, backgroundColor: 'black', borderColor: 'grey'},
      {id:10, boxState: BoxState.HIDING, backgroundColor: 'purple', borderColor: 'grey'},
      {id:11, boxState: BoxState.HIDING, backgroundColor: 'purple', borderColor: 'grey'},
      {id:12, boxState: BoxState.HIDING, backgroundColor: 'pink', borderColor: 'grey'},
      {id:13, boxState: BoxState.HIDING, backgroundColor: 'pink', borderColor: 'grey'},
      {id:14, boxState: BoxState.HIDING, backgroundColor: 'lightskyblue', borderColor: 'grey'},
      {id:15, boxState: BoxState.HIDING, backgroundColor: 'lightskyblue', borderColor: 'grey'}
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
    const mapBoxState = (boxes, idsToChange, newBoxState) => {
      return boxes.map(b => {
        if (idsToChange.includes(b.id) && newBoxState !== BoxState.MATCHING) {
          return{
            ...b,
            boxState: newBoxState
          };
        } else if (idsToChange.includes(b.id) && newBoxState === BoxState.MATCHING){
          return{
            ...b,
            backgroundColor: 'white',
            borderColor:'white',
            boxState: newBoxState
          };
        }
      return b;
      });
    }
    
    const foundBox = this.state.boxes.find(b => b.id === id);
    
    if (this.state.noClick || foundBox.boxState !== BoxState.HIDING) {
      return;
    }
    
    let noClick = false; //We use this to decide if the user can click again or not.
    
    let boxes = mapBoxState(this.state.boxes, [id], BoxState.SHOWING);
    
    const showingBoxes = boxes.filter((b) => b.boxState === BoxState.SHOWING);
    
    const ids = showingBoxes.map(b => b.id);
    
    if (showingBoxes.length === 2 && 
        showingBoxes[0].backgroundColor === showingBoxes[1].backgroundColor) {
      boxes = mapBoxState(boxes, ids, BoxState.MATCHING);
      
    } else if(showingBoxes.length ===2) {
      let hidingBoxes = mapBoxState(boxes, ids, BoxState.HIDING);
      noClick = true;
      
      this.setState({boxes, noClick}, () => {
        setTimeout(() => {
          //this timeout is to wait for a certain time before making the boxes dissapear
          this.setState({boxes: hidingBoxes, noClick: false});
        }, 1300);
      });
      return;
    }
    
    this.setState({boxes, noClick});
  }
  
  render() {
    const boxes = this.state.boxes.map((b) => (
      <Box 
        key={b.id} 
        showing={b.boxState !== BoxState.HIDING} 
        backgroundColor={b.backgroundColor}
        borderColor={b.borderColor}
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
