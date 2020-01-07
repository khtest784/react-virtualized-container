import React, {useState, useEffect, useRef } from "react";
import VirtualBox from "./components/virtualBox";

const Grid = (state) => {
  const [id, setId] = useState(state.id);
  const [row, setRow] = useState(state.row);
  const [column, setColumn] = useState(state.column);
  const [rowheight, setrowheight] = useState(state.rowheight);
  const [columnwidth, setcolumnwidth] = useState(state.columnwidth);
  const [height, setheight] = useState(state.height);
  const [width, setwidth] = useState(state.width);
  const vboxref = useRef();

  let colspanCount=0;
  let toppos=0;
  let leftpos=0;


  colspanCount=0;
  let columninfo = [];
  for(let i=0;i<state.row;i++){
    let col=[];
    for(let j=0;j<state.column;j++){
      let left = leftpos
      let width = parseInt(state.columnwidth)?parseInt(state.columnwidth):100;//~~index%2?30:30;
      let right = left+width;
      leftpos += width;
      col.push({
        width:width,
        left:left,
        right:right,
        colspan:1,//default
        rowspan:1,//default
        visible:"visible",
      })
    }
    columninfo.push(col);
    leftpos = 0;
  }

  toppos=0;
  let rowinfo = [];
  for(let i=0;i<state.row;i++){
    let height = parseInt(state.rowheight)?parseInt(state.rowheight):30;//~~index%2?30:30;
    let top = toppos;
    let bottom = top + height;
    toppos += height;
    rowinfo.push([{
      selected:false,
      checked:false,
      renderkey:i,
      vindex:i,
      dataIndex:i,
      height:height,
      top:top,
      bottom:bottom
    }])
  }

  let eventinfo = [];
  let dummydata=[];
  for(let i=0;i<state.row;i++){
    eventinfo.push([{
      selected:false,
      checked:false,
    }])
    dummydata.push({
      a:"aa",
      b:"bb"
    })
  }
  if(!state.row || !state.column){
    return (<div></div>)
  }

        return (
          <VirtualBox
              ref={vboxref}
              columninfo={columninfo}
              rowinfo={rowinfo}
              event={eventinfo}
              viewport-height={state.height}
              viewport-width={state.width}
              data={dummydata}
              data-role='grid'
              data-inset='true'
              cellmaker={state.cellmaker}
              className='tbody grid-container flexframe'
          >
          </VirtualBox>
        )
}


export default Grid;
