import React, { useReducer, useState } from "react";
import { Box, Button, Container, makeStyles } from "@material-ui/core";
import PersonalInformation, { PatientInfo } from "./PersonalInformation";
import AboutCovid from "./PreCovid";
import Treatment from "./TreatmentDetails";
import AtPresent from "./AtPresent";
import { initForm, initialState } from "./initialValues";
import moment from "moment";
import _ from "lodash";
import validateForm from "./validateForm";
import { createPostCovidForm } from "../../../Redux/actions";
import GetPatient from "./GetPatient";
import { useDispatch } from "react-redux";
import { Success } from "../../../Utils/Notifications";
const useStyle = makeStyles((theme) => ({
  componentWrapper: {
    padding: theme.spacing(4, 0),
  },
}));

const postCovidFormReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "set_form": {
      return {
        ...state,
        form: action.form,
      };
    }
    case "set_error": {
      return {
        ...state,
        errors: action.errors,
      };
    }
    default:
      return state;
  }
};

const PostCovidForm = () => {
  const className = useStyle();

  const dispatchAction: any = useDispatch();
  const [state, dispatch] = useReducer(postCovidFormReducer, initialState);
  const [isFormVisible, setIsFormVisible] = React.useState(false);
  const [user, setUser] = useState<PatientInfo | null>(null);

  const handleChange = (e: any) => {
    const form = { ...state.form };
    form[e.target.name] = e.target.value;
    dispatch({ type: "set_form", form });
  };

  const handleValueChange = (value: any, name: string) => {
    const form = { ...state.form };
    _.set(form, name, value);
    dispatch({ type: "set_form", form });
  };

  const handleDateChange = (date: any, field: string) => {
    if (moment(date).isValid()) {
      const form = { ...state.form };
      form[field] = date;
      dispatch({ type: "set_form", form });
    }
  };

  const handleSubmit = async (e: any) => {
    console.log({ state });
    e.preventDefault();
    const parseBooleanString = (val: string | boolean) => {
      const data = typeof val === "string" ? val : val ? "" : null;
      return data;
    };
    const validForm = validateForm(state, dispatch);
    console.log(validForm);
    if (validForm && user) {
      // setIsLoading(true);
      const form = state.form as typeof initialState.form;
      const data = {
        post_covid_time: Number(form.post_covid_time),
        date_of_onset_symptoms: moment(form.date_of_onset_symptoms).format(
          "YYYY-MM-DD"
        ),
        date_of_test_positive: moment(form.date_of_onset_symptoms).format(
          "YYYY-MM-DD"
        ),
        date_of_test_negative: moment(form.date_of_onset_symptoms).format(
          "YYYY-MM-DD"
        ),
        testing_centre: form.testing_centre,
        pre_covid_comorbidities: form.pre_covid_comorbidities,
        post_covid_comorbidities: form.post_covid_comorbidities,
        treatment_duration: Number(form.treatment_duration),
        covid_category: Number(form.covid_category),
        vitals_at_admission: {
          pr: Number(form.vitals_at_admission.pr) || null,
          bp_systolic: Number(form.vitals_at_admission.bp_systolic) || null,
          bp_diastolic: Number(form.vitals_at_admission.bp_diastolic) || null,
          rr: Number(form.vitals_at_admission.rr) || null,
          spo2: Number(form.vitals_at_admission.spo2) || null,
        },
        condition_on_admission: form.condition_on_admission,
        condition_on_discharge: form.condition_on_discharge,
        icu_admission: !!form.icu_admission,
        oxygen_requirement: !!form.oxygen_requirement,
        oxygen_requirement_detail:
          Number(form.oxygen_requirement_detail) || null,
        mechanical_ventilations_niv:
          Number(form.mechanical_ventilations_niv) || null,
        mechanical_ventilations_invasive:
          Number(form.mechanical_ventilations_invasive) || null,
        antivirals: !!form.antivirals,
        antivirals_drugs: Object.keys(form.antivirals_drugs),
        steroids: !!form.steroids,
        steroids_drugs: form.steroids_drugs.map((drug: any) => ({
          ...drug,
          duration: Number(drug.duration),
        })),
        anticoagulants: !!form.anticoagulants,
        anticoagulants_drugs: form.anticoagulants_drugs.map((drug: any) => ({
          ...drug,
          duration: Number(drug.duration),
        })),
        antibiotics: form.antibiotics,
        antibiotics_drugs: form.antibiotics_drugs.map((drug: any) => ({
          ...drug,
          duration: Number(drug.duration),
        })),
        antifungals: form.antifungals,
        antifungals_drugs: form.antifungals_drugs.map((drug: any) => ({
          ...drug,
          duration: Number(drug.duration),
        })),
        documented_secondary_bacterial_infection: parseBooleanString(
          form.documented_secondary_bacterial_infection
        ),
        documented_fungal_infection: parseBooleanString(
          form.documented_fungal_infection
        ),
        newly_detected_comorbidities: parseBooleanString(
          form.newly_detected_comorbidities
        ),
        worsening_of_comorbidities: parseBooleanString(
          form.worsening_of_comorbidities
        ),
        at_present_symptoms: Object.keys(form.at_present_symptoms),
        appearance_of_pallor: parseBooleanString(form.appearance_of_pallor),
        appearance_of_cyanosis: parseBooleanString(form.appearance_of_cyanosis),
        appearance_of_pedal_edema: parseBooleanString(
          form.appearance_of_pedal_edema
        ),
        appearance_of_pedal_edema_details: parseBooleanString(
          form.appearance_of_pedal_edema_details
        ),
        systemic_examination: {
          respiratory: {
            wob: parseBooleanString(form.systemic_examination.respiratory.wob),
            rhonchi: parseBooleanString(
              form.systemic_examination.respiratory.rhonchi
            ),
            crepitation: parseBooleanString(
              form.systemic_examination.respiratory.crepitation
            ),
          },
          cvs: parseBooleanString(form.systemic_examination.cvs),
          cns: parseBooleanString(form.systemic_examination.cns),
          git: parseBooleanString(form.systemic_examination.git),
        },
        single_breath_count: form.single_breath_count,
        six_minute_walk_test: form.six_minute_walk_test || null,
        concurrent_medications: form.concurrent_medications || null,
        probable_diagnosis: form.probable_diagnosis,
        treatment_facility: form.treatment_facility.map(
          (facility: any) => facility.id
        ),
      };
      console.log("SENDING DATA", data);
      const res = await dispatchAction(
        createPostCovidForm(data, { patientId: user.patient_external_id })
      );
      // setIsLoading(false);
      if (res && res.data) {
        dispatch({ type: "set_form", form: initForm });
        Success({
          msg: `Patient ${res.data.patient} transferred successfully`,
        });
      }
    }
  };

  return (
    <>
      {!isFormVisible && (
        <GetPatient setUser={setUser} setIsFormVisible={setIsFormVisible} />
      )}
      {isFormVisible && user && (
        <Container maxWidth="md">
          <div className={`flex pt-4 ${className}`}>
            <button
              onClick={() => {
                setUser(null);
                setIsFormVisible(false);
              }}
            >
              <i className="fas fa-chevron-left text-2xl rounded-md p-2 hover:bg-gray-200 mr-1">
                {" "}
              </i>
            </button>
            <h2 className="font-semibold text-2xl leading-tight m-2 ml-0">
              Post Covid Form
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <Button onClick={() => validateForm(state, dispatch)}>
              Validate
            </Button>
            <Box className={className.componentWrapper}>
              <PersonalInformation patientInfo={(user || {}) as any} />
            </Box>
            <Box className={className.componentWrapper}>
              <AboutCovid
                handleChange={handleChange}
                handleValueChange={handleValueChange}
                handleDateChange={handleDateChange}
                post_covid_time={state.form.post_covid_time}
                date_of_test_positive={state.form.date_of_test_positive}
                date_of_onset_symptoms={state.form.date_of_onset_symptoms}
                date_of_test_negative={state.form.date_of_test_negative}
                testing_centre={state.form.testing_centre}
                pre_covid_comorbidities={state.form.pre_covid_comorbidities}
                post_covid_comorbidities={state.form.post_covid_comorbidities}
                treatment_facility={state.form.treatment_facility}
                treatment_duration={state.form.treatment_duration}
                errors={state.errors}
              />
            </Box>
            <Box className={className.componentWrapper}>
              <Treatment
                handleChange={handleChange}
                handleValueChange={handleValueChange}
                covid_category={state.form.covid_category}
                pr={state.form.vitals_at_admission.pr}
                bp_diastolic={state.form.vitals_at_admission.bp_diastolic}
                bp_systolic={state.form.vitals_at_admission.bp_systolic}
                rr={state.form.vitals_at_admission.rr}
                spo2={state.form.vitals_at_admission.spo2}
                condition_on_admission={state.form.condition_on_admission}
                condition_on_discharge={state.form.condition_on_discharge}
                icu_admission={state.form.icu_admission}
                oxygen_requirement={state.form.oxygen_requirement}
                mechanical_ventilations_niv={
                  state.form.mechanical_ventilations_niv
                }
                mechanical_ventilations_invasive={
                  state.form.mechanical_ventilations_invasive
                }
                oxygen_requirement_detail={state.form.oxygen_requirement_detail}
                antivirals={state.form.antivirals}
                steroids={state.form.steroids}
                anticoagulants={state.form.anticoagulants}
                antibiotics={state.form.antibiotics}
                antifungals={state.form.antifungals}
                documented_secondary_bacterial_infection={
                  state.form.documented_secondary_bacterial_infection
                }
                documented_fungal_infection={
                  state.form.documented_fungal_infection
                }
                newly_detected_comorbidities={
                  state.form.newly_detected_comorbidities
                }
                worsening_of_comorbidities={
                  state.form.worsening_of_comorbidities
                }
                antibiotics_drugs={state.form.antibiotics_drugs}
                antifungals_drugs={state.form.antifungals_drugs}
                antivirals_drugs={state.form.antivirals_drugs}
                steroids_drugs={state.form.steroids_drugs}
                anticoagulants_drugs={state.form.anticoagulants_drugs}
                errors={state.errors}
              />
            </Box>
            <Box className={className.componentWrapper}>
              <AtPresent
                handleChange={handleChange}
                handleValueChange={handleValueChange}
                at_present_symptoms={state.form.at_present_symptoms}
                pr={state.form.on_examination_vitals.pr}
                rr={state.form.on_examination_vitals.rr}
                bp_diastolic={state.form.on_examination_vitals.bp_diastolic}
                bp_systolic={state.form.on_examination_vitals.bp_systolic}
                temperature={state.form.on_examination_vitals.temperature}
                spo2={state.form.on_examination_vitals.spo2}
                appearance_of_pallor={state.form.appearance_of_pallor}
                appearance_of_cyanosis={state.form.appearance_of_cyanosis}
                appearance_of_pedal_edema={state.form.appearance_of_pedal_edema}
                appearance_of_pedal_edema_details={
                  state.form.appearance_of_pedal_edema_details
                }
                systemic_examination={state.form.systemic_examination}
                single_breath_count={state.form.single_breath_count}
                six_minute_walk_test={state.form.six_minute_walk_test}
                concurrent_medications={state.form.concurrent_medications}
                probable_diagnosis={state.form.probable_diagnosis}
                investigations_prescribed={state.form.investigations_prescribed}
                errors={state.errors}
              />
            </Box>

            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
            <br />
            <br />
          </form>
        </Container>
      )}
    </>
  );
};

export default PostCovidForm;
