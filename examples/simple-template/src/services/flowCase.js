import { request } from 'easy-soft-utility';

export const pageListDataApiAddress =
  '/wechatApplication/workflowCase/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const pageListWaitApproveDataApiAddress =
  '/wechatApplication/workflowCase/pageListWaitApprove';

export async function pageListWaitApproveData(parameters) {
  return request({
    api: pageListWaitApproveDataApiAddress,
    params: parameters,
  });
}

export const pageListLatestApproveDataApiAddress =
  '/wechatApplication/workflowCase/pageListLatestApprove';

export async function pageListLatestApproveData(parameters) {
  return request({
    api: pageListLatestApproveDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/wechatApplication/workflowCase/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const createFlowCaseDataApiAddress =
  '/wechatApplication/workflowCase/createFlowCase';

export async function createFlowCaseData(parameters) {
  return request({
    api: createFlowCaseDataApiAddress,
    params: parameters,
  });
}

export const submitApprovalDataApiAddress =
  '/wechatApplication/workflowCase/submitApproval';

export async function submitApprovalData(parameters) {
  return request({
    api: submitApprovalDataApiAddress,
    params: parameters,
  });
}

export const passDataApiAddress = '/wechatApplication/workflowCase/pass';

export async function passData(parameters) {
  return request({
    api: passDataApiAddress,
    params: parameters,
  });
}

export const refuseDataApiAddress = '/wechatApplication/workflowCase/refuse';

export async function refuseData(parameters) {
  return request({
    api: refuseDataApiAddress,
    params: parameters,
  });
}
