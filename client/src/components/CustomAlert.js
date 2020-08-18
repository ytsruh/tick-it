import React from "react";
import { UncontrolledAlert } from "reactstrap";

const CustomAlert = (props) => {
  return <UncontrolledAlert color={props.msg.type}>{props.msg.message}</UncontrolledAlert>;
};

export default CustomAlert;
