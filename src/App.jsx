import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';



function App() {
  return (
    <React.Fragment>
      <Jumbotron fluid>
        <Container>
          <h1>Front End Test</h1>
        </Container>
      </Jumbotron>
      <Container className="App">
        <Row>
          <Col>
            <Button>Hello world</Button>
          </Col>
        </Row>
      </Container>

    </React.Fragment>
  );
}

export default App;
