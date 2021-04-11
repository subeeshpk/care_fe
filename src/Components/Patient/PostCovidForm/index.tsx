import React, { useReducer } from "react";
import { Box, Button, Container, makeStyles } from "@material-ui/core";
import PersonalInformation from "./PersonalInformation";
import AboutCovid from "./PreCovid";
import Treatment from "./TreatmentDetails";
import AtPresent from "./AtPresent";
import { initialState } from "./initialValues";
import moment from "moment";
import _ from "lodash";
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
        ...action.errors,
      };
    }
    default:
      return state;
  }
};

const PostCovidForm = () => {
  const className = useStyle();
  const [state, dispatch] = useReducer(postCovidFormReducer, initialState);

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

  console.log(state.form);
  return (
    <Container maxWidth="md">
      <form>
        <Box className={className.componentWrapper}>
          <PersonalInformation />
        </Box>
        <Box className={className.componentWrapper}>
          <AboutCovid
            handleChange={handleChange}
            handleValueChange={handleValueChange}
            handleDateChange={handleDateChange}
            post_covid_time={state.form.post_covid_time}
            date_of_test_positive={state.form.date_of_test_positive}
            date_of_test_negative={state.form.date_of_test_negative}
            testing_centre={state.form.testing_centre}
            pre_covid_comorbidities={state.form.pre_covid_comorbidities}
            post_covid_comorbidities={state.form.post_covid_comorbidities}
            treatment_facility={state.form.treatment_facility}
          />
        </Box>
        <Box className={className.componentWrapper}>
          <Treatment
            handleChange={handleChange}
            handleValueChange={handleValueChange}
            covid_category={state.form.covid_category}
            pr={state.form.vitals_at_admission.pr}
            bp={state.form.vitals_at_admission.bp}
            rr={state.form.vitals_at_admission.rr}
            spo2={state.form.vitals_at_admission.spo2}
            condition_on_admission={state.form.condition_on_admission}
            condition_on_discharge={state.form.condition_on_discharge}
            icu_admission={state.form.icu_admission}
            oxygen_requirement={state.form.oxygen_requirement}
            mechanical_ventiltions_niv={state.form.mechanical_ventiltions_niv}
            mechanical_ventiltions_invasive={
              state.form.mechanical_ventiltions_invasive
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
            documented_fungal_infection={state.form.documented_fungal_infection}
            newly_detected_comorbidities={
              state.form.newly_detected_comorbidities
            }
            worsening_of_comorbidities={state.form.worsening_of_comorbidities}
            antibiotics_drugs={state.form.antibiotics_drugs}
            antifungals_drugs={state.form.antifungals_drugs}
            antivirals_drugs={state.form.antivirals_drugs}
            steroids_drugs={state.form.steroids_drugs}
            anticoagulants_drugs={state.form.anticoagulants_drugs}
          />
        </Box>
        <Box className={className.componentWrapper}>
          <AtPresent
            handleChange={handleChange}
            handleValueChange={handleValueChange}
            at_present_symptoms={state.form.at_present_symptoms}
            pr={state.form.on_examination_vitals.pr}
            rr={state.form.on_examination_vitals.rr}
            bp={state.form.on_examination_vitals.bp}
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
          />
        </Box>

        <Button color="primary" variant="contained">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default PostCovidForm;
