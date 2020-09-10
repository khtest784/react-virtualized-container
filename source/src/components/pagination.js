import ReactPaginate from "react-paginate";
import React, { Component } from "react";
import styled from "styled-components";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      elements: [],
      perPage: 10,
      currentPage: 0
    };
  }

  render() {
    const style = {};
    return (
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel={<span className="gap">...</span>}
        pageCount={this.state.pageCount}
        onPageChange={this.props.onPageChange}
        forcePage={this.state.currentPage}
        containerClassName={"pagination"}
        previousLinkClassName={"previous_page"}
        nextLinkClassName={"next_page"}
        disabledClassName={"disabled"}
        activeClassName={"active"}
      />
    );
  }
}

export default Pagination;
