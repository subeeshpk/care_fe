import React from "react";
import { Box, Button, IconButton } from "@material-ui/core";
import { Grid, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import { SelectField, TextInputField } from "../../Common/HelperInputFields";
import { AntiCoagulants, DrugDetail } from "./types";
import { antiCoagulantsTransmissionOptions } from "./options";

interface DrugsDetailsProps {
  values: DrugDetail[];
  handleValueChange: (val: any, path: string) => void;
  id: string;
}

const useStyle = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
  },
}));

export const DrugDetails: React.FC<DrugsDetailsProps> = ({
  handleValueChange,
  id,
  values,
}) => {
  const className = useStyle();
  return (
    <Box padding="0.5rem">
      {values.map((drug, i) => {
        return (
          <Grid container spacing={1}>
            <Grid item xs={8} md={7}>
              <TextInputField
                variant="outlined"
                margin="dense"
                placeholder="Drag Name"
                value={drug.name}
                name={`${id}-${i}-name`}
                errors=""
                key={`${id}-${i}-input-name`}
                onChange={(e) =>
                  handleValueChange(e.target.value, `${id}[${i}].name`)
                }
              />
            </Grid>
            <Grid item xs={3} md={4}>
              <TextInputField
                variant="outlined"
                margin="dense"
                placeholder="Duration"
                value={drug.duration || ""}
                name={`${id}-${i}-duration`}
                type="number"
                key={`${id}-${i}-input-duration`}
                onChange={(e) =>
                  handleValueChange(e.target.value, `${id}[${i}].duration`)
                }
                errors=""
              />
            </Grid>
            <Grid item xs={1} md={1} alignItems="center" justify="center">
              <IconButton
                onClick={() => {
                  const prev = [...values];
                  prev.splice(i, 1);
                  handleValueChange(prev, id);
                }}
                size={"small"}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
      <Button
        startIcon={<AddIcon />}
        variant="outlined"
        color="primary"
        className={className.button}
        onClick={() => {
          const prevValues = [...values];
          prevValues.push({ name: "", duration: 0 });
          handleValueChange(prevValues, id);
        }}
      >
        Add Drug
      </Button>
    </Box>
  );
};

interface AnticoagulantsProps {
  values: AntiCoagulants[];
  handleValueChange: (val: any, path: string) => void;
  id: string;
}

export const Anticoagulants: React.FC<AnticoagulantsProps> = ({
  handleValueChange,
  id,
  values,
}) => {
  const className = useStyle();
  return (
    <Box padding="0.5rem">
      {values.map((drug, i) => {
        return (
          <Grid container spacing={1}>
            <Grid item xs={4} md={4}>
              <SelectField
                variant="outlined"
                margin="dense"
                placeholder="Mode of Transmission"
                options={[
                  { text: "select", id: 0 },
                  ...antiCoagulantsTransmissionOptions,
                ]}
                value={drug.mode_of_transmission}
                name={`${id}-${i}-name`}
                errors=""
                onChange={(e) =>
                  handleValueChange(
                    e.target.value,
                    `${id}[${i}].mode_of_transmission`
                  )
                }
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <TextInputField
                variant="outlined"
                margin="dense"
                placeholder="Drag Name"
                value={drug.name}
                name={`${id}-${i}-name`}
                errors=""
                onChange={(e) =>
                  handleValueChange(e.target.value, `${id}[${i}].name`)
                }
              />
            </Grid>
            <Grid item xs={3} md={3}>
              <TextInputField
                variant="outlined"
                margin="dense"
                placeholder="Duration"
                value={drug.duration || ""}
                name={`${id}-${i}-duration`}
                type="number"
                onChange={(e) =>
                  handleValueChange(e.target.value, `${id}[${i}].duration`)
                }
                errors=""
              />
            </Grid>
            <Grid item xs={1} md={1} alignItems="center">
              <IconButton
                onClick={() => {
                  const prev = [...values];
                  prev.splice(i, 1);
                  handleValueChange(prev, id);
                }}
                size={"small"}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
      <Button
        startIcon={<AddIcon />}
        variant="outlined"
        className={className.button}
        color="primary"
        onClick={() => {
          const prevValues = [...values];
          prevValues.push({ name: "", duration: 0, mode_of_transmission: 0 });
          handleValueChange(prevValues, id);
        }}
      >
        Add Drug
      </Button>
    </Box>
  );
};
