import { request } from 'easy-soft-utility';

export const singleListDataApiAddress =
  '/wechatApplication/subsidiary/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/wechatApplication/subsidiary/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}
