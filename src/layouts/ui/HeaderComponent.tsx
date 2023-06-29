import { Avatar, Col, Drawer, Grid, Menu, Row, Space } from 'antd';
import type { MenuProps } from 'antd';
import { FiBriefcase, FiLogIn, FiMenu } from 'react-icons/fi';
import Wrapper from './Wrapper';
import CartComponent from '../../components/CartComponent';
import SearchInput from '../../components/SearchInput';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { images } from '../../constants/image';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
import { signout } from '../../actions/userActions';
import { CartDrawer } from '../../components/CartDrawer';

const items: MenuProps['items'] = [
  {
    label: 'Cart',
    key: 'cart',
    icon: <CartComponent />,
  },
];

const styles = {
  className: 'border-2 border-[#aaaaaa]  hover:border-2 hover:border-[#aaaaaa]',
};
const { useBreakpoint } = Grid;

const HeaderComponent: React.FC = () => {
  const user: any = useSelector<any>((state) => state?.user?.user);

  const screen = useBreakpoint();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [open, setOpen2] = useState(false);

  const dispatch: Dispatch<any> = useDispatch();

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'login') {
      return navigate('/login');
    }

    if (e.key === 'orders') {
      return navigate('/orders');
    }

    if (e.key === 'cart') {
      setOpen(false);
      return setOpen2((prev) => !prev);
    }

    dispatch(
      signout((cb, res) => {
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
          isOpen ? setOpen(false) : null;
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
  };
  // const handleClick = (e: SyntheticEvent) => {};
  return (
    <>
      <nav className="fixed h-10 md:h-16 flex items-center top-10 bg-white shadow w-full z-50">
        <Wrapper>
          <Row className="w-full flex items-center">
            <Col span={6} className="flex items-center">
              <Space className="w-full">
                <span onClick={() => navigate('/')} className="cursor-pointer">
                  <img
                    src={images.Logo}
                    className="md:w-16 w-10"
                    alt="logo-favfleeks"
                  />
                </span>
                {screen.md && (
                  <SearchInput
                    placeholder="Search food items"
                    onClick={() => console.log('search')}
                    btnText="Search"
                    {...styles}
                  />
                )}
              </Space>
            </Col>
            {screen.md ? (
              <Col
                span={6}
                className="flex w-full h-auto py-auto justify-end ml-auto"
              >
                <Menu
                  onClick={onClick}
                  // selectedKeys={[current]}
                  mode="horizontal"
                  items={[
                    ...items,
                    typeof user.fname === 'undefined'
                      ? {
                          label: 'Login',
                          key: 'login',
                          icon: <FiLogIn />,
                        }
                      : {
                          label: '',
                          key: 'subMenu',
                          icon: (
                            <Avatar
                              className="mt-2"
                              src="https://www.asiamediajournal.com/wp-content/uploads/2022/11/Default-PFP-profile-287x300.png"
                            />
                          ),
                          children: [
                            {
                              label: 'Orders',
                              key: 'orders',
                              icon: <FiBriefcase />,
                            },
                            {
                              label: 'Logout',
                              key: 'logout',
                              icon: <FiLogIn />,
                            },
                          ],
                        },
                  ]}
                />
              </Col>
            ) : (
              <Col
                span={6}
                className="cursor-pointer flex w-full h-auto py-auto justify-end ml-auto"
              >
                <FiMenu onClick={() => setOpen(true)} />
              </Col>
            )}
            <RenderDrawer
              open={isOpen}
              setOpen={() => setOpen((prev) => !prev)}
              user={user}
            />
          </Row>
        </Wrapper>
        <CartDrawer
          open={open}
          placement="left"
          onClose={() => setOpen2(false)}
        />
      </nav>
    </>
  );
};

export default HeaderComponent;

interface Idrawer {
  open: boolean;
  user: any;
  setOpen: () => void;
}

const RenderDrawer: React.FC<Idrawer> = ({ open, setOpen, user }) => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const [ope, setOpen2] = useState(false);

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'login') {
      return navigate('/login');
    }

    if (e.key === 'orders') {
      setOpen();
      return navigate('/orders');
    }

    if (e.key === 'cart') {
      setOpen();
      return setOpen2((prev) => !prev);
    }

    dispatch(
      signout((cb, res) => {
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
          open ? setOpen() : null;
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
  };
  // const handleClick = (e: SyntheticEvent) => {};

  return (
    <Drawer
      placement={'top'}
      // width={500}
      height={250}
      onClose={() => setOpen()}
      open={open}
      extra={
        <Space>
          <SearchInput
            placeholder="Search food items"
            onClick={() => console.log('first')}
            btnText="Search"
            {...styles}
          />
        </Space>
      }
    >
      <Menu
        onClick={onClick}
        // selectedKeys={[current]}
        mode="inline"
        items={[
          ...items,
          typeof user.fname === 'undefined'
            ? {
                label: 'Login',
                key: 'login',
                icon: <FiLogIn />,
              }
            : {
                label: '',
                key: 'SubMenu',
                icon: (
                  <Avatar
                    className="mt-2"
                    src="https://www.asiamediajournal.com/wp-content/uploads/2022/11/Default-PFP-profile-287x300.png"
                  />
                ),
                children: [
                  {
                    label: 'Orders',
                    key: 'orders',
                    icon: <FiBriefcase />,
                  },
                  {
                    label: 'Logout',
                    key: 'logout',
                    icon: <FiLogIn />,
                  },
                ],
              },
        ]}
      />
      {/* <div className="absolute h-screen bg-black"> */}
      <CartDrawer open={ope} placement="left" onClose={() => setOpen2(false)} />
      {/* </div> */}
    </Drawer>
  );
};
