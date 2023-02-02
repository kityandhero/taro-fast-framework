import { request } from 'easy-soft-utility';

export async function refreshSessionData(params) {
  return request({
    api: `/weApp/session/refreshSession`,
    params,
  });
}

export async function exchangePhoneData(params) {
  return request({
    api: `/weApp/session/exchangePhone`,
    params,
  });
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
