import { executiveRequest } from '../utils/request';

export async function pageListData(params) {
  return executiveRequest({
    api: `/news/article/pageList`,
    params,
  });
}

export async function getData(params) {
  return executiveRequest({
    api: `/news/article/get`,
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
