import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
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
                  ? statState.stats[row] + 50
                  : character.stats[row] + 50}
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
  );
};

export default StatsTable;
