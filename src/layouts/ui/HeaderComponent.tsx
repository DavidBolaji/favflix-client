import { Col, Drawer, Grid, Menu, Row, Space } from 'antd';
import type { MenuProps } from 'antd';
import { FiLogIn, FiMenu } from 'react-icons/fi';
import Wrapper from './Wrapper';
import CartComponent from '../../components/CartComponent';
import SearchInput from '../../components/SearchInput';
import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    label: 'Cart',
    key: 'cart',
    icon: <CartComponent count={1} />,
  },
  {
    label: 'Login',
    key: 'login',
    icon: <FiLogIn />,
  },
];

const styles = {
  className: 'border-2 border-[#aaaaaa]  hover:border-2 hover:border-[#aaaaaa]',
};
const { useBreakpoint } = Grid;

const HeaderComponent: React.FC = () => {
  const screen = useBreakpoint();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'login') {
      navigate('/login');
    }

    console.log(e.key);
  };
  const handleClick = (e: SyntheticEvent) => {
    console.log(e);
  };
  return (
    <nav className="fixed h-10 md:h-16 flex items-center top-0 z-40 bg-white shadow w-full">
      <Wrapper>
        <Row className="w-full flex items-center">
          <Col span={6} className="flex items-center">
            <Space className="w-full">
              <span>Logo</span>
              {screen.md && (
                <SearchInput
                  placeholder="Search food items"
                  onClick={handleClick}
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
                items={items}
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
          />
        </Row>
      </Wrapper>
    </nav>
  );
};

export default HeaderComponent;

interface Idrawer {
  open: boolean;
  setOpen: () => void;
}

const RenderDrawer: React.FC<Idrawer> = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'login') {
      navigate('/login');
    }

    console.log(e.key);
  };
  const handleClick = (e: SyntheticEvent) => {
    console.log(e);
  };

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
            onClick={handleClick}
            btnText="Search"
            {...styles}
          />
        </Space>
      }
    >
      <Menu
        onClick={onClick}
        // selectedKeys={[current]}
        mode="vertical"
        items={items}
      />
    </Drawer>
  );
};
