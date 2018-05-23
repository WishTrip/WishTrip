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
    axios
      .get("/api/getData")
      .then(res => {
        const usernameArr = this.state.usernames;
        for (let key in res.data) {
          usernameArr.push({ key, username: res.data[key].userinfo.username });
        }
        this.setState({ data: res.data });
      })
      .catch(err => console.log(err));
  }

  handleUserInput = e => {
    this.setState({ userInput: e.target.value });
  };

  handelUsernameEdit = e => {
    this.setState({ userInput: e.target.value });
  };

  handleUpdateUsername = (username, key) => {
    axios
      .put("/api/updateUsername", { username, key })
      .then(res => {
        this.setState({ usernames: [] });

        const usernameArr = this.state.usernames.slice();

        for (let key in res.data) {
          usernameArr.push({ key, username: res.data[key].userinfo.username });
        }

        this.setState({ data: res.data, usernames: usernameArr });
      })
      .catch(err => console.log(err));
  };

  createUser = username => {
    axios
      .post("/api/changeDummyData", { username })
      .then(res => {
        this.setState({ usernames: [] });

        const usernameArr = this.state.usernames.slice();

        for (let key in res.data) {
          usernameArr.push({ key, username: res.data[key].userinfo.username });
        }

        this.setState({ data: res.data, usernames: usernameArr });
      })
      .catch(err => console.log(err));
  };

  deleteUser = key => {
    axios
      .delete(`/api/deleteUser/${key}`)
      .then(res => {
        this.setState({ usernames: [] });

        const usernameArr = this.state.usernames.slice();

        for (let key in res.data) {
          usernameArr.push({ key, username: res.data[key].userinfo.username });
        }

        this.setState({ data: res.data, usernames: usernameArr });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { usernames, trips, userInput, data } = this.state;

    let users = this.state.usernames.map((cur, ind) => (
      <div key={cur.key}>
        {cur.username}
        <input onChange={this.handelUsernameEdit} />
        <button
          onClick={() => {
            this.handleUpdateUsername(userInput, cur.key);
            this.setState({ userInput: "" });
          }}
        >
          Edit
        </button>
        <button onClick={() => this.deleteUser(cur.key)}>Delete</button>
      </div>
    ));

    return (
      <div>
        <div>
          <input data-cypress-add-input onChange={this.handleUserInput} />
          <button
            data-cypress-button-add
            onClick={() => this.createUser(userInput)}
          >
            Add Username
          </button>
        </div>
        {users}
      </div>
    );
  }
}

export default Login;
