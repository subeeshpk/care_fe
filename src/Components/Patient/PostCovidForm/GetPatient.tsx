import React, { useCallback, useReducer, useState } from "react";
import _, { debounce } from "lodash";
import Paper from "@material-ui/core/Paper";
import * as Notification from "../../../Utils/Notifications";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  InputLabel,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";
import {
  DateInputField,
  PhoneNumberField,
  SelectField,
} from "../../Common/HelperInputFields";
import parsePhoneNumberFromString from "libphonenumber-js";
import {
  getAllPatient,
  getFacilities,
  getPatient,
  searchPatient,
  transferPatient,
} from "../../../Redux/actions";
import { useDispatch } from "react-redux";
import { DupPatientModel } from "../../Facility/models";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import { CircularProgress } from "@material-ui/core";
import { statusType, useAbortableEffect } from "../../../Common/utils";
import { PatientModel } from "../models";
import { navigate } from "raviger";
import { Gender } from "./types";

const initForm: any = {
  date_of_birth: null,
};

const initError = Object.assign(
  {},
  ...Object.keys(initForm).map((k) => ({ [k]: "" }))
);

const initialState = {
  form: { ...initForm },
  errors: { ...initError },
};

const transferFormReducer = (state = initialState, action: any) => {
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

const TransferModal = ({
  open,
  setOpen,
  patient,
  setUser,
  setIsFormVisible,
  facilityId,
}: any) => {
  const dispatchAction: any = useDispatch();
  const [state, dispatch] = useReducer(transferFormReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const validateForm = () => {
    let errors = { ...initError };
    let invalidForm = false;
    Object.keys(state.form).forEach((field, i) => {
      switch (field) {
        case "date_of_birth":
          if (!state.form[field]) {
            errors[field] = "Please enter date in DD/MM/YYYY format";
            invalidForm = true;
          }
          return;
        default:
          return;
      }
    });
    dispatch({ type: "set_error", errors });
    return !invalidForm;
  };

  const handleSubmit = async (e: any) => {
    console.log("patient Id", patient.id);
    e.preventDefault();
    const validForm = validateForm();
    if (validForm) {
      setIsLoading(true);
      const data = {
        date_of_birth: moment(state.form.date_of_birth).format("YYYY-MM-DD"),
        facility: facilityId,
      };
      console.log("SENDING DATA", data);
      const res = await dispatchAction(
        transferPatient(data, { id: patient.patient_id })
      );
      setIsLoading(false);
      if (res && res.data) {
        dispatch({ type: "set_form", form: initForm });
        Notification.Success({
          msg: `Patient ${res.data.patient} transferred successfully`,
        });
        const newFacilityId =
          res.data && res.data.facility_object && res.data.facility_object.id;
        if (newFacilityId) {
          dispatchAction(getPatient({ id: patient.patient_external_id })).then(
            (res: any) => {
              const patientData = res.data;
              console.log({ res });
              setUser({
                patient_external_id: patient.patient_external_id,
                name: patientData.name,
                age: patientData.age,
                address: patientData.address,
                phone_number: patientData.phone_number,
                gender: patientData.gender,
                occupation: patientData.occupation,
              });
              handleClose();
              setIsFormVisible(true);
            }
          );
        } else {
          setUser({});
        }
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date: any, field: string) => {
    if (moment(date).isValid()) {
      const form = { ...state.form };
      form[field] = date;
      dispatch({ type: "set_form", form });
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Verify {patient.name}-{patient.gender}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Note: Date of birth must match the patient to process the transfer
            request.
          </DialogContentText>

          <div>
            <InputLabel>Date of birth*</InputLabel>
            <DateInputField
              fullWidth={true}
              value={state.form.date_of_birth}
              onChange={(date) => handleDateChange(date, "date_of_birth")}
              defaultValue=""
              required
              errors={state.errors.date_of_birth}
              inputVariant="outlined"
              margin="dense"
              openTo="year"
              disableFuture={true}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              handleSubmit(e);
            }}
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            Verify
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

interface PatientTableProps {
  patientList: any;
  setUser: any;
  setIsFormVisible: any;
  facilityPatients?: boolean;
  facilityId: string;
}

const PatientTable: React.FC<PatientTableProps> = ({
  facilityId,
  patientList,
  setUser,
  setIsFormVisible,
  facilityPatients,
}) => {
  const PatientRow = ({ patient }: { patient: any }) => {
    const [open, setOpen] = React.useState(false);
    const handleFacilityPatientSubmit = () => {
      setUser({
        patient_external_id: patient.id,
        name: patient.name,
        age: patient.age,
        address: patient.address,
        phone_number: patient.phone_number,
        gender: patient.gender,
        occupation: patient.occupation,
      });
      setIsFormVisible(true);
    };

    return (
      <>
        <TransferModal
          patient={patient}
          open={open}
          setOpen={setOpen}
          setUser={setUser}
          facilityId={facilityId}
          setIsFormVisible={setIsFormVisible}
        />
        <TableRow key={facilityPatients ? patient.id : patient.patient_id}>
          <TableCell align="left" width="50%">
            {patient.name}
          </TableCell>
          <TableCell align="left">
            {Number(patient.gender) ? Gender[patient.gender] : patient.gender}
          </TableCell>
          <TableCell align="center">
            <Button
              onClick={() =>
                facilityPatients ? handleFacilityPatientSubmit() : setOpen(true)
              }
              variant="text"
              color="primary"
              size="small"
            >
              Select
            </Button>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left" width="50%">
              Name
            </TableCell>
            <TableCell align="left">Gender</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientList.length > 0 ? (
            patientList.map((patient: any) => {
              return <PatientRow patient={patient} />;
            })
          ) : (
            <TableRow>
              <TableCell component="th" scope="row">
                No Patient Found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

interface GetPatientProps {
  setUser: Function;
  setIsFormVisible: Function;
  facilityId: string;
}

const GetPatient: React.FC<GetPatientProps> = ({
  setUser,
  setIsFormVisible,
  facilityId,
}) => {
  const [statusDialog, setStatusDialog] = useState<{
    show?: boolean;
    facilityPatientList: Array<PatientModel>;
    patientList: Array<DupPatientModel>;
    loading: boolean;
  }>({ patientList: [], loading: false, facilityPatientList: [] });
  const dispatchAction: any = useDispatch();

  const [isCreatePatientVisible, setIsCreatePatientVisible] = useState(false);

  const fetchPatient = useCallback(
    debounce(async (phoneNo: string) => {
      if (phoneNo && parsePhoneNumberFromString(phoneNo)?.isPossible()) {
        setIsCreatePatientVisible(true);
        const query = {
          phone_number: parsePhoneNumberFromString(phoneNo)?.format("E.164"),
        };
        setStatusDialog((prev) => ({
          ...prev,
          patientList: [],
          loading: true,
        }));
        const patientListRes = await dispatchAction(searchPatient(query));
        const facilityPatientList = await dispatchAction(
          getAllPatient(query, "getPatient")
        );
        setStatusDialog((prev) => ({ ...prev, loading: false }));
        if (
          patientListRes &&
          patientListRes.data &&
          patientListRes.data.results
        ) {
          if (patientListRes.data.results.length) {
            setStatusDialog((prev) => ({
              ...prev,
              show: true,
              loading: false,
              patientList: patientListRes.data.results,
            }));
          }
        }
        if (
          facilityPatientList &&
          facilityPatientList.data &&
          facilityPatientList.data.results
        ) {
          if (facilityPatientList.data.results.length) {
            setStatusDialog((prev) => ({
              ...prev,
              show: true,
              loading: false,
              facilityPatientList: facilityPatientList.data.results,
            }));
          }
        }
      } else {
        setIsCreatePatientVisible(false);
      }
    }, 300),
    []
  );

  const facilityPatientMap = statusDialog.facilityPatientList.reduce(
    (acc, cur) => ({ ...acc, [(cur.id as unknown) as string]: true }),
    {}
  ) as any;
  const patientListArray = statusDialog.patientList.filter(
    (p: any) => !facilityPatientMap[p.patient_external_id as any]
  );
  console.log({
    patientListArray,
    facilityPatientList: statusDialog.facilityPatientList,
  });

  return (
    <Box padding="2rem 0" bgcolor="#F3F4F6">
      <Container maxWidth="md">
        <div className={`flex pt-4 mb-4`}>
          <button
            onClick={() => {
              window.history.go(-1);
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
        <Typography variant="h6" component="h1">
          Enter Patient Details
        </Typography>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <PhoneNumberField
              label="Phone Number*"
              onChange={(value: any) => {
                fetchPatient(value);
              }}
            />
          </Grid>
        </Grid>
        {statusDialog.loading && <CircularProgress />}
        {statusDialog.show && !statusDialog.loading && (
          <>
            <Typography className="mb-2 mt-4">
              Patients from other facilities
            </Typography>

            <PatientTable
              patientList={patientListArray}
              setUser={setUser}
              setIsFormVisible={setIsFormVisible}
              facilityId={facilityId}
            />

            <Typography className="mb-2 mt-4">
              Patients from facility
            </Typography>

            <PatientTable
              patientList={statusDialog.facilityPatientList}
              setUser={setUser}
              setIsFormVisible={setIsFormVisible}
              facilityPatients
              facilityId={facilityId}
            />
          </>
        )}
        {isCreatePatientVisible && !statusDialog.loading && (
          <>
            <Typography className="mt-4" color="error">
              Note : If patient not found in the list, you can create new
              patient
            </Typography>
            <Button
              color="primary"
              className="my-4"
              variant="contained"
              onClick={() => navigate("/facility")}
            >
              Create Patient
            </Button>
          </>
        )}
      </Container>
    </Box>
  );
};

export default GetPatient;
