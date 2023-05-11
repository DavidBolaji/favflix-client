import { Alert, Button, Input } from 'antd';
import { Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password should be at least 8 characters')
    .required('Password is required'),
});

export interface IInput {
  email: string;
  password: string;
}

interface Ilogin {
  onSubmit: (arg: IInput, val: any) => void;
  initialValues: IInput;
}

const LoginForm: React.FC<Ilogin> = ({ onSubmit, initialValues }) => {
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
                  <label htmlFor="password">Password</label>
                  <Input.Password
                    type="password"
                    name="password"
                    value={values.password}
                    // placeholder={'Enter Password'}
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
                  <div className="flex justify-end w-full translate-x-4 -translate-y-3">
                    <Button
                      type="link"
                      className="text-[#b3561b]"
                      onClick={() => navigate('/forgot')}
                    >
                      Forgot Password?
                    </Button>
                  </div>
                </div>
                <div className="w-full">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#feb517] w-full text-center py-2 rounded-md font-bold uppercase border-none"
                  >
                    Login
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

export default LoginForm;
