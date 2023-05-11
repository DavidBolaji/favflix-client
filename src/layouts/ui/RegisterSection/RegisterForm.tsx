import { Alert, Button, Input } from 'antd';
import { Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  fname: Yup.string()
    .min(3, 'First Name must be at least 3 characters long')
    .required('First name is required field is required'),
  lname: Yup.string()
    .min(3, 'Last Name must be at least 3 characters long')
    .required('First name is required field is required'),
  gender: Yup.string()
    .oneOf(['male', 'female'], 'Gender must be male or female')
    .required('Gender field is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password should be at least 8 characters')
    .required('Password is required'),
});

export interface IInputReg {
  email: string;
  password: string;
  fname: string;
  lname: string;
  gender: string;
  phone: string;
}

interface IRegister {
  onSubmit: (arg: IInputReg, val: any) => void;
  initialValues: IInputReg;
}

const RegisterForm: React.FC<IRegister> = ({ onSubmit, initialValues }) => {
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
        }) => {
          return (
            <>
              <div className="flex w-full justify-end">
                <Button onClick={() => navigate('/login')}>
                  Login Account
                </Button>
              </div>
              <form noValidate onSubmit={handleSubmit}>
                <div className="w-full grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="fname">First Name</label>
                    <Input
                      type="fname"
                      name="fname"
                      value={values.fname}
                      // placeholder={'Enter Email'}
                      onChange={handleChange}
                      size="large"
                      onBlur={handleBlur}
                      className="mb-3"
                    />
                    {errors.fname && touched.fname && (
                      <Alert
                        message={errors.fname}
                        closable
                        type="error"
                        showIcon
                      />
                    )}
                  </div>
                  <div>
                    <label htmlFor="lname">Last Name</label>
                    <Input
                      type="lname"
                      name="lname"
                      value={values.lname}
                      // placeholder={'Enter lname'}
                      onChange={handleChange}
                      size="large"
                      onBlur={handleBlur}
                      className="mb-3"
                    />
                    {errors.lname && touched.lname && (
                      <Alert
                        message={errors.lname}
                        closable
                        type="error"
                        showIcon
                      />
                    )}
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="gender">Gender</label> <br />
                    <select
                      value={values.gender}
                      // placeholder={'Enter Email'}
                      style={{
                        borderColor: '#d9d9d9',
                        borderWidth: 1,
                      }}
                      onChange={handleChange}
                      name="gender"
                      onBlur={handleBlur}
                      className="pl-3 hover:border-[#feb517] rounded-md mb-3 w-full bg-white bottom-2 border-[#d9d9d9] py-2"
                    >
                      <option value=""></option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.gender && touched.gender && (
                      <Alert
                        message={errors.gender}
                        closable
                        type="error"
                        showIcon
                      />
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone">Phone Number</label>
                    <Input
                      type="phone"
                      name="phone"
                      value={values.phone}
                      // placeholder={'Enter phone'}
                      onChange={handleChange}
                      size="large"
                      onBlur={handleBlur}
                      className="mb-3"
                    />
                    {errors.phone && touched.phone && (
                      <Alert
                        message={errors.phone}
                        closable
                        type="error"
                        showIcon
                      />
                    )}
                  </div>
                </div>
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
                </div>
                <div className="w-full">
                  <button
                    type="submit"
                    className="bg-[#feb517] w-full text-center py-2 rounded-md font-bold uppercase border-none"
                  >
                    Register
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

export default RegisterForm;
