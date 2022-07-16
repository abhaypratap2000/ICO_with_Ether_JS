import React from "react";

export default function Alert(props) {
  return (
     props.alert && (
      <div
        className="alert alert-success d-flex align-items-center"
        role="alert"
      >
        <strong>{props.alert.type}</strong>:{props.alert.msg}
        <svg
          className="bi flex-shrink-0 me-2"
          width="24"
          height="24"
          role="img"
          aria-label="Success:"
        ></svg>
      </div>
    )
  );
}
