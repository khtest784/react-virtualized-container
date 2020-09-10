import React, { Component } from "react";

import VirtualBox from "./components/virtualBox";
import Resizerbox from "./components/resizerbox";
import ReactDom from "react-dom";
import styled from "styled-components";

export const containerinfo = React.createContext({});

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageStartNum: 0,
      page: 1,
      "pivot-column-index":0,
      overscan:2,
      ...props
    };
    this.tableData = {
      sortStates: {},
      headColumnOption: [],
      headerrowinfo: [],
      headercolumninfo: [],
      headerdata: [{}],

      //body
      columnOption: [],
      rowinfo: [],
      columninfo: [],
      data: [{}],
      checkHeeadtoBody: this.__checkHeeadtoBody,
      checkBodytoHead: this.__checkBodytoHead,
      selectBody: this.__selectBody
    };
    this.__makeEventArray();
  }
  __makeEventArray() {
    this.tableData.eventinfo = this.state.items.map((rowitem, rowitemindex) => {
      return [...Object.values(this.state["rowOption"])].map((data, index) => {
        return {
          selected: false,
          checked: false
        };
      });
    });

    this.tableData.headeventinfo = [{}].map((rowitem, rowitemindex) => {
      return [...Object.values(this.state["rowOption"])].map((data, index) => {
        return {
          selected: false,
          checked: false
        };
      });
    });
  }
  __checkHeeadtoBody = (event, dataIndex, rowIndex) => {
    const bool = event.target.checked;
    this.tableData.headeventinfo.forEach(obj => {
      obj.forEach(info => {
        info.checked = bool;
      });
    });
    this.tableData.eventinfo.forEach(obj => {
      obj.forEach(info => {
        info.checked = bool;
      });
    });
    this.forceUpdate();
  };
  __checkBodytoHead = (event, dataIndex, rowIndex) => {
    const bool = event.target.checked;
    this.tableData.eventinfo[dataIndex][rowIndex].checked = bool;
    const boolevery = this.tableData.eventinfo.every(obj => {
      return obj.every(info => {
        return info.checked;
      });
    });
    this.tableData.headeventinfo.forEach(obj => {
      obj.forEach(info => {
        info.checked = boolevery;
      });
    });
    this.forceUpdate();
  };
  __selectBody = (event, dataIndex, rowIndex) => {
    //shift ctrl 모드
    if (event.shiftKey) {
      if (this.lastSelectedIndex > dataIndex) {
        var from = dataIndex;
        var to = this.lastSelectedIndex;
      } else {
        var to = dataIndex;
        var from = this.lastSelectedIndex;
      }
      this.tableData.eventinfo.forEach(function(data, index) {
        if (index >= from && index <= to) {
          return data.forEach(r => (r.selected = true));
        } else {
          return data.forEach(r => (r.selected = false));
        }
      });
    } else if (event.ctrlKey) {
      //cell단위 구현때 계속
    } else {
      this.tableData.eventinfo.forEach(obj => {
        obj.forEach(r => (r.selected = false)); //초기화
      });
    }
    this.lastSelectedIndex = dataIndex;
    this.tableData.eventinfo[dataIndex].forEach(r => (r.selected = true)); //selected 적용
    this.forceUpdate();
  };
  __initProperties() {
    this.tableData.data = this.state.items;
    this.tableData.headColumnOption = [
      ...Object.values(this.state["headColumnOption"])
    ].map(headrow => {
      return Object.values(headrow);
    }); //Top.Util.namespace(this.state.headColumnOption);
    this.tableData.columnOption = [
      ...Object.values(this.state["columnOption"])
    ].map(itemrow => {
      return Object.values(itemrow);
    });

    this.tableData.rowOption = [...Object.values(this.state["rowOption"])];
    this.tableData.headrowOption = [
      ...Object.values(this.state["headrowOption"])
    ];
    let pivot = this.state["pivot-column-index"]; //영역분할
    //rowinfo생성
    const plen = ~~parseInt(this.state["page-length"]);
    const pageStartNum = (this.state.page - 1) * plen;
    if (plen > 0) {
      var pageEndNum = pageStartNum + plen;
    } else {
      var pageEndNum = this.tableData.data.length;
    }

    this.state.pagepointer = this.tableData.data.slice(
      pageStartNum,
      pageEndNum
    );
    //rowinfo생성
    let toppos = 0;
    this.tableData.headerrowinfo = this.tableData.headerdata.map(
      (headrowitem, headrowitemindex) => {
        return this.tableData.headrowOption.map((data, index) => {
          let height = parseInt(data.height) ? parseInt(data.height) : 30; //~~index%2?30:30;
          let top = toppos;
          let bottom = top + height;
          toppos += height;
          return {
            //renderkey: "row_" + headrowitemindex + "_" + index,
            vindex: headrowitemindex,
            dataIndex: headrowitemindex,
            height: height,
            top: top,
            bottom: bottom
          };
        });
      }
    );

    let colspanCount = 0;

    this.tableData.headercolumninfo2 = [];
    this.tableData.headercolumninfo3 = [];
    for (
      let headrowitemindex = 0;
      headrowitemindex < this.tableData.headColumnOption.length;
      headrowitemindex++
    ) {
      this.tableData.headercolumninfo2.push([]);
      this.tableData.headercolumninfo3.push([]);
      let headrowitem = this.tableData.headColumnOption[headrowitemindex];
      let leftpos = 0;
      for (let index = 0; index < headrowitem.length; index++) {
        let columnitem = headrowitem[index];
        let left = leftpos;
        let width = 0;

        if (~~parseInt(columnitem.width)) {
          width = parseInt(columnitem.width);
        } else {
          width = 120; //default값
        }

        let right = left + width;
        leftpos += width;
        let temp = {
          width: width,
          left: left,
          right: right,
          colspan: columnitem.colspan,
          rowspan: columnitem.rowspan,
          visible: "visible"
        };
        if (index < pivot) {
          this.tableData.headercolumninfo2[headrowitemindex].push(temp);
          if (index == pivot - 1) {
            leftpos = 0;
          }
        } else {
          this.tableData.headercolumninfo3[headrowitemindex].push(temp);
        }
      }
    }

    //rowinfo생성
    toppos = 0;
    this.tableData.rowinfo = this.state.pagepointer.map(
      (rowitem, rowitemindex) => {
        return this.tableData.rowOption.map((data, index) => {
          let height = parseInt(data.height) ? parseInt(data.height) : 30; //~~index%2?30:30;
          let top = toppos;
          let bottom = top + height;
          toppos += height;
          return {
            //renderkey: "row_" + rowitemindex + "_" + index,
            vindex: rowitemindex,
            dataIndex: rowitemindex + pageStartNum,
            height: height,
            top: top,
            bottom: bottom
          };
        });
      }
    );

    this.tableData.columninfo2 = [];
    this.tableData.columninfo3 = [];
    colspanCount = 0;
    for (
      let rowitemindex = 0;
      rowitemindex < this.tableData.columnOption.length;
      rowitemindex++
    ) {
      this.tableData.columninfo2.push([]);
      this.tableData.columninfo3.push([]);
      let rowitem = this.tableData.columnOption[rowitemindex];
      let leftpos = 0;
      for (let index = 0; index < rowitem.length; index++) {
        let columnitem = rowitem[index];
        let left = leftpos;
        let width = 0;

        if (~~parseInt(columnitem.width)) {
          width = parseInt(columnitem.width);
        } else {
          width = 120; //default값
        }

        let right = left + width;
        leftpos += width;
        let temp = {
          width: width,
          left: left,
          right: right,
          colspan: columnitem.colspan,
          rowspan: columnitem.rowspan,
          visible: "visible"
        };
        if (index < pivot) {
          this.tableData.columninfo2[rowitemindex].push(temp);
          if (index == pivot - 1) {
            leftpos = 0;
          }
        } else {
          this.tableData.columninfo3[rowitemindex].push(temp);
        }
      }
    }
  }
  scrollhandler = () => {
    if(this.thead){
      this.thead.Conbody.children[0].style.right =
        event.srcElement.scrollLeft + "px";
        this.thead.setState({ from2: this.tbody.from2 });
    }
    if(this.fixtbody){
      this.fixtbody.Conbody.children[0].style.bottom =
        event.srcElement.scrollTop + "px";
        this.fixtbody.setState({ from: this.tbody.from });
    }
    this.resizerbox.box.style.right = event.srcElement.scrollLeft + "px";
  };

  dragStart = () => {
    this.originX = event.x;
    //console.log(e,'dragstart');
  };
  dragOver = () => {
    //console.log(event.layerX,event.x,'dragOver');
  };
  dragEnd = cidx => {
    let delta = event.x - this.originX;
    cidx = cidx + parseInt(this.state["pivot-column-index"]);
    this.tableData.columnOption.forEach((columnlayer, index) => {
      let width = columnlayer[cidx].width
        ? parseInt(columnlayer[cidx].width)
        : 120;
      columnlayer[cidx].width = width + delta < 10 ? 10 : width + delta + "px"; //이거 틀림 원본 array 말고 thead와 tbody의 state를 변경합시다
    });
    this.tableData.headColumnOption.forEach((columnlayer, index) => {
      let width = columnlayer[cidx].width
        ? parseInt(columnlayer[cidx].width)
        : 120;
      columnlayer[cidx].width = width + delta < 10 ? 10 : width + delta + "px"; //이거 틀림 원본 array 말고 thead와 tbody의 state를 변경합시다
    });

    //다시 좌표정보 재생성;
    this.__initProperties();
    let newcolnum = this.thead.calcolnum(
      parseInt(this.thead.state["viewport-width"])
    );
    let newto2 = this.thead.state.to2 + newcolnum + 1;

    this.forceUpdate();
    //정리가 필요함
    //this.thead.setState({columninfo:this.tableData.headercolumninfo3,to2:newto2});
    //this.tbody.setState({columninfo:this.tableData.columninfo3,to2:newto2});
    //this.resizerbox.setState({columninfo:this.tableData.headercolumninfo3[this.tableData.headercolumninfo3.length-1]});
  };

  setPage(pagenum) {
    if (!~~pagenum) {
      return;
    }
    let newPSN = (pagenum - 1) * this.state["page-length"];
    this.setState({ pageStartNum: newPSN });
  }

  render() {
    this.__initProperties(); //init 개념보다는 runtime props 셋팅의 의미가 큽니다
    const {overscan,pivotColumnIndex,pagepointer,width,height,id,headCellmaker,cellmaker} = this.state;

    const tablestyle = {
      overflow: "hidden",
      width: width,
      height: height
    };
    //for git
    let fix_width = 0;
    if(~~pivotColumnIndex){
      fix_width =this.tableData.headercolumninfo2[0][this.tableData.headercolumninfo2[0].length - 1].right + 3;
    }
    const flex_width =
      width == "100%"
        ? "100%"
        : parseInt(width) - fix_width;

    const head_height = this.tableData.headrowOption.reduce(
      (acc, cur, index) => {
        return acc + parseInt(cur.height);
      },
      0
    );

    const body_height =
      height == "100%"
        ? "100%"
        : parseInt(height) - head_height;

    const resizerposition = {
      left: fix_width + "px",
      position: "relative"
    };

    return (
      <div
        id={id}
        ref={this.setRootRef}
        className="ww-table"
        style={tablestyle}
      >
        <containerinfo.Provider value={this.tableData}>
          <div className="table_wrapper">
            <div className="header_wrapper">
              <div style={resizerposition}>
                <Resizerbox
                  left={fix_width}
                  columninfo={
                    this.tableData.headercolumninfo3[
                      this.tableData.headercolumninfo3.length - 1
                    ]
                  }
                  height={head_height}
                  dragStart={this.dragStart}
                  dragOver={this.dragOver}
                  dragEnd={this.dragEnd}
                  ref={ref => {
                    this.resizerbox = ref;
                  }}
                ></Resizerbox>
              </div>
              {~~pivotColumnIndex>0 &&
              <VirtualBox
                isHead={true}
                cellmaker={headCellmaker}
                columninfo={this.tableData.headercolumninfo2}
                rowinfo={this.tableData.headerrowinfo}
                event={this.tableData.headeventinfo}
                viewport-height={head_height}
                viewport-width={fix_width}
                data={this.tableData.headerdata}
                data-role="tableview"
                data-inset="true"
                className="thead tableview-container fixframe"
                item-drag={false}
                overscan={overscan}
              ></VirtualBox>
              }
              <VirtualBox
                isHead={true}
                cellmaker={headCellmaker}
                columninfo={this.tableData.headercolumninfo3}
                rowinfo={this.tableData.headerrowinfo}
                event={this.tableData.headeventinfo}
                viewport-height={head_height}
                viewport-width={flex_width}
                data={this.tableData.headerdata}
                data-role="tableview"
                data-inset="true"
                className="thead tableview-container flexframe"
                item-drag={false}
                ref={ref => {
                  this.thead = ref;
                }}
                overscan={overscan}
              ></VirtualBox>
            </div>
            <div className="body_wrapper">
              {~~pivotColumnIndex>0 &&
              <VirtualBox
                isHead={false}
                isTable={true}
                cellmaker={cellmaker}
                columninfo={this.tableData.columninfo2}
                rowinfo={this.tableData.rowinfo}
                event={this.tableData.eventinfo}
                viewport-height={body_height}
                viewport-width={fix_width}
                data={pagepointer}
                data-role="tableview"
                data-inset="true"
                className="tbody tableview-container fixframe"
                ref={ref => {
                  this.fixtbody = ref;
                }}
                overscan={overscan}
              ></VirtualBox>
              }
              <VirtualBox
                isHead={false}
                isTable={true}
                cellmaker={cellmaker}
                columninfo={this.tableData.columninfo3}
                rowinfo={this.tableData.rowinfo}
                event={this.tableData.eventinfo}
                viewport-height={body_height}
                viewport-width={flex_width}
                data={pagepointer}
                data-role="tableview"
                data-inset="true"
                className="tbody tableview-container flexframe"
                ref={ref => {
                  this.tbody = ref;
                }}
                scrollsync={this.scrollhandler}
                overscan={overscan}
              ></VirtualBox>
            </div>
          </div>
        </containerinfo.Provider>
      </div>
    );
  }
}

export default Table;
