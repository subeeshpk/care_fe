import { OxygenRequirement } from "./types";

export const comorbitiesOptions = [
  { text: "Hypertension", id: "hypertension" },
  { text: "Dyslipidemia", id: "dyslipidemia" },
  { text: "Thyroid dysfuncUon", id: "thyroid_dysfuncuon" },
  { text: "Asthma", id: "asthma" },
  { text: "Chronic obstrucUve pulmonary disease (COPD)", id: "chronic_obstrucuve_pulmonary_disease_copd" },
  { text: "Brochiectasis", id: "brochiectasis" },
  { text: "IntersUUal lung disease (ILD)", id: "intersuual_lung_disease_ild" },
  { text: "Chronic thromboembolic hypertension (CTEPH)", id: "chronic_thromboembolic_hypertension_cteph" },
  { text: "Old Pulmonary tuberculosis", id: "old_pulmonary_tuberculosis" },
  { text: "Seizure", id: "seizure" },
  { text: "Parkinson disease, Alzheimer’s disease", id: "parkinson_disease_alzheimers_disease" },
  { text: "Coronary Artery Disease (CAD)", id: "coronary_artery_disease_cad" },
  { text: "Valvular heart disease", id: "valvular_heart_disease" },
  { text: "Cardiomyopathy", id: "cardiomyopathy" },
  { text: "cardiac conducUon defect", id: "cardiac_conducuon_defect" },
  { text: "Cerebrovascular accident (CVA)", id: "cerebrovascular_accident_cva" },
  { text: "chronic liver disease (CLD)", id: "chronic_liver_disease_cld" },
  { text: "Chronic kidney disease (CKD)", id: "chronic_kidney_disease_ckd" },
  { text: "ConnecUve Ussue diseases", id: "connecuve_ussue_diseases" },
  { text: "Post Transplant Malignancies", id: "post_transplant_malignancies" },
  { text: "HIV", id: "hiv" },
  { text: "Autoimmune diseases", id: "autoimmune_diseases" },
];

export const symptomsOptions = [
  { text: "DYSPNEA", id: "dyspnea" },
  { text: "PALPITATION", id: "palpitation" },
  { text: "COUGH", id: "cough" },
  { text: "MUSCLE PAIN", id: "muscle_pain" },
  { text: "FATIGUE", id: "fatigue" },
  { text: "JOINT PAIN", id: "joint_pain" },
  { text: "CHEST PAIN", id: "chest_pain" },
  { text: "ALTERED BOWEL HABITS", id: "altered_bowel_habits" },
  { text: "SWELLING OF LEGS(EDEMA)", id: "swelling_of_legsedema" },
  { text: "ANY FOCAL NEUROLOGICAL DEFECTS", id: "any_focal_neurological_defects" },
  { text: "HEADACHE", id: "headache" },
  { text: "DECREASED SLEEP", id: "decreased_sleep" },
  { text: "ALTERED TASTE & SMELL", id: "altered_taste_smell" },
  { text: "BRAIN FOGGING", id: "brain_fogging" },
  { text: "DEPRESSION or ANXIETY", id: "depression_or_anxiety" },
  { text: "SEIZURES", id: "seizures" },
];

export const investigationPrescribedOptions = [
  { text: "CBC / LFT /RFT/ SE", id: "cbc_lft_rft_se" },
  { text: "RBS/ HbA1C / TFT/ FLP", id: "rbs_hba1c_tft_flp" },
  { text: "CRP / FERRITIN/ CDH", id: "crp_ferritin_cdh" },
  { text: "aPTT / INR /D Dimer", id: "aptt_inr_d_dimer" },
  { text: "HRCT Chest / CTPA / CXR PA", id: "hrct_chest_ctpa_cxr_pa" },
  { text: "Spirometry / DLCO", id: "spirometry_dlco" },
  { text: "ECG / TMT / ECHO /Trop I / pro BNP", id: "ecg_tmt_echo_trop_i_pro_bnp" },
];

export const antiViralDragsOptions = [
  { text: "Remdesivir", id: "remdesivir" },
  { text: "Favipiravir", id: "favipiravir" },
];

export const antiCoagulantsTransmissionOptions = [
  { text: "IV", id: "IV" },
  { text: "Oral", id: "Oral" },
];

export const oxygenModeOptions = [
  { text: "Nasal Prongs", id: OxygenRequirement.NasalProngs },
  { text: "Face Mask", id: OxygenRequirement.FaceMask },
  { text: "Nrbm", id: OxygenRequirement.Nrbm },
  { text: "Fno", id: OxygenRequirement.Fno }
]

type dataMap = { [key: string]: { id: string, text: string, [key: string]: any } }

export const comorbitiesOptionsMap: dataMap = comorbitiesOptions.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})
export const symptomsOptionsMap: dataMap = symptomsOptions.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})
export const investigationPrescribedOptionsMap: dataMap = investigationPrescribedOptions.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})
export const antiViralDragsOptionsMap: dataMap = antiViralDragsOptions.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})
export const antiCoagulantsTransmissionOptionsMap: dataMap = antiCoagulantsTransmissionOptions.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})
export const oxygenModeOptionsMap: dataMap = antiCoagulantsTransmissionOptions.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})
