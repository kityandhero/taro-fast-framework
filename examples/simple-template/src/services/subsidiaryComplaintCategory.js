import { request } from 'easy-soft-utility';

export const singleListDataApiAddress =
  '/wechatApplication/subsidiaryComplaintCategory/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}
