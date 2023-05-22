import React from 'react';
import CreateForm, { Icreate } from './form/CreateForm';

interface IcreateProduct {
  init: Icreate;
  onSuccess: () => void;
}

const CreateProduct: React.FC<IcreateProduct> = ({ init, onSuccess }) => {
  return (
    <div>
      <CreateForm init={init} onSuccess={onSuccess} />
    </div>
  );
};

export default CreateProduct;
