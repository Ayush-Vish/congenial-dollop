import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";

export default function ProductImage({ imageLoaded, handleImageLoad, thumbnail }) {
  return (
    <>
      {!imageLoaded && <Skeleton variant="rectangular" width={210} height={118} />}
      <img
        src={thumbnail}
        alt="Product"
        onLoad={handleImageLoad}
        style={{
          width: "210px",
          height: "118px",
          display: imageLoaded ? "block" : "none",
          marginTop: 16,
        }}
      />
    </>
  );
}

ProductImage.propTypes = {
  imageLoaded: PropTypes.bool.isRequired,
  handleImageLoad: PropTypes.func.isRequired,
  thumbnail: PropTypes.string,
};