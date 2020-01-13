import React, { Component } from "react";
import styled from "styled-components";

const Cellst = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  text-align: center;
  font-size: 15px;
  padding: 0px;
  margin: 0px;
  border: 1px solid #f3f4f6;
`; //route기능과 사용불가

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
    this.myRef = React.createRef();
  }
  render() {
    let leftpos = this.props["left"] + "px"; //this.props["cidx"]*150+"px";

    const style = {
      transform: "translateX(" + leftpos + ")",
      visibility: this.state["visible"],
      height: this.props["height"] + "px",
      width: this.props["width"]
    };
    let classCell = classNames({
      selected: this.props.selected,
      ["column_list"]: true,
      cell: true
    });
    return (
      <div
        data-index={this.props["data-index"]}
        style={style}
        className={classCell}
        ref={this.myRef}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Cell;
