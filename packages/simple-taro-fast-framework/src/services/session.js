import { executiveRequest } from '../utils/request';

export async function refreshSessionData(params) {
  return executiveRequest({
    api: `/weApp/session/refreshSession`,
    params,
  });
}

export async function exchangePhoneData(params) {
  return executiveRequest({
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
