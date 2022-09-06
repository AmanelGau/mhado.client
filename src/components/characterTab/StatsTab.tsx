import { Button, Grid, styled, Typography, IconButton } from "@mui/material";
import React, { useState } from "react";
import { CharacterType, StatsType } from "../../type/character.type";
import api from "../../_api/api";
import TabContainer from "./TabContainer";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

const ActionContainer = styled("div")({
  justifyContent: "center",
  display: "flex",
  gap: 16,
});

const MainContent = styled(Grid)({
  display: "flex",
  alignItems: "center",
});

const StatsTab: React.FC<{ character: CharacterType; reload: () => void }> = ({
  character,
  reload,
}) => {
  const [stats, setStats] = useState<StatsType>(character.stats);
  const [statPoints, setStatPoints] = useState<number>(character.statPoint);

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

  const addStats = (
    stat:
      | "strength"
      | "agility"
      | "resistance"
      | "exploration"
      | "luck"
      | "spirit"
  ) => {
    if (statPoints > 0) {
      const newStats = { ...stats };
      newStats[stat] = stats[stat] + 1;
      setStatPoints(statPoints - 1);
      setStats(newStats);
    }
  };

  const removeStats = (
    stat:
      | "strength"
      | "agility"
      | "resistance"
      | "exploration"
      | "luck"
      | "spirit"
  ) => {
    if (stats[stat] > 0) {
      const newStats = { ...stats };
      newStats[stat] = stats[stat] - 1;
      setStatPoints(statPoints + 1);
      setStats(newStats);
    }
  };

  const handleCancel = () => {
    setStats(character.stats);
    setStatPoints(character.statPoint);
  };

  return (
    <TabContainer>
      <div>
        <Typography variant="h5">
          {"Points de stats restant: " + statPoints}
        </Typography>
        <ActionContainer>
          <Button variant="contained" onClick={handleSave}>
            Enregister
          </Button>
          <Button variant="outlined" color="error" onClick={handleCancel}>
            Annuler
          </Button>
        </ActionContainer>
        <MainContent container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Statistiques</Typography>
          </Grid>
          {Object.keys(character.stats).map(
            (key) =>
              (key === "strength" ||
                key === "agility" ||
                key === "resistance" ||
                key === "exploration" ||
                key === "luck" ||
                key === "spirit") && (
                <>
                  <Grid item xs={6}>
                    <Typography variant="body1">{key}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body1">
                      {key === "strength" && stats.strength.toString()}
                      {key === "agility" && stats.agility.toString()}
                      {key === "resistance" && stats.resistance.toString()}
                      {key === "exploration" && stats.exploration.toString()}
                      {key === "luck" && stats.luck.toString()}
                      {key === "spirit" && stats.spirit.toString()}
                    </Typography>
                  </Grid>
                  {/* <Grid item xs={2}>
                    <Typography variant="body1">0</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body1">0</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body1">0</Typography>
                  </Grid> */}
                  <Grid item xs={4}>
                    <IconButton
                      onClick={() => addStats(key)}
                      disabled={statPoints <= 0}
                    >
                      <AddRoundedIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => removeStats(key)}
                      disabled={stats[key] <= 0}
                    >
                      <RemoveRoundedIcon />
                    </IconButton>
                  </Grid>
                </>
              )
          )}
        </MainContent>
      </div>
    </TabContainer>
  );
};

export default StatsTab;
