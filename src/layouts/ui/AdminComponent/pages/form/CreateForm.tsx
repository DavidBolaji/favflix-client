import { Alert, Input, Spin, Upload, message } from 'antd';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import * as Yup from 'yup';
import Cloudinary from '../../../../../auth/cloudinary';
import type { UploadFile } from 'antd/es/upload/interface';
import { createProducts } from '../../../../../actions/productAction';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
const initialValues = {
  title: '',
  amount: 0,
  img: '',
};

export interface Icreate {
  title: string;
  amount: number;
  img?: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('title is a required field'),
  amount: Yup.number().required('Amount is a required field'),
});

interface IcreateForm {
  init: Icreate;
  onSuccess: () => void;
}

const CreateForm: React.FC<IcreateForm> = ({ init, onSuccess }) => {
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const dispatch: Dispatch<any> = useDispatch();

  const onSubmit = async (values: any, { resetForm }: any) => {
    setUploading(false);
    // if (image.length < 1) return message.error('Select an image');

    dispatch(
      createProducts(
        { ...values, img: image === '' ? values.img : image },
        (cb, res) => {
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
            return onSuccess();
          }

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
    resetForm();
  };

  const remove = (file: any) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  const beforeUpload = async (_file: any, x: any) => {
    setFileList([...x]);
    setUploading((prev) => !prev);
    for (let i = 0; i < x.length; i++) {
      // console.log(i);
      const formData = new FormData();
      formData.append(
        'upload_preset',
        `${import.meta.env.VITE_CLOUDINARY_PRESET}`
      );
      formData.append('file', x[i]);

      try {
        const res = await Cloudinary.post('/image/upload', formData);
        const { secure_url } = res.data;

        setImage(() => secure_url);
        message.success('Image successfully uploaded');
      } catch (err: any) {
        message.error(err);
      }
      setUploading((prev) => !prev);
    }
    return false;
  };
  return (
    <>
      <Formik
        initialValues={init || initialValues}
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
              <form noValidate onSubmit={handleSubmit} className="w-full">
                <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-3">
                  <div>
                    <label htmlFor="title">Title</label>
                    <Input
                      type="text"
                      name="title"
                      value={values.title}
                      // placeholder={'Enter Email'}
                      onChange={handleChange}
                      size="large"
                      onBlur={handleBlur}
                      className="mb-3"
                    />
                    {errors.title && touched.title && (
                      <Alert
                        message={errors.title}
                        closable
                        type="error"
                        showIcon
                      />
                    )}
                  </div>
                  <div>
                    <label htmlFor="lname">Amount</label>
                    <Input
                      type="number"
                      name="amount"
                      value={values.amount}
                      // placeholder={'Enter amount'}
                      onChange={handleChange}
                      size="large"
                      onBlur={handleBlur}
                      className="mb-3"
                    />
                    {errors.amount && touched.amount && (
                      <Alert
                        message={errors.amount}
                        closable
                        type="error"
                        showIcon
                      />
                    )}
                  </div>
                  <div>
                    <Upload
                      onRemove={remove}
                      beforeUpload={beforeUpload}
                      fileList={fileList}
                      listType="picture-card"
                    >
                      <div className="flex items-center justify-center flex-col">
                        <FiPlus />
                        <div style={{ marginTop: 8 }}>
                          {uploading ? <Spin /> : null}
                        </div>
                      </div>
                    </Upload>
                    {/* <Button
                      id="hidden"
                      disabled={image.length < 1 || uploading}
                      onClick={() => btnRef.current.click()}
                    >
                      upload
                    </Button> */}
                  </div>
                </div>

                <div className="w-full">
                  <button
                    type="submit"
                    className="bg-[#feb517] w-full text-center py-2 rounded-md font-bold uppercase border-none"
                  >
                    {init.title ? 'Update Product' : 'Create Product'}
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

export default CreateForm;
