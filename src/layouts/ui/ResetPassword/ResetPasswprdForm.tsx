import { Alert, Button, Input } from 'antd';
import { Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password should be at least 8 characters')
    .required('Password is required'),
});

export interface IInput {
  password: string;
}

interface Ilogin {
  onSubmit: (arg: IInput, val: any) => void;
  initialValues: IInput;
}

const ResetPasswordForm: React.FC<Ilogin> = ({ onSubmit, initialValues }) => {
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
                  <label htmlFor="password">Password</label>
                  <Input.Password
                    type="password"
                    name="password"
                    value={values.password}
                    placeholder={'Enter New Password'}
                    onChange={handleChange}
                    size="large"
                    onBlur={handleBlur}
                    className="mb-3"
                  />
                  {errors.password && touched.password && (
                    <Alert
                      message={errors.password}
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

export default ResetPasswordForm;
