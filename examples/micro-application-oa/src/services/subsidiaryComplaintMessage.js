import { request } from 'easy-soft-utility';

export const pageListDataApiAddress =
  '/wechatApplication/subsidiaryComplaintMessage/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress =
  '/wechatApplication/subsidiaryComplaintMessage/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addDataApiAddress =
  '/wechatApplication/subsidiaryComplaintMessage/add';

export async function addData(parameters) {
  return request({
    api: addDataApiAddress,
    params: parameters,
  });
}

export const uploadImageDataApiAddress =
  '/wechatApplication/subsidiaryComplaintMessage/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}
