import React from "react";
import { Route, Routes } from "react-router-dom";
import CharacterPage from "../pages/CharacterPage";
import CharacterSelectionPage from "../pages/CharacterSelectionPage";
import { CssBaseline } from "@mui/material";

const BaseRoutes = () => {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<CharacterSelectionPage />} />
        <Route path="/character/:id" element={<CharacterPage />} />
      </Routes>
    </>
  );
};

export default BaseRoutes;
