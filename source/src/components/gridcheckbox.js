import React, { Component } from "react";
class Gridcheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
    this.myRef = React.createRef();
  }
  checkhandle = () => {
    console.log(this);
    this.state.eventinfo.checked = event.target.checked;
  };
  render() {
    let style = {
      position: "absolute",
      top: "25%",
      left: "45%"
    };

    let classchk = classNames({});
    return (
      <input
        style={style}
        type="checkbox"
        onChange={this.checkhandle}
        checked={this.props.checked}
      ></input>
    );
  }
}

export default Gridcheckbox;
