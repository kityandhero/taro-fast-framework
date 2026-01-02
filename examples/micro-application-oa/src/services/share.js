import { request } from 'easy-soft-utility';

export const createShareUrlParametersDataApiAddress =
  '/wechatApplication/share/createShareUrlParams';

export async function createShareUrlParametersData(parameters) {
  return request({
    api: createShareUrlParametersDataApiAddress,
    params: parameters,
  });
}

export const exchangeShareDataApiAddress =
  '/wechatApplication/share/exchangeShare';

export async function exchangeShareData(parameters) {
  return request({
    api: exchangeShareDataApiAddress,
    params: parameters,
  });
}
