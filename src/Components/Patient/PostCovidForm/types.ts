export enum Gender {
  Male = 1,
  Female,
  Other
}
export enum CovidCategory {
  Mild = 1,
  Moderate,
  Servere
}

export enum OxygenRequirement {
  NasalProngs = 1,
  FaceMask,
  Nrbm,
  Fno
}

export enum AntiCoagulantsAdmissonMode {
  Iv = "Iv",
  Oral = "Oral"
}

export interface DrugDetail {
  duration: number;
  name: string;
}

export interface AntiCoagulants extends DrugDetail {
  mode_of_transmission: number;
}