import { logDebug, request, requestMode } from 'easy-soft-utility';

export async function getCustomerData(parameters) {
  logDebug(
    'service "customer/getCurrentCustomer" use virtual request in this demo',
  );

  return request({
    api: `/customer/getCurrentCustomer`,
    params: parameters,
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
