import { request } from 'easy-soft-utility';

export const pageListDataApiAddress =
  '/wechatApplication/applicationUserFeedback/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress =
  '/wechatApplication/applicationUserFeedback/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addDataApiAddress =
  '/wechatApplication/applicationUserFeedback/add';

export async function addData(parameters) {
  return request({
    api: addDataApiAddress,
    params: parameters,
  });
}
