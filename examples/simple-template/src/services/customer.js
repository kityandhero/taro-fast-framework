import { request } from 'easy-soft-utility';

export const getCurrentInfoDataApiAddress =
  '/wechatApplication/customer/getCurrentInfo';

export async function getCurrentInfoData(parameters) {
  return request({
    api: getCurrentInfoDataApiAddress,
    params: parameters,
  });
}

export const setAvatarDataApiAddress = '/wechatApplication/customer/setAvatar';

export async function setAvatarData(parameters) {
  return request({
    api: setAvatarDataApiAddress,
    params: parameters,
  });
}

export const setGenderDataApiAddress = '/wechatApplication/customer/setGender';

export async function setGenderData(parameters) {
  return request({
    api: setGenderDataApiAddress,
    params: parameters,
  });
}

export const uploadImageDataApiAddress =
  '/wechatApplication/customer/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}
