import { logDebug, request, requestMode } from 'easy-soft-utility';

export async function getCustomerData(params) {
  logDebug(
    'service "customer/getCurrentCustomer" use virtual request in this demo',
  );

  return request({
    api: `/customer/getCurrentCustomer`,
    params,
    mode: requestMode.simulation,
    simulativeAuthorize: false,
    simulativeSuccessResponse: {
      data: {
        nickname: 'lucy',
        age: 15,
      },
    },
  });
}
