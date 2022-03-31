import { getNow, addMinute } from 'taro-fast-common/es/utils/tools';
import { executiveRequest } from '../utils/request';

export async function signInData(params) {
  return executiveRequest({
    api: `/entrance/signIn`,
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
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: {
        needRefresh: true,
        nextCheckLoginUnixTime: Math.round(addMinute(getNow(), 5) / 1000),
      },
    },
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
