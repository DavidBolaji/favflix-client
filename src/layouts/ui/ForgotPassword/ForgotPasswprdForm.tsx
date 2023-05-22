import { Alert, Button, Input } from 'antd';
import { Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export interface IInput {
  email: string;
}

interface Ilogin {
  onSubmit: (arg: IInput, val: any) => void;
  initialValues: IInput;
}

const ForgotPasswordForm: React.FC<Ilogin> = ({ onSubmit, initialValues }) => {
  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <>
              <div className="flex w-full justify-end">
                <Button onClick={() => navigate('/register')}>
                  Create An Account
                </Button>
              </div>
              <form onSubmit={handleSubmit} noValidate className="w-full">
                <div className="w-full">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={values.email}
                    // placeholder={'Enter Email'}
                    onChange={handleChange}
                    size="large"
                    onBlur={handleBlur}
                    className="mb-3"
                  />
                  {errors.email && touched.email && (
                    <Alert
                      message={errors.email}
                      closable
                      type="error"
                      showIcon
                    />
                  )}
                </div>

                <div className="w-full">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#feb517] w-full text-center py-2 rounded-md font-bold uppercase border-none"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default ForgotPasswordForm;