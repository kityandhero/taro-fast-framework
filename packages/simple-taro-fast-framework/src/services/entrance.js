import { request } from 'easy-soft-utility';

export async function signInData(params) {
  return request({
    api: `/entrance/signIn`,
    params,
  });
}

export async function signInSilentData(params) {
  return request({
    api: `/entrance/signInSilent`,
    params,
  });
}

export async function registerData(params) {
  return request({
    api: `/entrance/register`,
    params,
  });
}

export async function registerWithWeChatData(params) {
  return request({
    api: `/entrance/registerWithWeChat`,
    params,
  });
}

export async function checkTicketValidityData(params) {
  return request({
    api: `/entrance/checkTicketValidity`,
    params,
  });
}
