import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";


import TableExample from "./example/table_example";
import ListExample from "./example/list_example";
import GridExample from "./example/grid_example";
import "./style/defaultstyle.css";


const GlobalStyle = createGlobalStyle`
  body {
    font-size:15px;
    fomt-family:'Hind' , sans-serif;
  }
`;


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <h1>Virtual Container Component</h1>
        <h1>use it easy, but more comfortable</h1>
        <div>
        <ul>
          <li>
            <Link to={'/'}>HOME</Link>
          </li>
          <li>
            <Link to={'/complexLIst'}>Complexed List</Link>
          </li>
          <li>
            <Link to={'/complexTable'}>Complexed Table</Link>
          </li>
          <li>
            <Link to={'/Grid'}>Grid</Link>
          </li>
        </ul>
        <Route path="/complexLIst" component={ListExample} />
        <Route path="/complexTable" component={TableExample} />
        <Route path="/Grid" component={GridExample} />
        </div>
        <GlobalStyle/>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;

ReactDom.render(<App />, document.getElementById('root'));
