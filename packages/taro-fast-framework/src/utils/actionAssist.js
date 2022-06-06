import Taro from '@tarojs/taro';

import {
  notifySuccess,
  showErrorMessage,
  showRuntimeError,
  recordObject,
  getPathValue,
  recordError,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import {
  isFunction,
  isNumber,
  isString,
  isUndefined,
} from 'taro-fast-common/es/utils/typeCheck';
import Tips from 'taro-fast-common/es/utils/tips';
import { toString } from 'taro-fast-common/es/utils/typeConvert';

import { checkWhetherAuthorizeFail } from './tools';

/**
 * apiDataConvertCore
 * @param {*} param0
 * @returns
 */
export function apiDataConvertCore({ props, modelName, key = 'data' }) {
  if (isUndefined(props)) {
    throw new Error('props is undefined, please check params.');
  }

  const m = getPathValue(props, modelName);

  if ((m || null) == null) {
    recordObject(props);

    recordError(
      `apiDataConvertCore error: model ${modelName} is null or undefined`,
    );
  }

  const data = m[key];

  if ((data || null) == null) {
    recordObject(props);

    recordError(
      `apiDataConvertCore error: key “${key}” in model ${modelName} is null or undefined`,
    );
  }

  return data;
}

/**
 * 处理 actionCore 的异步请求结果
 * @param {*} param0
 * @returns
 */
export function handleItem({ target, dataId, compareDataIdHandler, handler }) {
  if ((target || null) == null) {
    throw new Error('actionCore: target not allow null');
  }

  if ((target.state || null) == null) {
    throw new Error('actionCore: target.state not allow null');
  }

  const { metaOriginalData } = target.state;

  if ((metaOriginalData || null) == null) {
    throw new Error('actionCore: target.state.metaOriginalData not allow null');
  }

  let indexData = -1;

  if (!isFunction(compareDataIdHandler)) {
    const text = `compareDataIdHandler mast be function`;

    showRuntimeError({
      message: text,
    });

    return;
  }

  if (!isFunction(handler)) {
    const text = `handler mast be function`;

    showRuntimeError({
      message: text,
    });

    return;
  }

  if ((metaOriginalData.list || null) == null) {
    throw new Error(
      'actionCore: target.state.metaOriginalData.list must be array',
    );
  }

  metaOriginalData.list.forEach((o, index) => {
    const compareDataId = compareDataIdHandler(o);

    if (compareDataId === dataId) {
      indexData = index;
    }
  });

  if (indexData >= 0) {
    metaOriginalData.list[indexData] = handler(
      metaOriginalData.list[indexData],
    );

    target.setState({ metaOriginalData });
  }
}

/**
 * remote assess wrapper core
 * @param {*} api [string] remote api path.
 * @param {*} params [object] remote api params.
 * @param {*} apiDataConvert [function] get api data handler.
 * @param {*} target [object] target.
 * @param {*} handleData [object] origin processing data.
 * @param {*} failureCallback [function] remote access logic fail handler, eg. failureCallback(remoteData,whetherCauseByAuthorizeFail).
 * @param {*} successCallback [function] remote access logic success handler.
 * @param {*} successMessage [string] the message when remote access logic success. if successMessage not null or empty, will trigger toast notification.
 * @param {*} successMessageBuilder [function] remote access logic success message builder, priority over successMessage.
 * @param {*} showProcessing [bool] whether show processing toast.
 * @param {*} textProcessing [string] processing toast text.
 */
export async function actionCore({
  api,
  params,
  apiDataConvert = null,
  target,
  handleData,
  failureCallback,
  successCallback,
  successMessage = '',
  successMessageBuilder = null,
  showProcessing = true,
  textProcessing = '处理中, 请稍后',
  delay = 400,
}) {
  if ((handleData || null) == null) {
    const text = 'actionCore : handleData not allow null';

    showErrorMessage({
      message: text,
    });
  }

  if ((target || null) == null) {
    throw new Error('actionCore: target not allow null');
  }

  if ((target.props || null) == null) {
    throw new Error('actionCore: target.props not allow null');
  }

  const { dispatch } = target.props;

  if ((dispatch || null) == null) {
    throw new Error('actionCore: dispatch not allow null');
  }

  if (!isFunction(target.setState)) {
    throw new Error('actionCore: target.setState must be function');
  }

  if (showProcessing) {
    Tips.loading(textProcessing || '处理中, 请稍后');
  }

  target.setState({ processing: true }, () => {
    target.setState(
      {
        dispatchComplete: false,
      },
      () => {
        // 延迟一定时间, 优化界面呈现
        setTimeout(
          () => {
            try {
              dispatch({
                type: api,
                payload: params,
              })
                .then(() => {
                  if (showProcessing) {
                    setTimeout(() => {
                      Tips.loaded();
                    }, 200);
                  }

                  if (!isFunction(apiDataConvert)) {
                    throw new Error(
                      'actionCore: apiDataConvert must be function',
                    );
                  }

                  const data = apiDataConvert(target.props);

                  if ((data || null) == null) {
                    throw new Error(
                      'actionCore: apiDataConvert result not allow null',
                    );
                  }

                  const { dataSuccess, code: remoteCode } = data;

                  if (dataSuccess) {
                    const {
                      list: remoteListData,
                      data: remoteData,
                      extra: remoteExtraData,
                    } = data;

                    let messageText = successMessage;

                    if (isFunction(successMessageBuilder)) {
                      messageText = successMessageBuilder({
                        remoteListData: remoteListData || [],
                        remoteData: remoteData || null,
                        remoteExtraData: remoteExtraData || null,
                        remoteOriginal: data,
                      });
                    }

                    if (!stringIsNullOrWhiteSpace(messageText)) {
                      notifySuccess(messageText);
                    }

                    if (isFunction(successCallback)) {
                      successCallback({
                        target,
                        handleData,
                        remoteListData: remoteListData || [],
                        remoteData: remoteData || null,
                        remoteExtraData: remoteExtraData || null,
                        remoteOriginal: data,
                      });
                    }
                  } else {
                    if (isFunction(failureCallback)) {
                      failureCallback(
                        data,
                        checkWhetherAuthorizeFail(remoteCode || 0),
                      );
                    }
                  }

                  target.setState({
                    processing: false,
                    dispatchComplete: true,
                  });
                })
                .catch((error) => {
                  recordError(error);

                  if (showProcessing) {
                    setTimeout(() => {
                      Tips.loaded();
                    }, 200);
                  }

                  target.setState({
                    processing: false,
                    dispatchComplete: true,
                  });
                });
            } catch (e) {
              Tips.loaded();

              const text = `${toString(
                e,
              )}, please confirm dispatch type exists first.`;

              recordError({
                message: text,
                dispatchInfo: {
                  type: api,
                  payload: params,
                },
              });

              showErrorMessage({
                message: text,
              });
            }
          },
          isNumber(delay) ? (delay < 0 ? 400 : delay) : 400,
        );
      },
    );
  });
}

/**
 * action sheet core
 * @param {*} title [string] action sheet alert text.
 * @param {*} target [object] target.
 * @param {*} handleData [object] origin processing data.
 * @param {*} failureCallback [function] remote access logic fail handler, eg. failureCallback(remoteData,whetherCauseByAuthorizeFail).
 * @param {*} successCallback [function] remote access logic success handler.
 * @param {*} successMessage [string] the message when remote access logic success. if successMessage not null or empty, will trigger toast notification.
 * @param {*} successMessageBuilder [function] remote access logic success message builder, priority over successMessage.
 * @param {*} showProcessing [bool] whether show processing toast.
 * @param {*} textProcessing [string] processing toast text.
 * @param {*} confirmText [string] confirm text.
 * @param {*} confirmColor [string] confirm color.
 * @param {*} confirmAction [function] confirm action handler.
 * @param {*} errorCallback [function] error callback handler.
 * @param {*} completeCallback [function] complete callback handler.
 */
export async function actionSheetCore({
  title,
  target,
  handleData,
  failureCallback,
  successCallback,
  successMessage = '',
  successMessageBuilder = null,
  showProcessing = true,
  textProcessing = '处理中, 请稍后',
  confirmText = '确定',
  confirmColor = '',
  confirmAction = null,
  errorCallback = null,
  completeCallback = null,
}) {
  if (!isFunction(confirmAction)) {
    throw new Error('actionSheetCore: confirmAction must be function');
  }

  Taro.showActionSheet({
    alertText: title || '',
    itemList: [confirmText || '确定'],
    itemColor: !isString(confirmColor)
      ? ''
      : stringIsNullOrWhiteSpace(confirmColor)
      ? ''
      : confirmColor,
    success: () => {
      confirmAction({
        target,
        handleData,
        failureCallback,
        successCallback,
        successMessage,
        successMessageBuilder,
        showProcessing,
        textProcessing,
      });
    },
    fail: ({ errMsg }) => {
      if (isFunction(errorCallback)) {
        errorCallback({ message: errMsg });
      }
    },
    complete: ({ errMsg, tapIndex }) => {
      if (isFunction(completeCallback)) {
        completeCallback({ tapIndex, message: errMsg });
      }
    },
  }).catch((res) => {
    recordError({
      message: 'actionSheetCore: catch.',
      info: res,
    });
  });
}

/**
 * action modal core
 * @param {*} title [string] modal title.
 * @param {*} content [string] modal content.
 * @param {*} target [object] target.
 * @param {*} handleData [object] origin processing data.
 * @param {*} failureCallback [function] remote access logic fail handler, eg. failureCallback(remoteData,whetherCauseByAuthorizeFail).
 * @param {*} successCallback [function] remote access logic success handler.
 * @param {*} successMessage [string] the message when remote access logic success. if successMessage not null or empty, will trigger toast notification.
 * @param {*} successMessageBuilder [function] remote access logic success message builder, priority over successMessage.
 * @param {*} showProcessing [bool] whether show processing toast.
 * @param {*} textProcessing [string] processing toast text.
 * @param {*} confirmText [string] confirm text.
 * @param {*} confirmColor [string] confirm color.
 * @param {*} cancelText [string] cancel text.
 * @param {*} cancelColor [string] cancel color.
 * @param {*} showCancel [bool] whether show cancel.
 * @param {*} confirmAction [function] confirm action handler.
 * @param {*} cancelCallback [function] cancel callback handler.
 * @param {*} errorCallback [function] error callback handler.
 * @param {*} completeCallback [function] complete callback handler.
 */
export async function actionModalCore({
  title,
  content,
  target,
  handleData,
  failureCallback,
  successCallback,
  successMessage = '',
  successMessageBuilder = null,
  showProcessing = true,
  textProcessing = '处理中, 请稍后',
  confirmText = '确定',
  confirmColor = '',
  cancelText = '取消',
  cancelColor = '',
  showCancel = true,
  confirmAction = null,
  cancelCallback = null,
  errorCallback = null,
  completeCallback = null,
}) {
  if (!isFunction(confirmAction)) {
    throw new Error('actionModalCore: confirmAction must be function');
  }

  Taro.showModal({
    title,
    content,
    confirmText: confirmText || '确定',
    confirmColor: !isString(confirmColor)
      ? ''
      : stringIsNullOrWhiteSpace(confirmColor)
      ? ''
      : confirmColor,
    cancelText: cancelText || '取消',
    cancelColor: !isString(cancelColor)
      ? ''
      : stringIsNullOrWhiteSpace(cancelColor)
      ? ''
      : cancelColor,
    showCancel,
    success: ({ confirm, cancel, errMsg }) => {
      if (confirm) {
        confirmAction({
          target,
          handleData,
          failureCallback,
          successCallback,
          successMessage,
          successMessageBuilder,
          showProcessing,
          textProcessing,
        });
      }

      if (cancel) {
        if (isFunction(cancelCallback)) {
          cancelCallback({
            message: errMsg,
          });
        }
      }
    },
    fail: ({ errMsg }) => {
      if (isFunction(errorCallback)) {
        errorCallback({ message: errMsg });
      }
    },
    complete: ({ errMsg, cancel, confirm, content: c }) => {
      if (isFunction(completeCallback)) {
        completeCallback({
          message: errMsg,
          confirm,
          cancel,
          content: c || '',
        });
      }
    },
  }).catch((res) => {
    recordError({
      message: 'actionSheetCore: catch.',
      info: res,
    });
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
