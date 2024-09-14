import React, { useState, useEffect } from "react";

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
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="text-center h1 mt-5">
        <p className="h1">Information About the Users Registered</p>
      </div>
      <div className="border-2 m-5">
        <div>
          {users.length > 0 && (
            <table className="table mt-3">
              <thead>
                <tr className="text-center h6">
                  <th>S.No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  {/* <th>Password</th> */}
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="text-center ">
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    {/* <td>{user.password}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* <div className="text-center">
        <button onClick={fetchUsers} className="btn btn-primary ">
          Show Users
        </button>
      </div> */}
    </>
  );
}

export default About;
