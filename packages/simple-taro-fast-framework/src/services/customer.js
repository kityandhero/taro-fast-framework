import { recordLog } from 'taro-fast-common/es/utils/tools';

import { executiveRequest } from '../utils/request';

export async function getCustomerData(params) {
  recordLog(
    'info service "customer/getCurrentCustomer" use virtual request in this demo',
  );

  return executiveRequest({
    api: `/customer/getCurrentCustomer`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: {
        nickname: 'lucy',
        age: 15,
      },
    },
  });
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
