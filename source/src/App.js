import React, { Component } from "react";

//style sheet
import "./style/test.css";

import List from "./list";
import Table from "./table";
import Textview from "./components/textview";//component 예시
import Pagination from "./components/pagination";
import ReactDom from "react-dom";


var testIns = [
  {name: "Abet", phone: "010-0000-0001",location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "Betty", phone: "010-0000-0002",location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "Charlie", phone: "010-0000-0003",location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "David", phone: "010-0000-0004",location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "jack", phone: "010-0000-0005",location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "steve", phone: "010-0000-0006" ,location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "doll", phone: "010-0000-0007" ,location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "Abet2", phone: "010-0000-0001" ,location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "Betty2", phone: "010-0000-0002" ,location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "Charlie2", phone: "010-0000-0003" ,location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "David2", phone: "010-0000-0004" ,location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "jack2", phone: "010-0000-0005" ,location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "steve2", phone: "010-0000-0006" ,location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "doll2", phone: "010-0000-0007" ,location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "Abet3", phone: "010-0000-0001" ,location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "Betty3", phone: "010-0000-0002" ,location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "Charlie3", phone: "010-0000-0003" ,location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "David3", phone: "010-0000-0004" ,location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "jack3", phone: "010-0000-0005" ,location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "steve3", phone: "010-0000-0006" ,location:"seoul", address:"chenho-daro-1120", job:"student"},
  {name: "doll3", phone: "010-0000-0007" ,location:"seoul", address:"chenho-daro-1120", job:"student"},
];

var color = ['red','orange','grape','pineapple','banana'];

const rows = {
0:{id:"testrow0"},
//1:{},
//2:{}
}

const columns = {
  0:{id:"testcol0", layoutWidth:'100px',src:"레잉아웃id"},
  1:{id:"testcol1", layoutWidth:'120px'},
  2:{id:"testcol2", layoutWidth:'140px'},
  3:{id:"testcol3", layoutWidth:'160px'},
  4:{id:"testcol4", layoutWidth:'180px'},
  5:{id:"testcol5", layoutWidth:'120px'},
  6:{id:"testcol6", layoutWidth:'140px'},
  7:{id:"testcol7", layoutWidth:'160px'},
  8:{id:"testcol8", layoutWidth:'180px'},
  9:{id:"testcol9", layoutWidth:'200px'},
  10:{id:"testcol10", layoutWidth:'300px'},
}


//for Table
const columnOption =
{
  0:{0:{id:"column00",colspan:2,rowspan:2},1:{id:"column01",width:"50px"},2:{id:"column02",rowspan:2},3:{id:"column03"},4:{id:"column04"},5:{id:"column05",rowspan:3,width:'50px'},6:{id:"column06"},7:{id:"column07"},8:{id:"column08"},9:{id:"column09"}},
  1:{0:{id:"column00"},1:{id:"column01",width:"50px"},2:{id:"column02"},3:{id:"column03",rowspan:2},4:{id:"column04"},5:{id:"column05",width:'50px'},6:{id:"column06"},7:{id:"column07"},8:{id:"column08"},9:{id:"column09"}},
  2:{0:{id:"column00"},1:{id:"column01",width:"50px"},2:{id:"column02"},3:{id:"column03"},4:{id:"column04"},5:{id:"column05",width:'50px'},6:{id:"column06"},7:{id:"column07"},8:{id:"column08"},9:{id:"column09"}},
}

const rowOption={
  0:{height:"30px"},
  1:{height:"40px"},
  2:{height:"50px"},
}

const headColumnOption = {
  0:{0:{id:"head00",colspan:2,rowspan:2},1:{id:"head01",width:"50px"},2:{id:"head02",rowspan:2},3:{id:"head03"},4:{id:"head04"},5:{id:"head05",rowspan:3,width:'50px'},6:{id:"head06"},7:{id:"column07"},8:{id:"column08"},9:{id:"column09"}},
  1:{0:{id:"head10"},1:{id:"head11",width:"50px"},2:{id:"head12"},3:{id:"head13",rowspan:2},4:{id:"head14"},5:{id:"head15",width:'50px'},6:{id:"head16"},7:{id:"column07"},8:{id:"column08"},9:{id:"column09"}},
  2:{0:{id:"head20"},1:{id:"head21",width:"50px"},2:{id:"head22"},3:{id:"head23"},4:{id:"head24"},5:{id:"head25",width:'50px'},6:{id:"head26"},7:{id:"column27"},8:{id:"column28"},9:{id:"column29"}},
};

const headRowOption = {
  0:{height:"30px"},
  1:{height:"40px"},
  2:{height:"50px"},
}



function cellRenderer({columnIndex, key, dataIndex}) {//dataindex는 rowindex
  return;
  const style ={

  }//보류

  let bindvalue="";
  switch(columnIndex){
    case 0:
      bindvalue="name";
      break;
    case 1:
      bindvalue="phone";
      break;
    case 2:
    bindvalue="location";
      break;
    case 3:
    bindvalue="address";
      break;
    default:
    bindvalue="job";
    break;
  }

  return (
    <div key={key} style={style}>
      <div>{color[dataIndex%5]}</div>
      {testIns[dataIndex][bindvalue]}
      {'hello world'}
      <Textview text={testIns[dataIndex][bindvalue]}></Textview>
    </div>
  );
}

var testarr = new Array(100).fill(null).map((data,index)=>{
  return {
    "col0" : "text0"+index,
    "col1" : "text1"+index,
    "col2" : "text2"+index,
    "col3" : "text3"+index,
    "col4" : "text4"+index,
    "col5" : "text5"+index,
    "col6" : "text6"+index,
    }
})



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page:1,
    }
  }

  handlePageClick = (obj) => {
    this.setState({page:obj.selected+1})
  }

  render() {
    return (
      <div>
        <List id="ListSample"
          row-option={rowOption}
          items={testarr}
          column-option={columnOption}
          layout-width="600px"
          layout-height="500px"
          >
        </List>
        <Table
        id="tableSample"
        head-row-option={headRowOption}
        row-option={rowOption}
        items={testarr}
        column-option={columnOption}
        head-column-option={headColumnOption}
        layout-width="750px"
        pivot-column-index="2"
        layout-height="400px"
        page-length="10"
        page={this.state.page}
        >
        </Table>
        <Pagination
        id="paginationSample"
        onPageChange={this.handlePageClick}
        >
        </Pagination>
      </div>
    );
  }
}


export default App;

ReactDom.render(<App />, document.getElementById('root'));
