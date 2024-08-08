import React, { useState } from "react";

function About() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      let response = await fetch("http://localhost:4000/a");
      let result = await response.json();
      setUsers(result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      <h2>About Page</h2>
      <button onClick={fetchUsers} className="btn btn-primary">
        Show Users
      </button>
      {users.length > 0 && (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default About;
