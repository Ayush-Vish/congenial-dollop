import { Box, Checkbox, Link } from "@mui/joy";
import PropTypes from "prop-types";
import headCells from "../Constants/headcell";
import { visuallyHidden } from "@mui/utils";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead>
      <tr>
        <th>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            slotProps={{
              input: {
                "aria-label": "select all desserts",
              },
            }}
            sx={{ verticalAlign: "sub" }}
          />
        </th>
        {headCells.map((headCell) => {
          const active = orderBy === headCell.id;
          return (
            <th
              key={headCell.id}
              aria-sort={
                active
                  ? { asc: "ascending", desc: "descending" }[order]
                  : undefined
              }
            >
             <Link
  underline="none"
  color="neutral"
  textColor={active ? "primary.plainColor" : undefined}
  component="button"
  onClick={headCell.numeric ? createSortHandler(headCell.id) : undefined}
  fontWeight="lg"
  startDecorator={
    headCell.numeric ? (
      <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
    ) : null
  }
  endDecorator={
    !headCell.numeric ? (
      <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
    ) : null
  }
  sx={{
    "& svg": {
      transition: "0.2s",
      transform:
        active && order === "desc"
          ? "rotate(0deg)"
          : "rotate(180deg)",
    },
    "&:hover": { "& svg": { opacity: 1 } },
  }}
>
  {headCell.label}
  {active ? (
    <Box component="span" sx={visuallyHidden}>
      {order === "desc"
        ? "sorted descending"
        : "sorted ascending"}
    </Box>
  ) : null}
</Link>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

