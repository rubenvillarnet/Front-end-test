import React, { Component } from 'react'
import ApiProvider from '../lib/ApiProvider'
import Container from 'react-bootstrap/Container';
import ModalPhoto from './ModalPhoto';
import Paginate from './Paginate';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';


export default class Photos extends Component {
  constructor(props){
    super(props)
    this.data = new ApiProvider()
    this.state = { 
      modal: {
        show: false,
        img: "",
        title: ""
      },
      searchInput: "",
      allPhotos: [],
      photos: [],
      paginatedPhotos: [],
      currentPage: 0,
      itemsPerPage: 12,
      totalItems: 0
    }
    this.data.listPhotos(this.props.match.params.id)
    .then(photos => this.setState({
      ...this.state,
      photos,
      allPhotos: photos,
      paginatedPhotos: photos.slice(this.state.currentPage, this.state.itemsPerPage),
      totalItems: photos.length
    }))
  }

  paginate(page){
    const { photos, itemsPerPage} = this.state
    const from = page * itemsPerPage 
    const to = from + itemsPerPage
    const paginatedPhotos = [...photos].slice(from, to)
    this.setState({
      ...this.state,
      paginatedPhotos,
      currentPage: page
    })
  }


  showModal(img, title){
    this.setState({
      ...this.state,
      modal: {
        show: true,
        img,
        title
      }
    })
  }

  closeModal(){
    this.setState({
      ...this.state,
      modal: {
        show: false,
        img: "",
        title: ""
      }
    })
  }

  handleForm(e){
    /* newState.foods = this.allFoods.filter(comida => comida.name.toLowerCase().startsWith(query.toLowerCase())) */
    const filteredPhotos = this.state.allPhotos.filter(photo =>
      photo.title.toLowerCase().includes(e.target.value.toLowerCase()))

    this.setState({
      ...this.state,
      searchInput: e.target.value,
      photos: filteredPhotos,
      paginatedPhotos: filteredPhotos.slice(this.state.currentPage, this.state.itemsPerPage),
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Paginate
              currentPage={this.state.currentPage}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.state.totalItems}
              paginate={(page) => this.paginate(page)}/>
          </Col>
          <Col>
            <Form>
                <FormControl 
                  type="text" 
                  placeholder="filter..." 
                  value={this.state.searchInput}
                  onChange={e=>this.handleForm(e)}/>
            </Form>
          </Col>
        </Row>
        <hr/>
        <Row><Col>{this.state.photos.length} photos</Col></Row>
        <Row>
          {this.state.photos?
          this.state.paginatedPhotos.map(photo =>{
            return <Col xs={6} sm={4} lg={3} key={photo.id}>
              <Card>
                <Card.Img 
                  variant="top" 
                  src={photo.thumbnailUrl}
                  onClick={() => this.showModal(photo.url, photo.title)}/>
                <Card.Body>
                  <Card.Text>{photo.title}</Card.Text>
                  <Button
                    onClick={() => this.showModal(photo.url, photo.title)}
                    >Open</Button>
                </Card.Body>
              </Card>
            </Col>
          }):
          <div>
            <Spinner animation="border"/> Loading...
          </div>
          }
        </Row>
        <Row>
          <Col>
            <hr/>
            <Paginate
                  currentPage={this.state.currentPage}
                  itemsPerPage={this.state.itemsPerPage}
                  totalItems={this.state.totalItems}
                  paginate={(page) => this.paginate(page)}/>
          </Col>
        </Row>
        <ModalPhoto 
          show={this.state.modal.show}
          onHide={()=> this.closeModal()}
          img={this.state.modal.img}
          alt={this.state.modal.title}/>
      </Container>
    )
  }
}
