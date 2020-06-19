import React, { Component } from "react";
import ReactDom from "react-dom";

import List from "../list";
import Table from "../table";
import Textview from "../components/textview"; //component 예시
import Pagination from "../components/pagination";

const columns = {
  0: { id: "testcol0", width: "100px", src: "레잉아웃id" },
  1: { id: "testcol1", width: "120px" },
  2: { id: "testcol2", width: "140px" },
  3: { id: "testcol3", width: "160px" },
  4: { id: "testcol4", width: "180px" },
  5: { id: "testcol5", width: "120px" },
  6: { id: "testcol6", width: "140px" },
  7: { id: "testcol7", width: "160px" },
  8: { id: "testcol8", width: "180px" },
  9: { id: "testcol9", width: "200px" },
  10: { id: "testcol10", width: "300px" }
};

//for Table
const columnOption = {
  0: {
    0: { id: "column00", colspan: 2, rowspan: 2 },
    1: { id: "column01", width: "50px" },
    2: { id: "column02", rowspan: 2 },
    3: { id: "column03" },
    4: { id: "column04" },
    5: { id: "column05", rowspan: 3, width: "50px" },
    6: { id: "column06" },
    7: { id: "column07" },
    8: { id: "column08" },
    9: { id: "column09" }
  },
  1: {
    0: { id: "column00" },
    1: { id: "column01", width: "50px" },
    2: { id: "column02" },
    3: { id: "column03", rowspan: 2 },
    4: { id: "column04" },
    5: { id: "column05", width: "50px" },
    6: { id: "column06" },
    7: { id: "column07" },
    8: { id: "column08" },
    9: { id: "column09" }
  },
  2: {
    0: { id: "column00" },
    1: { id: "column01", width: "50px" },
    2: { id: "column02" },
    3: { id: "column03" },
    4: { id: "column04" },
    5: { id: "column05", width: "50px" },
    6: { id: "column06" },
    7: { id: "column07" },
    8: { id: "column08" },
    9: { id: "column09" }
  }
};

const rowOption = {
  0: { height: "30px" },
  1: { height: "40px" },
  2: { height: "50px" }
};

var testarr = new Array(100).fill(null).map((data, index) => {
  return {
    col0: "text0" + index,
    col1: "text1" + index,
    col2: "text2" + index,
    col3: "text3" + index,
    col4: "text4" + index,
    col5: "text5" + index,
    col6: "text6" + index
  };
});

class ListExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }

  handlePageClick = obj => {
    this.setState({ page: obj.selected + 1 });
  };

  render() {
    return (
      <div>
        <h1>Complex Structure LIST ( essential bind)</h1>
        <List
          id="ListSample"
          rowOption={rowOption}
          items={testarr}
          columnOption={columnOption}
          width="600px"
          height="500px"
        ></List>
        <List
          id="ListSample2"
          rowOption={rowOption}
          items={testarr}
          columnOption={columnOption}
          width="300px"
          height="300px"
        ></List>
      </div>
    );
  }
}

export default ListExample;
