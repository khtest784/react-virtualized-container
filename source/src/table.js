import React, { Component } from "react";

import VirtualBox from "./components/virtualBox";
import Resizerbox from "./components/resizerbox";
import ReactDom from "react-dom";
import styled from "styled-components";

export const ThemeContext = React.createContext({

});

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageStartNum: 0,
      page: 1,
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
    };
    this.__makeEventArray();
  }
  __makeEventArray() {
    this.tableData.eventinfo = this.state.items.map((rowitem, rowitemindex) => {
      return [...Object.values(this.state["row-option"])].map((data, index) => {
        return {
          selected: false,
          checked: false
        };
      });
    });

    this.tableData.headeventinfo = [{}].map((rowitem, rowitemindex) => {
      return [...Object.values(this.state["row-option"])].map((data, index) => {
        return {
          selected: false,
          checked: false
        };
      });
    });
  }
  __checkHeeadtoBody = (event,dataindex,rowIndex) => {
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
  }
  __checkBodytoHead = (event,dataindex,rowIndex) => {
    const bool = event.target.checked;
    this.tableData.eventinfo[dataindex][rowIndex].checked = bool;
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
  }
  __initProperties() {
    this.tableData.data = this.state.items;
    this.tableData.headColumnOption = [
      ...Object.values(this.state["head-column-option"])
    ].map(headrow => {
      return Object.values(headrow);
    }); //Top.Util.namespace(this.state.headColumnOption);
    this.tableData.columnOption = [
      ...Object.values(this.state["column-option"])
    ].map(itemrow => {
      return Object.values(itemrow);
    });

    this.tableData.rowOption = [...Object.values(this.state["row-option"])];
    this.tableData.headRowOption = [
      ...Object.values(this.state["head-row-option"])
    ];
    let pivot = this.state["pivot-column-index"]; //영역분할
    //rowinfo생성
    const plen = parseInt(this.props["page-length"]);
    const pageStartNum = (this.props.page - 1) * plen;
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
        return this.tableData.headRowOption.map((data, index) => {
          let height = parseInt(data.height) ? parseInt(data.height) : 30; //~~index%2?30:30;
          let top = toppos;
          let bottom = top + height;
          toppos += height;
          return {
            selected: false,
            checked: false,
            renderkey: "headkey_" + headrowitemindex + "_" + index,
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
            selected: false,
            checked: false,
            renderkey: "headkey_" + rowitemindex + "_" + index,
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
  clickhandler = () => {
    this.fixtbody.forceUpdate();
  };
  scrollhandler = () => {
    this.thead.Conbody.children[0].style.right =
      event.srcElement.scrollLeft + "px";
    this.fixtbody.Conbody.children[0].style.bottom =
      event.srcElement.scrollTop + "px";
    this.resizerbox.box.style.right = event.srcElement.scrollLeft + "px";

    this.thead.setState({ from2: this.tbody.from2 });
    this.fixtbody.setState({ from: this.tbody.from });
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
    const tablestyle = {
      overflow: "hidden",
      width: this.state["layout-width"],
      height: this.state["layout-height"]
    };
    //for git
    const fix_width =
      this.tableData.headercolumninfo2[0][
        this.tableData.headercolumninfo2[0].length - 1
      ].right + 5;
    const flex_width =
      this.state["layout-width"] == "100%"
        ? "100%"
        : parseInt(this.state["layout-width"]) - fix_width;

    const head_height = this.tableData.headRowOption.reduce(
      (acc, cur, index) => {
        return acc + parseInt(cur.height);
      },
      0
    );

    const body_height =
      this.state["layout-height"] == "100%"
        ? "100%"
        : parseInt(this.state["layout-height"]) - head_height;

    const resizerposition = {
      left: fix_width + "px",
      position: "relative"
    };

    return (
      <div
        id={this.state.id}
        ref={this.setRootRef}
        className="ww-table"
        style={tablestyle}
      >
      <ThemeContext.Provider value={this.tableData}>
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
            <VirtualBox
              isHead={true}
              cellmaker={this.state["head-cellmaker"]}
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
            ></VirtualBox>
            <VirtualBox
              isHead={true}
              cellmaker={this.state["head-cellmaker"]}
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
            ></VirtualBox>
          </div>
          <div className="body_wrapper">
            <VirtualBox
              isHead={false}
              cellmaker={this.state.cellmaker}
              columninfo={this.tableData.columninfo2}
              rowinfo={this.tableData.rowinfo}
              event={this.tableData.eventinfo}
              viewport-height={body_height}
              viewport-width={fix_width}
              data={this.state.pagepointer}
              data-role="tableview"
              data-inset="true"
              className="tbody tableview-container fixframe"
              ref={ref => {
                this.fixtbody = ref;
              }}
            ></VirtualBox>
            <VirtualBox
              isHead={false}
              cellmaker={this.state.cellmaker}
              columninfo={this.tableData.columninfo3}
              rowinfo={this.tableData.rowinfo}
              event={this.tableData.eventinfo}
              viewport-height={body_height}
              viewport-width={flex_width}
              data={this.state.pagepointer}
              data-role="tableview"
              data-inset="true"
              className="tbody tableview-container flexframe"
              ref={ref => {
                this.tbody = ref;
              }}
              scrollsync={this.scrollhandler}
              clicksync={this.clickhandler}
            ></VirtualBox>
          </div>
        </div>
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default Table;
