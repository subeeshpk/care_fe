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
  facility: "",
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
  facilityOptions,
  setUser,
  setIsFormVisible,
}: any) => {
  const dispatchAction: any = useDispatch();
  const [state, dispatch] = useReducer(transferFormReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const validateForm = () => {
    let errors = { ...initError };
    let invalidForm = false;
    Object.keys(state.form).forEach((field, i) => {
      switch (field) {
        case "facility":
          if (!state.form[field]) {
            errors[field] = "Please select the facility";
            invalidForm = true;
          }
          return;
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
        facility: state.form.facility,
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
  const handleChange = (e: any) => {
    console.log(e);
    const form = { ...state.form };
    form[e.target.name] = e.target.value;
    dispatch({ type: "set_form", form });
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

          <div>
            <InputLabel>Facility*</InputLabel>
            <SelectField
              fullWidth={true}
              value={state.form.facility}
              onChange={handleChange}
              errors={state.errors.facility}
              margin="dense"
              variant="outlined"
              name="facility"
              optionValue="name"
              options={[
                { name: "select facility", id: "" },
                ...facilityOptions,
              ]}
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

const PatientTable: React.FC<{
  patientList: any;
  setUser: any;
  setIsFormVisible: any;
  facilityPatients?: boolean;
}> = ({ patientList, setUser, setIsFormVisible, facilityPatients }) => {
  const dispatchAction: any = useDispatch();
  const [facilityOptions, setFacilityOptions] = useState([]);
  const fetchData = useCallback(
    async (status: statusType) => {
      const params = {};
      const res = await dispatchAction(getFacilities(params));
      if (!status.aborted) {
        if (res && res.data) {
          setFacilityOptions(res.data.results);
        }
      }
    },
    [dispatchAction]
  );

  useAbortableEffect(
    (status: statusType) => {
      fetchData(status);
    },
    [fetchData]
  );
  console.log({ facilityOptions });
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
          facilityOptions={facilityOptions}
          setUser={setUser}
          setIsFormVisible={setIsFormVisible}
        />
        <TableRow key={facilityPatients ? patient.id : patient.patient_id}>
          <TableCell component="th" scope="row">
            {facilityPatients ? patient.id : patient.patient_id}
          </TableCell>
          <TableCell align="right">{patient.name}</TableCell>
          <TableCell align="right">
            {Number(patient.gender) ? Gender[patient.gender] : patient.gender}
          </TableCell>
          <TableCell align="right">
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
            <TableCell>Patient ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Action</TableCell>
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

const GetPatient = ({ setUser, setIsFormVisible }: any) => {
  const [statusDialog, setStatusDialog] = useState<{
    show?: boolean;
    facilityPatientList: Array<PatientModel>;
    patientList: Array<DupPatientModel>;
    loading: boolean;
  }>({ patientList: [], loading: false, facilityPatientList: [] });
  const dispatchAction: any = useDispatch();

  const fetchPatient = useCallback(
    debounce(async (phoneNo: string) => {
      if (phoneNo && parsePhoneNumberFromString(phoneNo)?.isPossible()) {
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
      }
    }, 300),
    []
  );

  const facilityPatientMap = statusDialog.facilityPatientList.reduce(
    (acc, cur) => ({ ...acc, [(cur.id as unknown) as string]: true }),
    {}
  ) as any;
  const patientListArray = statusDialog.patientList.filter(
    (p: any) => !!facilityPatientMap[p.patient_external_id as any]
  );

  return (
    <Box padding="2rem 0" bgcolor="#F3F4F6">
      <Container maxWidth="md">
        <Typography variant="h5" component="h1">
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
          <Grid item xs={12} md={2}>
            <Typography>OR</Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Button onClick={() => navigate("/facility")}>
              Create Patient
            </Button>
          </Grid>
        </Grid>
        {statusDialog.loading && <CircularProgress />}
        {statusDialog.show && !statusDialog.loading && (
          <>
            <Typography>Other Facilities Patients</Typography>
            <br />
            <PatientTable
              patientList={patientListArray}
              setUser={setUser}
              setIsFormVisible={setIsFormVisible}
            />
            <br />
            <br />
            <br />
            <Typography>Facilities Patients</Typography>
            <br />
            <PatientTable
              patientList={statusDialog.facilityPatientList}
              setUser={setUser}
              setIsFormVisible={setIsFormVisible}
              facilityPatients
            />
          </>
        )}
      </Container>
    </Box>
  );
};

export default GetPatient;
