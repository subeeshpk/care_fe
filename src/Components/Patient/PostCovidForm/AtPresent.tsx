import React from "react";
import Typography from "@material-ui/core/Typography";
import { Box, InputLabel, makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import {
  investigationPrescribedOptions,
  investigationPrescribedOptionsMap,
  symptomsOptions,
} from "./testData";
import { CheckBoxWithDetails } from "./TreatmentDetails";
import {
  ErrorHelperText,
  MultilineInputField,
  MultiSelectField,
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

type SystemicExamination = {
  respiratory: {
    wob: boolean | string;
    rhonchi: boolean | string;
    crepitation: boolean | string;
  };
  cvs: boolean | string;
  cns: boolean | string;
  git: boolean | string;
};

interface AtPresentProps {
  handleChange: <T = any>(e: T) => void;
  handleValueChange: (value: any, name: string) => void;
  at_present_symptoms: { [key: string]: any }[];
  investigations_prescribed: { [key: string]: any };
  pr: number;
  rr: number;
  bp_systolic: number;
  bp_diastolic: number;
  temperature: number;
  spo2: number;
  appearance_of_pallor: boolean | string;
  appearance_of_cyanosis: boolean | string;
  appearance_of_pedal_edema: boolean | string;
  appearance_of_pedal_edema_details: boolean | string;
  systemic_examination: SystemicExamination;
  single_breath_count: boolean | string;
  six_minute_walk_test: boolean | string;
  concurrent_medications: boolean | string;
  probable_diagnosis: boolean | string;
  errors: { [key: string]: string };
}

const AtPresent: React.FC<AtPresentProps> = (props) => {
  const {
    handleChange,
    handleValueChange,
    at_present_symptoms,
    pr,
    rr,
    bp_systolic,
    bp_diastolic,
    temperature,
    spo2,
    appearance_of_pallor,
    appearance_of_cyanosis,
    appearance_of_pedal_edema,
    systemic_examination,
    single_breath_count,
    six_minute_walk_test,
    concurrent_medications,
    probable_diagnosis,
    investigations_prescribed,
    errors,
  } = props;

  const className = useStyle();

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
        At Present
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InputLabel required>Symptoms</InputLabel>
          <MultiSelectField
            options={symptomsOptions}
            label="symptoms"
            name="at_present_symptoms"
            variant="outlined"
            margin="dense"
            value={Object.keys(at_present_symptoms)}
            onChange={(e) =>
              handleMultiSelect(e, at_present_symptoms, "at_present_symptoms")
            }
          />
          <ErrorHelperText error={errors.at_present_symptoms} />
        </Grid>
        <Grid item xs={12} md={6}></Grid>

        <Grid item xs={12}>
          <Typography>On Examination</Typography>
          <ErrorHelperText error={errors.on_examination_vitals} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <InputLabel id="pr-label">PR</InputLabel>
              <TextInputField
                variant="outlined"
                margin="dense"
                name="pr"
                type="number"
                fullWidth
                errors={""}
                value={pr || null}
                onChange={(e) =>
                  handleValueChange(e.target.value, "on_examination_vitals.pr")
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel id="bp-label">BP</InputLabel>
              <Box display="flex">
                <TextInputField
                  variant="outlined"
                  margin="dense"
                  name="bp_systolic"
                  type="number"
                  fullWidth
                  errors={""}
                  value={bp_systolic || null}
                  placeholder={"BP Systolic"}
                  onChange={(e) =>
                    handleValueChange(
                      e.target.value,
                      "on_examination_vitals.bp_systolic"
                    )
                  }
                />
                <TextInputField
                  variant="outlined"
                  margin="dense"
                  name="bp_diastolic"
                  type="number"
                  fullWidth
                  errors={""}
                  placeholder={"BP Diastolic"}
                  value={bp_diastolic || null}
                  onChange={(e) =>
                    handleValueChange(
                      e.target.value,
                      "on_examination_vitals.bp_diastolic"
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
                  handleValueChange(e.target.value, "on_examination_vitals.rr")
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel id="temperature-label">Temperature</InputLabel>
              <TextInputField
                variant="outlined"
                margin="dense"
                name="temperature"
                type="number"
                fullWidth
                errors={""}
                value={temperature || null}
                onChange={(e) =>
                  handleValueChange(
                    e.target.value,
                    "on_examination_vitals.temperature"
                  )
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
                  handleValueChange(
                    e.target.value,
                    "on_examination_vitals.spo2"
                  )
                }
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography>Appearance of</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CheckBoxWithDetails
                label="Pallor"
                checked={
                  !!(appearance_of_pallor || appearance_of_pallor === "")
                }
                name="appearance_of_pallor"
                onChange={(_, checked) =>
                  handleValueChange(checked, "appearance_of_pallor")
                }
              >
                <MultilineInputField
                  variant="outlined"
                  margin="dense"
                  rows={2}
                  name="appearance_of_pallor"
                  value={
                    typeof appearance_of_pallor === "string"
                      ? appearance_of_pallor
                      : ""
                  }
                  onChange={(e) =>
                    handleValueChange(e.target.value, "appearance_of_pallor")
                  }
                  errors={""}
                />
              </CheckBoxWithDetails>
              <CheckBoxWithDetails
                label="Cynanosis"
                checked={
                  !!(appearance_of_cyanosis || appearance_of_cyanosis === "")
                }
                name="appearance_of_cyanosis"
                onChange={(_, checked) =>
                  handleValueChange(checked, "appearance_of_cyanosis")
                }
              >
                <MultilineInputField
                  rows={2}
                  variant="outlined"
                  margin="dense"
                  name="appearance_of_cyanosis"
                  value={
                    typeof appearance_of_cyanosis === "string"
                      ? appearance_of_cyanosis
                      : ""
                  }
                  onChange={(e) =>
                    handleValueChange(e.target.value, "appearance_of_cyanosis")
                  }
                  errors={""}
                />
              </CheckBoxWithDetails>
              <CheckBoxWithDetails
                label="Pedal"
                checked={
                  !!(
                    appearance_of_pedal_edema ||
                    appearance_of_pedal_edema === ""
                  )
                }
                name="appearance_of_pedal_edema"
                onChange={(_, checked) =>
                  handleValueChange(checked, "appearance_of_pedal_edema")
                }
              >
                <MultilineInputField
                  rows={2}
                  variant="outlined"
                  margin="dense"
                  name="appearance_of_pedal_edema"
                  value={
                    typeof appearance_of_pedal_edema === "string"
                      ? appearance_of_pedal_edema
                      : ""
                  }
                  onChange={(e) =>
                    handleValueChange(
                      e.target.value,
                      "appearance_of_pedal_edema"
                    )
                  }
                  errors={""}
                />
              </CheckBoxWithDetails>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography>Systemic Examination</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CheckBoxWithDetails
                label="Respiratory"
                checked={
                  !!(
                    systemic_examination.respiratory ||
                    systemic_examination.respiratory === ""
                  )
                }
                name="systemic_examination.respiratory"
                onChange={(_, checked) =>
                  handleValueChange(checked, "systemic_examination.respiratory")
                }
              >
                <Box marginLeft="1.5rem">
                  <CheckBoxWithDetails
                    label="wob"
                    checked={
                      !!(
                        systemic_examination?.respiratory?.wob ||
                        systemic_examination?.respiratory?.wob === ""
                      )
                    }
                    name="systemic_examination.respiratory.wob"
                    onChange={(_, checked) =>
                      handleValueChange(
                        checked,
                        "systemic_examination.respiratory.wob"
                      )
                    }
                  >
                    <MultilineInputField
                      rows={2}
                      variant="outlined"
                      margin="dense"
                      name="respiratory.wob"
                      value={
                        typeof systemic_examination?.respiratory?.wob ===
                        "string"
                          ? systemic_examination.respiratory.wob
                          : ""
                      }
                      onChange={(e) =>
                        handleValueChange(
                          e.target.value,
                          "systemic_examination.respiratory.wob"
                        )
                      }
                      errors={""}
                    />
                  </CheckBoxWithDetails>
                  <CheckBoxWithDetails
                    label="rhonchi"
                    checked={
                      !!(
                        systemic_examination?.respiratory?.rhonchi ||
                        systemic_examination?.respiratory?.rhonchi === ""
                      )
                    }
                    name="systemic_examination.respiratory.rhonchi"
                    onChange={(_, checked) =>
                      handleValueChange(
                        checked,
                        "systemic_examination.respiratory.rhonchi"
                      )
                    }
                  >
                    <MultilineInputField
                      rows={2}
                      variant="outlined"
                      margin="dense"
                      name="respiratory.rhonchi"
                      value={
                        typeof systemic_examination?.respiratory?.rhonchi ===
                        "string"
                          ? systemic_examination.respiratory.rhonchi
                          : ""
                      }
                      onChange={(e) =>
                        handleValueChange(
                          e.target.value,
                          "systemic_examination.respiratory.rhonchi"
                        )
                      }
                      errors={""}
                    />
                  </CheckBoxWithDetails>
                  <CheckBoxWithDetails
                    label="crepitation"
                    checked={
                      !!(
                        systemic_examination?.respiratory?.crepitation ||
                        systemic_examination?.respiratory?.crepitation === ""
                      )
                    }
                    name="systemic_examination.respiratory.crepitation"
                    onChange={(_, checked) =>
                      handleValueChange(
                        checked,
                        "systemic_examination.respiratory.crepitation"
                      )
                    }
                  >
                    <MultilineInputField
                      rows={2}
                      variant="outlined"
                      margin="dense"
                      name="respiratory.crepitation"
                      value={
                        typeof systemic_examination?.respiratory
                          ?.crepitation === "string"
                          ? systemic_examination.respiratory.crepitation
                          : ""
                      }
                      onChange={(e) =>
                        handleValueChange(
                          e.target.value,
                          "systemic_examination.respiratory.crepitation"
                        )
                      }
                      errors={""}
                    />
                  </CheckBoxWithDetails>
                </Box>
              </CheckBoxWithDetails>
              <CheckBoxWithDetails
                label="CVS"
                checked={
                  !!(
                    systemic_examination.cvs || systemic_examination.cvs === ""
                  )
                }
                name="systemic_examination.cvs"
                onChange={(_, checked) =>
                  handleValueChange(checked, "systemic_examination.cvs")
                }
              >
                <MultilineInputField
                  rows={2}
                  variant="outlined"
                  margin="dense"
                  name="cvs"
                  value={
                    typeof systemic_examination?.cvs === "string"
                      ? systemic_examination.cvs
                      : ""
                  }
                  onChange={(e) =>
                    handleValueChange(
                      e.target.value,
                      "systemic_examination.cvs"
                    )
                  }
                  errors={""}
                />
              </CheckBoxWithDetails>
              <CheckBoxWithDetails
                label="CNS"
                checked={
                  !!(
                    systemic_examination.cns || systemic_examination.cns === ""
                  )
                }
                name="systemic_examination.cns"
                onChange={(_, checked) =>
                  handleValueChange(checked, "systemic_examination.cns")
                }
              >
                <MultilineInputField
                  rows={2}
                  variant="outlined"
                  margin="dense"
                  name="cns"
                  value={
                    typeof systemic_examination?.cns === "string"
                      ? systemic_examination.cns
                      : ""
                  }
                  onChange={(e) =>
                    handleValueChange(
                      e.target.value,
                      "systemic_examination.cns"
                    )
                  }
                  errors={""}
                />
              </CheckBoxWithDetails>
              <CheckBoxWithDetails
                label="GIT"
                checked={
                  !!(
                    systemic_examination.git || systemic_examination.git === ""
                  )
                }
                name="systemic_examination.git"
                onChange={(_, checked) =>
                  handleValueChange(checked, "systemic_examination.git")
                }
              >
                <MultilineInputField
                  rows={2}
                  variant="outlined"
                  margin="dense"
                  name="git"
                  value={
                    typeof systemic_examination?.git === "string"
                      ? systemic_examination.git
                      : ""
                  }
                  onChange={(e) =>
                    handleValueChange(
                      e.target.value,
                      "systemic_examination.git"
                    )
                  }
                  errors={""}
                />
              </CheckBoxWithDetails>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <InputLabel id="single_breath_count-label">
            Single Breath Count
          </InputLabel>
          <MultilineInputField
            errors={errors.single_breath_count}
            variant="outlined"
            margin="dense"
            name="single_breath_count"
            fullWidth
            rows={4}
            value={single_breath_count}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel id="concurrent_medications-label">
            Concurrenrent Medications
          </InputLabel>
          <MultilineInputField
            errors={errors.concurrent_medications}
            variant="outlined"
            margin="dense"
            name="concurrent_medications"
            fullWidth
            rows={4}
            value={concurrent_medications}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="six_minute_walk_test-label">
            6 minute walk test
          </InputLabel>
          <MultilineInputField
            errors={errors.six_minute_walk_test}
            variant="outlined"
            margin="dense"
            name="six_minute_walk_test"
            fullWidth
            rows={4}
            value={six_minute_walk_test}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="investigations_prescribed">
            Investigations Prescribed
          </InputLabel>
          <MultiSelectField
            options={investigationPrescribedOptions}
            variant="outlined"
            margin="dense"
            value={Object.keys(investigations_prescribed)}
            onChange={(e) =>
              handleMultiSelect(
                e,
                investigations_prescribed,
                "investigations_prescribed"
              )
            }
          />
          {Object.keys(investigations_prescribed).map((item: string, index) => {
            return (
              <MultilineInputField
                label={`${investigationPrescribedOptionsMap[item].text} Details`}
                key={index}
                rows={3}
                margin="dense"
                variant="outlined"
                value={investigations_prescribed[item as string]}
                errors=""
                onChange={(e) =>
                  handleValueChange(
                    e.target.value,
                    `investigations_prescribed.${item}`
                  )
                }
              />
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="probable_diagnosis-label" required>
            Probable Diagnosis
          </InputLabel>
          <MultilineInputField
            required
            errors={errors.probable_diagnosis}
            variant="outlined"
            margin="dense"
            name="probable_diagnosis"
            fullWidth
            rows={4}
            value={probable_diagnosis}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AtPresent;
