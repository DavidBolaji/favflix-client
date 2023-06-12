import { Formik } from 'formik';
import React, { useState } from 'react';
import StepWizard from 'react-step-wizard';
import { Input, Alert, Spin } from 'antd';
import { StyledPhoneInput } from '../RegisterSection/RegisterForm';
import { isValidPhoneNumber } from 'react-phone-number-input';
import * as Yup from 'yup';
import { CartCard } from '../../../components/CartCard';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { saveAddress } from '../../../actions/addressAction';
import { createOrders } from '../../../actions/orderAction';
import { toast } from 'react-toastify';
import { PaystackConsumer } from 'react-paystack';
// import { clearCart } from '../../../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../../actions/cartActions';
import { SyncOutlined } from '@ant-design/icons';

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Address is a required field'),
  phone: Yup.string().required('Phone is a required field'),
});

const antIcon = <SyncOutlined spin />;

const PurchaseComponent: React.FC = () => {
  const [SW, setSW] = useState<any>(null);
  const [config, setConfig] = useState({
    reference: '',
    email: '',
    amount: 0, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey:
      import.meta.env.VITE_ENV === 'dev'
        ? import.meta.env.VITE_PAYSTACK_PUBLIC
        : import.meta.env.VITE_PAYSTACK_PUBLIC_PROD,
    // subaccount: import.meta.env.VITE_PAYSTACK_SUB,
  });

  const navigate = useNavigate();
  const cart = useSelector((state: any) => state.cart.cartItems);

  const address: { phone: string; address: string; email: string } =
    useSelector((state: any) => state.address.address);
  const [calb, setCalb] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setCount] = useState(0);
  const dispatch: Dispatch<any> = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const initial: { address: string; email?: string; phone: string } = {
    ...address,
    phone: address.phone !== '' ? address.phone : user.phone,
  };

  const total = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(
    cart.reduce((acc: number, cur: any) => {
      return acc + cur.amount * cur.qty;
    }, 0)
  );

  const onSuccess = () => {
    setLoading(false);
    // Implementation for whatever you want to do with reference and after success call.
    toast.success('Payment succesfull', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

    dispatch(
      createOrders(
        {
          user: user._id,
          phone: address.phone,
          email: address.email,
          address: address.address,
          product: cart,
          price: +total.replace('₦', '').replace(',', ''),
          status: 'processing',
          paid: true,
          delivered: false,
          _id: calb,
        },
        (cb: string, res: 'error' | 'success') => {
          if (res === 'success') {
            // return message.success(cb);
            dispatch(clearCart());

            return navigate('/orders');
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

          return navigate('/orders');
        }
      )
    );
  };

  // you can call this function anything
  const onClose = () => {
    setLoading(false);
    // implementation for  whatever you want to do when the Paystack dialog closed.
    toast.error('Payment Error', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const componentProps = {
    ...config,
    text: 'Paystack Button Implementation',
    onSuccess: () => onSuccess(),
    onClose: () => onClose(),
  };

  const handleSubmit = (values: any) => {
    // let valid = typeof value !== "undefined" && address !== "";
    setLoading(true);
    dispatch(
      saveAddress({
        email: user.email,
        phone: values.phone,
        address: values.address,
      })
    );

    setLoading(false);
    SW?.nextStep();
  };

  const order = () => {
    setLoading(true);
    dispatch(
      createOrders(
        {
          user: user._id,
          phone: address.phone,
          email: address.email,
          address: address.address,
          product: cart,
          price: +total.replace('₦', '').replace(',', ''),
          status: 'waiting',
          paid: false,
          delivered: false,
        },
        (cb, res) => {
          if (res === 'success') {
            // return message.success(cb);
            setConfig({
              ...config,
              reference: Date.now().toString(),
              email: address.email,
              amount: +total.replace('₦', '').replace(',', '') * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
            });

            setCalb(cb);
            setLoading(false);

            return SW?.nextStep();
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
        }
      )
    );
  };
  return (
    <section className="grid grid-cols-2 mt-20 md:min-h-[80vh]">
      <StepWizard
        initialStep={1}
        instance={setSW}
        className="md:col-span-1 md:row-start-1 row-start-2 col-span-2 md:mt-10"
      >
        <div className="w-full bg-white rounded-lg xl:p-0 dark:bg-gray-800 md:px-10 mt-10">
          <div className="">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl bg-white">
              Details
            </h1>
            <Formik
              // defaultValues={address}
              validationSchema={validationSchema}
              initialValues={initial}
              onSubmit={handleSubmit}
            >
              {({
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setFieldError,

                values,
              }) => {
                return (
                  <form noValidate onSubmit={handleSubmit} className="bg-white">
                    <div className="w-full bg-white">
                      <label htmlFor="fname">Address</label>
                      <Input
                        type="text"
                        name="address"
                        value={values.address}
                        // placeholder={'Enter Email'}
                        onChange={handleChange}
                        size="large"
                        onBlur={handleBlur}
                        className="mb-3 w-full"
                      />
                      {errors.address && touched.address && (
                        <Alert
                          message={errors.address}
                          closable
                          type="error"
                          showIcon
                        />
                      )}
                    </div>
                    <div className="bg-white">
                      <label htmlFor="phone">Contact Phone Number</label>

                      <StyledPhoneInput
                        value={values.phone}
                        international
                        defaultCountry="NG"
                        countryCallingCodeEditable={false}
                        onChange={(value) => {
                          setFieldValue('phone', value);
                        }}
                        //   onFocus={() => setPhoneError('')}
                        onBlur={() => {
                          if (values.phone === '') {
                            setFieldError(
                              'phone',
                              'Phone number is a required field.'
                            );
                            // setCount((prev: number) => prev + 1);
                            return;
                          }
                          if (!isValidPhoneNumber(values.phone)) {
                            setFieldError('phone', 'phone number is not valid');
                            // setCount((prev: number) => prev + 1);
                            return;
                          }
                        }}
                        className="hover:border-[#cb104a] hover:border rounded-md mb-3 w-full bg-white border border-[#d9d9d9] py-2"
                      />
                      {errors.phone && touched.phone && (
                        <>
                          <Alert
                            message={errors.phone}
                            closable
                            type="error"
                            showIcon
                            //   onClose={() => setPhoneError('')}
                          />
                        </>
                      )}
                    </div>
                    <div className="w-full bg-white">
                      <button
                        type="submit"
                        style={{
                          backgroundColor: loading ? '#fafafa' : '',
                          border: loading ? '1px solid #cb104a' : '',
                        }}
                        //   onClick={SW?.nextStep}
                        className="bg-[#cb104a] text-white w-full text-center py-2 rounded-md font-bold uppercase border-none"
                      >
                        {loading ? <Spin indicator={antIcon} /> : 'Save'}
                      </button>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>

        <div className="w-full bg-white rounded-lg xl:p-0 dark:bg-gray-800 md:px-10 mt-10">
          <div className="bg-white">
            <h1 className="text-xl font-bold bg-white leading-tight tracking-tight text-gray-900 md:text-2xl mb-4">
              CONFIRM DETAILS
            </h1>
            <div className="bg-white">
              <p className="my-2">Email: {user.email}</p>
              <p className="my-2">Phone Number: {address.phone}</p>
              <p className="my-2">Address: {address.address}</p>
            </div>
            <div className="w-full flex gap-3 mt-10 mb-10 bg-white">
              <button
                type="button"
                onClick={SW?.previousStep}
                className="bg-[#cb104a] text-white w-full text-center py-2 rounded-md font-bold uppercase border-none"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={order}
                className="bg-[#cb104a] text-white w-full text-center py-2 rounded-md font-bold uppercase border-none"
              >
                {loading ? <Spin indicator={antIcon} /> : 'Next'}
              </button>
            </div>
          </div>
        </div>
        <div className="w-full bg-white rounded-lg xl:p-0 dark:bg-gray-800 md:px-10 mt-10">
          <div className="bg-white">
            <h1 className="bg-white text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-4">
              Pay
            </h1>
            <div className="bg-white">
              <p className="my-2">Email: {user.email}</p>
              <p className="my-2">Phone Number: {address.phone}</p>
              <p className="my-2">Address: {address.address}</p>
            </div>
            <div className="w-full flex gap-3 mt-10 mb-10 bg-white">
              <button
                type="button"
                onClick={SW?.previousStep}
                className="bg-[#cb104a] text-white w-full text-center py-2 rounded-md font-bold uppercase border-none"
              >
                Previous
              </button>
              <PaystackConsumer {...componentProps}>
                {({ initializePayment }) => (
                  <button
                    style={{
                      backgroundColor: loading ? '#fafafa' : '',
                      border: loading ? '1px solid #cb104a' : '',
                    }}
                    className="bg-[#cb104a] text-white w-full text-center py-2 rounded-md font-bold uppercase border-none"
                    onClick={() => {
                      setLoading(true);
                      initializePayment(onSuccess, onClose);
                      setCount((prev) => prev + 1);
                    }}
                  >
                    {loading ? <Spin indicator={antIcon} /> : 'Pay ' + total}
                  </button>
                )}
              </PaystackConsumer>
            </div>
          </div>
        </div>
      </StepWizard>
      <div className="md:col-span-1 col-span-2 md:mt-10 bg-white">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Orders
        </h1>
        {cart.map((item: any) => {
          return <CartCard key={item._id} item={item} checkout={false} />;
        })}
      </div>
    </section>
  );
};

export default PurchaseComponent;
