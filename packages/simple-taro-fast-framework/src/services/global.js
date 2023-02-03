import { request } from 'easy-soft-utility';

export async function getData(params) {
  return request({
    api: `/metaData/get`,
    params,
  });
}

export async function exchangeShareData(params) {
  return request({
    api: `/share/exchangeShare`,
    params,
  });
}
