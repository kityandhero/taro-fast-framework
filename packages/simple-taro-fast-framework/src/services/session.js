import { getGuid } from 'taro-fast-common/es/utils/tools';

import { executiveRequest } from '../utils/request';

export async function refreshSessionData(params) {
  const { code } = params;

  return executiveRequest({
    api: `/session/refreshSession`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: {
        sessionId: getGuid(),
        code: code,
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
