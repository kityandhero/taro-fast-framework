import { request } from 'easy-soft-utility';

export async function getData(parameters) {
  return request({
    api: `/metaData/get`,
    params: parameters,
  });
}

export async function exchangeShareData(parameters) {
  return request({
    api: `/share/exchangeShare`,
    params: parameters,
  });
}
