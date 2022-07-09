import React from "react";
import { Route, Routes } from "react-router-dom";
import CharacterPage from "../pages/CharacterPage";
import CharacterSelectionPage from "../pages/CharacterSelectionPage";

const BaseRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CharacterSelectionPage />} />
        <Route path="/character" element={<CharacterPage />} />
      </Routes>
    </div>
  );
};

export default BaseRoutes;
