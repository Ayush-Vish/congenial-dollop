
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackButton() {
  return (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={() => window.history.back()}
      sx={{
        marginBottom: 2,
        backgroundColor: "#3f51b5",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#3f51b5",
          opacity: 1,
        },
      }}
    >
      Back
    </Button>
  );
}