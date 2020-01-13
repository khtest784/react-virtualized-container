import React, { useState } from "react";
import styled from "styled-components";

import Grid from "../grid";
import Counter from "../testcounter";
function cellmaker({ ridx, cidx, ckey }) {
  const color = ["red", "pink", "blue", "orange", "yellow"];
  const style = {
    backgroundColor: color[(ridx + cidx) % 5],
    height: "100%"
  }; //보류

  let data = "row:" + ridx + "col:" + cidx;

  return (
    <div key={ckey} style={style}>
      {data}
      <br />
      {"Hello world"}
    </div>
  );
}

const GridExample = state => {
  const [width, setwidth] = useState(600);
  const [height, setheight] = useState(400);
  const [rowheight, setrowheight] = useState(40);
  const [columnwidth, setcolumnwidth] = useState(100);
  const [row, setrow] = useState(100);
  const [column, setcolumn] = useState(15);
  const onChangewidth = e => {
    setwidth(e.target.value);
  }; // 방식1

  return (
    <div>
      <h1>GRID (none essential bind)</h1>
      width: <input value={width} onChange={onChangewidth} />
      height:{" "}
      <input
        value={height}
        onChange={({ target: { value } }) => setheight(value)}
      />
      rowheight:{" "}
      <input
        value={rowheight}
        onChange={({ target: { value } }) => setrowheight(value)}
      />
      <br />
      columnwidth:{" "}
      <input
        value={columnwidth}
        onChange={({ target: { value } }) => setcolumnwidth(value)}
      />
      row:{" "}
      <input value={row} onChange={({ target: { value } }) => setrow(value)} />
      column:{" "}
      <input
        value={column}
        onChange={({ target: { value } }) => setcolumn(value)}
      />
      <br />
      <br />
      <Grid
        id="GridSample"
        row={row}
        column={column}
        rowheight={rowheight}
        columnwidth={columnwidth}
        width={width + "px"}
        height={height + "px"}
        cellmaker={cellmaker}
      ></Grid>
    </div>
  );
};

export default GridExample;
