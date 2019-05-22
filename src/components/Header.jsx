import React, { Component } from 'react'
import {withRouter, Link} from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';


class Header extends Component {
  render() {
    return (
      <Jumbotron fluid>
        <Container>
          <h1>Front End Test</h1>
          {this.props.location.pathname !== "/"?
          <Link to="/">Back to home</Link>: null}
        </Container>
      </Jumbotron>
    )
  }
}

export default withRouter(Header)
