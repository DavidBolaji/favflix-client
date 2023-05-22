import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../actions/productAction';
import { Dispatch } from 'redux';
import { Alert, Spin } from 'antd';

interface Product {
  _id: string;
  uId: string;
  title: string;
  amount: number;
  img: string;
}

const ProductSection: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const prodList = useSelector((state: any) => state.productList);
  const { loading, error, products } = prodList;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section className="w-full">
      <h3 className="font-bold text-2xl">PRODUCTS</h3>
      <div className="grid md:grid-cols-4 md:gap-10">
        {loading && (
          <div className="flex w-full items-center justify-center">
            <Spin />
          </div>
        )}
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            closable
          />
        )}
        {!loading &&
          products.map((data: Product) => {
            return (
              <ProductCard
                id={data._id}
                title={data.title}
                amount={data.amount}
                key={data._id}
                img={data.img}
              />
            );
          })}
      </div>
    </section>
  );
};

export default ProductSection;
