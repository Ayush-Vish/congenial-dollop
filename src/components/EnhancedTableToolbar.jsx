import { Box, IconButton, Tooltip, Typography } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import PropTypes from "prop-types";
import { useProductContext } from "../hooks/useProductContext";
export default function EnhancedTableToolbar(props) {
      const {deleteMany} = useProductContext();
      const { numSelected , selected } = props;
      function handleDelete() {
        deleteMany(selected);
      }
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            py: 1,
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: "background.level1",
            }),
            borderTopLeftRadius: "var(--unstable_actionRadius)",
            borderTopRightRadius: "var(--unstable_actionRadius)",
          }}
        >
          {numSelected > 0 ? (
            <Typography sx={{ flex: "1 1 100%" }} component="div">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography
              level="body-lg"
              sx={{ flex: "1 1 100%" }}
              id="tableTitle"
              component="div"
            >
              Products
            </Typography>
          )}
    
          {numSelected > 0 ? (
            <Tooltip title="Delete"  >
              <IconButton size="sm" onClick={handleDelete} color="danger" variant="solid">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <></>
          )}
        </Box>
      );
    }
EnhancedTableToolbar.propTypes = {
numSelected: PropTypes.number.isRequired,
};
    