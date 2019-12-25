import React, { Component } from "react";
import Row from "./components/Row";
import Cell from "./components/Cell";
import Grid from "./components/Grid";
import Resizerbox from "./components/resizerbox"
import ReactDom from "react-dom";

class Table extends Component {
  constructor(props) {
        super(props);
        this.state = {
          ...props,
        }
        this.tableData = {
            sortStates: {},
            headColumnOption:[],
            headerrowinfo:[],
            headercolumninfo:[],
            headerlayoutHeight:120,
            headerlayoutWidth:600,
            headerdata:[{}],

            //body
            columnOption:[],
            rowinfo:[],
            columninfo:[],
            layoutHeight:380,
            layoutWidth:600,
            data:[{}],
            fixed_pivot_num:2,
        };
    }
    __initProperties(){
      this.tableData.data = this.state.items;
      this.tableData.headColumnOption = [...Object.values(this.state["head-column-option"])].map((headrow)=>{return Object.values(headrow)});//Top.Util.namespace(this.state.headColumnOption);
      this.tableData.columnOption = [...Object.values(this.state["column-option"])].map((itemrow)=>{return Object.values(itemrow)});

      this.tableData.rowOption = [...Object.values(this.state["row-option"])];
      this.tableData.headRowOption = [...Object.values(this.state["head-row-option"])];
      let pivot = this.tableData.fixed_pivot_num;//영역분할
      //rowinfo생성
      let toppos=0;
      let leftpos=0;
      this.tableData.headerrowinfo = this.tableData.headerdata.map((headrowitem,headrowitemindex)=>{
          return this.tableData.headRowOption.map((data,index)=>{
            let height = parseInt(data.height)?parseInt(data.height):30;//~~index%2?30:30;
            let top = toppos;
            let bottom = top + height;
            toppos += height;
            return {
              selected:false,
              checked:false,
              renderkey:"headkey_"+headrowitemindex+"_"+index,
              vindex:headrowitemindex,
              height:height,
              top:top,
              bottom:bottom
            }
        })
    })

    let colspanCount = 0;
    this.tableData.headercolumninfo = this.tableData.headColumnOption.map((headrowitem,headrowitemindex)=>{
          leftpos=0;
          return headrowitem.map((columnitem,index)=>{
               let left = leftpos
               let width = 0;

               if(~~parseInt(columnitem.width)){
                   width=parseInt(columnitem.width);
               }else{
                   width=120;//default값
               }

               let right = left+width
               leftpos += width;
               return {
                 width:width,
                 left:left,
                 right:right,
                 colspan:columnitem.colspan,
                 rowspan:columnitem.rowspan,
                 visible:"visible",
               }
             })
    })

    this.tableData.headercolumninfo2=[];
    this.tableData.headercolumninfo3=[];
    for(let headrowitemindex = 0; headrowitemindex < this.tableData.headColumnOption.length; headrowitemindex++){
      this.tableData.headercolumninfo2.push([]);
      this.tableData.headercolumninfo3.push([]);
      let headrowitem = this.tableData.headColumnOption[headrowitemindex];
      leftpos=0;
      for(let index = 0; index < headrowitem.length; index++){
        let columnitem = headrowitem[index];
        let left = leftpos
        let width = 0;

        if(~~parseInt(columnitem.width)){
            width=parseInt(columnitem.width);
        }else{
            width=120;//default값
        }

        let right = left+width
        leftpos += width;
        let temp = {
          width:width,
          left:left,
          right:right,
          colspan:columnitem.colspan,
          rowspan:columnitem.rowspan,
          visible:"visible",
        };
        if(index<pivot){
          this.tableData.headercolumninfo2[headrowitemindex].push(temp);
          if(index==pivot-1){
            leftpos = 0;
          }
        }else{
          this.tableData.headercolumninfo3[headrowitemindex].push(temp);
        }
      }

    }

    //rowinfo생성
    toppos=0;
    this.tableData.rowinfo = this.tableData.data.map((rowitem,rowitemindex)=>{
        return this.tableData.rowOption.map((data,index)=>{
          let height = parseInt(data.height)?parseInt(data.height):30;//~~index%2?30:30;
          let top = toppos;
          let bottom = top + height;
          toppos += height;
          return {
            selected:false,
            checked:false,
            renderkey:"headkey_"+rowitemindex+"_"+index,
            vindex:rowitemindex,
            height:height,
            top:top,
            bottom:bottom
          }
        })
    })

    colspanCount=0;
    this.tableData.columninfo = this.tableData.columnOption.map((rowitem,rowitemindex)=>{
          leftpos=0;
          return rowitem.map((columnitem,index)=>{
          let left = leftpos
          let width = 0;

          if(~~parseInt(columnitem.width)){
                width = parseInt(columnitem.width);
          }else{
                width = 120;//default값
          }

          let right = left+width;
          leftpos += width;
            return {
              width:width,
              left:left,
              right:right,
              colspan:columnitem.colspan,
              rowspan:columnitem.rowspan,
              visible:"visible",
            }
          })
      })

      this.tableData.columninfo2=[];
      this.tableData.columninfo3=[];
      colspanCount=0;
      for(let rowitemindex = 0; rowitemindex < this.tableData.columnOption.length; rowitemindex++){
        this.tableData.columninfo2.push([]);
        this.tableData.columninfo3.push([]);
        let rowitem = this.tableData.columnOption[rowitemindex];
        let leftpos=0;
        for(let index = 0; index<rowitem.length; index++){
          let columnitem = rowitem[index];
          let left = leftpos
          let width = 0;

          if(~~parseInt(columnitem.width)){
              width=parseInt(columnitem.width);
          }else{
              width=120;//default값
          }

          let right = left+width
          leftpos += width;
          let temp = {
            width:width,
            left:left,
            right:right,
            colspan:columnitem.colspan,
            rowspan:columnitem.rowspan,
            visible:"visible",
          };
          if(index<pivot){
            this.tableData.columninfo2[rowitemindex].push(temp);
            if(index==pivot-1){
              leftpos = 0;
            }
          }else{
            this.tableData.columninfo3[rowitemindex].push(temp);
          }
        }

      }

    }
    scrollhandler = () => {
      this.thead.Conbody.children[0].style.right=event.srcElement.scrollLeft+"px";
      this.fixtbody.Conbody.children[0].style.bottom=event.srcElement.scrollTop+"px";
      this.resizerbox.box.style.right=event.srcElement.scrollLeft+"px";
      //console.log("hello",this);
      this.thead.scrollhandler(event);
      this.fixtbody.scrollhandler(event);
    }

