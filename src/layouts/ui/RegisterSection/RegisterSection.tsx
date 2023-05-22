import React, { useState } from 'react';
import { images } from '../../../constants/image';
import { Carousel, Divider, Grid } from 'antd';
import RegisterForm, { IInputReg } from './RegisterForm';
import { useDispatch } from 'react-redux';
import { register } from '../../../actions/userActions';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
const { useBreakpoint } = Grid;

interface Ihandler {
  setSubmiting: any;
  resetForm: () => void;
}

const RegisterSection: React.FC = () => {
  const screen = useBreakpoint();
  const dispatch: Dispatch<any> = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);
  const redirectPath = queryParams.get('redirect');
  const amount = queryParams.get('amount');
  const navigate = useNavigate();
  const handleSubmit = async (values: IInputReg, { resetForm }: Ihandler) => {
    setLoading(true);
    dispatch(
      register({ ...values }, (cb, res) => {
        if (res === 'success') {
          // return message.success(cb);
          toast.success(cb, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setLoading(false);
          if (redirectPath === 'checkout') {
            setLoading(false);
            return navigate({
              pathname: '/checkout',
              search: `?amount=${amount}`,
            });
          }

          return navigate('/');
        }

        toast.error(cb, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      })
    );

    resetForm();
  };
  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <Carousel
        autoplay
        autoplaySpeed={8000}
        className="md:h-screen md:block hidden"
        dotPosition="right"
        style={{
          display: screen.lg ? 'block' : 'none',
        }}
      >
        <div className="md:flex flex-1 items-center h-screen scale-75">
          <img
            src={images.NoMarket}
            alt={'market'}
            className="h-full w-full object-contain"
          />
          <div className="-translate-y-10">
            <h4 className="font-bold text-center text-2xl">
              No more market wahala
            </h4>
            <p className="text-center text-lg">
              Get your groceries from the comfort of your home
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-center h-screen scale-75">
          <img
            src={images.Speedy}
            alt={'speedy'}
            className="h-full w-full object-contain"
          />
          <div className="-translate-y-10">
            <h4 className="font-bold text-center text-2xl">Fast Delivery</h4>
            <p className="text-center text-lg">
              Get your orders delivered on time
            </p>
          </div>
        </div>
      </Carousel>
      <div className="md:px-20 px-5 flex items-center justify-center flex-col bg-[#fcfcfc] h-screen">
        <div>
          <img
            src={images.Logo}
            className="md:w-16 w-32"
            alt="logo-favfleeks"
          />
        </div>
        <RegisterForm
          initialValues={{
            email: '',
            password: '',
            fname: '',
            lname: '',
            gender: '',
            phone: '',
            isAdmin: false,
          }}
          onSubmit={handleSubmit}
          isSubmitting={loading}
        />
        <Divider plain className="uppercase inline-block text-[#c9c9c9] mt-10">
          or Register with{' '}
        </Divider>
      </div>
    </div>
  );
};

export default RegisterSection;
