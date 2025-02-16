import React from "react";

function Alert(props) {
  return (
    props.alert && (
      <div
        style={{
          marginTop: "55px",
          marginLeft: "10px",
          marginRight: "10px",
          postion: "sticky",
        }}
        className={`alert alert-${props.alert.type}  alert-dismissible fade show`}
        role="alert"
      >
        {props.alert.msg}
      </div>
    )
  );
}

export default Alert;
