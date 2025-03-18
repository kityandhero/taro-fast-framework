import { request } from 'easy-soft-utility';

export const pageListUsableDataApiAddress =
  '/wechatApplication/workflow/pageListUsable';

export async function pageListUsableData(parameters) {
  return request({
    api: pageListUsableDataApiAddress,
    params: parameters,
  });
}
