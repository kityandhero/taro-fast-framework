import { executiveRequest } from '../utils/request';

export async function getData(params) {
  console.log(params);

  return executiveRequest({
    api: `https://wis.qq.com/city/like`,
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
