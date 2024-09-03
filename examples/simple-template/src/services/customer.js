import { request } from 'easy-soft-utility';

export const getCurrentInfoDataApiAddress =
  '/wechatApplication/customerCenter/customer/getCurrentInfo';

export async function getCurrentInfoData(parameters) {
  return request({
    api: getCurrentInfoDataApiAddress,
    params: parameters,
  });
}

export const getCustomerDataApiAddress =
  '/wechatApplication/customerCenter/customer/getCustomer';

export async function getCustomerData(parameters) {
  return request({
    api: getCustomerDataApiAddress,
    params: parameters,
  });
}
