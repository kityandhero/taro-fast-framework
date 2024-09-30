import { request } from 'easy-soft-utility';

export const getCurrentInfoDataApiAddress =
  '/wechatApplication/user/getCurrentInfo';

export async function getCurrentInfoData(parameters) {
  return request({
    api: getCurrentInfoDataApiAddress,
    params: parameters,
  });
}

export const changePasswordDataApiAddress =
  '/wechatApplication/user/changePassword';

export async function changePasswordData(parameters) {
  return request({
    api: changePasswordDataApiAddress,
    params: parameters,
  });
}
