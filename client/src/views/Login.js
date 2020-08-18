import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      msgBanner: {
        message: "",
        show: false,
        type: "",
      },
      redirect: false,
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      try {
        //Send data
        const response = await fetch(`/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          }),
        });
        //Check for ok response
        if (!response.ok) {
          //Throw error if not ok
          throw Error(response.statusText);
        }
        // Set to json, put token in storage & redirect
        const data = await response.json();
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("role", data.role);
        this.setState({
          redirect: true,
        });
      } catch (error) {
        this.setState({
          msgBanner: {
            message: "Unauthorised. Please try again",
            show: true,
            type: "warning",
          },
        });
      }
    } else {
      this.setState({
        msgBanner: {
          message: "Please ensure all fields are completed",
          show: true,
          type: "warning",
        },
      });
    }
  }
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="bg-login">
        <Container>
          <Row>
            <h1 className="mt-3 mx-auto text-warning">Login</h1>
          </Row>
          <Row className="pt-2">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              {this.state.msgBanner.show ? <CustomAlert msg={this.state.msgBanner} /> : ""}
            </Col>
          </Row>
          <Row className="p-5">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Card className="bg-transparent border border-none">
                <CardBody>
                  <CardTitle>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                      <FormGroup>
                        <Label className="text-white">Username</Label>
                        <Input type="username" name="username" onChange={this.handleChange.bind(this)} />
                      </FormGroup>
                      <FormGroup>
                        <Label className="text-white">Password</Label>
                        <Input type="password" name="password" onChange={this.handleChange.bind(this)} />
                      </FormGroup>
                      <Button color="warning">Submit</Button>
                    </Form>
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              <Row>
                <h3 className="my-3 mx-auto text-warning">Example Login Details</h3>
              </Row>
              <Row>
                <Col md="4">
                  <Card body inverse color="dark">
                    <CardBody>
                      <CardTitle>
                        <h5 className="text-warning">User 1</h5>
                      </CardTitle>
                      <p>
                        <strong>U: </strong>user1
                      </p>
                      <p>
                        <strong>P: </strong>user
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card body inverse color="dark">
                    <CardBody>
                      <CardTitle>
                        <h5 className="text-warning">User 2</h5>
                      </CardTitle>
                      <p>
                        <strong>U: </strong>user2
                      </p>
                      <p>
                        <strong>P: </strong>user
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card body inverse color="dark">
                    <CardBody>
                      <CardTitle>
                        <h5 className="text-warning">Engineer</h5>
                      </CardTitle>
                      <p>
                        <strong>U: </strong>engineer1
                      </p>
                      <p>
                        <strong>P: </strong>engineer
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
