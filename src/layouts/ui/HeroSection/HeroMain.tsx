import React from 'react';
import { images } from '../../../constants/image';
import { Carousel } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { SyncOutlined } from '@ant-design/icons';

// const antIcon = <SyncOutlined spin />;

const HeroMain: React.FC = () => {
  return (
    <section className="grid grid-cols-4 grid-rows-4 gap-3 md:h-[375px] mt-[12vh] md:mt-32 mb-9">
      <div className="bg-[#920d36] md:col-start-1 md:col-end-2 col-span-2 row-span-2 rounded-md p-1">
        <LazyLoadImage
          src={images.card1}
          className="w-full h-full mx-auto object-contain"
        />
      </div>
      <div className="col-start-1 md:col-start-2 col-end-5 row-span-6 row-start-1 row-end-3 rounded-md md:h-[375px] overflow-hidden">
        <Carousel autoplay autoplaySpeed={8000} dotPosition="bottom">
          <div className="">
            <LazyLoadImage
              src={images.Banner1}
              className="w-full h-full object-fit"
            />
          </div>
          <div>
            <LazyLoadImage
              src={images.Banner2}
              className="w-full h-full object-fit"
            />
          </div>
        </Carousel>
      </div>
      <div className="bg-[#920d36] md:col-start-1 md:col-end-2 col-span-2 row-span-2 rounded-md p-1">
        <img src={images.card2} className="w-full h-full object-cover" />
      </div>
    </section>
  );
};

export default HeroMain;
