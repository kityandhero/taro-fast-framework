import { executiveRequest } from '../utils/request';

export async function signInData(params) {
  return executiveRequest({
    api: `/entrance/signIn`,
    params,
  });
}

export async function signInSilentData(params) {
  return executiveRequest({
    api: `/entrance/signInSilent`,
    params,
  });
}

export async function registerData(params) {
  return executiveRequest({
    api: `/entrance/register`,
    params,
  });
}

export async function checkTicketValidityData(params) {
  return executiveRequest({
    api: `/entrance/checkTicketValidity`,
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
