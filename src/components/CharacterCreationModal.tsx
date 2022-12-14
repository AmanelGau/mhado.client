import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useReducer } from "react";
import {
  CharacterCreationFormType,
  CharacterType,
} from "../type/character.type";
import api from "../_api/api";
import { useTranslation } from "react-i18next";
import { Archetypes } from "../enums/archetypes";

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
  update?: boolean;
  character?: CharacterType;
}> = ({ open, onClose, refetch, update, character }) => {
  const { t } = useTranslation("common");
  const [form, dispatchForm] = useReducer(
    reducer,
    intialFormValues,
    () => intialFormValues
  );

  useEffect(() => {
    if (character !== undefined) {
      intialFormValues.firstname = character.firstname;
      intialFormValues.lastname = character.lastname;
      intialFormValues.archetype = character.archetype;
    } else {
      intialFormValues.firstname = "";
      intialFormValues.lastname = "";
      intialFormValues.archetype = "";
    }
  }, [character]);

  const onSubmit = async (form: CharacterCreationFormType) => {
    try {
      if (update) {
        if (character === undefined) {
          throw new Error("No Character");
        } else {
          await api.put("/character/" + character.id, null, { params: form });
        }
      } else {
        await api.post("/character", form);
      }
      refetch();
      onClose();
      dispatchForm({ type: "reset", payload: "" });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CustomModal open={open} onClose={onClose}>
      <ModalPaper>
        <FormContainer>
          <Typography variant="h4">{t("home.create.label")}</Typography>
          <TextField
            label={t("common.firstname")}
            value={form.firstname}
            onChange={(event) =>
              dispatchForm({ type: "firstname", payload: event.target.value })
            }
          />
          <TextField
            label={t("common.lastname")}
            value={form.lastname}
            onChange={(event) =>
              dispatchForm({ type: "lastname", payload: event.target.value })
            }
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="class-select">{t("common.class")}</InputLabel>
            <Select
              labelId="class-select"
              id="class-select"
              value={form.archetype}
              label={t("common.class")}
              onChange={(event) =>
                dispatchForm({ type: "archetype", payload: event.target.value })
              }
              sx={{ textAlign: "start" }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                  },
                },
              }}
            >
              {Object.values(Archetypes).map((archetype) => (
                <MenuItem value={archetype.label}>
                  {t(`common.classes.${archetype.label}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ButtonContainer>
            <FormButton variant="outlined" onClick={() => onSubmit(form)}>
              {update ? t("common.button.modify") : t("common.button.create")}
            </FormButton>
            <FormButton
              variant="outlined"
              color="error"
              onClick={() => {
                dispatchForm({ type: "reset", payload: "" });

                onClose();
              }}
            >
              {t("common.button.cancel")}
            </FormButton>
          </ButtonContainer>
        </FormContainer>
      </ModalPaper>
    </CustomModal>
  );
};

export default CharacterCreationModal;
