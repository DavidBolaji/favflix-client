import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  createOrders,
  getOrders,
  getUsersOrders,
} from '../../../../actions/orderAction';
import { Tag, Space, Table, Badge, Switch, Alert } from 'antd';
import { FiClock } from 'react-icons/fi';
import { SyncOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const OrderProduct: React.FC = () => {
  const user = useSelector((state: any) => state.user.user);
  const orderList = useSelector((state: any) => state.orderz);
  const { loading, orders, error } = orderList;
  const dispatch: Dispatch<any> = useDispatch();

  const stat: any = {
    waiting: 'error',
    processing: 'processing',
    verified: 'success',
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',

      render: (_text: string, _record: any, index: number) => index + 1,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'address',
      className: 'px-4 py-2',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      className: 'px-4 py-2',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      className: 'px-4 py-2',
    },
    {
      title: 'Products',
      dataIndex: 'product',
      key: 'product',
      className: 'px-4 py-2',
      render: (_text: string, _record: any) => (
        <Space direction="vertical">
          {_record.product.map((product: any) => {
            return (
              <Tag key={product._id} color="gold">
                {product.title} * {product.qty} = {product.amount * product.qty}
              </Tag>
            );
          })}
        </Space>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'paid',
      key: 'paid',
      className: 'px-4 py-2',
      render: (_text: string, _record: any) => (
        <Badge
          status={_record.paid ? 'success' : 'processing'}
          text={_record.paid ? 'success' : 'processing'}
        />
      ),
    },

    {
      title: 'Delivered',
      dataIndex: 'delivered',
      key: 'delivered',
      className: 'px-4 py-2',
      render: (_text: string, _record: any) => {
        // console.log(_record._id);
        return user.isAdmin ? (
          <Switch
            checked={_record.delivered}
            onChange={() =>
              dispatch(
                createOrders(
                  {
                    ..._record,
                    status: !_record.delivered ? 'verified' : 'waiting',
                    delivered: !_record.delivered,
                  },
                  (cb: string, res: 'error' | 'success') => {
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
              )
            }
          />
        ) : (
          <Badge
            text={_record.delivered ? 'success' : 'processing'}
            status={_record.delivered ? 'success' : 'processing'}
          />
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'px-4 py-2',
      render: (_text: string, _record: any) => (
        <Tag
          className="flex items-center gap-1"
          icon={
            stat[_record.status] === 'error' ? (
              <FiClock />
            ) : stat[_record.status] !== 'success' ? (
              <SyncOutlined spin />
            ) : (
              <FiClock />
            )
          }
          color={stat[_record.status]}
        >
          {stat[_record.status] === 'error'
            ? 'waiting'
            : stat[_record.status] !== 'success'
            ? stat[_record.status]
            : 'verified'}
        </Tag>
      ),
    },
    {
      title: 'Total Cost',
      dataIndex: 'price',
      key: 'price',

      className: 'px-4 py-2 fixed-width',
      render: (_text: string, _record: any) => {
        return (
          <Tag className="flex items-center gap-1">
            ₦ {_record.price.toFixed(2)}
          </Tag>
        );
      },
    },
  ];

  useEffect(() => {
    if (user.isAdmin) {
      dispatch(getOrders());
    } else {
      dispatch(getUsersOrders({ user: user._id }));
    }
  }, []);

  return (
    <>
      {error && (
        <Alert
          message="Error"
          type="error"
          closable
          showIcon
          description={error}
        />
      )}
      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        rowKey={'_id'}
        scroll={{ x: 1200 }}
        size="small"
      />
    </>
  );
};

export default OrderProduct;
