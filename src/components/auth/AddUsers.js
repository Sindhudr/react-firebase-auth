import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataService from "../auth/services/bookservices";

import { storage } from "../auth/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const AddUsers = ({ id, setUsersId }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Available");
  const [flag, setFlag] = useState(true);
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const [message, setMessage] = useState({ error: false, msg: "" });
  const handleUpload = (e) => {
    e.preventDefault();
    let file = document.getElementById("image").files[0];

    //const file = e.target[0]?.files[0];

    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);

          console.log(setImgUrl);
        });
      }
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" || address === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newUser = {
      name,
      address,
      status,
      imgUrl,
    };
    console.log(newUser);

    try {
      if (id !== undefined && id !== "") {
        await BookDataService.updateBook(id, newUser);
        setUsersId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await BookDataService.addBooks(newUser);
        setMessage({ error: false, msg: "New Book added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setName("");
    setAddress("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await BookDataService.getUser(id);
      console.log("the record is :", docSnap.data());
      setName(docSnap.data().name);
      setAddress(docSnap.data().address);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBookTitle">
            <InputGroup>
              {/* <InputGroup.Text id="formBookTitle">Book Title</InputGroup.Text> */}

              <Form.Control
                type="text"
                placeholder="Users Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              {/* <InputGroup.Text id="formBookAuthor">A</InputGroup.Text> */}
              <Form.Control
                type="text"
                placeholder="Book Author"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <br />
              <input
                type="file"
                id="image"
                placeholder="Select File"
                on
                onChange={(e) => handleUpload(e)}
              />
              {!imgUrl && (
                <div className="outerbar">
                  <div
                    className="innerbar"
                    style={{ width: `${progresspercent}%` }}
                  >
                    {progresspercent}%
                  </div>
                </div>
              )}
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              color="blue"
              onClick={(e) => {
                setStatus("Available");

                setFlag(true);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Not Available");
                setFlag(false);
              }}
            >
              Not Available
            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddUsers;
