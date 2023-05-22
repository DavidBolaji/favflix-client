import { Alert, Button, Input, Spin } from 'antd';
import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import 'react-phone-number-input/style.css';
import { SyncOutlined } from '@ant-design/icons';

export const StyledPhoneInput = styled(PhoneInput)`
  input {
    border-color: #d9d9d9;
    border-width: 1;
    outline: none;
  }
  background-color: #fff;

  input[type='tel']:focus {
    outline: none;
    box-shadow: none;
    border-color: #d9d9d9 !important;
    border-width: 1 !important;
    /* border: 1px solid #ededed !important; */
  }
  padding-left: 10px;
`;

const validationSchema = Yup.object().shape({
  fname: Yup.string()
    .min(3, 'First Name must be at least 3 characters long')
    .required('First name is a required field'),
  lname: Yup.string()
    .min(3, 'Last Name must be at least 3 characters long')
    .required('Last name is a required field'),
  gender: Yup.string()
    .oneOf(['male', 'female'], 'Gender must be male or female')
    .required('Gender is a required field'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is a required field'),
  password: Yup.string()
    .min(8, 'Password should be at least 8 characters')
    .required('Password is a required field'),
  phone: Yup.string().required('Phone is a required field'),
});

export interface IInputReg {
  email: string;
  password: string;
  fname: string;
  lname: string;
  gender: string;
  phone: string;
  isAdmin: boolean;
}

interface IRegister {
  onSubmit: (arg: IInputReg, val: any) => void;
  initialValues: IInputReg;
  isSubmitting: boolean;
}

const antIcon = <SyncOutlined spin />;

const RegisterForm: React.FC<IRegister> = ({
  onSubmit,
  initialValues,
  isSubmitting,
}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect');
  const amount = queryParams.get('amount');
  const navigate = useNavigate();
  const [phoneErr, setPhoneError] = useState('');
  const [, setCount] = useState(0);

  useEffect(() => {
    console.log('reset');
  }, [phoneErr]);
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
          setFieldValue,
        }) => {
          return (
            <>
              <div className="flex w-full justify-end ">
                <Button
                  onClick={() => {
                    if (redirectPath === 'checkout') {
                      return navigate({
                        pathname: '/login',
                        search: `?redirect=${redirectPath}&amount=${amount}`,
                      });
                    }
                    return navigate('/login');
                  }}
                >
                  Login Account
                </Button>
              </div>

              <form noValidate onSubmit={handleSubmit} className="w-full">
                <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-3">
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
                <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-3">
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

                    <StyledPhoneInput
                      value={values.phone}
                      international
                      defaultCountry="NG"
                      countryCallingCodeEditable={false}
                      onChange={(value) => {
                        setFieldValue('phone', value);
                      }}
                      onFocus={() => setPhoneError('')}
                      onBlur={() => {
                        if (values.phone === '') {
                          setPhoneError('Phone number is a required field.');
                          setCount((prev) => prev + 1);
                          return;
                        }
                        if (!isValidPhoneNumber(values.phone)) {
                          setPhoneError('phone number is not valid');
                          setCount((prev) => prev + 1);
                          return;
                        }
                      }}
                      className="hover:border-[#feb517] hover:border rounded-md mb-3 w-full bg-white border border-[#d9d9d9] py-2"
                    />
                    {phoneErr && (
                      <>
                        {touched.phone}
                        {errors.phone}
                        <Alert
                          message={phoneErr}
                          closable
                          type="error"
                          showIcon
                          onClose={() => setPhoneError('')}
                        />
                      </>
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
                    style={{
                      backgroundColor: isSubmitting ? '#fafafa' : '',
                      border: isSubmitting ? '1px solid #feb517' : '',
                    }}
                    className="bg-[#feb517] w-full text-center py-2 rounded-md font-bold uppercase border-none"
                  >
                    {isSubmitting ? <Spin indicator={antIcon} /> : 'Register'}
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
