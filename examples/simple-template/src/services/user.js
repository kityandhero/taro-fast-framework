import { request } from 'easy-soft-utility';

export const getCurrentInfoDataApiAddress =
  '/wechatApplication/user/getCurrentInfo';

export async function getCurrentInfoData(parameters) {
  return request({
    api: getCurrentInfoDataApiAddress,
    params: parameters,
  });
}
