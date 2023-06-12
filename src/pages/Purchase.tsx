import React from 'react';
import PurchaseComponent from '../layouts/ui/PurchaseComponent/PurchaseComponent';
import { Alert } from 'antd';

const Purchase: React.FC = () => {
  return (
    <div className="mt-20">
      <Alert
        message="All orders after 4pm will be delivered next day"
        type="warning"
        showIcon
        className="mb-5"
        closable
      />
      <Alert
        message="Delivery is done 3 hours after payment is confirmed"
        type="warning"
        showIcon
        closable
      />
      <PurchaseComponent />
    </div>
  );
};

export default Purchase;
