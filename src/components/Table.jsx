import * as React from "react";
import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import useMediaQuery from '@mui/material/useMediaQuery';

import Action from "./Action";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import { getComparator, labelDisplayedRows, stableSort } from "../utils/stableSort";
import { useProductContext } from "../hooks/useProductContext";
import { useNavigate } from "react-router";

export default function TableSortAndSelection() {
  const { products, fetchProducts, productsChanged ,setProductsChanged} = useProductContext();
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("price");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate() ;
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  // Handle sorting of table columns
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  function handleNavigate ( row ) {
    navigate('/view' ,{state :row })
    return ;
  }
  // Handle selection of all rows
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = products.map((n) => n.title);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // Handle change of page
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  // Handle change of rows per page
  const handleChangeRowsPerPage = (event, newValue) => {
    setRowsPerPage(parseInt(newValue.toString(), 10));
    setPage(0);
  };
// Handle click event on a table row
const handleClick = (event, name) => {
  const selectedIndex = selected.indexOf(name);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1),
    );
  }

  setSelected(newSelected);
};
  console.warn(selected)
  // Check if a row is selected
  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Calculate the number of empty rows
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const getLabelDisplayedRowsTo = () => {
    if (products.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? products.length
      : Math.min(products.length, (page + 1) * rowsPerPage);
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);
  React.useEffect(() =>  {
    fetchProducts() ;
    setProductsChanged(false);
  }, [productsChanged])

  return (
    <Sheet
      
      variant="outlined"
      sx={{ width: "100%", boxShadow: "sm", borderRadius: "sm" }}
    >
      <EnhancedTableToolbar numSelected={selected.length} selected={selected} setSelected={setSelected}/>
      <Table
      
        aria-labelledby="tableTitle"
        hoverRow
        sx={{
          "--TableCell-headBackground": "transparent",
          "--TableCell-selectedBackground": (theme) =>
            theme.vars.palette.success.softBg,
          "& thead th:nth-child(1)": {
            width: "40px",
          },
          "& thead th:nth-child(2)": {
            width: isSmallScreen ? "20%" : "30%",
          },
          "& tr > *:nth-child(n+3)": { textAlign: isSmallScreen ? "left" : "right" },
          "& td, & th": {
            padding: isSmallScreen ? "8px" : "16px",
          },
          "& img": {
            width: isSmallScreen ? "40px" : "48px",
            height: isSmallScreen ? "40px" : "48px",
          },
        }}
      >
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={products.length}
        />
        <tbody id="table">
          {stableSort(products, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const isItemSelected = isSelected(row.title);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <tr
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  onClick={ () => handleNavigate(row)}
                  selected={isItemSelected}
                  style={
                    isItemSelected
                      ? {
                          padding: "10px",
                          "--TableCell-dataBackground":
                            "var(--TableCell-selectedBackground)",
                          "--TableCell-headBackground":
                            "var(--TableCell-selectedBackground)",
                        }
                      : {}
                  }

                  
                >
                  <th scope="row">
                    <Checkbox
                      checked={isItemSelected}
                      onChange={(event) => handleClick(event, row.title)} // Handle checkbox change
                      slotProps={{
                        input: {
                          "aria-labelledby": labelId,
                        },
                      }}
                      sx={{ verticalAlign: "top" }}
                    />
                  </th>
                  <th id={labelId} scope="row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={row.images[0]} alt="" />
                      <span>{row.title}</span>
                    </div>
                  </th>
                  <td>{row.price}</td>
                  <td>{row.rating}</td>
                  <td>{row.stock}</td>
                  <td>{row.discountPercentage}</td>
                  <td>{row.category}</td>
                  <td >
                    <Action product={row} />
                  </td>
                </tr>
              );
            })}
          {emptyRows > 0 && (
            <tr
              style={{
                height: `calc(${emptyRows} * 40px)`,
                "--TableRow-hoverBackground": "transparent",
              }}
            >
              <td colSpan={8} aria-hidden />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={8}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  justifyContent: "flex-end",
                }}
              >
                <FormControl orientation="horizontal" size="sm">
                  <FormLabel>Rows per page:</FormLabel>
                  <Select
                    onChange={handleChangeRowsPerPage}
                    value={rowsPerPage}
                  >
                    <Option value={5}>5</Option>
                    <Option value={10}>10</Option>
                    <Option value={25}>25</Option>
                  </Select>
                </FormControl>
                <Typography textAlign="center" sx={{ minWidth: 80 }}>
                  {labelDisplayedRows({
                    from: products.length === 0 ? 0 : page * rowsPerPage + 1,
                    to: getLabelDisplayedRowsTo(),
                    count: products.length === -1 ? -1 : products.length,
                  })}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={page === 0}
                    onClick={() => handleChangePage(page - 1)}
                    sx={{ bgcolor: "background.surface" }}
                  >
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={
                      products.length !== -1
                        ? page >= Math.ceil(products.length / rowsPerPage) - 1
                        : false
                    }
                    onClick={() => handleChangePage(page + 1)}
                    sx={{ bgcolor: "background.surface" }}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Box>
              </Box>
            </td>
          </tr>
        </tfoot>
      </Table>
    </Sheet>
  );
}
