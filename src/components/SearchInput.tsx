import { Button, Input, Space } from 'antd';
import React, { SyntheticEvent } from 'react';
import { FiSearch } from 'react-icons/fi';

interface Isearch {
  placeholder: string;
  onClick: (e: SyntheticEvent) => void;
  btnText: string;
}

const SearchInput: React.FC<Isearch> = ({
  placeholder,
  onClick,
  btnText,
  ...rest
}) => {
  return (
    <Space>
      <Input
        prefix={<FiSearch />}
        placeholder={placeholder}
        {...rest}
        // className="border-2 border-[#aaaaaa]"
      />
      <Button
        onClick={onClick}
        className="bg-[#feb517]  font-bold uppercase border-none"
      >
        {btnText}
      </Button>
    </Space>
  );
};

export default SearchInput;
