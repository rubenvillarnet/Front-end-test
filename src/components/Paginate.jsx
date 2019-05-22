import React, { Component } from 'react'

import Pagination from 'react-bootstrap/Pagination';


export default class Paginate extends Component {
  constructor(props){
    super(props)
    this.state = {
      totalPages: Math.ceil(this.props.totalItems / this.props.itemsPerPage)
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.totalItems !== this.props.totalItems){
      this.setState({
        ...this.state,
        totalPages: Math.ceil(this.props.totalItems / this.props.itemsPerPage)
      })
    }
  }

  render() {
    const {currentPage, paginate} = this.props
    return (
      <Pagination>
        {currentPage > 0?<Pagination.Item
          onClick={() => paginate(currentPage - 1)}
          >Prev</Pagination.Item>:null}
        <Pagination.Item active>{currentPage +1 }</Pagination.Item>
        {currentPage +1 < this.state.totalPages?<Pagination.Item
          onClick={() => paginate(currentPage + 1)}
          >Next</Pagination.Item>:null}
      </Pagination>
    )
  }
}