    dragStart = ()=>{
      this.originX = event.x;
      //console.log(e,'dragstart');
    }
    dragOver = ()=>{
      //console.log(event.layerX,event.x,'dragOver');
  }
    dragEnd = (cidx) =>{
      let delta = event.x - this.originX;
      cidx = cidx + this.tableData.fixed_pivot_num;
      this.tableData.columnOption.forEach((columnlayer,index)=>{
        let width = columnlayer[cidx].width?parseInt(columnlayer[cidx].width):120;
        columnlayer[cidx].width = width + delta <10 ? 10 : width + delta+'px';//이거 틀림 원본 array 말고 thead와 tbody의 state를 변경합시다
      })
      this.tableData.headColumnOption.forEach((columnlayer,index)=>{
        let width = columnlayer[cidx].width?parseInt(columnlayer[cidx].width):120;
        columnlayer[cidx].width = width + delta <10 ? 10 : width + delta+'px';//이거 틀림 원본 array 말고 thead와 tbody의 state를 변경합시다
      })

      //다시 좌표정보 재생성;
      this.__initProperties();
      let newcolnum =  this.thead.calcolnum(parseInt(this.thead.state['viewport-width']));
      let newto2 = this.thead.state.to2 + newcolnum + 1;

      this.thead.setState({columninfo:this.tableData.headercolumninfo3,to2:newto2});
      this.tbody.setState({columninfo:this.tableData.columninfo3,to2:newto2});
      this.resizerbox.setState({columninfo:this.tableData.headercolumninfo3[this.tableData.headercolumninfo3.length-1]});
    }

    render() {
        // 값 가져오기
        this.__initProperties();//init 개념보다는 runtime props 셋팅의 의미가 큽니다

        const fix_width = this.tableData.headercolumninfo2[0][this.tableData.headercolumninfo2[0].length-1].right+5;
        const flex_width = this.tableData.headerlayoutWidth - fix_width;
        const resizerposition = {
          left:fix_width+'px',
          position:'relative',
        }
        const tablestyle = {
          width: this.state['layout-width'],
          height: this.state['layout-height'],
          overflow: 'hidden',
        }

        return (
                <div id={this.state.id} ref={this.setRootRef} className='ww-table' style={tablestyle}>
                <div className='table_wrapper'>
                    <div className='header_wrapper'>
                    <div style={resizerposition}>
                    <Resizerbox
                    left={fix_width}
                    columninfo={this.tableData.headercolumninfo3[this.tableData.headercolumninfo3.length-1]}
                    dragStart={this.dragStart}
                    dragOver={this.dragOver}
                    dragEnd={this.dragEnd}
                    ref={ref => {this.resizerbox = ref}}>
                    </Resizerbox>
                    </div>
                    <Grid
                        columninfo={this.tableData.headercolumninfo2}
                        rowinfo={this.tableData.headerrowinfo}
                        viewport-height={this.tableData.headerlayoutHeight}
                        viewport-width={fix_width}
                        data={this.tableData.headerdata}
                        data-role='tableview'
                        data-inset='true'
                        className='thead listview-container fixframe'
                        item-drag={false}
                    >
                    </Grid>
                    <Grid
                        columninfo={this.tableData.headercolumninfo3}
                        rowinfo={this.tableData.headerrowinfo}
                        viewport-height={this.tableData.headerlayoutHeight}
                        viewport-width={flex_width}
                        data={this.tableData.headerdata}
                        data-role='tableview'
                        data-inset='true'
                        className='thead listview-container flexframe'
                        item-drag={false}
                        ref={ref => {this.thead = ref}}>
                    </Grid>
                    </div>
                    <div className='body_wrapper'>
                    <Grid
                        columninfo={this.tableData.columninfo2}
                        rowinfo={this.tableData.rowinfo}
                        viewport-height={this.tableData.layoutHeight}
                        viewport-width={fix_width}
                        data={this.tableData.data}
                        data-role='tableview'
                        data-inset='true'
                        className='tbody listview-container fixframe'
                        item-drag={true}
                        ref={ref => {this.fixtbody = ref}}
                    >
                    </Grid>
                    <Grid
                        columninfo={this.tableData.columninfo3}
                        rowinfo={this.tableData.rowinfo}
                        viewport-height={this.tableData.layoutHeight}
                        viewport-width={flex_width}
                        data={this.tableData.data}
                        data-role='tableview'
                        data-inset='true'
                        className='tbody listview-container flexframe'
                        item-drag={true}
                        ref={ref => {this.tbody = ref}}
                        sync={this.scrollhandler}
                        >
                    </Grid>
                    </div>
                  </div>
              </div>
        );
    }
}


export default Table;
