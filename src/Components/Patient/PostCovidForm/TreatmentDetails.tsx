import React, { Children } from "react";
import Typography from "@material-ui/core/Typography";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import {
  CheckboxField,
  MultilineInputField,
  SelectField,
  TextInputField,
} from "../../Common/HelperInputFields";

const useStyle = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(4),
  },
  radioContainer: {
    marginTop: theme.spacing(4),
  },
  radioBtnWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  radioLabel: {
    marginRight: theme.spacing(4),
  },
}));

export const CheckBoxWithDetails: React.FC<{
  label: string;
  checked: boolean;
  name: string;
  onChange: (e: any, checked: boolean) => void;
}> = ({ label, children, checked, onChange, name }) => {
  return (
    <Box display="flex" flexDirection="column" margin="0.5rem 0">
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={onChange}
            name={name}
            color="primary"
          />
        }
        label={label}
      />
      {checked && children}
    </Box>
  );
};

interface TreatmentProps {
  handleChange: <T = any>(e: T) => void;
  handleValueChange: (value: any, name: string) => void;
  pr: string;
  bp: string;
  rr: string;
  spo2: string;
  condition_on_admission: string;
  condition_on_discharge: string;
  icu_admission: boolean;
  oxygen_requirement: boolean;
  mechanical_ventiltions_niv: 0;
  mechanical_ventiltions_invasive: 0;
  covid_category: number;
  oxygen_requirement_detail: number;
  antivirals: boolean;
  steroids: boolean;
  anticoagulants: boolean;
  antibiotics: boolean;
  antifungals: boolean;
  documented_secondary_bacterial_infection: boolean | string;
  documented_fungal_infection: boolean | string;
  newly_detected_comorbidities: boolean | string;
  worsening_of_comorbidities: boolean | string;
  antivirals_drugs: { [key: string]: any }[];
  steroids_drugs: { [key: string]: any }[];
  antibiotics_drugs: { [key: string]: any }[];
  antifungals_drugs: { [key: string]: any }[];
  anticoagulants_drugs: { [key: string]: any }[];
}

type DragDetails = {
  duration: number;
  name: string;
};

