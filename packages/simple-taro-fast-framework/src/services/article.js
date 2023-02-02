import { request } from 'easy-soft-utility';

export async function pageListData(params) {
  return request({
    api: `/news/article/pageList`,
    params,
  });
}

export async function getData(params) {
  return request({
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
