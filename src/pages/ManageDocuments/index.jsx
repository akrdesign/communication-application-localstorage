import React, { useEffect, useState } from "react";

import Header from "../../components/Header";
import Button from "../../components/common/Button";
import ModalComponent from "../../components/ModalComponent";

import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import UploadModalBody from "./UploadModalBody";
import EditModalBody from "./EditModalBody";

const DeleteModalBody = () => {
  return <h4>Are you sure?</h4>;
};

const ManageDocuments = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [uploads, setUploads] = useState([]);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [selectedUpload, setSelectedUpload] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [sharedUploadsForCurrentUser, setSharedUploadsForCurrentUser] =
    useState([]);

  useEffect(() => {
    const localStorageUploads = localStorage.getItem("uploads")
      ? JSON.parse(localStorage.getItem("uploads"))
      : [];

    setUploads(localStorageUploads);
  }, []);

  const loggedInUserEmail = loggedInUser.email;

  useEffect(() => {
    const sharedUploads = uploads.filter((upload) =>
      upload.shared.some((share) => share.sharedTo === loggedInUserEmail)
    );

    const updatedSharedUploads = sharedUploads.map((shared) =>
      shared.shared.find((share) => share.sharedTo === loggedInUserEmail)
    );

    setSharedUploadsForCurrentUser(updatedSharedUploads);
  }, [uploads, loggedInUserEmail]);

  const handleDelete = () => {
    // Filter out the user with the specified id
    const updatedUploads = uploads.filter((u) => u.id !== selectedUpload);

    // Update local storage with the new users array
    localStorage.setItem("uploads", JSON.stringify(updatedUploads));

    setUploads(updatedUploads);
    setSelectedUpload(null);
    setOpenDeleteModal(false);
  };

  const openDeleteModalHandler = (id) => {
    setSelectedUpload(id);
    setOpenDeleteModal(true);
  };

  const closeDeleteModalHandler = () => {
    setSelectedUpload(null);
    setOpenDeleteModal(false);
  };

  const openEditModalHandler = (id) => {
    setSelectedUpload(id);
    setOpenEditModal(true);
  };

  const closeEditModalHandler = () => {
    setSelectedUpload(null);
    setOpenEditModal(false);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2>My uploads</h2>
        {uploads.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Label</th>
                <th>File Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload) => {
                return (
                  <tr key={upload.id}>
                    <td>{upload.description}</td>
                    <td className={styles.email}>{upload.file}</td>
                    <td>
                      <span
                        className={styles.button}
                        onClick={() => openEditModalHandler(upload.id)}
                      >
                        Edit
                      </span>
                      <span> | </span>
                      <span
                        className={styles.button}
                        onClick={() => openDeleteModalHandler(upload.id)}
                      >
                        Delete
                      </span>
                      <span> | </span>
                      <span className={styles.button}>
                        <Link to={`/manage-document/${upload.id}`}>Share</Link>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No documents uploaded</p>
        )}

        <h2 className="mt-5">Shared uploads</h2>
        {sharedUploadsForCurrentUser.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Label</th>
                <th>File Name</th>
                <th>Shared By</th>
              </tr>
            </thead>
            <tbody>
              {sharedUploadsForCurrentUser.map((upload) => {
                return (
                  <tr key={upload.id}>
                    <td>{upload.description}</td>
                    <td>{upload.file}</td>
                    <td className={styles.email}>{upload.sharedBy}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>You don&apos;t have any shared documents</p>
        )}

        {selectedUpload && openDeleteModal && (
          <ModalComponent
            confirmHandler={handleDelete}
            handleClose={closeDeleteModalHandler}
            heading="Confirm file deletion?"
            ModalBody={() => <DeleteModalBody />}
            footerVisible={true}
          />
        )}
        {selectedUpload && openEditModal && (
          <ModalComponent
            heading="Edit"
            handleClose={closeEditModalHandler}
            ModalBody={() => (
              <EditModalBody
                closeEditModalHandler={closeEditModalHandler}
                selectedUpload={selectedUpload}
                uploads={uploads}
                setUploads={setUploads}
              />
            )}
            className={styles.large}
            footerVisible={false}
          />
        )}
        {openUploadModal && (
          <ModalComponent
            handleClose={() => setOpenUploadModal(false)}
            heading="Upload"
            ModalBody={() => (
              <UploadModalBody
                setOpenUploadModal={setOpenUploadModal}
                uploads={uploads}
                setUploads={setUploads}
              />
            )}
            className={styles.large}
            footerVisible={false}
          />
        )}
        <Button
          className={uploads ? styles.paddingTop : ""}
          onClick={() => setOpenUploadModal(true)}
        >
          Add upload
        </Button>
      </div>
    </>
  );
};

export default ManageDocuments;
