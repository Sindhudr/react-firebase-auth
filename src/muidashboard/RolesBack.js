import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../muidashboard/Header";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Text from "react";

import EditTask from "../components/roles/EditTask";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../components/auth/firebase";
import TaskItem from "../components/roles/TaskItem";
import TableRole from "./TableRole";
import { useState, useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import "../components/roles/modal.css";
import Dashboard from "./Dashboard";
import { create } from "@mui/material/styles/createTransitions";

function descendingComparator(a, b, orderBy1) {
  if (b[orderBy1] < a[orderBy1]) {
    return -1;
  }
  if (b[orderBy1] > a[orderBy1]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy1) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy1)
    : (a, b) => -descendingComparator(a, b, orderBy1);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  // {
  //   id: "name",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "Dessert (100g serving)",
  // },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "RoleNames",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Permissions",
    align: "left",
  },
  // {
  //   id: "carbs",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Carbs (g)",
  // },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "View/Delete",
  },
];

function RolesBack(props) {
  const {
    onSelectAllClick,
    order,

    orderBy1,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const [open, setOpen] = useState({ edit: false, view: false });

  return (
    <TableHead sx={{ backgroundColor: "red" }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy1 === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy1 === headCell.id}
              direction={orderBy1 === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy1 === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

RolesBack.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy1: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {/* {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )} */}

      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable1() {
  const [order, setOrder] = React.useState("asc");
  //const [orderBy1, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedindex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState({ edit: false, view: false });
  const [refreshstatus, setRefreshStatus] = useState(true);
  const [roles, setRoles] = useState([]);

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  useEffect(() => {
    const taskColRef = query(
      collection(db, "Roles"),
      orderBy("created", "desc")
    );
    onSnapshot(
      taskColRef,
      (snapshot) => {
        setRoles(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            permissions: JSON.parse(doc.data().permissions),

            data: doc.data(),
          }))
        );
      },
      (onError) => {
        alert(onError.message);
      }
    );
    //alert(roles.le);
  }, []);

  async function handleDelete(index) {
    const taskDocRef = doc(db, "Users", roles[index].id);
    try {
      await deleteDoc(taskDocRef);
      setRefreshStatus(true);
    } catch (err) {
      alert(err);
    }
  }

  const handleRequestSort = (event, property) => {
    // const isAsc = orderBy === property && order === "asc";
    // setOrder(isAsc ? "desc" : "asc");
    // setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = roles.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - roles.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(roles, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Header>
      <Box sx={{ width: "80%", ml: 14, mt: 1, md: 4, lg: 3 }}>
        {/* <Paper sx={{ width: "100%", mb: 2 }}> */}
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}

        <Button
          sx={{
            width: "100px",
            height: "40px",

            color: "white",
            backgroundColor: "red",
            marginLeft: "89%",
            marginTop: "80px",
          }}
          onClick={() => setOpenAddModal(true)}
        >
          {" "}
          + Add Role
        </Button>
        <Paper sx={{ width: "100%", ml: 0, mb: 2, mt: 1, md: 12, lg: 6 }}>
          <TableContainer>
            <Table
              sx={{ Width: "100%", mb: 2, mt: 1, md: 4, lg: 9 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <RolesBack
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={roles.length}
              />
              <TableBody>
                {roles.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        // component="th"
                        // id={labelId}
                        // scope="row"
                        // padding="none"
                        align="left"
                        width="10%"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center" width="50%">
                        {row.permissions.map((permission) => {
                          var string = permission.permissiontype;

                          string +=
                            ":" +
                            `${permission.create ? " Create, " : ""}` +
                            `${permission.view ? "View" : ""}` +
                            `${"\n\n"}`;
                          return (string += "\n");
                        })}
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <VisibilityIcon
                            className="VI"
                            al
                            style={{
                              color: "red",
                            }}
                            onClick={() => {
                              setSelectedIndex(index);
                              setOpen({ ...open, view: true });
                            }}
                          />

                          <EditIcon
                            style={{ color: "red" }}
                            onClick={() => setOpen({ ...open, edit: true })}
                          />
                          <DeleteOutlineIcon
                            style={{ color: "red" }}
                            onClick={(event) => handleDelete(index)}
                          />
                        </Box>
                      </TableCell>
                      {open.view && (
                        <TaskItem
                          onClose={handleClose}
                          title={roles[selectedindex].name}
                          permission={roles[selectedindex].permission}
                          open={open.view}
                          // email={users[selectedindex].email}
                          // designation={users[selectedindex].designation}
                        />
                      )}
                      {open.edit && (
                        <EditTask
                          onClose={handleClose}
                          toEditTitle={roles[selectedindex].title}
                          open={open.edit}
                          id={roles[selectedindex].id}
                          // email={users[selectedindex].email}
                          // designation={users[selectedindex].designation}
                        />
                      )}{" "}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={roles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {/* </Paper> */}
          {openAddModal && (
            <TableRole
              onClose={() => setOpenAddModal(false)}
              open={openAddModal}
            />
          )}
        </Paper>
      </Box>
    </Header>
  );
}
