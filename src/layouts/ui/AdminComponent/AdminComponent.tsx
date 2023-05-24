import { Grid, Menu, MenuProps } from 'antd';
import React, { useState } from 'react';
import CreateProduct from './pages/CreateProduct';
import ViewProduct from './pages/ViewProduct';
import OrderProduct from './pages/OrderProduct';
import { useNavigate } from 'react-router-dom';
import { Icreate } from './pages/form/CreateForm';

const { useBreakpoint } = Grid;

const start = {
  title: '',
  amount: 0,
  img: '',
};

const AdminComponent: React.FC<{ admin: boolean }> = ({ admin }) => {
  const [page, setPage] = useState<'create' | 'view' | 'order'>('order');
  const [init, setInit] = useState<Icreate>(start);
  const [, setCount] = useState(1);
  const navigate = useNavigate();
  const screen = useBreakpoint();

  const items: MenuProps['items'] = [
    {
      label: 'Order',
      key: 'order',
    },
    admin
      ? {
          label: 'Product',
          key: 'sub',
          children: [
            {
              label: 'Create',
              key: 'create',
            },
            {
              label: 'View',
              key: 'view',
            },
          ],
        }
      : null,

    {
      label: 'Home',
      key: 'home',
    },
  ];

  const onClick: MenuProps['onClick'] = (e: any) => {
    if (e.key === 'home') return navigate('/');
    if (e.key === 'create') {
      setCount((prev) => prev + 1);

      setInit({ ...start });
    }
    setPage(e.key);
  };
  const onClick2 = (el: Icreate) => {
    setPage('create');

    setInit({ ...el });
  };

  const onClick3 = () => {
    setPage('view');

    setInit({ ...start });
    setCount((prev) => prev + 1);
  };

  return (
    <div className="grid grid-cols-12 gap-3 w-full">
      <div className="md:col-span-2 md:min-h-[70vh] col-span-12 shadows p-3">
        <Menu
          onClick={onClick}
          defaultValue={'order'}
          mode={screen.md ? 'inline' : 'horizontal'}
          items={[...items]}
        />
      </div>
      <div className="md:col-span-10 col-span-12 md:min-h-[70vh]">
        {page === 'order' && <OrderProduct />}
        {page === 'create' && (
          <CreateProduct init={{ ...init }} onSuccess={onClick3} />
        )}
        {page === 'view' && <ViewProduct change={onClick2} />}
      </div>
    </div>
  );
};

export default AdminComponent;
