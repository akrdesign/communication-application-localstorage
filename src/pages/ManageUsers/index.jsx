import React, { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import ModalComponent from "../../components/ModalComponent";

import styles from "./styles.module.scss";

const ModalBody = () => {
  return <h4>Are you sure?</h4>;
};

const ManageUsers = () => {
  // Get users from local storage
  const localStorageUsers = JSON.parse(localStorage.getItem("users"));
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [users, setUsers] = useState(localStorageUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = () => {
    // Filter out the user with the specified email
    const updatedUsers = users.filter((user) => user.email !== selectedUser);

    // Update local storage with the new users array
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setUsers(updatedUsers);
    setSelectedUser(null);
  };

  const openModalHandler = (email) => {
    setSelectedUser(email);
  };

  const closeModalHandler = () => {
    setSelectedUser(null);
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>User Email ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.email}>
                  <td>{user.fullName}</td>
                  <td className={styles.email}>{user.email}</td>
                  <td>
                    <span className={styles.button}>
                      <Link to={`/edit-user/${user.id}`}>Edit</Link>
                    </span>
                    {loggedInUser.email !== user.email && (
                      <>
                        <span> | </span>
                        <span
                          className={styles.button}
                          onClick={() => openModalHandler(user.email)}
                        >
                          Delete
                        </span>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <ModalComponent
          confirmHandler={handleDelete}
          handleClose={closeModalHandler}
          heading="Confirm user deletion?"
          ModalBody={() => <ModalBody />}
          footerVisible={true}
        />
      )}
    </>
  );
};

export default ManageUsers;
