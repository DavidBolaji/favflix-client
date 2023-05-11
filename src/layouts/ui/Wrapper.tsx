import React from 'react';

const Wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <div className="px-5 md:px-150 w-full">{children}</div>;
};

export default Wrapper;