const DragsDetails: React.FC<{
  values: DragDetails[];
  handleValueChange: (val: any, path: string) => void;
  id: string;
}> = ({ handleValueChange, values, id }) => {
  return (
    <Box padding="0.5rem">
      {values.map((drag, i) => {
        return (
          <Grid container spacing={1}>
            <Grid item xs={8} md={7}>
              <TextInputField
                variant="outlined"
                margin="dense"
                placeholder="Drag Name"
                value={drag.name}
                name={`${id}-${i}-name`}
                errors=""
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
                value={drag.duration || ""}
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
        color="primary"
        onClick={() => {
          const prev = [...values];
          prev.push({ name: "", duration: 0 });
          handleValueChange(prev, id);
        }}
      >
        Add Drag
      </Button>
    </Box>
  );
};

const Treatment: React.FC<TreatmentProps> = (props) => {
  const className = useStyle();
  const {
    handleChange,
    handleValueChange,
    pr,
    bp,
    rr,
    spo2,
    condition_on_admission,
    condition_on_discharge,
    icu_admission,
    oxygen_requirement,
    mechanical_ventiltions_niv,
    mechanical_ventiltions_invasive,
    oxygen_requirement_detail,
    covid_category,
    antivirals,
    steroids,
    anticoagulants,
    antibiotics,
    antifungals,
    documented_secondary_bacterial_infection,
    documented_fungal_infection,
    newly_detected_comorbidities,
    worsening_of_comorbidities,
    antivirals_drugs,
    steroids_drugs,
    antibiotics_drugs,
    antifungals_drugs,
    anticoagulants_drugs,
  } = props;

  return (
    <>
      <Typography variant="h5" className={className.heading}>
        Covid Treatment Details
      </Typography>
      {/* CATRGORY */}
      <Grid item xs={12}>
        <FormControl component="fieldset" className={className.radioContainer}>
          <FormLabel component="legend">Category</FormLabel>
          <RadioGroup
            aria-label="covid_category"
            name="covid_category"
            className={className.radioBtnWrapper}
            onChange={(e: any) => handleChange(e)}
            value={covid_category}
          >
            <FormControlLabel
              value="1"
              control={<Radio color="primary" />}
              label="Mild"
              className={className.radioLabel}
            />
            <FormControlLabel
              value="2"
              control={<Radio color="primary" />}
              label="Moderate"
              className={className.radioLabel}
            />
            <FormControlLabel
              value="3"
              control={<Radio color="primary" />}
              label="Servere"
              className={className.radioLabel}
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Typography variant="body1">Vitals at the time of Admission</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InputLabel id="pr-label">PR</InputLabel>
          <TextInputField
            variant="outlined"
            margin="dense"
            name="pr"
            type="number"
            fullWidth
            value={pr}
            onChange={(e) =>
              handleValueChange(e.target.value, "vitals_at_admission.pr")
            }
            errors={""}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel id="bp-label">BP</InputLabel>
          <TextInputField
            variant="outlined"
            margin="dense"
            name="bp"
            fullWidth
            errors={""}
            value={bp}
            onChange={(e) =>
              handleValueChange(e.target.value, "vitals_at_admission.bp")
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel id="rr-label">RR</InputLabel>
          <TextInputField
            variant="outlined"
            margin="dense"
            name="rr"
            fullWidth
            errors={""}
            value={rr}
            onChange={(e) =>
              handleValueChange(e.target.value, "vitals_at_admission.rr")
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel id="spo2-label">SPO2</InputLabel>
          <TextInputField
            variant="outlined"
            margin="dense"
            name="spo2"
            fullWidth
            errors={""}
            value={spo2}
            onChange={(e) =>
              handleValueChange(e.target.value, "vitals_at_admission.spo2")
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Typography component="h2" variant="body1">
            Conditions
          </Typography>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputLabel id="condition_on_admission-label">
                On admissions
              </InputLabel>
              <MultilineInputField
                variant="outlined"
                margin="dense"
                name="condition_on_admission"
                fullWidth
                rows={3}
                errors={""}
                value={condition_on_admission}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="condition_on_discharge-label">
                At discharge
              </InputLabel>
              <MultilineInputField
                variant="outlined"
                margin="dense"
                name="condition_on_discharge"
                fullWidth
                rows={3}
                errors={""}
                value={condition_on_discharge}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {/* <CheckBoxWithDetails label={"ICU Addmission"} /> */}
          <FormControlLabel
            control={
              <Checkbox
                name="icu_admission"
                checked={icu_admission}
                onChange={(e, checked) =>
                  handleValueChange(checked, "icu_admission")
                }
                color="primary"
              />
            }
            label="ICU addmission"
          />
          <CheckBoxWithDetails
            label={"Oxygen Requirement"}
            checked={oxygen_requirement}
            name={"oxygen_requirement"}
            onChange={(e, checked) =>
              handleValueChange(checked, "oxygen_requirement")
            }
          >
            <SelectField
              variant="outlined"
              color="primary"
              margin="dense"
              name="oxygen_requirement_detail"
              options={[
                { text: "nasal prongs", id: 1 },
                { text: "face mask", id: 2 },
                { text: "nrbm", id: 3 },
                { text: "fno", id: 4 },
              ]}
              value={oxygen_requirement_detail}
              onChange={(e) => handleChange(e)}
            />
          </CheckBoxWithDetails>
        </Grid>

        <Grid item xs={12}>
          <Typography component="h2" variant="body1">
            Mechanical Ventilation
          </Typography>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputLabel id="mechanical_ventiltions_niv-label">NIV</InputLabel>
              <TextInputField
                variant="outlined"
                margin="dense"
                name="mechanical_ventiltions_niv"
                fullWidth
                errors={""}
                type="number"
                value={mechanical_ventiltions_niv}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="mechanical_ventiltions_invasive-label">
                Invasive
              </InputLabel>
              <TextInputField
                variant="outlined"
                margin="dense"
                name="mechanical_ventiltions_invasive"
                fullWidth
                errors={""}
                value={mechanical_ventiltions_invasive}
                type="number"
                onChange={(e) => handleChange(e)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <CheckBoxWithDetails
            checked={antivirals}
            name={"antivirals"}
            onChange={(_, checked) => handleValueChange(checked, "antivirals")}
            label="Anti Viral"
          >
            <SelectField
              variant="outlined"
              color="primary"
              margin="dense"
              name="antivirals_drugs"
              options={[
                { text: "Remdesivir", id: "remdesivir" },
                { text: "Favipiravir", id: "favipiravir" },
              ]}
              value={Object.keys(antivirals_drugs)}
              onChange={(e) =>
                handleValueChange(
                  { [e.target.value]: true },
                  "antivirals_drugs"
                )
              }
            />
          </CheckBoxWithDetails>

          <CheckBoxWithDetails
            checked={steroids}
            name={"steroids"}
            onChange={(_, checked) => {
              handleValueChange(checked, "steroids");
            }}
            label="Steroids"
          >
            <DragsDetails
              handleValueChange={handleValueChange}
              values={steroids_drugs as any}
              id={"steroids_drugs"}
            />
          </CheckBoxWithDetails>

          <CheckBoxWithDetails
            checked={anticoagulants}
            name={"anticoagulants"}
            onChange={(_, checked) =>
              handleValueChange(checked, "anticoagulants")
            }
            label="Anti Coagulants"
          >
            <DragsDetails
              handleValueChange={handleValueChange}
              values={anticoagulants_drugs as any}
              id={"anticoagulants_drugs"}
            />
          </CheckBoxWithDetails>

          <CheckBoxWithDetails
            checked={antibiotics}
            name={"antibiotics"}
            onChange={(_, checked) => handleValueChange(checked, "antibiotics")}
            label="Anti Biotics"
          >
            <DragsDetails
              handleValueChange={handleValueChange}
              values={antibiotics_drugs as any}
              id={"antibiotics_drugs"}
            />
          </CheckBoxWithDetails>
          <CheckBoxWithDetails
            checked={antifungals}
            name={"antifungals"}
            onChange={(_, checked) => handleValueChange(checked, "antifungals")}
            label="Anti Fungals"
          >
            <DragsDetails
              handleValueChange={handleValueChange}
              values={antifungals_drugs as any}
              id={"antifungals_drugs"}
            />
          </CheckBoxWithDetails>
          <CheckBoxWithDetails
            checked={
              !!(
                documented_secondary_bacterial_infection ||
                documented_secondary_bacterial_infection === ""
              )
            }
            name={"documented_secondary_bacterial_infection"}
            onChange={(_, checked) =>
              handleValueChange(
                checked,
                "documented_secondary_bacterial_infection"
              )
            }
            label="Documented secondary bacterial infection"
          >
            <MultilineInputField
              errors=""
              variant="outlined"
              margin="dense"
              name="documented_secondary_bacterial_infection"
              onChange={handleChange}
              rows={3}
            />
          </CheckBoxWithDetails>
          <CheckBoxWithDetails
            checked={
              !!(
                documented_fungal_infection ||
                documented_fungal_infection === ""
              )
            }
            name={"documented_fungal_infection"}
            onChange={(_, checked) =>
              handleValueChange(checked, "documented_fungal_infection")
            }
            label="Documented fungal infection"
          >
            <MultilineInputField
              variant="outlined"
              margin="dense"
              errors=""
              name="documented_fungal_infection"
              onChange={handleChange}
              rows={3}
            />
          </CheckBoxWithDetails>
          <CheckBoxWithDetails
            checked={
              !!(
                newly_detected_comorbidities ||
                newly_detected_comorbidities === ""
              )
            }
            name={"newly_detected_comorbidities"}
            onChange={(_, checked) =>
              handleValueChange(checked, "newly_detected_comorbidities")
            }
            label="Newly detected comorbidities"
          >
            <MultilineInputField
              errors=""
              variant="outlined"
              margin="dense"
              name="newly_detected_comorbidities"
              onChange={handleChange}
              rows={3}
            />
          </CheckBoxWithDetails>
          <CheckBoxWithDetails
            checked={
              !!(
                worsening_of_comorbidities || worsening_of_comorbidities === ""
              )
            }
            name={"worsening_of_comorbidities"}
            onChange={(_, checked) =>
              handleValueChange(checked, "worsening_of_comorbidities")
            }
            label="Worsening of comorbidities"
          >
            <MultilineInputField
              errors=""
              variant="outlined"
              margin="dense"
              name="worsening_of_comorbidities"
              onChange={handleChange}
              rows={3}
            />
          </CheckBoxWithDetails>
        </Grid>
      </Grid>
    </>
  );
};

export default Treatment;
