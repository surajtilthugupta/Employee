import { useFormik } from 'formik';
import * as Yup from 'yup';

export const useAppointmentForm = (onSubmit) => {
  return useFormik({
    initialValues: {
      name: '',
      age: '',
      disease: '',
      date: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      age: Yup.number().required('Required').min(0),
      disease: Yup.string().required('Required'),
      date: Yup.date()
      .required('Required')
      .test('is-future', 'No past date allowed', value => new Date(value) > new Date()),
    }),
    onSubmit,
  });
};