import { request } from 'easy-soft-utility';

export const getIntegrationDataApiAddress =
  '/wechatApplication/summary/getIntegration';

export async function getIntegrationData(parameters) {
  return request({
    api: getIntegrationDataApiAddress,
    params: parameters,
  });
}
