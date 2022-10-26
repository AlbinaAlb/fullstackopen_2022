import { Grid, Button } from '@material-ui/core'
import { Field, Formik, Form } from 'formik'
import {
  DiagnosisSelection,
  NumberField,
  TextField,
} from '../AddPatientModal/FormField'
import { useStateValue } from '../state'
import { NewEntry } from '../types'

export type EntryFormValues = Omit<NewEntry, 'id' | 'type'>

interface Props {
  onSubmit: (values: EntryFormValues) => void
  onCancel: () => void
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue()
  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: -1,
        employerName: '',
        sickLeave: { startDate: '', endDate: '' },
        discharge: { date: '', criteria: '' },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required'
        const errors: { [field: string]: string } = {}
        if (!values.description) {
          errors.description = requiredError
        }
        if (!values.date) {
          errors.date = requiredError
        }
        if (!values.specialist) {
          errors.specialist = requiredError
        }
        return errors
      }}
    >
      {({ isValid, dirty, setFieldTouched, setFieldValue }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={-1}
              max={3}
            />
            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <div>
              <div>
                <Field
                  label="SickLeave Start Date"
                  placeholder="Start Date"
                  name="sickLeave.startDate"
                  component={TextField}
                />
              </div>
              <Field
                label="SickleaveEnd Date"
                placeholder="SickLeave End Date"
                name="sickLeave.endDate"
                component={TextField}
              />
            </div>
            <div>
              <div>
                <Field
                  label="Discharge Date"
                  placeholder="Discharge Date"
                  name="discharge.date"
                  component={TextField}
                />
              </div>
              <Field
                label="Discharge criteria"
                placeholder="Discharge criteria"
                name="discharge.criteria"
                component={TextField}
              />
            </div>
            <Grid>
              <Grid item>
                <Button
                  style={{
                    color: 'red',
                  }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  style={{
                    float: 'right',
                    color: 'green',
                  }}
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}
