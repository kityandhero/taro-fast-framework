import Taro from '@tarojs/taro';
import Tips from './tips';

import {
  isFunction,
  notifySuccess,
  showErrorMessage,
  showRuntimeError,
  recordObject,
  getPathValue,
  isUndefined,
  recordError,
} from './tools';

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
  successMessage = '数据已经操作成功，请进行后续操作。',
  successMessageBuilder = null,
  showProcessing = true,
  textProcessing = '处理中，请稍后',
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
    Tips.loading(textProcessing || '处理中，请稍后');
  }

  target.setState({ processing: true }, () => {
    target.setState(
      {
        dispatchComplete: false,
      },
      () => {
        // 延迟一定时间，优化界面呈现
        setTimeout(() => {
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
                throw new Error('actionCore: getApiData result not allow null');
              }

              const { dataSuccess } = data;

              if (dataSuccess) {
                const { data: remoteData } = data;

                let messageText = successMessage;

                if (isFunction(successMessageBuilder)) {
                  messageText = successMessageBuilder(remoteData);
                }

                notifySuccess(messageText);

                if (isFunction(successCallback)) {
                  successCallback({
                    target,
                    handleData,
                    remoteData: remoteData || null,
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
        }, 400);
      },
    );
  });
}

/**
 * confirmActionCore
 * @param {*} param0
 */
export async function confirmActionCore({
  target,
  handleData,
  successCallback,
  okAction = null,
  successMessage = '数据已经操作成功，请进行后续操作。',
  successMessageBuilder = null,
  showProcessing = true,
}) {
  if (!isFunction(okAction)) {
    throw new Error('actionCore: okAction must be function');
  }

  Taro.showActionSheet({
    itemList: ['确定'],
    success: () => {
      okAction({
        target,
        handleData,
        successCallback,
        successMessage,
        successMessageBuilder,
        showProcessing,
      });
    },
    fail: function ({ errMsg }) {
      console.log(errMsg);
    },
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
