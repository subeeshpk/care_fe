import { initError, initialState } from "./initialValues";
import moment from "moment";
const validateForm = (state: typeof initialState, dispatch: Function) => {
  let errors = { ...initError };
  let invalidForm = false;

  Object.keys(state.form).forEach((field, i) => {
    const fieldValue = state.form[field as keyof typeof state.form] as any;
    switch (field as keyof typeof state.form) {
      case "post_covid_time": {
        if (fieldValue < 1) {
          errors[field] = "Field is required";
          invalidForm = true;
        }
        return;
      }
      case "date_of_test_positive": {
        if (!fieldValue) {
          errors[field] = "Please enter date in DD/MM/YYYY format";
          invalidForm = true;
        } else if (fieldValue) {
          if (moment(new Date()).diff(fieldValue as Date) < 0) {
            errors[field] = "Select Past Date";
            invalidForm = true;
          }
        }
        return;
      }
      case "date_of_onset_symptoms": {
        if (fieldValue) {
          if (moment(new Date()).diff(fieldValue as Date) < 0) {
            errors[field] = "Select Past Date";
            invalidForm = true;
          }
        }
        return;
      }
      case "date_of_test_negative": {
        if (!fieldValue) {
          errors[field] = "Please enter date in DD/MM/YYYY format";
          invalidForm = true;
        } else if (fieldValue) {
          if (
            moment(state.form.date_of_test_positive).diff(fieldValue as Date) >
            0
          ) {
            errors[field] =
              "Date of test negative must be after date of test positive";
            invalidForm = true;
          }
        }
        return;
      }
      case "testing_centre": {
        return;
      }
      case "pre_covid_comorbidities": {
        // if (Object.keys(fieldValue).length === 0) {
        //   errors[field] = "Please select at least one value";
        //   invalidForm = true;
        // }
        return;
      }
      case "post_covid_comorbidities": {
        return;
      }
      case "treatment_facility": {
        if (fieldValue < 1) {
          errors[field] = "Field is required";
          invalidForm = true;
        }
        return;
      }
      case "treatment_duration": {
        if (!fieldValue && fieldValue < 1) {
          errors[field] = "Field is required";
          invalidForm = true;
        }
        return;
      }
      case "covid_category": {
        if (fieldValue < 1) {
          errors[field] = "Field is required";
          invalidForm = true;
        }
        return;
      }
      case "vitals_at_admission": {
        const isValid = Object.keys(fieldValue).every((cur) =>
          fieldValue[cur] ? fieldValue[cur] >= 0 : true
        );
        if (!isValid) {
          errors[field] = "Please enter valid values";
          invalidForm = true;
        }
        return;
      }
      case "condition_on_admission": {
        return;
      }
      case "condition_on_discharge": {
        return;
      }
      case "icu_admission": {
        return;
      }
      case "oxygen_requirement": {
        return;
      }
      case "oxygen_requirement_detail": {
        if (state.form.oxygen_requirement && fieldValue < 1) {
          errors[field] = "Field is required";
          invalidForm = true;
        }
        return;
      }
      case "mechanical_ventilations_niv": {
        if (fieldValue && fieldValue < 1) {
          errors[field] = "No of days must be greater than 0";
          invalidForm = true;
        }
        return;
      }
      case "mechanical_ventilations_invasive": {
        if (fieldValue && fieldValue < 1) {
          errors[field] = "No of days must be greater than 0";
          invalidForm = true;
        }
        return;
      }
      case "antivirals": {
        return;
      }
      case "antivirals_drugs": {
        if (state.form.antivirals && state.form.antivirals_drugs.length) {
          const isValid = fieldValue.every(
            (cur: { name: string; duration: number }) =>
              cur.name.length > 0 && cur.duration > 0
          );
          if (!isValid) {
            errors[field] = "All Fields are required.";
            invalidForm = true;
          }
        }
        return;
      }
      case "steroids": {
        return;
      }
      case "steroids_drugs": {
        if (state.form.steroids && state.form.steroids_drugs.length) {
          const isValid = fieldValue.every(
            (cur: { name: string; duration: number }) =>
              cur.name.length > 0 && cur.duration > 0
          );
          if (!isValid) {
            errors[field] = "All Fields are required.";
            invalidForm = true;
          }
        }
        return;
      }
      case "anticoagulants": {
        return;
      }
      case "anticoagulants_drugs": {
        if (
          state.form.anticoagulants &&
          state.form.anticoagulants_drugs.length
        ) {
          const isValid = fieldValue.every(
            (cur: any) =>
              cur.name.length > 0 &&
              cur.duration > 0 &&
              String(cur.mode_of_transmission) !== "0"
          );
          if (!isValid) {
            errors[field] = "All Fields are required.";
            invalidForm = true;
          }
        }
        return;
      }
      case "antifungals": {
        return;
      }
      case "antifungals_drugs": {
        if (state.form.antifungals && state.form.antifungals_drugs.length) {
          const isValid = fieldValue.every(
            (cur: any) => cur.name.length > 0 && cur.duration > 0
          );
          if (!isValid) {
            errors[field] = "All Fields are required.";
            invalidForm = true;
          }
        }
        return;
      }
      case "antibiotics": {
        return;
      }
      case "antibiotics_drugs": {
        if (state.form.antibiotics && state.form.antibiotics_drugs.length) {
          const isValid = fieldValue.every(
            (cur: any) => cur.name.length > 0 && cur.duration > 0
          );
          if (!isValid) {
            errors[field] = "All Fields are required.";
            invalidForm = true;
          }
        }
        return;
      }
      case "documented_fungal_infection": {
        return;
      }
      case "documented_secondary_bacterial_infection": {
        return;
      }
      case "newly_detected_comorbidities": {
        return;
      }
      case "worsening_of_comorbidities": {
        return;
      }
      case "at_present_symptoms": {
        return;
      }
      case "on_examination_vitals": {
        const isValid = Object.keys(fieldValue).every((cur) =>
          fieldValue[cur] ? fieldValue[cur] >= 0 : true
        );
        if (!isValid) {
          errors[field] = "Please enter valid values";
          invalidForm = true;
        }
        return;
      }
      case "probable_diagnosis": {
        if (!fieldValue) {
          errors[field] = "Field is required";
          invalidForm = true;
        }
        return;
      }
      default:
        break;
    }
  });
  dispatch({ type: "set_error", errors });
  return !invalidForm;
};

export default validateForm;
