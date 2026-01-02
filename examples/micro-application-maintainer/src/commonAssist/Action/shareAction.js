import { actionCore } from 'taro-fast-framework';

export function createShareUrlParametersAction({
  target,
  handleData,
  successCallback,
  successMessage = '',
  successMessageBuilder = null,
  showProcessing = true,
  textProcessing = '处理中, 请稍后',
}) {
  actionCore({
    api: 'share/createShareUrlParams',
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
    successMessageBuilder,
    showProcessing,
    textProcessing,
  });
}

export function exchangeShareDataAction({
  target,
  handleData,
  successCallback,
  successMessage = '',
  successMessageBuilder = null,
  showProcessing = true,
  textProcessing = '处理中, 请稍后',
  failureCallback = null,
}) {
  actionCore({
    api: 'share/exchangeShareData',
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
    successMessageBuilder,
    showProcessing,
    textProcessing,
    failureCallback,
  });
}
