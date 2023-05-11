import React from 'react';
import { images } from '../../../constants/image';
import ProductCard from './ProductCard';

const datas = [
  {
    id: '1',
    title: 'Title',
    amount: 1000,
    img: images.Tomatoes,
  },
  {
    id: '2',
    title: 'Title',
    amount: 12700,
    img: images.Fish,
  },
  {
    id: '3',
    title: 'Title',
    amount: 199900,
    img: images.Ewedu,
  },
  {
    id: '4',
    title: 'Title',
    amount: 1084630,
    img: images.Pepper,
  },
];

const ProductSection: React.FC = () => {
  const productList = datas.map((data) => {
    return (
      <ProductCard
        title={data.title}
        amount={data.amount}
        key={data.id}
        img={data.img}
      />
    );
  });
  return (
    <section className="w-full">
      <h3 className="font-bold text-2xl">PRODUCTS</h3>
      <div className="grid md:grid-cols-4 md:gap-10">{productList}</div>
    </section>
  );
};

export default ProductSection;
