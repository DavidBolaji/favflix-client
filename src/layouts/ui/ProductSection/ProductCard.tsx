import { Button, Rate } from 'antd';
import React, { useState } from 'react';
interface Iproduct {
  title: string;
  amount: number;
  img: string;
}
const ProductCard: React.FC<Iproduct> = ({ title, amount, img }) => {
  const [value, setValue] = useState(3);
  //set
  return (
    <div className=" h-[300px]">
      <div className="h-1/2 overflow-hidden rounded-md shadow">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="mt-4">
        <h4 className="font-bold ">{title}</h4>
        {/* <Rate onChange={setValue} value={value} /> */}
        <div className="flex items-center justify-between mt-4">
          <h4 className="font-bold ">
            {new Intl.NumberFormat('en-NG', {
              style: 'currency',
              currency: 'NGN',
            }).format(amount)}
          </h4>
          <Button>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
