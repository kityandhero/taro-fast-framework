import { request } from 'easy-soft-utility';

export const pageListDataApiAddress =
  '/wechatApplication/subsidiaryFeedbackMessage/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress =
  '/wechatApplication/subsidiaryFeedbackMessage/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addDataApiAddress =
  '/wechatApplication/subsidiaryFeedbackMessage/add';

export async function addData(parameters) {
  return request({
    api: addDataApiAddress,
    params: parameters,
  });
}

export const uploadImageDataApiAddress =
  '/wechatApplication/subsidiaryFeedbackMessage/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}
