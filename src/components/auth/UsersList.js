import React, { useEffect, useState } from "react";
import { Table, Button, docs, getBookId } from "react-bootstrap";
import BookDataService from "../auth/services/bookservices";

const UsersList = ({ getUserId }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await BookDataService.getAllUsers();
    console.log(data.docs);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await BookDataService.deleteUsers(id);
    getUsers();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getUsers}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Index</th>
            <th>User Name</th>
            <th>User address</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.author}</td>
                <td>{doc.status}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getUserId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
                <img src={doc.imgUrl} height="100px" width="100px"></img>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default UsersList;
