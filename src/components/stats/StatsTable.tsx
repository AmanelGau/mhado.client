import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { CharacterType, StatsType, StatType } from "../../type/character.type";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { useTranslation } from "react-i18next";

const StatsTable: React.FC<{
  character: CharacterType;
  statState?: {
    stats: StatsType;
    setStats: React.Dispatch<React.SetStateAction<StatsType>>;
    statPoints: number;
    setStatPoints: React.Dispatch<React.SetStateAction<number>>;
  };
}> = ({ character, statState }) => {
  const [islandBonus, setIslandBonus] = useState<number>(50);
  const rows: StatType[] = [
    "strength",
    "agility",
    "resistance",
    "exploration",
    "luck",
    "spirit",
  ];
  const { t } = useTranslation("common");

  const addStats = (stat: StatType) => {
    if (statState) {
      console.log(statState.statPoints);
      if (statState.statPoints > 0) {
        const newStats = { ...statState.stats };
        newStats[stat] = statState.stats[stat] + 1;
        statState.setStatPoints(statState.statPoints - 1);
        statState.setStats(newStats);
      }
    }
  };

  const removeStats = (stat: StatType) => {
    if (statState) {
      if (statState.stats[stat] > 0) {
        const newStats = { ...statState.stats };
        newStats[stat] = statState.stats[stat] - 1;
        statState.setStatPoints(statState.statPoints + 1);
        statState.setStats(newStats);
      }
    }
  };

  return (
    <Box sx={{ textAlign: "start" }}>
      <FormControl sx={{ m: 1, ml: 6, minWidth: 120 }} size="small">
        <InputLabel id="select-small">
          {t("stat_table.select.label")}
        </InputLabel>
        <Select
          labelId="select-small"
          id="select-small"
          value={islandBonus}
          label={t("stat_table.select.label")}
          onChange={(event) => {
            if (!Number.isNaN(Number(event.target.value)))
              setIslandBonus(Number(event.target.value));
          }}
          sx={{ fontSize: 12 }}
        >
          <MenuItem value={50} sx={{ fontSize: 12 }}>
            {t("stat_table.select.island.1")}
          </MenuItem>
          <MenuItem value={20} sx={{ fontSize: 12 }}>
            {t("stat_table.select.island.2")}
          </MenuItem>
        </Select>
      </FormControl>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("stat_table.label")}</TableCell>
              {statState && <TableCell>{t("stat_table.points")}</TableCell>}
              <TableCell>{t("stat_table.total")}</TableCell>
              <TableCell>{t("stat_table.roll")}</TableCell>
              {statState && <TableCell>{t("stat_table.actions")}</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row}>
                <TableCell>{t(`stat_table.stats.${row}`)}</TableCell>
                {statState && <TableCell>{statState.stats[row]}</TableCell>}
                <TableCell>
                  {statState ? statState.stats[row] : character.stats[row]}
                </TableCell>
                <TableCell>
                  {statState
                    ? statState.stats[row] + islandBonus
                    : character.stats[row] + islandBonus}
                </TableCell>
                {statState && (
                  <TableCell>
                    <IconButton
                      onClick={() => addStats(row)}
                      disabled={statState.statPoints <= 0}
                    >
                      <AddRoundedIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => removeStats(row)}
                      disabled={statState.stats[row] <= 0}
                    >
                      <RemoveRoundedIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StatsTable;
