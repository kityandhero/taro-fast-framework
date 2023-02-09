import { request } from 'easy-soft-utility';

export async function refreshSessionData(parameters) {
  return request({
    api: `/weApp/session/refreshSession`,
    params: parameters,
  });
}

export async function exchangePhoneData(parameters) {
  return request({
    api: `/weApp/session/exchangePhone`,
    params: parameters,
  });
}
