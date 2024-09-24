import Taro from '@tarojs/taro';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  isNumber,
  isString,
  logDebug,
  logException,
  logTrace,
  showErrorMessage,
  showSimpleSuccessNotification,
  toString,
} from 'easy-soft-utility';

import { Tips } from 'taro-fast-common';

import { buildPromptModuleInfoText } from './definition';

/**
 * Module Name.
 * @private
 */
const moduleName = 'routeAssist';

/**
 * remote assess wrapper core
 * @param {*} api [string] remote api path.
 * @param {*} params [object] remote api params.
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
  logTrace(arguments[0], buildPromptModuleInfoText(moduleName, 'actionCore'));

  if ((handleData || null) == null) {
    const text = 'actionCore : handleData not allow null';

    showErrorMessage({
      text: text,
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
    logDebug('state dispatchComplete will set to false');

    target.setState({ dispatchComplete: false });

    // 延迟一定时间, 优化界面呈现
    setTimeout(
      () => {
        try {
          dispatch({
            type: api,
            payload: params,
          })
            .then((data) => {
              if (showProcessing) {
                setTimeout(() => {
                  Tips.loaded();
                }, 200);
              }

              if ((data || null) == null) {
                throw new Error('exec result data is null');
              }

              const { dataSuccess } = data;

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

                if (!checkStringIsNullOrWhiteSpace(messageText)) {
                  showSimpleSuccessNotification(messageText);
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
                  failureCallback({
                    target,
                    handleData,
                    remoteOriginal: data,
                    error: null,
                  });
                }
              }

              logDebug('state dispatchComplete will set to true');

              target.setState({
                processing: false,
                dispatchComplete: true,
              });

              return;
            })
            .catch((error) => {
              logDebug({ api, error }, 'actionCore error');

              logException(error);

              if (showProcessing) {
                setTimeout(() => {
                  Tips.loaded();
                }, 200);
              }

              if (isFunction(failureCallback)) {
                failureCallback({
                  target,
                  handleData,
                  remoteOriginal: null,
                  error,
                });
              }

              logDebug('state dispatchComplete will set to true');

              target.setState({
                processing: false,
                dispatchComplete: true,
              });
            });
        } catch (error) {
          logDebug({ api, error }, 'actionCore error');

          Tips.loaded();

          const text = `${toString(
            error,
          )}, please confirm dispatch type exists first.`;

          logException({
            message: text,
            dispatchInfo: {
              type: api,
              payload: params,
            },
          });

          failureCallback({
            target,
            handleData,
            remoteOriginal: null,
            error: error,
          });

          showErrorMessage({
            text: text,
          });
        }
      },
      isNumber(delay) ? (delay < 0 ? 400 : delay) : 400,
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
    itemColor: isString(confirmColor)
      ? checkStringIsNullOrWhiteSpace(confirmColor)
        ? ''
        : confirmColor
      : '',
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
  }).catch((error_) => {
    logException(`actionSheetCore: catch -> ${error_.message}`);
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
    confirmColor: isString(confirmColor)
      ? checkStringIsNullOrWhiteSpace(confirmColor)
        ? ''
        : confirmColor
      : '',
    cancelText: cancelText || '取消',
    cancelColor: isString(cancelColor)
      ? checkStringIsNullOrWhiteSpace(cancelColor)
        ? ''
        : cancelColor
      : '',
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

      if (cancel && isFunction(cancelCallback)) {
        cancelCallback({
          message: errMsg,
        });
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
  }).catch((error_) => {
    logException(`actionSheetCore: catch -> ${error_.message}`);
  });
}
