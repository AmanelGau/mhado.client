import { Card, styled, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StatsTab from "../components/characterTab/StatsTab";
import { CharacterType } from "../type/character.type";
import api from "../_api/api";
import Page from "./Page";

const lightBackground = "#FEFCEC";

const darkBackground = "#D8D6C9";

const RightSide = styled("div")({
  backgroundColor: darkBackground,
  width: "100%",
  height: "100%",
  padding: "20px",
});

const TabsContainer = styled(Card)({
  width: "100%",
  height: "100%",
  textAlign: "center",
  backgroundColor: lightBackground,
  boxShadow: "",
});

const CustomTabs = styled(Tabs)({
  backgroundColor: darkBackground,
  paddingTop: "50px",
});

const CustomTab = styled(Tab)({
  backgroundImage:
    "linear-gradient(90deg, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.75) 50%, rgba(0,0,0,0) 100%)",
  transitionDuration: "0.2s",
  border: "none",
  maxHeight: "24px",
  padding: "0 !important",
  zIndex: 3,
  "&:hover , &.active": {
    backgroundImage:
      "linear-gradient(90deg, rgba(250,193,94,0.2) 0%, rgba(250,193,94,0.75) 50%, rgba(250,193,94,0) 100%)",
    "& p:before": {
      content: '""',
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      marginTop: 3,
      marginBottom: 3,
      backgroundImage:
        "linear-gradient(90deg, rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)",
      zIndex: -1,
    },
  },
});

const Label = styled(Typography)({
  fontFamily: "Secular One, sans-serif",
  fontWeight: "bold",
});

const CharacterPage = () => {
  const [tabValue, setTabValue] = useState<number>(0);
  const location = useLocation();
  const [character, setCharacter] = useState<CharacterType>();
  const [reload, setReload] = useState<number>(0);

  useEffect(() => {
    const id = location.pathname.replace("/character/", "");
    api.get("/character/" + id).then((res) => {
      setCharacter(res.data);
    });
  }, [location, reload]);

  useEffect(() => {
    console.log(tabValue);
  }, [tabValue]);

  return (
    <Page
      title={
        character ? `${character.firstname} ${character.lastname}` : "loading"
      }
    >
      <Box display="flex" sx={{ height: "100%" }}>
        <CustomTabs
          orientation="vertical"
          variant="scrollable"
          value={tabValue}
          TabIndicatorProps={{
            hidden: true,
          }}
          onChange={(event: React.SyntheticEvent, newValue: number) =>
            setTabValue(newValue)
          }
          sx={{ borderRight: 1, borderColor: "transparent", width: "250px" }}
        >
          <CustomTab
            label={
              <Label variant="body2" className="Stroke-text">
                Stats
              </Label>
            }
            className={tabValue === 0 ? "active" : ""}
            disableRipple
          />
          <CustomTab
            label={
              <Label variant="body2" className="Stroke-text">
                Equipements
              </Label>
            }
            className={tabValue === 1 ? "active" : ""}
            disableRipple
          />
          <CustomTab
            label={
              <Label variant="body2" className="Stroke-text">
                Capacités
              </Label>
            }
            className={tabValue === 2 ? "active" : ""}
            disableRipple
          />
          <CustomTab
            label={
              <Label variant="body2" className="Stroke-text">
                Inventaire
              </Label>
            }
            className={tabValue === 3 ? "active" : ""}
            disableRipple
          />
        </CustomTabs>
        <RightSide>
          <TabsContainer>
            {character && (
              <>
                <Typography variant="h3">
                  {character.firstname} {character.lastname}
                </Typography>
                <StatsTab
                  character={character}
                  reload={() => setReload(reload + 1)}
                />
              </>
            )}
          </TabsContainer>
        </RightSide>
      </Box>
    </Page>
  );
};

export default CharacterPage;
