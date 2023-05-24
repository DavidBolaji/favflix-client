import { Drawer, Empty } from 'antd';
import React from 'react';
import { CartCard } from './CartCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface IcartDrawer {
  open: boolean;
  onClose: () => void;
  placement?: string;
}

export const CartDrawer: React.FC<IcartDrawer> = ({ open, onClose }) => {
  // const dispatch = useDispatch();
  // const cartNav = useSelector((state) => state.cartNav.cartNav);
  const cart = useSelector((state: any) => state.cart.cartItems);
  const user = useSelector((state: any) => state.user.user);
  // const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const total = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(
    cart.reduce((acc: number, cur: any) => {
      return acc + cur.amount * cur.qty;
    }, 0)
  );

  const handleCheckout = (amount: string) => {
    if (typeof user.fname === 'undefined') {
      navigate({
        pathname: `/login`,
        search: `?redirect=checkout&amount=${amount}`,
      });
      onClose();
    } else {
      navigate({
        pathname: `/checkout`,
        search: `?amount=${amount}`,
      });
      onClose();
    }
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        placement={'left'}
        title="CART"
        contentWrapperStyle={{
          backgroundColor: 'white',
        }}
        // style={{ width: 400, maxWidth: 400, height: '100vh' }}
        footer={[
          cart?.length > 0 && (
            <div
              key={'jesv'}
              className="px-4 mb-3 flex items-center justify-between"
            >
              <div>TOTAL</div>
              <div>{total}</div>
            </div>
          ),
          cart.length > 0 && (
            <div key={1} className="px-4">
              <button
                type="button"
                onClick={() => handleCheckout(total)}
                className="mx-auto flex text-white items-center justify-center w-full bg-[#cb104a] h-10"
              >
                CHECKOUT
              </button>
            </div>
          ),
        ]}
      >
        {cart.length < 1 && (
          <div className="flex items-center justify-center">
            <Empty
              description={false}
              image={
                'https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png'
              }
              //   imageStyle={{ width: 200 }}
            />
          </div>
        )}
        <div className="max-h-[300px] overscroll-auto">
          {cart.map((item: any) => {
            return <CartCard key={item._id} item={item} checkout={true} />;
          })}
        </div>
      </Drawer>
    </>
  );
};
