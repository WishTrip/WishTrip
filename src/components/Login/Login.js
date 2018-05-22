import React from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    data: [],
    usernames: [],
    trips: [],
    userInput: ""
  };

  componentDidMount() {
    axios.get("/api/getData").then(res => {
      const usernameArr = this.state.usernames;
      for (let key in res.data) {
        usernameArr.push(res.data[key].userinfo.username);
      }
      this.setState({ data: res.data });
    });
  }

  handleUserInput = e => {
    this.setState({ userInput: e.target.value });
  };

  createUser = username => {
    axios.post("/api/changeDummyData", { username }).then(res => {
      this.setState({ usernames: [] });

      const usernameArr = this.state.usernames;

      for (let key in res.data) {
        usernameArr.push(res.data[key].userinfo.username);
      }
      this.setState({ data: res.data });
    });
  };

  render() {
    const { usernames, trips, userInput, data } = this.state;
    const usernameArr = this.state.usernames;

    let users = usernameArr.map((cur, ind) => <div key={ind}>{cur}</div>);

    return (
      <div>
        <div>
          <input onChange={this.handleUserInput} />
          <button onClick={() => this.createUser(userInput)}>
            Add Username
          </button>
        </div>
        {users}
      </div>
    );
  }
}

export default Login;
