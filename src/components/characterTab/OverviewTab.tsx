import React from "react";
import { CharacterType } from "../../type/character.type";
import StatsTable from "../stats/StatsTable";

const OverviewTab: React.FC<{ character: CharacterType }> = ({ character }) => {
  return <StatsTable character={character} />;
};

export default OverviewTab;
