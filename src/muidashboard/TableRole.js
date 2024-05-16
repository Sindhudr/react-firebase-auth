import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BorderStyle, Height, Style } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import { collection, addDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../components/auth/firebase";
import { useState, useEffect } from "react";
import "../muidashboard/TableRole.css";
import { doc } from "firebase/firestore";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { RxFontStyle } from "react-icons/rx";
import Modal from "../components/roles/Modal";
import "../components/roles/modal.css";
import "../components/roles/modal.css";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 20,
    BorderStyle: "solid",
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    fontWeight: 600,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    // border: 0,
  },
}));
const label = { inputProps: { "aria-label": "Checkbox demo" } };

function createData(
  permissiontype,
  create,
  view,
  isdeletepermissionavaialable,
  edit,
  moderate
) {
  return {
    permissiontype,
    create,
    view,
    isdeletepermissionavaialable,
    edit,
    moderate,
  };
}

const LocalRows = [
  createData("Dashboard"),
  createData("Users"),
  createData("Roles"),
  createData("AI Solutions"),
  createData("Integration"),
];

export default function TableRole({ onClose, open, id, permissions }) {
  const [name, setName] = useState("");

  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(permissions === undefined ? LocalRows : permissions);
  }, [permissions]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Roles"), {
        name: name,
        permissions: JSON.stringify(rows),

        created: Timestamp.now(),
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "Roles", id);
    try {
      await updateDoc(taskDocRef, {
        title: name,
        permissions: JSON.stringify(rows),
        created: Timestamp.now(),
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal modalLable="Add Role" onClose={onClose} open={open}>
      <div>
        <div>
          {/* <Button
            sx={{
              ml: 72.5,
              mt: 8,
              mb: 1,
              color: "red",
              border: "1px solid red",
              width: "6%",
              fontWeight: 600,
              
            }}
          >
            onClick 
          </Button> */}
        </div>
        <div>
          <TextField
            id="outlined-basic"
            name="Name"
            label="Name *"
            placeholder="Name"
            onChange={(e) => setName(e.target.value.toUpperCase())}
            variant="outlined"
            sx={{
              width: "100%",
              mt: 7,
            }}
          />
        </div>

        <div>
          <TableContainer
            border="5"
            component={Paper}
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              ml: "0%",
              mt: 4,
              mb: "50%",
            }}
          >
            <Table
              border="3"
              sx={{
                Width: "70%",
                alignItems: "center",
                justifyContent: "center",
              }}
              //   aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell align="center" width="20%">
                    Create
                  </StyledTableCell>

                  <StyledTableCell align="center" width="20%">
                    View
                  </StyledTableCell>
                  <StyledTableCell align="center" width="20%">
                    Edit
                  </StyledTableCell>
                  <StyledTableCell align="center" width="20%">
                    Delete
                  </StyledTableCell>
                  <StyledTableCell align="center" width="20%">
                    Moderate
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.permissiontype}>
                    <StyledTableCell component="th" scope="row">
                      {row.permissiontype}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Checkbox
                        defaultChecked={row.create}
                        {...label}
                        onClick={(e) => {
                          row.create = e.target.checked;
                        }}
                      />
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Checkbox
                        defaultChecked={row.view}
                        {...label}
                        onClick={(e) => {
                          row.view = e.target.checked;
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Checkbox
                        defaultChecked={row.edit}
                        {...label}
                        onClick={(e) => {
                          row.edit = e.target.checked;
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Checkbox
                        defaultChecked={row.isdeletepermissionavaialable}
                        {...label}
                        onClick={(e) => {
                          row.isdeletepermissionavaialable = e.target.checked;
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Checkbox
                        defaultChecked={row.moderate}
                        {...label}
                        onClick={(e) => {
                          row.moderate = e.target.checked;
                        }}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <button
              className="btn"
              type="submit"
              onClick={permissions === undefined ? handleAdd : handleUpdate}
            >
              Done
            </button>
          </TableContainer>
        </div>
      </div>
    </Modal>
  );
}
