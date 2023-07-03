import { Button } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { addToCart } from '../../../actions/cartActions';
import { toast } from 'react-toastify';
import { LazyLoadImage } from 'react-lazy-load-image-component';
interface Iproduct {
  id: string;
  title: string;
  amount: number;
  img: string;
}
const ProductCard: React.FC<Iproduct> = ({ title, amount, img, id }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const handleClick = () => {
    dispatch(addToCart({ _id: id, title, amount, qty: 1, img }));
    toast.success('Item added to cart', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      className: 'bg-[#cb104a]',
    });
  };
  //set
  return (
    <div className=" h-[300px]">
      <div className="h-1/2 overflow-hidden rounded-md shadow">
        <LazyLoadImage
          alt={title}
          style={{
            objectFit: 'contain',
            height: 150,
            width: '100%',
            transform: 'scale(0.9)',
          }}
          // effect="blur"
          src={img} // use normal <img> attributes as props
          // width={200}
        />
        {/* <img
        //   src={img}
        //   alt={title}
        //   className="w-full h-full object-scale-down"
         /> */}
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
          <Button onClick={handleClick}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
