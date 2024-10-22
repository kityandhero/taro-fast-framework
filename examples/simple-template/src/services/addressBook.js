import { request } from 'easy-soft-utility';

export const singleListLetterGroupDataApiAddress =
  '/wechatApplication/addressBook/singleListLetterGroup';

export async function singleListLetterGroupData(parameters) {
  return request({
    api: singleListLetterGroupDataApiAddress,
    params: parameters,
  });
}

export const singleListDepartmentGroupDataApiAddress =
  '/wechatApplication/addressBook/singleListDepartmentGroup';

export async function singleListDepartmentGroupData(parameters) {
  return request({
    api: singleListDepartmentGroupDataApiAddress,
    params: parameters,
  });
}
