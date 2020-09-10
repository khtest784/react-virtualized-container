import React, { Component } from "react";
import Cell from "./Cell";
import { containerinfo } from "../table";
import styled from "styled-components";

const Rowst = styled.div`
  zindex: 0;
  boxsizing: border-box;
  width: 100%;
  padding: 0px;
  margin: 0px;
`; //route기능과 사용불가

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
    this.myRef = React.createRef();
  }
  render() {
    const { dataIndex, rowinfoIndex } = this.props;
    const toppos = this.props["toppos"] + "px";
    const style = {
      transform: "translateY(" + toppos + ")"
      //height:this.props['row-height']+"px",
    };
    let classRow = classNames({});
    return (
      <containerinfo.Consumer>
        {({ selectBody, eventinfo }) => (
          <div
            onClick={event => {
              this.props.isTable
                ? selectBody(event, dataIndex, rowinfoIndex)
                : null;
            }}
            style={style}
            data-index={this.props["data-index"]}
            className={classNames({
              selected: this.props.isTable? eventinfo[dataIndex][rowinfoIndex].selected:false,
              ["row_" + dataIndex]: true,
              row: true
            })}
            id={this.state.id}
            ref={this.myRef}
          >
            {this.props.children}
          </div>
        )}
      </containerinfo.Consumer>
    );
  }
}

export default Row;
