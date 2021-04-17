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
import {
  CheckboxField,
  ErrorHelperText,
  MultilineInputField,
  MultiSelectField,
  SelectField,
  TextInputField,
} from "../../Common/HelperInputFields";
import { CovidCategory, OxygenRequirement } from "./types";
import { DrugDetails, Anticoagulants } from "./DrugDetails";
import { antiViralDragsOptions, oxygenModeOptions } from "./testData";

const useStyle = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(4),
  },
  mb1: {
    marginBottom: theme.spacing(4),
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
  pr: number;
  bp_systolic: number;
  bp_diastolic: number;
  rr: number;
  spo2: number;
  condition_on_admission: string;
  condition_on_discharge: string;
  icu_admission: boolean;
  oxygen_requirement: boolean;
  mechanical_ventilations_niv: 0;
  mechanical_ventilations_invasive: 0;
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
  errors: { [key: string]: string };
}

const Treatment: React.FC<TreatmentProps> = (props) => {
  const className = useStyle();
  const {
    handleChange,
    handleValueChange,
    pr,
    bp_diastolic,
    bp_systolic,
    rr,
    spo2,
    condition_on_admission,
    condition_on_discharge,
    icu_admission,
    oxygen_requirement,
    mechanical_ventilations_niv,
    mechanical_ventilations_invasive,
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
    errors,
  } = props;
  const handleMultiSelect = (
    e: any,
    prevValues: { [key: string]: any },
    field: string
  ) => {
    const newValues = e.target.value.reduce(
      (acc: object, cur: string) => ({
        ...acc,
        [cur]: prevValues[cur] || "",
      }),
      {}
    );
    handleValueChange(newValues, field);
  };
  return (
    <>
      <Typography variant="h4" color="primary" className={className.heading}>
        Covid Treatment Details
      </Typography>
      {/* CATRGORY */}
      <Grid item xs={12}>
        <FormControl component="fieldset" className={className.mb1}>
          <FormLabel component="legend" required>
            Category
          </FormLabel>
          <RadioGroup
            aria-label="covid_category"
            name="covid_category"
            className={className.radioBtnWrapper}
            onChange={(e: any) => handleChange(e)}
            value={Number(covid_category)}
          >
            <FormControlLabel
              value={CovidCategory.Mild}
              control={<Radio color="primary" />}
              label="Mild"
              className={className.radioLabel}
            />
            <FormControlLabel
              value={CovidCategory.Moderate}
              control={<Radio color="primary" />}
              label="Moderate"
              className={className.radioLabel}
            />
            <FormControlLabel
              value={CovidCategory.Servere}
              control={<Radio color="primary" />}
              label="Servere"
              className={className.radioLabel}
            />
          </RadioGroup>
          <ErrorHelperText error={errors.covid_category} />
        </FormControl>
      </Grid>
      <Typography variant="body1" className={className.mb1}>
        Vitals at the time of Admission
      </Typography>
      <ErrorHelperText error={errors.vitals_at_admission} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InputLabel id="pr-label">PR</InputLabel>
          <TextInputField
            variant="outlined"
            margin="dense"
            name="pr"
            type="number"
            fullWidth
            value={pr || null}
            onChange={(e) =>
              handleValueChange(e.target.value, "vitals_at_admission.pr")
            }
            errors={""}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel id="bp-label">BP</InputLabel>
          <Box display="flex">
            <TextInputField
              variant="outlined"
              margin="dense"
              name="bp_systolic"
              fullWidth
              type="number"
              errors={""}
              value={bp_systolic || null}
              placeholder={"BP Systolic"}
              onChange={(e) =>
                handleValueChange(
                  e.target.value,
                  "vitals_at_admission.bp_systolic"
                )
              }
            />
            <TextInputField
              variant="outlined"
              margin="dense"
              name="bp_diastolic"
              fullWidth
              type="number"
              errors={""}
              placeholder={"BP Diastolic"}
              value={bp_diastolic || null}
              onChange={(e) =>
                handleValueChange(
                  e.target.value,
                  "vitals_at_admission.bp_diastolic"
                )
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel id="rr-label">RR</InputLabel>
          <TextInputField
            variant="outlined"
            margin="dense"
            name="rr"
            type="number"
            fullWidth
            errors={""}
            value={rr || null}
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
            type="number"
            fullWidth
            errors={""}
            value={spo2 || null}
            onChange={(e) =>
              handleValueChange(e.target.value, "vitals_at_admission.spo2")
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Typography component="h2" variant="body1" className={className.mb1}>
            Conditions
          </Typography>
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
              options={[{ text: "select", id: 0 }, ...oxygenModeOptions]}
              value={oxygen_requirement_detail}
              onChange={(e) => handleChange(e)}
            />
            <ErrorHelperText error={errors.oxygen_requirement_detail} />
          </CheckBoxWithDetails>
        </Grid>

        <Grid item xs={12}>
          <Typography component="h2" variant="body1" className={className.mb1}>
            Mechanical Ventilation
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputLabel id="mechanical_ventilations_niv-label">
                NIV
              </InputLabel>
              <TextInputField
                variant="outlined"
                margin="dense"
                name="mechanical_ventilations_niv"
                fullWidth
                errors={""}
                type="number"
                value={mechanical_ventilations_niv || null}
                onChange={(e) => handleChange(e)}
              />
              <ErrorHelperText
                error={errors.mechanical_ventilations_invasive}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="mechanical_ventilations_invasive-label">
                Invasive
              </InputLabel>
              <TextInputField
                variant="outlined"
                margin="dense"
                name="mechanical_ventilations_invasive"
                fullWidth
                errors={""}
                value={mechanical_ventilations_invasive || null}
                type="number"
                onChange={(e) => handleChange(e)}
              />
              <ErrorHelperText
                error={errors.mechanical_ventilations_invasive}
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
            <MultiSelectField
              variant="outlined"
              color="primary"
              margin="dense"
              name="antivirals_drugs"
              options={...antiViralDragsOptions}
              value={Object.keys(antivirals_drugs)}
              onChange={(e) =>
                handleMultiSelect(e, antivirals_drugs, "antivirals_drugs")
              }
            />
            <ErrorHelperText error={errors.antivirals_drugs} />
          </CheckBoxWithDetails>

          <CheckBoxWithDetails
            checked={steroids}
            name={"steroids"}
            onChange={(_, checked) => {
              handleValueChange(checked, "steroids");
            }}
            label="Steroids"
          >
            <ErrorHelperText error={errors.steroids_drugs} />
            <DrugDetails
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
            <ErrorHelperText error={errors.anticoagulants_drugs} />
            <Anticoagulants
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
            <ErrorHelperText error={errors.antibiotics_drugs} />
            <DrugDetails
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
            <ErrorHelperText error={errors.antifungals_drugs} />
            <DrugDetails
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
