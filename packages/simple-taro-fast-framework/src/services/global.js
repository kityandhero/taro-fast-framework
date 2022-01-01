import { executiveRequest } from '../utils/request';

export async function getData(params) {
  return executiveRequest({
    api: `/metaData/get`,
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
