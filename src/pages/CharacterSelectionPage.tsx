import styled from "@emotion/styled";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import CharacterCreationModal from "../components/CharacterCreationModal";
import CharacterItem from "../components/CharacterItem";
import { CharacterType } from "../type/character.type";
import api from "../_api/api";
import Page from "./Page";
import { useTranslation } from "react-i18next";

const CharacterContainer = styled("div")({
  display: "flex",
  margin: "auto",
  marginTop: 20,
  width: 890,
  gap: 30,
});

const CharacterSelectionPage = () => {
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [refetch, setRefetch] = useState<number>(0);
  const [openCharacterCreation, setOpenCharacterCreation] =
    useState<boolean>(false);
  const { t } = useTranslation("common");

  useEffect(() => {
    api.get("/character").then((res) => {
      setCharacters(res.data);
    });
  }, [refetch]);

  return (
    <Page title={t("title.select_page")}>
      <CharacterContainer>
        <Button
          onClick={() => setOpenCharacterCreation(true)}
          variant="outlined"
        >
          {t("home.create.label")}
        </Button>
      </CharacterContainer>

      <CharacterContainer>
        {characters.map((character, index) => (
          <CharacterItem key={index} character={character} />
        ))}
      </CharacterContainer>
      <CharacterCreationModal
        open={openCharacterCreation}
        onClose={() => setOpenCharacterCreation(false)}
        refetch={() => setRefetch(refetch + 1)}
      />
    </Page>
  );
};

export default CharacterSelectionPage;
