import React, { useEffect } from 'react';
import ResetSection from '../layouts/ui/ResetPassword/ResetSection';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { tokenValid } from '../actions/userActions';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';

const Reset: React.FC = () => {
  const { token } = useParams();
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      tokenValid(token!, (cb, res) => {
        if (res === 'success') {
          // return message.success(cb);
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
          // return navigate('/');
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
        return navigate('/login');
      })
    );
  }, []);

  return (
    <section>
      <ResetSection token={token!} />
    </section>
  );
};

export default Reset;
