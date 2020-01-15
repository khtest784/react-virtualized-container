import React, { Component } from "react";
import { containerinfo } from "../table";

class Gridcheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
    this.myRef = React.createRef();
  }
  render() {
    let style = {
      position: "absolute",
      top: "25%",
      left: "45%"
    };

    const classchk = classNames({});
    const { dataIndex, rowinfoIndex } = this.props;
    return (
      <containerinfo.Consumer>
        {({ checkHeeadtoBody, checkBodytoHead, eventinfo , headeventinfo }) => (
          <input
            style={style}
            type="checkbox"
            onChange={(event) => {
              this.props.isHead
                ? checkHeeadtoBody(event, dataIndex, rowinfoIndex)
                : checkBodytoHead(event, dataIndex, rowinfoIndex);
            }}
            checked={
              this.props.isHead
                ? headeventinfo[dataIndex][rowinfoIndex].checked
                : eventinfo[dataIndex][rowinfoIndex].checked
            }
          ></input>
        )}
      </containerinfo.Consumer>
    );
  }
}

export default Gridcheckbox;
