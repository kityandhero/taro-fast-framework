import Taro from '@tarojs/taro';

import {
  notifySuccess,
  showErrorMessage,
  showRuntimeError,
  recordObject,
  getPathValue,
  recordError,
  stringIsNullOrWhiteSpace,
} from './tools';
import { isFunction, isString, isUndefined } from './typeCheck';
import Tips from './tips';
import { toString } from './typeConvert';

/**
 * getApiDataCore
 * @param {*} param0
 * @returns
 */
export function getApiDataCore({ props, modelName }) {
  if (isUndefined(props)) {
    throw new Error('props is undefined, please check params.');
  }

  const m = getPathValue(props, modelName);

  if ((m || null) == null) {
    recordError(
      `getApiDataCore error: model ${modelName} is null or undefined`,
    );
  }

  const { data } = m;

  if ((data || null) == null) {
    recordError(
      `getApiDataCore error: key “data” in model ${modelName} is null or undefined`,
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
 * remote assess core
 */
export async function actionCore({
  api,
  params,
  getApiData = null,
  target,
  handleData,
  successCallback,
  successMessage = '',
  successMessageBuilder = null,
  showProcessing = true,
  textProcessing = '处理中, 请稍后',
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
        setTimeout(() => {
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

                if (!isFunction(getApiData)) {
                  throw new Error('actionCore: getApiData must be function');
                }

                const data = getApiData(target.props);

                if ((data || null) == null) {
                  throw new Error(
                    'actionCore: getApiData result not allow null',
                  );
                }

                const { dataSuccess } = data;

                if (dataSuccess) {
                  const {
                    list: listData,
                    data: singleData,
                    extra: extraData,
                  } = data;

                  let messageText = successMessage;

                  if (isFunction(successMessageBuilder)) {
                    messageText = successMessageBuilder({
                      list: listData || [],
                      data: singleData || {},
                      extra: extraData || {},
                    });
                  }

                  if (!stringIsNullOrWhiteSpace(messageText)) {
                    notifySuccess(messageText);
                  }

                  if (isFunction(successCallback)) {
                    successCallback({
                      target,
                      handleData,
                      remoteData: {
                        list: listData || [],
                        data: singleData || {},
                        extra: extraData || {},
                      },
                    });
                  }
                }

                target.setState({
                  processing: false,
                  dispatchComplete: true,
                });
              })
              .catch((res) => {
                recordObject(res);

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

            console.log({
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
        }, 400);
      },
    );
  });
}

/**
 * actionSheetCore
 * @param {*} param0
 */
export async function actionSheetCore({
  title,
  target,
  handleData,
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
    console.log({
      message: 'actionSheetCore: catch.',
      info: res,
    });
  });
}

/**
 * actionSheetCore
 * @param {*} param0
 */
export async function actionModalCore({
  title,
  content,
  target,
  handleData,
  successCallback = null,
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
        completeCallback({ message: errMsg, confirm, cancel, content: c });
      }
    },
  }).catch((res) => {
    console.log({
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
