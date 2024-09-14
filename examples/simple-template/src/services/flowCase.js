import { request } from 'easy-soft-utility';

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
