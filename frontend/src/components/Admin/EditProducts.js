import * as React from "react";
import { useContext, Fragment } from "react";
import { ProductsContext } from "../../context/productsContext";
import { AuthContext } from "./../../context/authContext";

import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { visuallyHidden } from "@mui/utils";

const useStyles = makeStyles((theme) => ({
  adminEditProdContainer: {
    width: "95%",
    marginBottom: "1rem",
  },
  adminMessageBox: {
    width: "94%",
  },
  adminMessage: {
    ...theme.typography.text,
    color: "red",
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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
  {
    id: "vendor",
    numeric: false,
    disablePadding: true,
    label: "Vendor",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Product Name",
  },
  {
    id: "unit",
    numeric: false,
    disablePadding: false,
    label: "Unit",
  },
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "ID",
  },
  {
    id: "priceId",
    numeric: false,
    disablePadding: false,
    label: "Price ID",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price USD",
  },
  {
    id: "imgUrl",
    numeric: false,
    disablePadding: false,
    label: "IMAGE URL",
  },
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" padding="none">
          <EditIcon />
        </TableCell>
        <TableCell align="center" padding="none">
          <DeleteIcon />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="none"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
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

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
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
      <Typography>Edit Products</Typography>
    </Toolbar>
  );
};

export default function EditProducts({
  setProductValues,
  setIsEditing,
  setUpdateId,
  setEditMessage,
  editMessage,
}) {
  const classes = useStyles();

  const { products } = useContext(ProductsContext);
  let rows = products;
  const { updateProducts } = useContext(ProductsContext);
  const { currentFarm, token } = useContext(AuthContext);

  if (currentFarm !== '*') {
    rows = products.filter(product => product.vendor === currentFarm);
  }

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function handleEditProduct(prodId, index) {
    setEditMessage("Editing Product...");
    setSelectedIndex(index);
    setIsEditing(true);
    const editingProduct = products.find((product) => product.id === prodId);
    setUpdateId(prodId);
    setProductValues({
      id: editingProduct.id,
      imgUrl: editingProduct.imgUrl,
      name: editingProduct.name,
      price: editingProduct.price,
      priceId: editingProduct.priceId,
      quantity: 1,
      unit: editingProduct.unit,
      vendor: editingProduct.vendor,
    });
  }

  async function handleDeleteProduct(prodId) {
    setEditMessage("Deleting Product...");
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/product/delete/${prodId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "authorization": token,
          },
        }
      );
      if (response.ok) {
        updateProducts();
        setEditMessage("Product Deleted!");
        setTimeout(() => {
          setEditMessage("");
        }, 5000);
      } else {
        setEditMessage("Can't delete. Error Accrued!");
        setTimeout(() => {
          setEditMessage("");
        }, 5000);
      }
    } catch (error) {
      setEditMessage("Can't delete. Error Accrued!");
        setTimeout(() => {
          setEditMessage("");
        }, 5000);
    }
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setSelectedIndex(-1);
    setIsEditing(false);
    setEditMessage("");
    setProductValues({
      id: "",
      imgUrl: "",
      name: "",
      price: "",
      priceId: "",
      quantity: 1,
      unit: "",
      vendor: "",
    });
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const editMessageBox = (
    <Grid item className={classes.adminMessageBox}>
      <Typography className={classes.adminMessage}>{editMessage}</Typography>
    </Grid>
  );

  return (
    <Fragment>
      {editMessage ? editMessageBox : null}
      <Grid item className={classes.adminEditProdContainer}>
        <Paper>
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <EnhancedTableToolbar />
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                >
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isSelected = index === selectedIndex;
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            tabIndex={-1}
                            key={row.id}
                            selected={isSelected}
                          >
                            <TableCell padding="none">
                              <IconButton
                                onClick={() => handleEditProduct(row.id, index)}
                              >
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell padding="none">
                              <IconButton
                                onClick={() => handleDeleteProduct(row.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              align="left"
                            >
                              {row.vendor}
                            </TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.unit}</TableCell>
                            <TableCell align="left">{row.id}</TableCell>
                            <TableCell align="left">{row.priceId}</TableCell>
                            <TableCell align="left">{row.price}</TableCell>
                            <TableCell align="left">{row.imgUrl}</TableCell>
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
          </Box>
        </Paper>
      </Grid>
    </Fragment>
  );
}

