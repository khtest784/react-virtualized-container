import React, { Component } from "react";
import ReactDom from "react-dom";

import Table from "../table";
import Textview from "../components/textview"; //component 예시
import Pagination from "../components/pagination";
import Counter from "../testcounter";
import Gridcheckbox from "../components/gridcheckbox"

//for Table
const columnOption = {
  0: {
    0: { id: "column00", colspan: 2, rowspan: 2 },
    1: { id: "column01", width: "50px" },
    2: { id: "column02", rowspan: 3 },
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

const headColumnOption = {
  0: {
    0: { id: "head00", colspan: 2, rowspan: 2 },
    1: { id: "head01", width: "50px" },
    2: { id: "head02", rowspan: 3 },
    3: { id: "head03" },
    4: { id: "head04" },
    5: { id: "head05", rowspan: 3, width: "50px" },
    6: { id: "head06" },
    7: { id: "column07" },
    8: { id: "column08" },
    9: { id: "column09" }
  },
  1: {
    0: { id: "head10" },
    1: { id: "head11", width: "50px" },
    2: { id: "head12" },
    3: { id: "head13", rowspan: 2 },
    4: { id: "head14" },
    5: { id: "head15", width: "50px" },
    6: { id: "head16" },
    7: { id: "column07" },
    8: { id: "column08" },
    9: { id: "column09" }
  },
  2: {
    0: { id: "head20" },
    1: { id: "head21", width: "50px" },
    2: { id: "head22" },
    3: { id: "head23" },
    4: { id: "head24" },
    5: { id: "head25", width: "50px" },
    6: { id: "head26" },
    7: { id: "column27" },
    8: { id: "column28" },
    9: { id: "column29" }
  }
};

const headRowOption = {
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

function cellmaker({ dataIndex, cidx, ckey, rowinfoIndex }) {
  const color = ["blue", "pink", "red", "orange", "yellow","sky"];
  const style = {
    //backgroundColor: color[dataIndex%6],
    height: "100%"
  }; //보류

  let data = "row:" + dataIndex + "col:" + cidx;

  if(cidx==0){
    return(
      <div key={ckey} style={style}>
      <Gridcheckbox
        isHead={false}
        dataIndex={dataIndex}
        rowinfoIndex={rowinfoIndex}
      ></Gridcheckbox>
      </div>
    )
  }

  return (
    <div key={ckey} style={style}>
      {data}
      <br />
      {"BodyContent"}
    </div>
  );
}

function headCellmaker({ dataIndex, cidx, ckey, rowinfoIndex }) {
  const color = ["grey","red", "pink", "blue", "orange", "yellow","sky"];
  const style = {
    backgroundColor: color[dataIndex%6],
    height: "100%"
  }; //보류

  let data = "row:" + dataIndex + "col:" + cidx;

  if(cidx==0){
    return(
      <div key={ckey} style={style}>
      <Gridcheckbox
        isHead={true}
        dataIndex={dataIndex}
        rowinfoIndex={rowinfoIndex}
      ></Gridcheckbox>
      </div>
    )
  }

  return (
    <div key={ckey} style={style}>
      {data}
      <br />
      {"headContent"}
    </div>
  );
}


class TableExample extends Component {
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
        <h1>Complex Structure TABLE ( essential bind)</h1>
        <Table
          id="tableSample"
          cellmaker={cellmaker}
          head-cellmaker={headCellmaker}
          head-row-option={headRowOption}
          row-option={rowOption}
          items={testarr}
          column-option={columnOption}
          head-column-option={headColumnOption}
          layout-width="750px"
          pivot-column-index="0"
          layout-height="400px"
          page-length="10"
          page={this.state.page}
        ></Table>
        <Pagination
          id="paginationSample"
          onPageChange={this.handlePageClick}
        ></Pagination>
      </div>
    );
  }
}

export default TableExample;
