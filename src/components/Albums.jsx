import React, { Component } from 'react'
import ApiProvider from '../lib/ApiProvider'
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Paginate from './Paginate';

export default class Albums extends Component {
  constructor(props){
    super(props)
    this.data = new ApiProvider()
    this.state={
      albums: [],
      paginatedAlbums: [],
      currentPage: 0,
      itemsPerPage: 10,
      totalItems: 0
    }

    this.data.listAlbums()
    .then(albums => {
      this.setState({
      ...this.state,
      albums,
      paginatedAlbums: albums.slice(this.state.currentPage, this.state.itemsPerPage),
      totalItems: albums.length
    })
  })
  }

  paginate(page){
    const { albums, itemsPerPage} = this.state
    const from = page * itemsPerPage 
    const to = from + itemsPerPage
    const paginatedAlbums = [...albums].slice(from, to)
    this.setState({
      ...this.state,
      paginatedAlbums,
      currentPage: page
    })
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
          <Paginate
              currentPage={this.state.currentPage}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.state.totalItems}
              paginate={(page) => this.paginate(page)}/>
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>UserId</th>
                  <th>Title</th>
                  <th>Open album</th>
                </tr>
              </thead>
              <tbody>
                  {this.state.paginatedAlbums.map(album => {
                    return <tr key={album.id}>
                      <td>{album.id}</td>
                      <td>{album.userId}</td>
                      <td>{album.title}</td>
                      <td><Link to={`/album/${album.id}`}>Open</Link></td>
                    </tr>
                  })}
              </tbody>
            </Table>
            <Paginate
              currentPage={this.state.currentPage}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.state.totalItems}
              paginate={(page) => this.paginate(page)}/>
          </Col>
        </Row>
      </Container>
    )
  }
}
