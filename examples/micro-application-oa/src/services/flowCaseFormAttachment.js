import { request } from 'easy-soft-utility';

export const addDataApiAddress =
  '/wechatApplication/workflowCaseFormAttachment/add';

export async function addData(parameters) {
  return request({
    api: addDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress =
  '/wechatApplication/workflowCaseFormAttachment/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const uploadFileDataApiAddress =
  '/wechatApplication/workflowCaseFormAttachment/uploadFile';

export async function uploadFileData(parameters) {
  return request({
    api: uploadFileDataApiAddress,
    params: parameters,
  });
}
