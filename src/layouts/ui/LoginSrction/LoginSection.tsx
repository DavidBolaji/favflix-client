import React from 'react';
import { images } from '../../../constants/image';
import LoginForm, { IInput } from './LoginForm';
import { Carousel, Divider } from 'antd';

interface Ihandler {
  setSubmiting: any;
  resetForm: () => void;
}

const LoginSection: React.FC = () => {
  const handleSubmit = (values: IInput, { resetForm }: Ihandler) => {
    console.log(values);
    resetForm();
  };
  return (
    <div className="grid grid-cols-2">
      <Carousel
        autoplay
        autoplaySpeed={8000}
        className="h-screen"
        dotPosition="right"
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
        <LoginForm
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
        />
        <Divider plain className="uppercase inline-block text-[#c9c9c9] mt-10">
          or login with{' '}
        </Divider>
      </div>
    </div>
  );
};

export default LoginSection;
