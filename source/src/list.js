import React, { Component } from "react";
import Row from "./components/Row";
import Cell from "./components/Cell";
import VirtualBox from "./components/virtualBox";
import ReactDom from "react-dom";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
    this.listData = {
      //body
      columnOption: [],
      rowinfo: [],
      columninfo: [],
      data: [{}]
    };
  }
  __initProperties() {
    this.listData.data = this.state.items;
    this.listData.columnOption = [
      ...Object.values(this.state["column-option"])
    ].map(itemrow => {
      return Object.values(itemrow);
    });
    this.listData.rowOption = [...Object.values(this.state["row-option"])];
    let colspanCount = 0;
    let toppos = 0;
    let leftpos = 0;

    colspanCount = 0;
    this.listData.columninfo = this.listData.columnOption.map(
      (rowitem, rowitemindex) => {
        leftpos = 0;
        return rowitem.map((columnitem, index) => {
          let left = leftpos;
          let width = 0;
          if (~~parseInt(columnitem.width)) {
            width = parseInt(columnitem.width);
          } else {
            width = 120; //default값
          }
          let right = left + width;
          leftpos += width;
          return {
            width: width,
            left: left,
            right: right,
            colspan: columnitem.colspan,
            rowspan: columnitem.rowspan,
            visible: "visible"
          };
        });
      }
    );

    //rowinfo생성
    toppos = 0;
    this.listData.rowinfo = this.listData.data.map((rowitem, rowitemindex) => {
      return this.listData.rowOption.map((data, index) => {
        let height = parseInt(data.height) ? parseInt(data.height) : 30; //~~index%2?30:30;
        let top = toppos;
        let bottom = top + height;
        toppos += height;
        return {
          //renderkey: "row" + rowitemindex + "_" + index,
          vindex: rowitemindex,
          dataIndex: rowitemindex,
          height: height,
          top: top,
          bottom: bottom
        };
      });
    });

    this.listData.eventinfo = this.listData.data.map(
      (rowitem, rowitemindex) => {
        return this.listData.rowOption.map((data, index) => {
          return {
            selected: false,
            checked: false
          };
        });
      }
    );
  }

  render() {
    this.__initProperties();
    const style = {
      border: "1px solid grey",
      display: "inline-block",
      overflow: "hidden"
    };

    let count = 0;
    return (
      <div id={this.state.id} style={style} className="wtable-head">
        <VirtualBox
          cellmaker={this.state.cellmaker}
          isTable={false}
          columninfo={this.listData.columninfo}
          rowinfo={this.listData.rowinfo}
          event={this.listData.eventinfo}
          viewport-height={this.state["layout-height"]}
          viewport-width={this.state["layout-width"]}
          data={this.listData.data}
          data-role="listview"
          data-inset="true"
          className="tbody listview-container flexframe"
          item-drag={true}
          ref={ref => {
            this.list = ref;
          }}
          sync={this.scrollhandler}
        ></VirtualBox>
      </div>
    );
  }
}

export default List;
