import { Alert, Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteProduct, getProducts } from '../../../../actions/productAction';
import { FiDelete, FiEdit } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';
import { Icreate } from './form/CreateForm';
import { toast } from 'react-toastify';

interface IView {
  change: (el: Icreate) => void;
}

const ViewProduct: React.FC<IView> = ({ change }) => {
  const prodList = useSelector((state: any) => state.productList);
  // const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const { loading, error, products } = prodList;

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (_text: string, _record: any, index: number) => index + 1,
    },
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      className: 'px-4 py-2',
      render: (_text: string, _record: any) => (
        <img width={70} src={_record.img} alt={_record.title} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      className: 'px-4 py-2',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      className: 'px-4 py-2',
    },

    {
      title: 'Action',
      key: 'action',
      // responsive: ["md"],
      render: (_: any, _record: any) => (
        <Space size="middle">
          <Tooltip title="edit">
            <Button
              size="small"
              onClick={() => change(_record)}
              className="bg-blue-600 text-white"
            >
              <FiEdit />
            </Button>
          </Tooltip>
          <Tooltip title="delete">
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this product?"
              className=""
              onConfirm={() =>
                dispatch(
                  deleteProduct(_record._id, (cb, res) => {
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
                  })
                )
              }
              okButtonProps={{
                className: 'bg-[#fdc729]',
              }}
              onCancel={() => console.log('cancel')}
              cancelText="No"
              okText="Yes"
            >
              {/* <Button type="link">Delete</Button> */}
              <Button
                size="small"
                className="bg-red-700 text-white"
                // onClick={() => navigate(`edit_user/${record._id}`)}
              >
                <FiDelete />
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  //   const pagination = {
  //     current: currentPage,
  //     pageSize: pageSize,
  //     total: total,
  //     showSizeChanger: true,
  //     pageSizeOptions: ["10", "20", "30", "40", "50", "200"],
  //   };

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
        dataSource={products}
        loading={loading}
        rowKey={'_id'}
        size="small"
      />
    </>
  );
};

export default ViewProduct;
