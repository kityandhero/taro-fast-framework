import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: `/news/article/pageList`,
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: `/news/article/get`,
    params: parameters,
  });
}
