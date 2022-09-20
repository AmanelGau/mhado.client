import { Button, Grid, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import { CharacterType, StatsType } from "../../type/character.type";
import api from "../../_api/api";
import TabContainer from "./TabContainer";
import StatsTable from "../stats/StatsTable";
import { useTranslation } from "react-i18next";

const ActionContainer = styled("div")({
  justifyContent: "center",
  display: "flex",
  gap: 16,
});

const StatsTab: React.FC<{ character: CharacterType; reload: () => void }> = ({
  character,
  reload,
}) => {
  const [stats, setStats] = useState<StatsType>(character.stats);
  const [statPoints, setStatPoints] = useState<number>(character.statPoint);
  const { t } = useTranslation("common");

  const handleSave = () => {
    api
      .put("/character/" + character.id + "/stat", stats)
      .then(() => {
        reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setStats(character.stats);
    setStatPoints(character.statPoint);
  };

  return (
    <TabContainer>
      <div>
        <Typography variant="h5">
          {t("stat_table.stat_points_left") + ": " + statPoints}
        </Typography>
        <ActionContainer>
          <Button variant="contained" onClick={handleSave}>
            {t("common.button.save")}
          </Button>
          <Button variant="outlined" color="error" onClick={handleCancel}>
            {t("common.button.cancel")}
          </Button>
        </ActionContainer>
        <Grid item xs={12}>
          <Typography variant="h6">{t("tab.stats")}</Typography>
        </Grid>
        <StatsTable
          character={character}
          statState={{ stats, statPoints, setStats, setStatPoints }}
        />
      </div>
    </TabContainer>
  );
};

export default StatsTab;
