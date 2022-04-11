import { executiveRequest } from '../utils/request';

export async function refreshSessionData(params) {
  return executiveRequest({
    api: `/session/refreshSession`,
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
