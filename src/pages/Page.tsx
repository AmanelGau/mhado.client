import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { forwardRef } from "react";
// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

const Page = forwardRef(
  ({ children, title = "", padding, sx, ...other }: any, ref) => (
    <Box
      sx={{ height: "100%", padding: padding ? 3 : 0, ...sx }}
      ref={ref}
      {...other}
    >
      <Helmet>
        <title>L'archipel des onzes - {title}</title>
      </Helmet>
      {children}
    </Box>
  )
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
