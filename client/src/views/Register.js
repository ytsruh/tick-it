import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input } from "reactstrap";

function Login() {
  return (
    <div className="bg-register">
      <Container>
        <Row>
          <h1 className="mt-3 mx-auto text-warning">Register</h1>
        </Row>
        <Row className="p-5">
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Card className="bg-transparent border border-none">
              <CardBody>
                <CardTitle>
                  <Form>
                    <FormGroup>
                      <Label className="text-white">Username</Label>
                      <Input type="username" name="username" />
                    </FormGroup>
                    <FormGroup>
                      <Label className="text-white">Password</Label>
                      <Input type="password" name="password" />
                    </FormGroup>
                    <FormGroup>
                      <Label className="text-white">Role</Label>
                      <Input type="text" name="role" />
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
              <h3 className="my-3 mx-auto text-warning">Note</h3>
            </Row>
            <Row>
              <Col md="12">
                <Card body inverse color="warning">
                  <CardBody>
                    <CardTitle>
                      <h5 className="text-light">Please note: This register form has been disabled.</h5>
                    </CardTitle>
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

export default Login;
