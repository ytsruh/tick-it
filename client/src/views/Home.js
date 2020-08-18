import React from "react";
import { Jumbotron, Container, Button, Row, Col, Card, CardBody, CardTitle, CardText } from "reactstrap";
import { FiFastForward, FiLock, FiCheckSquare, FiCheck } from "react-icons/fi";

function Home() {
  return (
    <div>
      <Jumbotron className="text-white">
        <Container>
          <h1 className="display-3">
            Welcome to Tick-it
            <FiCheck />
          </h1>
          <p className="lead">
            Much more than <span className="text-warning">turn it off & on again</span>
          </p>
          <Button href="/login" color="warning">
            Login
          </Button>
          <Button href="/register" color="secondary">
            Register
          </Button>
        </Container>
      </Jumbotron>
      <Container>
        <Row className="text-center text-white">
          <Col>
            <p className="text-warning featureIcon">
              <FiFastForward />
            </p>
            <h2>Quick</h2>
          </Col>
          <Col>
            <p className="text-warning featureIcon">
              <FiLock />
            </p>
            <h2>Safe</h2>
          </Col>
          <Col>
            <p className="text-warning featureIcon">
              <FiCheckSquare />
            </p>
            <h2>Reliable</h2>
          </Col>
        </Row>
        <Row className="my-5">
          <Col md="3">
            <img className="img-thumbnail border border-warning" src="/hardware.jpg" alt="feature 1" />
          </Col>
          <Col md="9">
            <Card body inverse className="bg-transparent border border-dark">
              <CardBody>
                <CardTitle>
                  <h3 className="text-warning">Hardware Support</h3>
                </CardTitle>
                <CardText>Screen isn't turning on? Mouse not clicking? We can help fix any hardware related issues</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="my-5">
          <Col md="9">
            <Card body inverse className="bg-transparent border border-dark">
              <CardBody>
                <CardTitle>
                  <h3 className="text-warning">Software Support</h3>
                </CardTitle>
                <CardText>Programs not starting? Can't login? We support all enterprise grade software used across business today</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <img className="img-thumbnail border border-warning" src="/software.jpg" alt="feature 2" />
          </Col>
        </Row>
        <Row className="my-5">
          <Col md="3">
            <img className="img-thumbnail border border-warning" src="/mobile.jpg" alt="feature 3" />
          </Col>
          <Col md="9">
            <Card body inverse className="bg-transparent border border-dark">
              <CardBody>
                <CardTitle>
                  <h3 className="text-warning">Mobile Support</h3>
                </CardTitle>
                <CardText>Out of the office? Need extra help? We can support all mobile & connectivity related matters</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
