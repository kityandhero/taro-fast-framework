import { executiveRequest } from '../utils/request';

export async function getData(params) {
  return executiveRequest({
    api: `https://wis.qq.com/weather/common`,
    urlParams: params,
    method: 'GET',
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
