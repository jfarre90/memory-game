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
    
    const initialBoxes = [
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
    
    let boxes = initialBoxes.slice();
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
        if (idsToChange.includes(b.id)) {
          return{
            ...b,
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
    const hiddenBoxes = this.state.boxes.filter(b => b.boxState === BoxState.HIDING
    );
    
    let boxes;
    
    
    if (hiddenBoxes.length === 0) {
      boxes = 
        <div>
          <h1>WINNER, WINNER, CHICKEN DINNER!!!!!</h1>
        </div> 
    } else {
      boxes = this.state.boxes.map((b) => (
        <Box 
          key={b.id} 
          showing={b.boxState !== BoxState.HIDING}
          matched={b.boxState === BoxState.MATCHING}
          backgroundColor={b.backgroundColor}
          onClick={()=>this.handleClick(b.id)}
        /> 
      ));
    }
    
    return (
      <div>
        <Navbar onNewGame={this.handleNewGame} />
        <div className="box-container">
          {boxes}
        </div>
      </div>
    );
  }
}

export default App;
