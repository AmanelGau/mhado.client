import {
  Box,
  Button,
  Modal,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CharacterType } from "../type/character.type";
import api from "../_api/api";

const CustomModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ModalPaper = styled(Paper)({
  borderRadius: 20,
  width: 860,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  padding: 20,
});

const ButtonContainer = styled(Box)({
  display: "flex",
  gap: 20,
  marginTop: 10,
});

const FormButton = styled(Button)(({ color, theme }) => ({
  flexGrow: 1,
  "&:hover": {
    backgroundColor:
      color === "error" ? theme.palette.error.main : theme.palette.primary.main,
    color: "white",
    fontWeight: "bold",
  },
}));

const AddExperienceModal: React.FC<{
  open: boolean;
  onClose: () => void;
  character: CharacterType;
  reload: () => void;
}> = ({ open, onClose, character, reload }) => {
  const [experience, setExperience] = useState<string>("0");
  const [error, setError] = useState<string>("");

  const onSubmit = (experience: number) => {
    if (!isNaN(experience)) {
      if (experience > 0) {
        api
          .put("/character/" + character.id + "/experience", null, {
            params: { experience: experience },
          })
          .then(() => {
            onClose();
            reload();
            setExperience("0");
            setError("");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setError("la valeur doit être positive");
      }
    } else {
      setError("la valeur entré n'est pas un nombre");
    }
  };

  return (
    <CustomModal open={open} onClose={onClose}>
      <ModalPaper>
        <Typography variant="h4">Ajouter de l'expérience</Typography>
        <TextField
          label="nombre d'expérience"
          value={experience}
          onChange={(event) =>
            !isNaN(Number(event.target.value)) &&
            setExperience(event.target.value)
          }
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          error={error !== ""}
        />
        <Typography variant="body2" color="error" sx={{ ml: 2, mt: -1 }}>
          {error}
        </Typography>

        <ButtonContainer>
          <FormButton
            variant="outlined"
            onClick={() => onSubmit(Number(experience))}
          >
            Ajouter
          </FormButton>
          <FormButton
            variant="outlined"
            color="error"
            onClick={() => {
              setExperience("0");
              setError("");
              onClose();
            }}
          >
            Annuler
          </FormButton>
        </ButtonContainer>
      </ModalPaper>
    </CustomModal>
  );
};

export default AddExperienceModal;
