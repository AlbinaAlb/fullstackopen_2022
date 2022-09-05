import axios from 'axios';
import React from 'react';
import { useParams } from "react-router-dom";
import { apiBaseUrl } from '../constants';
import { setPatientData, useStateValue } from "../state";
import { Patient } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientData = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      try {
        const { data: patientDataFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientData(patientDataFromApi))
      } catch (error) {
        console.log(error);
      }
    };

    if (!patient || patient?.['id'] !== id) {
      void fetchPatient();
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
  
  return (
    <div>
      <div>
        <h2>
          {patient?.name} {genderIcon()}
        </h2>
      </div>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
    </div>
  );
};

export default PatientData;