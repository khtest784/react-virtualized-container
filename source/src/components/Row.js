import React, { Component } from 'react';
import Cell from "./Cell";
import styled from 'styled-components';

const Rowst = styled.div`
  zIndex:0;
  boxSizing:border-box;
  width:100%;
  padding:0px;
  margin:0px;
`;

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
      const toppos = this.state['toppos']+"px";

      const style={
          transform: "translateY("+toppos+")",
          //height:this.props['row-height']+"px",
      }

      let classRow = classNames({
          "selected":this.props.selected,
          ["row_"+dataIndex]:true,
      })
          return(
              <Rowst style={style} data-index={this.props['data-index']}   className={classRow}  id={this.state.id} key={this.state.key}  ref={this.myRef}>
                  {this.props.children}
              </Rowst>
          );
  }
}

export default Row;
