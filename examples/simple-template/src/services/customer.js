import { request } from 'easy-soft-utility';

export const getCurrentInfoDataApiAddress =
  '/wechatApplication/user/getCurrentInfo';

export async function getCurrentInfoData(parameters) {
  return request({
    api: getCurrentInfoDataApiAddress,
    params: parameters,
  });
}

export const setAvatarDataApiAddress = '/wechatApplication/user/setAvatar';

export async function setAvatarData(parameters) {
  return request({
    api: setAvatarDataApiAddress,
    params: parameters,
  });
}

export const setGenderDataApiAddress = '/wechatApplication/user/setGender';

export async function setGenderData(parameters) {
  return request({
    api: setGenderDataApiAddress,
    params: parameters,
  });
}

export const setBirthdayDataApiAddress = '/wechatApplication/user/setBirthday';

export async function setBirthdayData(parameters) {
  return request({
    api: setBirthdayDataApiAddress,
    params: parameters,
  });
}

export const setAddressDataApiAddress = '/wechatApplication/user/setAddress';

export async function setAddressData(parameters) {
  return request({
    api: setAddressDataApiAddress,
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

export const uploadImageDataApiAddress = '/wechatApplication/user/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}
