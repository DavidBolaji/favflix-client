import React, { useState } from 'react';
import { images } from '../../../constants/image';

import { Carousel, Grid } from 'antd';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
// import { useNavigate } from 'react-router-dom';
import ForgotPasswordForm from './ForgotPasswprdForm';
import { forgot } from '../../../actions/userActions';

const { useBreakpoint } = Grid;

const ForgotSection: React.FC = () => {
  const screen = useBreakpoint();
  const dispatch: Dispatch<any> = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { email: string }) => {
    setLoading(true);
    dispatch(
      forgot({ ...values }, (cb, res) => {
        if (res === 'success') {
          // return message.success(cb);
          setLoading(false);
          return toast.success(cb, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }

        setLoading(false);
        return toast.error(cb, {
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
  };
  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <Carousel
        autoplay
        autoplaySpeed={8000}
        className="h-screen"
        dotPosition="right"
        style={{
          display: screen.lg ? 'block' : 'none',
        }}
      >
        <div className="flex flex-1 items-center h-screen scale-75">
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
        <ForgotPasswordForm
          initialValues={{ email: '' }}
          onSubmit={handleSubmit}
          isSubmitting={loading}
        />
        {/* <Divider plain className="uppercase inline-block text-[#c9c9c9] mt-10">
          or login with{' '}
        </Divider> */}
      </div>
    </div>
  );
};

export default ForgotSection;
