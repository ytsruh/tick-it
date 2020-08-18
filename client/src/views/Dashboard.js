import React, { Component, useState } from "react";
import { Container, Row, Col, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Badge } from "reactstrap";
import { Redirect } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

class Dashboard extends Component {
  constructor(props) {
    super();
    this.state = {
      msgBanner: {
        message: "",
        show: false,
      },
      redirect: false,
    };
  }
  logout() {
    sessionStorage.clear();
    this.setState({
      redirect: true,
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.title && this.state.description) {
      const token = sessionStorage.getItem("token");
      try {
        //Send data
        const response = await fetch(`/api/tickets?token=${token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: this.state.title,
            description: this.state.description,
          }),
        });
        //Check for ok response
        if (!response.ok) {
          //Throw error if not ok
          throw Error(response.statusText);
        }
        window.location.reload(false);
        this.setState({
          msgBanner: {
            message: "Success. Ticket was created",
            show: true,
            type: "warning",
          },
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

  async componentDidMount() {
    try {
      const token = sessionStorage.getItem("token");
      //Send data
      const response = await fetch(`/api/tickets?token=${token}`);
      //Check for ok response
      if (!response.ok) {
        //Throw error if not ok
        throw Error(response.statusText);
      }
      // Set to json, put token in storage & redirect
      const data = await response.json();
      this.setState({
        data: data,
      });
    } catch (error) {
      this.setState({
        redirect: true,
      });
    }
  }

  async deleteTicket(id) {
    const token = sessionStorage.getItem("token");
    try {
      //Send data
      const response = await fetch(`/api/tickets/${id}?token=${token}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      //Check for ok response
      if (!response.ok) {
        //Throw error if not ok
        throw Error(response.statusText);
      }
      window.location.reload(false);
      this.setState({
        msgBanner: {
          message: "Success. Ticket was deleted",
          show: true,
          type: "warning",
        },
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
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.data) {
      let rows = this.state.data.data.map((ticket) => {
        return <TableRow key={ticket.id} data={ticket} handleDelete={this.deleteTicket.bind(this)} />;
      });
      return (
        <div className="bg-dashboard">
          <Container>
            <Row className="py-3">
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                {this.state.msgBanner.show ? <CustomAlert msg={this.state.msgBanner} /> : ""}
              </Col>
            </Row>
            <Row>
              <Col sm="12" md={{ size: 10, offset: 1 }}>
                <Row>
                  <Col md="8">
                    <Table dark responsive>
                      <thead>
                        <tr>
                          <th colSpan="2">Ticket</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>{rows}</tbody>
                    </Table>
                  </Col>
                  <Col md="4">
                    <AddTicket change={this.handleChange.bind(this)} submit={this.handleSubmit.bind(this)} />
                    <Button block color="secondary" onClick={this.logout.bind(this)}>
                      Logout
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      return (
        <div className="bg-dashboard">
          <Container>Loading...</Container>
        </div>
      );
    }
  }
}

export default Dashboard;

const TableRow = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <tr>
      <td colSpan="2">{props.data.title}</td>
      <td>
        <Button color="warning" onClick={toggle}>
          View
        </Button>
      </td>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {props.data.title} {props.data.urgent ? <Badge color="warning">Urgent</Badge> : ""}
        </ModalHeader>
        <ModalBody>{props.data.description}</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={props.handleDelete.bind(this, props.data.id)}>
            Delete
          </Button>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </tr>
  );
};

const AddTicket = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div>
      <Button block color="warning" onClick={toggle}>
        Add Ticket
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <Form onSubmit={props.submit}>
          <ModalHeader toggle={toggle}>Raise new ticket</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="exampleEmail">Title</Label>
              <Input type="text" name="title" onChange={props.change} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Description</Label>
              <Input type="textarea" name="description" onChange={props.change} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Urgent</Label>
              <Input type="select" name="urgent" onChange={props.change}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="warning" type="submit" onClick={toggle}>
              Submit
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};
