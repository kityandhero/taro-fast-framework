import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/wechatApplication/notice/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/wechatApplication/notice/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}
