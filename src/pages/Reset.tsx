import React from 'react';
import ResetSection from '../layouts/ui/ResetPassword/ResetSection';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { tokenValid } from '../actions/userActions';
// import { Dispatch } from 'redux';
// import { toast } from 'react-toastify';

const Reset: React.FC = () => {
  // const { id } = useParams();
  // const dispatch: Dispatch<any> = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(
  //     tokenValid(id!, (_cb, res) => {
  //       if (res === 'success') {
  //         // return message.success(cb);
  //         console.log('valid');
  //         // return navigate('/');
  //       }

  //       console.log('invalid');
  //       // return navigate('/login');
  //     })
  //   );
  // }, []);

  return (
    <section>
      <ResetSection />
    </section>
  );
};

export default Reset;
