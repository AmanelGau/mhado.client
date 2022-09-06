import {
  Box,
  Button,
  Modal,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useReducer } from "react";
import { CharacterCreationFormType } from "../type/character.type";
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

const FormContainer = styled(Box)({
  width: 600,
  display: "flex",
  flexDirection: "column",
  marginLeft: "auto",
  marginRight: "auto",
  gap: 20,
  textAlign: "center",
  paddingBottom: "10px",
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

const intialFormValues: CharacterCreationFormType = {
  firstname: "",
  lastname: "",
  archetype: "",
};

const reducer: (
  state: CharacterCreationFormType,
  action: { type: string; payload: string }
) => CharacterCreationFormType = (state, action) => {
  switch (action.type) {
    case "firstname":
      return { ...state, firstname: action.payload };
    case "lastname":
      return { ...state, lastname: action.payload };
    case "archetype":
      return { ...state, archetype: action.payload };
    case "reset":
      return intialFormValues;
    default:
      throw new Error();
  }
};

const CharacterCreationModal: React.FC<{
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}> = ({ open, onClose, refetch }) => {
  const [form, dispatchForm] = useReducer(
    reducer,
    intialFormValues,
    () => intialFormValues
  );

  const onSubmit = (from: CharacterCreationFormType) => {
    api
      .post("/character", form)
      .then(() => {
        refetch();
        onClose();
        dispatchForm({ type: "reset", payload: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CustomModal open={open} onClose={onClose}>
      <ModalPaper>
        <FormContainer>
          <Typography variant="h4">Créer un nouveau personnage</Typography>
          <TextField
            label="Prénom"
            value={form.firstname}
            onChange={(event) =>
              dispatchForm({ type: "firstname", payload: event.target.value })
            }
          />
          <TextField
            label="Nom"
            value={form.lastname}
            onChange={(event) =>
              dispatchForm({ type: "lastname", payload: event.target.value })
            }
          />
          <TextField
            label="Classe"
            value={form.archetype}
            onChange={(event) =>
              dispatchForm({ type: "archetype", payload: event.target.value })
            }
          />
          <ButtonContainer>
            <FormButton variant="outlined" onClick={() => onSubmit(form)}>
              Créer
            </FormButton>
            <FormButton variant="outlined" color="error" onClick={onClose}>
              Annuler
            </FormButton>
          </ButtonContainer>
        </FormContainer>
      </ModalPaper>
    </CustomModal>
  );
};

export default CharacterCreationModal;
