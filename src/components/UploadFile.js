import React, { useState, useEffect, useRef } from "react";
import classes from "./UploadFile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

function UploadFile(props) {
  const [isDraggedIn, setIsDraggedIn] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const dropRef = useRef(null);
  const inputRef = useRef(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();
    formData.append("File", selectedFile);
    console.log(selectedFile);
    console.log(formData);
    // fetch("", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json)
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const handleDragIn = (e) => {
    setIsDraggedIn(true);
  };
  const handleDragLeave = () => {
    setIsDraggedIn(false);
  };
  const handleDrag = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    inputRef.current.files = e.dataTransfer.files;
    setSelectedFile(inputRef.current.files.item(0));
    setIsFilePicked(true);
    setIsDraggedIn(false);
  };

  useEffect(() => {
    const dropZone = dropRef.current;
    dropZone.addEventListener("dragenter", handleDragIn);
    dropZone.addEventListener("dragleave", handleDragLeave);
    dropZone.addEventListener("dragover", handleDrag);
    dropZone.addEventListener("drop", handleDrop);

    return () => {
      dropZone.removeEventListener("dragenter", handleDragIn);
      dropZone.removeEventListener("dragleave", handleDragLeave);
      dropZone.removeEventListener("dragover", handleDrag);
      dropZone.removeEventListener("drop", handleDrop);
    };
  });

  return (
    <div
      className={`${classes["upload__area"]} ${
        isDraggedIn ? classes["upload__area--over"] : ""
      }`}
      ref={dropRef}
    >
      {!isFilePicked && (
        <React.Fragment>
          <div className={classes.text}>
            <h2>Upload your file by dropping here or by clicking icon</h2>
          </div>
          <div className={classes.icon}>
            <label htmlFor="single">
              <FontAwesomeIcon icon={faImage} color="#3B5998" size="7x" />
            </label>
          </div>
          <input
            type="file"
            id="single"
            ref={inputRef}
            onChange={changeHandler}
          />
        </React.Fragment>
      )}
      {isFilePicked && (
        <React.Fragment>
          <div className={classes.text}>
            <h2>Uploaded File</h2>
          </div>
          <div className={classes.file}>
            <div>
              <p>Filename: {selectedFile.name}</p>
              <p>Filetype: {selectedFile.type}</p>
              <p>Size in bytes: {selectedFile.size}</p>
              <p>
                lastModifiedDate:{" "}
                {selectedFile.lastModifiedDate.toLocaleDateString()}
              </p>
            </div>
          </div>
        </React.Fragment>
      )}
      <div>
        <button onClick={handleSubmission}>Submit the file</button>
      </div>
    </div>
  );
}

export default UploadFile;
