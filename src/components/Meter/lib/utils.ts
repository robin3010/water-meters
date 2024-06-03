import { METER_TYPE } from 'consts/consts';
import { IMeter, IMeterArea } from 'store/types/types';

export const prepareData = (data: IMeter) => {
  const { initial_values, installation_date, _type } = data;

  const value = initial_values[0];
  const date = new Date(installation_date).toLocaleDateString();
  const type = METER_TYPE[_type[0] as keyof typeof METER_TYPE];

  return {
    ...data,
    initial_values: value,
    installation_date: date,
    _type: type,
  };
};

export const formatAddress = (area: IMeterArea) => {
  const {
    house: { address },
    str_number_full,
  } = area;
  const formatted = `${address}, ${str_number_full}`;

  return formatted;
};

export const getFullAddressStr = (areas: IMeterArea[], meterId: string) => {
  const address = areas.find((area) => area.id === meterId);

  if (address !== undefined) return formatAddress(address);
  return '';
};
