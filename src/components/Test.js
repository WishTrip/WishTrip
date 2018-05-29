import React from "react";
import axios from "axios";

export default class Test extends React.Component {
  componentDidMount() {
    axios
      .get("/api/test")
      .then(function(buf) {
        const file = new File([buf], "./test.js", { type: "text/javascript" });
        console.log(file);
      })
      .catch(console.error);
  }
  render() {
    return <div>TEST</div>;
  }
}
