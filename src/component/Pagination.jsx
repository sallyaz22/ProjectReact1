import React from 'react'
import { Container, Row } from 'react-bootstrap';
import {Pagination} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import "./Navbar.css";



    const PaginationComponenmt =({getPage}) =>{
        const handlePageClick = (data) => {
            getPage(data.selected  + 1)
        } 
        const pageCount = 10;
      return (
        <Container>
        <Row className='activepag'>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<previous"
        containerClassName={"pagination justify-content-center p-3"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
        </Row>
        </Container>
      );
    }
    
    export default PaginationComponenmt