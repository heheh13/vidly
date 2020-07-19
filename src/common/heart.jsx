import React, { Component } from "react";

class Heart extends Component {
  render() {
    let heart = "fa fa-heart";
    if (!this.props.liked) heart += "-o";
    return (
      <i
        style={{ cursor: "pointer" }}
        onClick={this.props.onClick}
        className={heart}
        aria-hidden="true"
      ></i>
    );
  }
}

export default Heart;
