import React from "react";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { DupPatientModel } from "../../Facility/models";
import { Gender } from "./types";

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

export interface PatientInfo {
  patient_id: string;
  patient_external_id: string;
  name: string;
  age: number;
  address: string;
  phone_number: string;
  gender: number;
  occupation: string;
}
interface PersonalInformationProps {
  patientInfo: PatientInfo;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  patientInfo,
}) => {
  const className = useStyle();
  const { name, age, address, phone_number, gender, occupation } = patientInfo;
  return (
    <>
      <Typography variant="h4" color="primary" className={className.heading}>
        Personal Information
      </Typography>
      <div className="md:w-2/3 mx-2">
        <div className="bg-white rounded-lg shadow p-4 h-full">
          <h1 className="font-bold text-3xl">
            {" "}
            {name} - {age}
          </h1>
          <h3 className="font-semibold text-lg py-2">
            <i className="fas fa-map-marker-alt mr-2"></i>
            {address || "-"}
          </h3>
          <div className="w-full grid grid-cols-1 gap-x-4 gap-y-2 md:gap-y-8 sm:grid-cols-3 mt-2">
            <div className="sm:col-span-1">
              <div className="text-sm leading-5 font-medium text-gray-500">
                Gender
              </div>
              <div className="mt-1 text-sm leading-5 text-gray-900">
                {Gender[gender]}
              </div>
            </div>
            <div className="sm:col-span-1">
              <div className="text-sm leading-5 font-medium text-gray-500">
                Phone
              </div>
              <div className="mt-1 text-sm leading-5 text-gray-900">
                <a href={`tel:${phone_number}`}>{phone_number || "-"}</a>
              </div>
            </div>
            <div className="sm:col-span-1">
              <div className="text-sm leading-5 font-medium text-gray-500">
                Occupation
              </div>
              <div className="mt-1 text-sm leading-5 text-gray-900">
                {occupation || "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;
