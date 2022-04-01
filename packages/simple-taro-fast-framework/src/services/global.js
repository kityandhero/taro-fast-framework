import { executiveRequest } from '../utils/request';

export async function getData(params) {
  return executiveRequest({
    api: `/metaData/get`,
    params,
  });
}

export async function exchangeShareData(params) {
  return executiveRequest({
    api: `/share/exchangeShare`,
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
