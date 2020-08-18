import React from "react";
import { Navbar, NavbarBrand, Container } from "reactstrap";

const Navigation = (props) => {
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <Container>
          <NavbarBrand href="/">Tick-it</NavbarBrand>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
