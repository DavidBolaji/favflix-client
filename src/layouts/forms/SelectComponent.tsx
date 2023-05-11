import { Radio, Select } from 'antd';
import React from 'react';
const { Option } = Select;
interface Iselect {
  data: string[];
  placeholder: string;
}

export const SelectComponent: React.FC<Iselect> = ({
  placeholder,
  data,
  ...rest
}) => {
  return (
    <Select placeholder={placeholder} {...rest} allowClear>
      {data.map((data: any) => {
        return <Option value={data}>{data}</Option>;
      })}
    </Select>
  );
};

export const RadioComponent: React.FC<Iselect> = ({
  placeholder,
  data,
  ...rest
}) => {
  return (
    <Radio.Group {...rest}>
      {data.map((data: any) => {
        return <Radio value={data}>{data}</Radio>;
      })}
    </Radio.Group>
  );
};
