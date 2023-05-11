import { Badge, Grid } from 'antd';
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

interface IcartComponent {
  count: number;
}

const { useBreakpoint } = Grid;

const CartComponent: React.FC<IcartComponent> = ({ count }) => {
  const screen = useBreakpoint();
  return screen.md ? (
    <div className="relative bg-orange-400">
      <div className="absolute right-10 top-3.5">
        <FiShoppingCart size={22} />
      </div>
      <div className="absolute right-8 -top-3">
        <Badge count={count} size="small" />
      </div>
    </div>
  ) : (
    <div className="inline-block ">
      {/* //   <div className="absolute right-10 top-3.5"> */}
      <FiShoppingCart size={18} className={'mr-2 pt-1'} />
      {/* // </div> */}
      <div className="absolute left-6 -top-3">
        <Badge count={count} size="small" />
      </div>{' '}
    </div>
  );
};

export default CartComponent;
