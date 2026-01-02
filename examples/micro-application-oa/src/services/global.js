import { request } from 'easy-soft-utility';

export const getMetaDataDataApiAddress = '/wechatApplication/metaData/get';

export async function getMetaDataData(parameters) {
  return request({
    api: getMetaDataDataApiAddress,
    params: parameters,
  });
}
