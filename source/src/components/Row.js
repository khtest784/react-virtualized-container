import React, { Component } from 'react';
import Cell from "./Cell";
class Row extends Component{
  constructor(props) {
      super(props);
      this.state = {
          ...props,
      }
      this.myRef = React.createRef();
  }
  render(){
      const dataIndex = this.props['data-index'];
      let toppos = this.state['toppos']+"px";//this.state['row-height'] * dataIndex +"px";//this.state랑 명백히다름 porps를 쓰는이유는 그떄그떄 바뀜 constructor이후로 state는 업데이트가안됨

      const style={
          zIndex:0,
          boxSizing: 'border-box',
          width:"100%",
          height:this.props['row-height']+"px",
          padding:'0px',
          margin:'0px',
          position:this.props["static"]?"relative":"absolute",
          transform: "translateY("+toppos+")",
      }
      let classRow = classNames({
          "selected":this.props.selected,
          ["row_"+dataIndex]:true,
          "top-listview-list":true,
      })
          return(
              <div style={style} data-index={this.props['data-index']}   className={classRow}  id={this.state.id} key={this.state.key}  ref={this.myRef}>
                  {this.props.children}
              </div>
          );
  }
}

export default Row;
