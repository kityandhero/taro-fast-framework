import { defaultSettingsLayoutCustom } from 'taro-fast-framework/es/utils/defaultSettingsSpecial';
import { request } from 'taro-fast-framework/es/utils/requestAssistor';

/**
 * begin request（remote request / local virtual requests）
 * @param {*} api [string]: request address
 * @param {*} params [object]: request params
 * @param {*} header [object]: request header
 * @param {*} method [string]: ’GET‘ or ’POST‘, default is ’POST‘
 * @param {*} useVirtualRequest [bool]: whether to apply virtual requests
 * @param {*} showUseVirtualRequestMessage [bool]: whether display virtual request message prompt
 * @param {*} virtualSuccessResponse [object]: virtual request success response data
 * @param {*} virtualFailResponse [object]: virtual request fail response data
 * @param {*} virtualRequestResult [object]:mandatory set virtual request result, generally used to debug
 * @param {*} virtualNeedAuthorize [object]:set virtual request whether check token,  only check mull or empty, generally used to debug
 * @returns
 */
export async function executiveRequest({
  api,
  urlParams = null,
  params = {},
  header = {},
  method = 'POST',
  useVirtualRequest = defaultSettingsLayoutCustom.getUseVirtualRequest(),
  showUseVirtualRequestMessage = defaultSettingsLayoutCustom.getShowUseVirtualRequestMessage(),
  showUseVirtualRequestMessageDelay = 500,
  virtualRequestDelay = 400,
  virtualSuccessResponse = {},
  virtualFailResponse = {
    code: 1001,
    message: '虚拟未知错误',
  },
  virtualRequestResult = true,
  virtualNeedAuthorize = false,
}) {
  return request({
    api,
    urlParams,
    params,
    header: header || {},
    method,
    useVirtualRequest,
    showUseVirtualRequestMessage,
    showUseVirtualRequestMessageDelay,
    virtualRequestDelay,
    virtualSuccessResponse,
    virtualFailResponse,
    virtualRequestResult,
    virtualNeedAuthorize,
  });
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
