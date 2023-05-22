import { SyncOutlined } from '@ant-design/icons';
import { Alert, Button, Input, Spin } from 'antd';
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
  isSubmitting: boolean;
}

const antIcon = <SyncOutlined spin />;

const ResetPasswordForm: React.FC<Ilogin> = ({
  onSubmit,
  initialValues,
  isSubmitting,
}) => {
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
                    style={{
                      backgroundColor: isSubmitting ? '#fafafa' : '',
                      border: isSubmitting ? '1px solid #feb517' : '',
                    }}
                    className="bg-[#feb517] w-full text-center py-2 rounded-md font-bold uppercase border-none"
                  >
                    {isSubmitting ? <Spin indicator={antIcon} /> : 'Reset'}
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
