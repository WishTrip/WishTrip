import React from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    username: "",
    trips: [],
    userInput: ""
  };

  componentDidMount() {
    axios.get("/api/getData").then(res =>
      this.setState({
        username: res.data.userinfo.username,
        trips: res.data.trips
      })
    );
  }

  handleUserInput = e => {
    this.setState({ userInput: e.target.value })
  }

  updateUser = (username) => {
    axios.post('/api/changeDummyData', { username }).then(res => console.log(res))
  }

  render() {
    const { username, trips, userInput } = this.state;

    return (
      <div>
        <div>
          {username},{" "}
          {trips.UniversalStudios && trips.UniversalStudios.Day1.destination}
        </div>
        <div>
          <input onChange={this.handleUserInput} />
          <button onClick={() => this.updateUser(userInput)}>Add Username</button>
        </div>
      </div>
    );
  }
}

export default Login;
