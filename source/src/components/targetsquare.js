import React, { Component } from "react";
//import ContainerRow from "./Row";
import styled from "styled-components";

class TargetSquare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loc:[0,0],
      pos:[0,0],
      rect:[70,20],
    };
  }
  componentDidMount(){
  }
  componentDidUpdate() {
    //this.input.focus();
  }
  componentWillUpdate() {

  }
  getCursor(e){
    this.input.focus();
  }
  textChange = (e) =>{
    //e.stopPropagation();
    const {loc} = this.state;
    this.props.data[loc[0]][loc[1]] = this.input.value;
    this.forceUpdate();
  }
  updateSheet = (e) =>{
    this.props.trigger();
  }
  render() {
    const {rect,loc,pos} = this.state;
    const {data} = this.props;

    const sqstyle = {
      border:"2px solid black",
      width:rect[0],
      height:rect[1],
      position:"absolute",
      overflow:"hidden",
      zIndex:10,
      left:pos[0],
      top:pos[1],
    }
    const inputstyle={
      width:"100%",
      height:"100%",
    }
    return(
      <div
      style={sqstyle}
      >
      <input
        style={inputstyle}
        ref={ref => {
        this.input = ref;
        }}
        onScroll={(e)=>e.preventDefault()}
        onChange={this.textChange}
        onBlur={this.updateSheet}
        onClick={(e)=>this.getCursor(e)}
        type="text"
        value={data[loc[0]][loc[1]]}
        >
       </input>
      </div>
    )
  }

}
export default TargetSquare;
