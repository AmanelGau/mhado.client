import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

const Page = forwardRef(
  ({ children, title = "", padding, sx, ...other }: any, ref) => {
    const { t } = useTranslation("common");
    return (
      <Box
        sx={{ height: "100%", padding: padding ? 3 : 0, ...sx }}
        ref={ref}
        {...other}
      >
        <Helmet>
          <title>
            {t("title.main")} - {title}
          </title>
        </Helmet>
        {children}
      </Box>
    );
  }
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
