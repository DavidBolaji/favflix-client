import { Badge, Button, Tooltip } from 'antd';
import React from 'react';
import { FiMinus, FiPlus, FiTrash } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import {
  addToCart,
  deleteFromCart,
  removeFromCart,
} from '../actions/cartActions';

interface Icard {
  item: any;
  checkout: boolean;
}

export const CartCard: React.FC<Icard> = ({ item, checkout = true }) => {
  const dispatch: Dispatch<any> = useDispatch();
  return (
    <div className="group relative shadow border  mb-2 bg-white z-30 ">
      <Badge.Ribbon
        placement={`${!checkout ? 'end' : 'start'}`}
        text={`${new Intl.NumberFormat('en-NG', {
          style: 'currency',
          currency: 'NGN',
        }).format(item.amount)} * ${item.qty}`}
        color="magenta"
      >
        <div className="flex">
          <img
            src={item.img}
            alt={`${item.title}`}
            // width={'80px'}
            className={`${!checkout ? 'w-1/4' : 'w-2/4'} h-full object-cover`}
          />

          <div className="p-1 flex w-full justify-end">
            <div className="flex flex-col">
              <div className="ml-auto">
                <div className="flex mb-3">
                  <p className="text-[12px] mt-1 mr-1">
                    <Tooltip
                      title="Remove item from Cart"
                      className="cursor-pointer bg-white p-1 rounded-md"
                    >
                      <FiTrash
                        color="red"
                        onClick={() =>
                          dispatch(deleteFromCart({ _id: item._id }))
                        }
                        className="text-white"
                        size={20}
                      />
                    </Tooltip>
                  </p>
                </div>
              </div>
              {checkout && (
                <div className="mt-auto">
                  <Button
                    size="small"
                    onClick={() =>
                      dispatch(removeFromCart({ ...item, qty: 1 }))
                    }
                  >
                    <FiMinus />
                  </Button>
                  <span className="mx-2">{item.qty}</span>
                  <Button
                    size="small"
                    onClick={() => dispatch(addToCart({ ...item, qty: 1 }))}
                  >
                    <FiPlus />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Badge.Ribbon>
      {/* <img
          class="w-full object-cover"
          src="https://www.kindacode.com/wp-content/uploads/2022/06/t-shirt-example.png"
        /> */}
      {/* <div className=" absolute top-0 left-0 w-full h-0 flex flex-row justify-center items-center bg-[#27272766] opacity-0 group-hover:h-full group-hover:opacity-100 duration-500"></div> */}
    </div>
  );
};
