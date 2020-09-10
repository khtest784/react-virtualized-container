import React, { Component } from "react";

import SheetBox from "./components/sheetbox";
import TargetSquare from "./components/targetsquare";
import {SheetResizerHorizontal, SheetResizerVertical} from "./components/sheetresizer";
import ReactDom from "react-dom";
import styled from "styled-components";

export const sheetinfo = React.createContext({});

class Sheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hpagecnt:[0,1,2],
      vpagecnt:[0,1,2],
      //focusgeo:[0,0],
      //focusrect:[70,20],
      data:new Array(9999).fill(null).map((d,i)=>new Array(9999).fill(i)),
      hcolumns:new Array(9999).fill(70),
      vcolumns:new Array(9999).fill(20),
    };
    this.focusgeo = [0,0];
    this.hacc = null;
    this.vacc = null;
    this.sheetArray = new Array(100).fill(null).map((d,i)=>new Array(100).fill(null))
    this.scrollChange = _.debounce(this.scrollChange, 50);
  }
  __SettingVirtual(top,left){
      let startX = Math.max(0,~~(this.calcX(left)/25)-1);//canvas 좌표만 따로받아 최적화필요
      let startY = Math.max(0,~~(this.calcY(top)/25)-1);//canvas 좌표만 따로받아 최적화필요
      let hpagecnt = new Array(5).fill(0).map(()=>startX++)
      let vpagecnt = new Array(5).fill(0).map(()=>startY++)
      this.scrollChange(hpagecnt,vpagecnt);
  }
  scrollChange = (hpagecnt,vpagecnt) => {
    this.setState({ hpagecnt: hpagecnt, vpagecnt: vpagecnt });
  };
  scrollhandler = (e) => {
    console.log(e.tyle);
    if(e.target.tagName=="INPUT"){return;}//왜 CLAss 이벤트가 들어오지?
    let top = parseInt(event.srcElement.scrollTop);
    let left = parseInt(event.srcElement.scrollLeft);
    this.__SettingVirtual(top, left);
    this.vruler.style.top = -top + "px";
    this.hruler.style.left = -left + "px";
  }
  clickCanvas = (e) => {
      //if (e.defaultPrevented) return;
      if(e.target.tagName=="INPUT"){return;}//왜 CLAss 이벤트가 들어오지?
      var x = event.offsetX + event.target.offsetLeft;//e.pageX - e.currentTarget.offsetLeft + e.currentTarget.scrollLeft;
      var y = event.offsetY + event.target.offsetTop;
      //var y = e.pageY - e.currentTarget.offsetTop + e.currentTarget.scrollTop;;
      var tarX = this.calcX(x);
      var tarY = this.calcY(y);
      this.focusgeo = [tarX,tarY]
      const {hcolumns,vcolumns} = this.state;
       this.tarsq.setState({
         loc:[tarX,tarY],
         pos:[this.hacc[tarX],this.vacc[tarY]],
         rect:[hcolumns[tarX],vcolumns[tarY]],
       });
  }
  focusCanvasUpdate = () =>{
    //console.log(this.focusgeo,this.sheetArray);
    this.sheetArray[~~(this.focusgeo[0]/25)][~~(this.focusgeo[1]/25)].forceUpdate();
  }
  dragStart = () => {
    this.originX = event.x;
    this.originY = event.y;
  };
  dragOver = () => {

  };
  dragEndX = idx => {
    let delta = event.x - this.originX;
    this.state.hcolumns[idx] += delta;
    this.forceUpdate();
  }
  dragEndY = idx => {
    let delta = event.y - this.originY;
    this.state.vcolumns[idx] += delta;
    this.forceUpdate();
  }
  calcX(x){
    //binary search
    const acc = this.hacc;
    let start=0, end=acc.length-1;
    while (start<=end){
      let mid=Math.floor((start + end)/2);
      if (acc[mid]<=x && x <acc[mid+1]) return mid;
      else if (acc[mid] < x)
           start = mid + 1;
      else
           end = mid - 1;
    }
   return 0;
  }
  calcY(y){
    //binary search
    const acc = this.vacc;
    let start=0, end=acc.length-1;
    while (start<=end){
      let mid=Math.floor((start + end)/2);
      if (acc[mid]<=y && y <acc[mid+1]) return mid;
      else if (acc[mid] < y)
           start = mid + 1;
      else
           end = mid - 1;
    }
   return 0;
  }
  __init(){
    let res =0;
    this.hacc = this.state.hcolumns.map((d,i)=>{
      if(!i){
        return 0;
      }
      res += this.state.hcolumns[i-1];
      return res;
    })
    res = 0;
    this.vacc = this.state.vcolumns.map((d,i)=>{
      if(!i){
        return 0;
      }
      res += this.state.vcolumns[i-1];
      return res;
    })
  }
  render() {
    this.__init();
    const mainstyle = {
      position:"relative",
      width:"1500px",
      height:"600px"
    }
    const style = {
        width:"1450px",
        height:"585px",
        position:"relative",
        overflow:"auto",
    };
    const {data} = this.state;
    const sec01 = {
      width:"50px",
      height:"15px",
      position:"absolute",
      overflow:"hidden",
      backgroundColor:"#333333"
    }
    const sec02 = {
      left:"50px",
      height:"15px",
      width:"1450px",
      position:"absolute",
      overflow:"hidden",
    }
    const sec03 = {
      top:"15px",
      width:"50px",
      height:"585px",
      position:"absolute",
      overflow:"hidden",
    }
    const sec04 = {
      left:"50px",
      top:"15px",
      position:"absolute",
      overflow:"hidden",
    }
    return (
      <div id="mainframe"
      style={mainstyle}
      >
      <div id="section01"
      style={sec01}
      ></div>
      <div id="section02"
      style={sec02}
      >
          <div
          id="hruler"
          style={{position:"relative"}}
          ref={ref => {
            this.hruler = ref;
          }}
          >
          {this.state.hpagecnt.map((h,i)=>{
            const rst = {
              float:"left",
              top:"0px",
              left:this.hacc[h*25]+"px",
              position:"absolute",
              width:this.hacc[(h+1)*25]-this.hacc[h*25]+"px",
              height:"15px"
            };
            let pos = 0;
            let from = h*25;
            let columninfo = this.state.hcolumns.slice(from,from+25);
            return (
              <div
              key={h}
              style={rst}
              >
              <SheetResizerHorizontal
                columninfo={columninfo}
                width={2}
                height={15}
                from = {from}
                dragStart={this.dragStart}
                dragOver={this.dragOver}
                dragEnd={this.dragEndX}
                ref={ref => {
                  this.sheetresizer = ref;
                }}
              ></SheetResizerHorizontal>
              {columninfo.map((w,j)=>{
                  const ws = {
                    float:"left",
                    height:"15px",
                    width:w+"px",
                    border:"1px solid black",
                    backgroundColor:"grey",
                  };
                  return (
                    <div key={j} style={ws}>
                    {h*25+j}
                    </div>
                  )
              })}
              </div>
            )
          })}
          </div>//hruler end
      </div>
      <div id="section03"
      style={sec03}
      >
      <div
      id="vruler"
      style={{position:"relative"}}
      ref={ref => {
        this.vruler = ref;
      }}
      >
      {this.state.vpagecnt.map((v,i)=>{
        const rst = {
          top:this.vacc[v*25]+"px",
          left:"0px",
          position:"absolute",
          width:"50px",
          height:this.vacc[(v+1)*25]-this.hacc[v*25]+"px",
        };
        let pos = 0;
        let from = v*25;
        let columninfo = this.state.vcolumns.slice(from,from+25);
        return (
          <div
          key={v}
          style={rst}
          >
          <SheetResizerVertical
            columninfo={columninfo}
            width={50}
            height={2}
            from = {from}
            dragStart={this.dragStart}
            dragOver={this.dragOver}
            dragEnd={this.dragEndY}
            ref={ref => {
              this.sheetresizer = ref;
            }}
          ></SheetResizerVertical>
          {columninfo.map((h,j)=>{
              const ws = {
                float:"left",
                height:h+"px",
                width:"50px",
                border:"1px solid black",
                backgroundColor:"grey",
              };
              return (
                <div key={j} style={ws}>
                {v*25+j}
                </div>
              )
          })}
          </div>
        )
      })}
      </div>
      </div>
      <div id="section04"
      style={sec04}
      ref={ref => {
        this.sec04 = ref;
      }}
      >
      <div
      ref={ref => {
        this.viewport = ref;
      }}
      style={style}
      onScroll={this.scrollhandler}
      onClick={this.clickCanvas}
      >
      {this.state.hpagecnt.map((h,i)=>{
          return this.state.vpagecnt.map((v,j)=>{
            //const recwidths = this.state.hcolumns.slice(h*25,(h+1)*25)
            //const recheights = this.state.vcolumns.slice(v*25,(v+1)*25)
            return (
              <SheetBox
              ref={ref => {
                this.sheetArray[h][v] = ref;
              }}
              fromx={25*h}
              fromy={25*v}
              hcolumns={this.state.hcolumns}
              vcolumns={this.state.vcolumns}
              width={this.hacc[(h+1)*25]-this.hacc[h*25]}
              height={this.vacc[(v+1)*25]-this.vacc[v*25]}
              hacc={this.hacc}
              vacc={this.vacc}
              data={data}
              key={h+"-"+v}
              top={this.vacc[v*25]+"px"}
              left={this.hacc[h*25]+"px"}
              />
            )
          })
      })}
      <TargetSquare
      data={data}
      key="tarsq"
      trigger={this.focusCanvasUpdate}
      ref={ref => {
        this.tarsq = ref;
      }}//viewport 밖으로 뺴야함 scroll 이벤트버블 발생
      />
      </div>
      </div>
      </div>
    )
  }

};

export default Sheet;
