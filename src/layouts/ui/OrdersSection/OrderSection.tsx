// import OrderCard from './OrdersCard/OrderCard';
import { Tabs } from 'antd';

import React from 'react';
import { useSelector } from 'react-redux';
import AdminComponent from '../AdminComponent/AdminComponent';

const OrderSection: React.FC = () => {
  const user = useSelector((state: any) => state.user.user);

  const items = [
    {
      label: `${user.isAdmin ? 'Admin' : 'User'}`,
      key: 'Admin',
      children: <AdminComponent admin={user.isAdmin} />,
    },
  ];

  return (
    <section className="w-full min-h-[90vh] mt-20 px-4">
      <div className="col-span-12">
        <Tabs
          className="s w-full"
          defaultActiveKey="1"
          type="card"
          size={'small'}
          items={items}
        />
      </div>
      <div>{/* <OrderCard /> */}</div>
      {/* <div className="col-span-4">Checkout Card</div> */}
    </section>
  );
};

export default OrderSection;
