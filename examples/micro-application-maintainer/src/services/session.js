import { request } from 'easy-soft-utility';

export const refreshSessionDataApiAddress =
  '/wechatApplication/session/refreshSession';

export async function refreshSessionData(parameters) {
  return request({
    api: refreshSessionDataApiAddress,
    params: parameters,
  });
}

export const exchangePhoneDataApiAddress =
  '/wechatApplication/session/exchangePhone';

export async function exchangePhoneData(parameters) {
  return request({
    api: exchangePhoneDataApiAddress,
    params: parameters,
  });
}
