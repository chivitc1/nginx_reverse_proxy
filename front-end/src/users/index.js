import React, { Component } from 'react';

const users_url = "https://localhost:3000" + "/users";
console.log(users_url);
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    fetch(users_url)
      .then(res => res.json())
      .then(data => this.setState({ users: data }));
  }

  render() {
    const {users} = this.state;
    return (
      <div>
        <h3>List of users</h3>
        <ul>
          { users.map((user, index) => 
            <li key={user.id}>
            UserId: {user.id}, name: {user.name}
            </li>)}
        </ul>
      </div>
    )
  }
}

export default UserList;