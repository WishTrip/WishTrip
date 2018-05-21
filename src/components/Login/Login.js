import React from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    axios.get("/api/getData").then(res => this.setState({ data: [res.data] }));
  }

  render() {
    let users = this.state.data.map((cur, ind) => {
      return <div key={ind}>{cur.username}</div>;
    });

    return <div>{users}</div>;
  }
}

export default Login;
