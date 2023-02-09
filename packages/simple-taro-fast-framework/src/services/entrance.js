import { request } from 'easy-soft-utility';

export async function signInData(parameters) {
  return request({
    api: `/entrance/signIn`,
    params: parameters,
  });
}

export async function signInSilentData(parameters) {
  return request({
    api: `/entrance/signInSilent`,
    params: parameters,
  });
}

export async function registerData(parameters) {
  return request({
    api: `/entrance/register`,
    params: parameters,
  });
}

export async function registerWithWeChatData(parameters) {
  return request({
    api: `/entrance/registerWithWeChat`,
    params: parameters,
  });
}

export async function checkTicketValidityData(parameters) {
  return request({
    api: `/entrance/checkTicketValidity`,
    params: parameters,
  });
}
