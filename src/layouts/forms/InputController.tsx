import React from 'react';
import { Formik } from 'formik';

interface IForm {
  initialValues: any;
  onSubmit: (value: any) => void;
  input: React.ReactElement;
  button?: React.ReactElement;
}

const InputController: React.FC<IForm> = ({
  initialValues,
  onSubmit,
  input,
  button,
}) => {
  return (
    <Formik initialValues={{ name: '' }} onSubmit={onSubmit}>
      {({
        errors,
        handleChange,
        values,
        touched,
        dirty,
        handleBlur,
        handleReset,
        handleSubmit,
      }) => {
        return (
          <>
            <label className="" htmlFor="name">
              Name
            </label>
            <input type="text" value={values.name} />
            <p>{errors.name && touched.name && errors.name}</p>
          </>
        );
      }}
    </Formik>
  );
};

export default InputController;
