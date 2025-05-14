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

export const refreshVerifyPhoneCaptchaDataApiAddress =
  '/wechatApplication/customer/refreshVerifyPhoneCaptcha';

export async function refreshVerifyPhoneCaptchaData(parameters) {
  return request({
    api: refreshVerifyPhoneCaptchaDataApiAddress,
    params: parameters,
  });
}

export const sendVerifyPhoneMessageDataApiAddress =
  '/wechatApplication/customer/sendVerifyPhoneMessage';

export async function sendVerifyPhoneMessageData(parameters) {
  return request({
    api: sendVerifyPhoneMessageDataApiAddress,
    params: parameters,
  });
}

export const verifyPhoneDataApiAddress =
  '/wechatApplication/customer/verifyPhone';

export async function verifyPhoneData(parameters) {
  return request({
    api: verifyPhoneDataApiAddress,
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
