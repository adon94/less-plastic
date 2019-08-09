import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const UserList = ({ users }) => (
  <ul>
    {users.map(({ id, email, username }) => (
      <li key={id}>
        <span>
          <strong>ID: </strong>
          {id}
        </span>
        <span>
          <strong> E-Mail: </strong>
          {email}
        </span>
        <span>
          <strong> Username: </strong>
          {username}
        </span>
      </li>
    ))}
  </ul>
);

const Admin = ({ users }) => (
  <div>
    <h1>Admin</h1>
    {users && <UserList users={users} />}
  </div>
);

export default compose(
  firestoreConnect(['users']),
  connect(state => ({
    users: state.firestore.ordered.users,
  })),
)(Admin);
