import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';


export default class ModalPhoto extends Component {
  render() {
    const {show, onHide, img, alt} = this.props
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered>
        <Modal.Header closeButton>{alt}</Modal.Header>
        <Modal.Body>
          <Image src={img} alt={alt} fluid/>
        </Modal.Body>
      </Modal>
    )
  }
}
