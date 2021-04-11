const initForm = {
  date_of_onset_symptoms: "",
  _comment: "post_covid_time dropdown choices with values = {'< 3 weeks' : 1, '3 to 12 weeks' : 2, '> 12 weeks' : 3}",
  post_covid_time: 0,
  date_of_test_positive: null,
  date_of_test_negative: null,
  testing_centre: "",
  pre_covid_comorbidities: {},
  post_covid_comorbidities: {},
  treatment_facility: 0,
  treatment_duration: 0,
  "_comment2": "dropdown choices : {'mild' : 1, 'moderate' : 2, 'severe' : 3}",
  covid_category: 0,
  vitals_at_admission: {
    pr: 0,
    bp: 0,
    rr: 0,
    spo2: 0
  },
  condition_on_admission: "",
  condition_on_discharge: "",
  icu_admission: false,
  oxygen_requirement: false,
  "_comment3": "choices : {'nasal prongs' : 1, 'face mask' : 2, 'nrbm' : 3, 'fno' : 4}",
  oxygen_requirement_detail: 0,
  mechanical_ventiltions_niv: 0,
  mechanical_ventiltions_invasive: 0,
  antivirals: false,
  antivirals_drugs: {},
  steroids: false,
  steroids_drugs: [],
  anticoagulants: false,
  anticoagulants_drugs: [],
  antibiotics: false,
  // {[key => dragname]:{details}}
  antibiotics_drugs: [],
  antifungals: false,
  antifungals_drugs: [],
  documented_secondary_bacterial_infection: false,
  documented_fungal_infection: false,
  newly_detected_comorbidities: false,
  worsening_of_comorbidities: false,
  at_present_symptoms: {},
  on_examination_vitals: {
    pr: "",
    rr: "",
    bp: "",
    temperature: "",
    spo2: ""
  },
  appearance_of_pallor: false,
  appearance_of_cyanosis: false,
  appearance_of_pedal_edema: false,
  appearance_of_pedal_edema_details: false,
  systemic_examination: {},
  single_breath_count: "",
  six_minute_walk_test: "",
  concurrent_medications: "",
  probable_diagnosis: "",
  investigations_prescribed: {}
}
const initError = Object.assign(
  {},
  ...Object.keys(initForm).map((k) => ({ [k]: "" }))
);

export const initialState = {
  form: { ...initForm },
  errors: { ...initError },
};