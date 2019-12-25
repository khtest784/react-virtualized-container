import React, { Component } from 'react';
class Textview extends Component{
  constructor(props) {
      super(props);
      this.state = {
          ...props,
      }
  }

  render(){
          return(
              <div role="textview">
              {this.state.text}
              </div>
          );
  }
}


export default Textview;
