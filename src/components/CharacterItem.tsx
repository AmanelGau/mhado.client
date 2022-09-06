import styled from "@emotion/styled";
import React from "react";
import { CharacterType } from "../type/character.type";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Root = styled("div")({
  border: "1px solid black",
  borderRadius: "5px",
  padding: "5px",
  width: 188,
  height: 238,
  textAlign: "center",
  transition: "0.2s",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.02)",
  },
});

const ProfilePicture = styled("img")({
  width: "100%",
});

const Name = styled(Typography)({
  width: "100%",
  fontWeight: "bold",
  marginTop: 10,
});

const CharacterItem: React.FC<{ character: CharacterType }> = ({
  character,
}) => {
  const navigate = useNavigate();

  return (
    <Root onClick={() => navigate("/character/" + character.id)}>
      <ProfilePicture src="/CharacterPicturePlaceholder.jpg" />
      <Name variant="subtitle2">
        {character.firstname} {character.lastname}
      </Name>
    </Root>
  );
};

export default CharacterItem;
