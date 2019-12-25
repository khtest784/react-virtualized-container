import React, { Component } from 'react';
class Cell extends Component{
  constructor(props) {
      super(props);
      this.state = {
          ...props,
      }
      this.myRef = React.createRef();
  }
  render(){
      let leftpos = this.props["left"]+"px";//this.props["cidx"]*150+"px";
      //let toppos = this.props["data-index"]*40+"px";
      const style={
          boxSizing: 'border-box',
          width:this.props['width'],//"100%",//"150px",
          overflow:"hidden",
          height:this.state['height']+'px',//"100%",
          //lineHeight:this.state['height']+'px',
          position:"absolute",
          visibility:this.state['visible'],
          textAlign:'center',
          //transform: "translate("+leftpos+","+toppos+")",
          transform: "translateX("+leftpos+")",
          fontSize:"15px",
          padding:'0px',
          margin:'0px',
          border:'1px solid #f3f4f6',
      }
      let classCell = classNames({
          "selected":this.props.selected,
          ['column_list']:true,
      })
          return(
              <div data-index={this.props["data-index"]}  style={style} className={classCell}  ref={this.myRef}>
                 {this.props.children}
              </div>
          );
  }
}


export default Cell;
