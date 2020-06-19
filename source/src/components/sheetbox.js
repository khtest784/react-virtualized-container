import React, { Component } from "react";
//import ContainerRow from "./Row";
import styled from "styled-components";

class SheetBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
    this.page = null;
  }
  componentDidMount(){
    var canvas = this.page;
    var ctx = canvas.getContext("2d");
    this.ctx = ctx;
    var rectangle = new Path2D();
    this.rectangle = rectangle;
    //ctx.clearRect(0, 0, ctx.width, ctx.height);
    const {data,fromx,fromy,hcolumns,vcolumns,hacc,vacc} = this.props;
      for (var i = 0; i < 25; i++){
        for (var j = 0; j < 25; j++){
        ctx.font = "25px";
        let text = data[fromx+i][fromy+j]//i+"-"+j;
        ctx.strokeText(text , hacc[fromx + i] - hacc[fromx], vacc[fromy + j+1] - vacc[fromy]);
        ctx.lineWidth = "1";
        ctx.strokeStyle = "grey";
        rectangle.rect(hacc[fromx + i] - hacc[fromx], vacc[fromy + j] - vacc[fromy], hcolumns[fromx+i], vcolumns[fromy+j]);
        }
    }
    ctx.stroke(rectangle);
  }
  componentDidUpdate() {
    var canvas = this.page;
    var ctx = this.ctx;
    ctx.clearRect(0, 0, this.page.width, this.page.height);
    var rectangle = new Path2D();
    const {data,fromx,fromy,hcolumns,vcolumns,hacc,vacc} = this.props;
      for (var i = 0; i < 25; i++){
        for (var j = 0; j < 25; j++){
        ctx.font = "25px";
        let text = data[fromx+i][fromy+j]//i+"-"+j;
        ctx.strokeText(text , hacc[fromx + i] - hacc[fromx], vacc[fromy + j+1] - vacc[fromy]);
        ctx.lineWidth = "1";
        ctx.strokeStyle = "grey";
        rectangle.rect(hacc[fromx + i] - hacc[fromx], vacc[fromy + j] - vacc[fromy], hcolumns[fromx+i], vcolumns[fromy+j]);
        }
    }
    ctx.stroke(rectangle);
  }
  componentWillUpdate() {}
  render() {
    const pagestyle={
        top:this.props.top,
        left:this.props.left,
        position:"absolute",
    }
    return(
      <canvas
      style={pagestyle}
      ref={ref => {
        this.page = ref;
      }}
      id="myCanvas" width={this.props.width} height={this.props.height}>
      Your browser does not support the canvas element.
      </canvas>
    );
  }

}
export default SheetBox;
