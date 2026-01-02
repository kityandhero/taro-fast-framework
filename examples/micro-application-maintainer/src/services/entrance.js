import { request } from 'easy-soft-utility';

export const signInDataApiAddress = '/wechatApplication/entrance/signIn';

export async function signInData(parameters) {
  return request({
    api: signInDataApiAddress,
    params: parameters,
  });
}

export const signInWithPhoneDataApiAddress =
  '/wechatApplication/entrance/signInWithPhone';

export async function signInWithPhoneData(parameters) {
  return request({
    api: signInWithPhoneDataApiAddress,
    params: parameters,
  });
}

export const signInWithEmailDataApiAddress =
  '/wechatApplication/entrance/signInWithEmail';

export async function signInWithEmailData(parameters) {
  return request({
    api: signInWithEmailDataApiAddress,
    params: parameters,
  });
}

export const signInSilentDataApiAddress =
  '/wechatApplication/entrance/signInSilent';

export async function signInSilentData(parameters) {
  return request({
    api: signInSilentDataApiAddress,
    params: parameters,
  });
}

export const resetPasswordDataApiAddress =
  '/wechatApplication/entrance/resetPassword';

export async function resetPasswordData(parameters) {
  return request({
    api: resetPasswordDataApiAddress,
    params: parameters,
  });
}

export const checkTicketValidityDataApiAddress =
  '/wechatApplication/entrance/checkTicketValidity';

export async function checkTicketValidityData(parameters) {
  return request({
    api: checkTicketValidityDataApiAddress,
    params: parameters,
  });
}

export const refreshCaptchaDataApiAddress =
  '/wechatApplication/entrance/refreshCaptcha';

export async function refreshCaptchaData(parameters) {
  return request({
    api: refreshCaptchaDataApiAddress,
    params: parameters,
  });
}

export const sendRetrievePasswordMessageDataApiAddress =
  '/wechatApplication/entrance/sendRetrievePasswordMessage';

export async function sendRetrievePasswordMessageData(parameters) {
  return request({
    api: sendRetrievePasswordMessageDataApiAddress,
    params: parameters,
  });
}

export const retrievePasswordDataApiAddress =
  '/wechatApplication/entrance/retrievePassword';

export async function retrievePasswordData(parameters) {
  return request({
    api: retrievePasswordDataApiAddress,
    params: parameters,
  });
}

export const signOutApiAddress = '/wechatApplication/entrance/signOut';

export async function signOut(parameters) {
  return request({
    api: signOutApiAddress,
    params: parameters,
  });
}
