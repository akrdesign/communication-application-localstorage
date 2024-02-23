import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const UploadModalBody = ({ setOpenUploadModal, setUploads, uploads }) => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const uploadHandleSubmit = (e) => {
    e.preventDefault();

    const validateForm = () => {
      const error = {};

      if (description.trim() === "") {
        error.description = "File Description is required";
      }

      if (file === null) {
        error.file = "File Upload is required";
      }

      setErrors(error);
      return error;
    };

    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      const upload = {
        id: uuidv4(),
        description,
        file: file.name,
        shared: [],
      };

      // Update the state to include the new upload
      setUploads([...uploads, upload]);

      // Update local storage with the new uploads array
      localStorage.setItem("uploads", JSON.stringify([...uploads, upload]));

      setDescription("");
      setFile(null);
      setErrors({});
      // Close the modal
      setOpenUploadModal(false);
    }
  };

  return (
    <>
      <form onSubmit={uploadHandleSubmit} className="grid_form">
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          name="description"
          label="File Description"
          className={"inputs__wrapper"}
          error={errors.description}
        />
        <Input
          type="file"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
          }}
          id="file"
          name="file"
          label="File Upload"
          className={"inputs__wrapper"}
          error={errors.file}
        />
        <div className="modal_footer">
          <Button type="submit">Ok</Button>
          <Button onClick={() => setOpenUploadModal(false)}>Cancel</Button>
        </div>
      </form>
    </>
  );
};

export default UploadModalBody;
