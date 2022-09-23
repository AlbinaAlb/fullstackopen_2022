import axios from 'axios';
import React from 'react';
import { useParams } from "react-router-dom";
import { apiBaseUrl } from '../constants';
import { setPatientData, useStateValue, setDiagnosisList } from "../state";
import { Patient, Entry, Diagnosis } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientData = () => {
  const [{ patient, diagnosis }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientDataFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientData(patientDataFromApi))
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDiagnosis = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        )
        dispatch(setDiagnosisList(diagnosisListFromApi))
      } catch (error) {
        console.log(error)
      }
    }

    if (!patient || patient?.['id'] !== id) {
      void fetchPatient();
      void fetchDiagnosis();
    }
  }, [patient, id, dispatch]);

   const genderIcon = () => {
    switch (patient?.gender) {
      case 'male':
      return <MaleIcon />;
      case 'female':
        return <FemaleIcon />;
        case 'other':
          return <TransgenderIcon />;
      default:
        break;
    }
  }; 

  const getEntryView = (entry: Entry) => {
    return (
      <div key={entry.id}>
        <p>
          {entry.date} {entry.description}
        </p>
        {entry.diagnosisCodes && (
          <ul>
            {entry.diagnosisCodes.map((code: string) => {
              debugger
              return (
                <li key={code}>
                  {code} {diagnosis[code]?.name}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  };
  
  const totalEntries = patient ? patient?.entries?.length : 0

  return (
    <div>
      <div>
        <h2>
          {patient?.name} {genderIcon()}
        </h2>
      </div>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      {!!totalEntries && (
        <>
          <h3>entries</h3>
          {patient?.entries?.map((entry) =>
            getEntryView(entry)
          )}
        </>
      )}
    </div>
  );
};

export default PatientData;