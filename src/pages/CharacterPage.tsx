import { Card, IconButton, styled, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StatsTab from "../components/characterTab/StatsTab";
import { CharacterType } from "../type/character.type";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import api from "../_api/api";
import Page from "./Page";
import AddExperienceModal from "../components/AddExperienceModal";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CharacterCreationModal from "../components/CharacterCreationModal";
import OverviewTab from "../components/characterTab/OverviewTab";
import { useTranslation } from "react-i18next";

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

const InfoBox = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});

const ExperienceBox = styled("div")({
  display: "flex",
  alignItems: "center",
});

const CustomTab = styled(Tab)({
  backgroundImage:
    "linear-gradient(90deg, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.75) 50%, rgba(0,0,0,0) 100%)",
  border: "none",
  minHeight: "32px",
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
  const [openAddXpModal, setOpenAddXpModal] = useState<boolean>(false);
  const [openChangeName, setOpenChangeName] = useState<boolean>(false);
  const { t } = useTranslation("common");

  useEffect(() => {
    const id = location.pathname.replace("/character/", "");
    api.get("/character/" + id).then((res) => {
      setCharacter(res.data);
    });
  }, [location, reload]);
  return (
    <Page
      title={
        character
          ? `${character.firstname} ${character.lastname}`
          : t("title.loading")
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
                {t("tab.overview")}
              </Label>
            }
            className={tabValue === 0 ? "active" : ""}
            disableRipple
          />
          <CustomTab
            label={
              <Label variant="body2" className="Stroke-text">
                {t("tab.stats")}
              </Label>
            }
            className={tabValue === 1 ? "active" : ""}
            disableRipple
          />
          <CustomTab
            label={
              <Label variant="body2" className="Stroke-text">
                {t("tab.equipments")}
              </Label>
            }
            className={tabValue === 2 ? "active" : ""}
            disableRipple
          />
          <CustomTab
            label={
              <Label variant="body2" className="Stroke-text">
                {t("tab.skills")}
              </Label>
            }
            className={tabValue === 3 ? "active" : ""}
            disableRipple
          />
          <CustomTab
            label={
              <Label variant="body2" className="Stroke-text">
                {t("tab.inventory")}
              </Label>
            }
            className={tabValue === 4 ? "active" : ""}
            disableRipple
          />
        </CustomTabs>
        <RightSide>
          <TabsContainer>
            {character && (
              <>
                <InfoBox>
                  <Typography variant="subtitle1">
                    {t("common.class")}:&nbsp;
                    {t(`common.classes.${character.archetype}`)}
                  </Typography>
                  <Typography variant="subtitle1">
                    {t("common.level")}: {character.level}
                  </Typography>
                  <ExperienceBox>
                    <Typography variant="subtitle1">
                      {t("common.experience")}: {character.experience}
                    </Typography>
                    <IconButton
                      onClick={() => setOpenAddXpModal(true)}
                      size="small"
                    >
                      <AddRoundedIcon />
                    </IconButton>
                  </ExperienceBox>
                </InfoBox>
                <Typography
                  variant="h3"
                  sx={{
                    marginLeft: "40px",
                    "&:hover": {
                      "& .MuiIconButton-root": {
                        visibility: "visible",
                      },
                    },
                  }}
                >
                  {character.firstname} {character.lastname}{" "}
                  <IconButton
                    onClick={() => setOpenChangeName(true)}
                    sx={{ visibility: "hidden" }}
                  >
                    <EditOutlinedIcon />
                  </IconButton>
                </Typography>
                {tabValue === 0 && <OverviewTab character={character} />}
                {tabValue === 1 && (
                  <StatsTab
                    character={character}
                    reload={() => setReload(reload + 1)}
                  />
                )}
              </>
            )}
          </TabsContainer>
        </RightSide>
      </Box>
      {character && (
        <AddExperienceModal
          open={openAddXpModal}
          onClose={() => setOpenAddXpModal(false)}
          character={character}
          reload={() => setReload(reload + 1)}
        />
      )}
      {character && (
        <CharacterCreationModal
          open={openChangeName}
          onClose={() => setOpenChangeName(false)}
          refetch={() => setReload(reload + 1)}
          character={character}
          update
        />
      )}
    </Page>
  );
};

export default CharacterPage;
