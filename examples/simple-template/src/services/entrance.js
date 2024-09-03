import { request } from 'easy-soft-utility';

export const signInDataApiAddress = '/wechatApplication/entrance/signIn';

export async function signInData(parameters) {
  return request({
    api: signInDataApiAddress,
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

export const checkTicketValidityDataApiAddress =
  '/wechatApplication/entrance/checkTicketValidity';

export async function checkTicketValidityData(parameters) {
  return request({
    api: checkTicketValidityDataApiAddress,
    params: parameters,
  });
}
