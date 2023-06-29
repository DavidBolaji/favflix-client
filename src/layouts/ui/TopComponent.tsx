import { Space } from 'antd';
import React from 'react';
import { FiMail, FiPhone } from 'react-icons/fi';

const TopComponent: React.FC = () => {
  return (
    <div className="px-5 flex items-center justify-between fixed z-[50] top-0 py-5  w-full bg-white shadow h-[3vh]">
      <h3 className="font uppercase md:text-xl text-[10px] md:w-auto w-32 mt-2 md:mt-0 ">
        Fleeck grocery store
      </h3>
      <div className="flex item-center">
        <Space
          className="md:mr-5 mr-2 cursor-pointer"
          onClick={() => window.open('tel:09036114805')}
        >
          <FiPhone size={10} className="md:mt-1 mt-2" />
          <span className="md:text-sm text-[10px]">09036114805</span>
        </Space>
        <Space
          onClick={() =>
            window.open('mailto:favfleeksexquisite@gmail.com', '_blank')
          }
          className="cursor-pointer"
        >
          <FiMail size={10} className="md:mt-1 mt-2" />
          <span className="md:text-sm text-[10px]">
            favfleeksexquisite@gmail.com
          </span>
        </Space>
      </div>
    </div>
  );
};

export default TopComponent;
