import React, { Component } from "react";
import ContainerRow from "./Row";
import ContainerCell from "./Cell";
import Gridcheckbox from "./gridcheckbox";
import styled from "styled-components";

class VirtualBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      from: 0,
      from2: 0
    };
    //this.__SettingVirtual();
    this.scrollChange = _.debounce(this.scrollChange, 0);
  }
  componentDidMount() {
    this.__bindEvent();
    this.itemdrag();
  }

  componentDidUpdate() {
    //새로 보여지는 DOM들에게 event 바인딩
    this.__bindEvent();
    this.itemdrag();
    //event binding end
  }
  componentWillUpdate() {}
  calrownum(y) {
    let rnum = 0;
    this.state.rowinfo.every((rows, rowsindex) => {
      return rows.every((obj, ridx) => {
        rnum = rowsindex;
        return obj.top < y;
      });
    });
    return rnum + 1;
  }
  calcolnum(x) {
    let cnum = 0;
    this.state.columninfo[this.state.columninfo.length - 1].every(
      (obj, cidx) => {
        cnum = cidx;
        return obj.left <= x;
      }
    );
    return cnum + 1;
  }

  scrollChange = () => {
    this.setState({ from: this.from, from2: this.from2 });
  };

  clickhandler() {
    if (this.props.clicksync) {
      this.props.clicksync();
    }

    let target = event.srcElement;
    //row탐색
    while (true) {
      if (target.tagName == undefined || target.tagName == null) {
        return;
      }
      if (
        target.className.includes("column_list") ||
        target.className.includes("list-list")
      ) {
        break;
      }
      target = target.parentNode;
    }
    let dataIndex = target.getAttribute("data-index");
    let newf = this.state.event.concat([]);
    if (this.lastSelectedIndex > dataIndex) {
      var from = dataIndex;
      var to = this.lastSelectedIndex;
    } else {
      var to = dataIndex;
      var from = this.lastSelectedIndex;
    }
    //shift ctrl 모드
    if (event.shiftKey) {
      newf.forEach(function(data, index) {
        if (index >= from && index <= to) {
          return data.forEach(r => (r.selected = true));
        } else {
          return data.forEach(r => (r.selected = false));
        }
      });
    } else if (event.ctrlKey) {
      //cell단위 구현때 계속
    } else {
      newf.forEach(data => data.forEach(r => (r.selected = false)));
    }

    this.lastSelectedIndex = dataIndex;

    newf[dataIndex].forEach(r => (r.selected = true));
    this.setState({ event: newf });
  }

  __SettingVirtual(top, left) {
    //row범위
    if (top) {
      this.from = this.calrownum(top);
    } else {
      this.from = 0;
    }
    //column범위
    if (left) {
      this.from2 = this.calcolnum(left);
    } else {
      this.from2 = 0;
    }
  }

  scrollhandler() {
    if (this.props.scrollsync) {
      this.props.scrollsync();
    }
    let top = event.srcElement.scrollTop;
    let left = event.srcElement.scrollLeft;
    this.__SettingVirtual(top, left);
    if (this.from == this.prevfrom && this.from2 == this.prevfrom2) {
      return;
    }
    this.prevfrom = this.from;
    this.prevfrom2 = this.from2;
    this.scrollChange();
  }

  itemdrag() {
    if (!this.props["item-drag"]) {
      return;
    }
    var _this = this.Conbody;
    var listUI = this;
    if (true) {
      //속성 on/off시
      var li_Cells = _this.getElementsByClassName("list-list");
      var listbox = this.Conbody;
      //dragstart
      if (this.__uiDragstartListener === undefined) {
        this.__uiDragstartListener = function(ev) {
          ev.dataTransfer.setData("text", ev.target.getAttribute("data-index"));
          console.log("저장인덱스:", ev.target.getAttribute("data-index"));
        };
      }
      if (this.__uiDropListener === undefined) {
        this.__uiDropListener = function(ev) {
          ev.preventDefault();
          ev.stopPropagation();

          var target = _this.li;
          if (!target) {
            return;
          }
          target.classList.remove("rowabove");

          var start_Index = parseInt(ev.dataTransfer.getData("text"));
          var end_index = parseInt(target.getAttribute("data-index"));
          if (start_Index == end_index) {
            return;
          }

          if (listUI.staticitem) {
            var datas = listUI.state.widgetItems;
          } else {
            var datas = listUI.state.data; //state.data;
          }
          var einfo = listUI.state.rowinfo; //eventpointer//eventinfo

          if (start_Index > end_index) {
            datas.splice(end_index + 1, 0, datas[start_Index]); //static 렌더링의경우 datas를 바꿔주는게 필수임 data렌더링은 필수 아님
            datas.splice(start_Index + 1, 1); //현대 row마다 key가 같게 형성되어 다시안그리는거같다. 달랏으면 다시그려졌을수도?
            einfo.splice(end_index + 1, 0, einfo[start_Index]);
            einfo.splice(start_Index + 1, 1);
          } else {
            datas.splice(end_index + 1, 0, datas[start_Index]);
            datas.splice(start_Index, 1);
            einfo.splice(end_index + 1, 0, einfo[start_Index]);
            einfo.splice(start_Index, 1);
          }
          listUI.setState({
            data: datas,
            event: einfo
          });
          //listUI.forceUpdate();
        };
      }
      if (this.__uiDragoverListener === undefined) {
        this.__uiDragoverListener = function(ev) {
          ev.preventDefault();
          var oldTarget = _this.querySelector(".rowabove");
          if (oldTarget) oldTarget.classList.remove("rowabove");
          var newtarget = ev.target;
          while (true) {
            if (newtarget.tagName == undefined || newtarget.tagName == null) {
              return;
            }
            if (newtarget.className.includes("column_list")) {
              break;
            }
            newtarget = newtarget.parentNode;
          }

          if (newtarget) newtarget.classList.add("rowabove");

          _this.li = newtarget;
        };
      }

      if (this.__uiout === undefined) {
        this.__uiout = function(ev) {
          ev.preventDefault();
          var oldTarget = _this.querySelector(".rowabove");
          if (oldTarget) oldTarget.classList.remove("rowabove");
        };
      }

      for (var i = 0; i < li_Cells.length; i++) {
        li_Cells[i].draggable = true;
        li_Cells[i].addEventListener("dragstart", this.__uiDragstartListener);
      }

      if (listbox) {
        listbox.removeEventListener("dragover", this.__uiDragoverListener);
        listbox.addEventListener("dragover", this.__uiDragoverListener);
        listbox.removeEventListener("drop", this.__uiDropListener);
        listbox.addEventListener("drop", this.__uiDropListener);
        listbox.removeEventListener("mouseleave", this.__uiout);
        listbox.addEventListener("mouseleave", this.__uiout);
      }
    }
  }

  __renderLayout() {
    //return this.state.datapointer.map((data, dataIndex, array) => {
    return this.state.rowpointer.map((rowgroup, index) => {
      let dataobj = this.state.rowpointer[index];
      return rowgroup.map((rowinfo, rowinfoIndex) => {
        return this.__renderData(rowinfo, dataobj, index, rowinfoIndex);
      });
    });
    //})
  }

  __bindEvent() {
    //추후추
  }

  __makeCell(hinfo, vinfo, data, index, dataIndex, cidx, rowinfoIndex) {
    let cellinfo = [];
    let ckey = "cell-" + cidx + "-" + dataIndex;
    let visible = hinfo.visible;
    let CellWidth = ~~hinfo.width; //this.state.columninfo[cidx].width;
    let CellHeight = ~~vinfo.height;

    if (this.state.cellmaker) {
      let ridx = dataIndex;
      return (
        <ContainerCell
          key={ckey}
          visible={visible}
          cellinfo={cellinfo}
          left={hinfo.left}
          cidx={cidx}
          data-index={dataIndex}
          width={CellWidth}
          height={CellHeight}
        >
          {this.state.cellmaker({ ridx, cidx, ckey })}
        </ContainerCell>
      );
    } //grid처리

    //colspan 구현
    if (hinfo.colspan > 1) {
      let colspan = hinfo.colspan;
      for (let i = 1; i < colspan; i++) {
        CellWidth += ~~this.state.columninfo[rowinfoIndex][cidx + i].width;
        this.state.columninfo[rowinfoIndex][cidx + i].visible = "hidden";
      }
    }

    if (hinfo.rowspan > 1) {
      let rowspan = hinfo.rowspan;
      for (let k = 1; k < rowspan; k++) {
        CellHeight += ~~this.state.rowinfo[index][rowinfoIndex + k].height;
        this.state.columninfo[rowinfoIndex + k][cidx].visible = "hidden";
      }
    }

    if (hinfo.colspan > 1 && hinfo.rowspan > 1) {
      let colspan = hinfo.colspan;
      let rowspan = hinfo.rowspan;
      for (let i = 1; i < colspan; i++) {
        for (let k = 1; k < rowspan; k++) {
          this.state.columninfo[rowinfoIndex + k][cidx + i].visible = "hidden";
        }
      }
    }

    let testTxt = data["Title1"]
      ? data["Title1"]
      : "cell-" + " index:" + dataIndex + " column:" + cidx;
    if (rowinfoIndex) {
      testTxt += " sub:" + rowinfoIndex;
    }

    if (cidx == 5) {
      testTxt = dataIndex;
      if (this.props.className.includes("thead")) {
        testTxt = "INDEX_COLUMN";
      }
    }

    if (cidx == 0 && rowinfoIndex == 0) {
      testTxt = (
        <Gridcheckbox
          eventinfo={this.state.event[dataIndex][rowinfoIndex]}
          checked={this.state.event[dataIndex][rowinfoIndex].checked}
        ></Gridcheckbox>
      ); //props를 써야하나
    }

    return (
      <ContainerCell
        key={ckey}
        visible={visible}
        cellinfo={cellinfo}
        left={hinfo.left}
        cidx={cidx}
        data-index={dataIndex}
        width={CellWidth}
        height={CellHeight}
      >
        {testTxt}
      </ContainerCell>
    );
  }

  __renderData(rowinfo, data, index, rowinfoIndex) {
    const vindex = index + this.from;
    const dataIndex = rowinfo.dataIndex;
    const listId = `list_${dataIndex}`;
    const renderkey = rowinfo.renderkey; //this.state.rowpointer[index].renderkey;
    const selected = this.state.event[dataIndex][rowinfoIndex].selected; //this.state.rowpointer[index].selected;
    const rowHeight = rowinfo.height; //this.state.rowinfo[dataIndex].layoutHeight;
    const toppos = rowinfo.top; //this.state.rowinfo[dataIndex].top;
    const classRow = "";

    return (
      <ContainerRow
        key={renderkey}
        id={listId}
        toppos={toppos}
        className={classRow}
        data-index={dataIndex}
        selected={selected}
        row-height={rowHeight}
      >
        {this.state.columninfo[rowinfoIndex].map((column, cidx) => {
          if (cidx >= this.from2 && cidx < this.to2) {
            return this.__makeCell(
              column,
              rowinfo,
              data,
              vindex,
              dataIndex,
              cidx,
              rowinfoIndex
            );
          }
        })}
      </ContainerRow>
    );
  }
  __datacut() {
    this.rownum = this.calrownum(parseInt(this.props["viewport-height"]));
    this.colnum = this.calcolnum(parseInt(this.props["viewport-width"]));
    this.from = Math.max(0, this.state.from - 2);
    this.from2 = Math.max(0, this.state.from2 - 2);
    this.to = this.state.from + this.rownum + 2;
    this.to2 = this.state.from2 + this.colnum + 2;

    //this.from = Math.max(0, this.state.from);
    //from2는 datacut에 필요하지않음

    this.state.datapointer = this.props.data.slice(this.from, this.to); //state에서 props로 바꿈
    this.state.rowpointer = this.props.rowinfo.slice(this.from, this.to);
  }
  render() {
    this.state.rowinfo = this.props.rowinfo;
    this.state.columninfo = this.props.columninfo;
    this.state.event = this.props.event;
    this.state.data = this.props.data;
    this.state["viewport-height"] = this.props["viewport-height"];
    this.state["viewport-width"] = this.props["viewport-width"];
    //임시 어찌처리해야할지 난감 props가 바뀔떄 state에 동기화해주는 콜백이 있음 참고

    this.__datacut();

    const style = {
      //개발중
      height: this.state["viewport-height"],
      width: this.state["viewport-width"]
    };

    let classvp = classNames({
      listframe: true
    });

    const totalh = this.state.rowinfo[this.state.rowinfo.length - 1][
      this.state.rowinfo[0].length - 1
    ].bottom;
    const totalw = this.state.columninfo[0][this.state.columninfo[0].length - 1]
      .right;

    let stylevp = {
      height: totalh,
      width: totalw
    };

    const { dataRole, dataInset, className } = this.state;
    return (
      <div
        style={style}
        onScroll={e => this.scrollhandler(e)}
        onClick={e => this.clickhandler(e)}
        className={className}
        data-role={dataRole}
        data-inset={dataInset}
        ref={ref => {
          this.Conbody = ref;
        }}
      >
        <div
          className={classvp}
          style={stylevp}
          ref={ref => {
            this.Viewport = ref;
          }}
        >
          {this.__renderLayout()}
        </div>
      </div>
    );
  }
}
export default VirtualBox;
