import {
  getApiDataCore,
  actionCore,
  actionSheetCore,
  actionModalCore,
} from 'taro-fast-framework/es/utils/actionAssist';

function getApiData(props) {
  return getApiDataCore({ props, modelName: 'news' });
}

export function getOverviewAction({
  target,
  handleData,
  successCallback,
  successMessage = '',
  successMessageBuilder = null,
  showProcessing = true,
  textProcessing = '处理中, 请稍后',
}) {
  actionCore({
    api: 'news/getOverview',
    params: handleData,
    getApiData,
    target,
    handleData,
    successCallback,
    successMessage,
    successMessageBuilder,
    showProcessing,
    textProcessing,
  });
}

export function pageListAction({
  target,
  handleData,
  successCallback,
  successMessage = '',
  successMessageBuilder = null,
  showProcessing = true,
  textProcessing = '处理中, 请稍后',
}) {
  actionCore({
    api: 'news/pageList',
    params: handleData,
    getApiData,
    target,
    handleData,
    successCallback,
    successMessage,
    successMessageBuilder,
    showProcessing,
    textProcessing,
  });
}

export async function getOverviewActionSheet({
  target,
  handleData,
  successCallback,
  successMessage = '',
  successMessageBuilder = null,
  showProcessing = true,
  textProcessing = '处理中, 请稍后',
}) {
  actionSheetCore({
    title: `移除图片`,
    target,
    handleData,
    successCallback,
    successMessage,
    successMessageBuilder,
    showProcessing,
    textProcessing,
    confirmText: '确定',
    confirmColor: 'blue',
    confirmAction: ({
      target: t,
      handleData: r,
      successCallback: sc,
      successMessage: sm,
      successMessageBuilder: smb,
      showProcessing: sp,
      textProcessing: tp,
    }) => {
      getOverviewAction({
        target: t,
        handleData: r,
        successCallback: sc,
        successMessage: sm,
        successMessageBuilder: smb,
        showProcessing: sp,
        textProcessing: tp,
      });
    },
    errorCallback: ({ message }) => {
      console.log({ message });
    },
    completeCallback: ({ tapIndex, message }) => {
      console.log({ tapIndex, message });
    },
  });
}

export async function getOverviewActionModal({
  target,
  handleData,
  successCallback,
  successMessage = '',
  successMessageBuilder = null,
  showProcessing = true,
  textProcessing = '处理中, 请稍后',
}) {
  actionModalCore({
    title: `移除图片`,
    content: `即将移除图片，确定吗？`,
    confirmText: '确定',
    confirmColor: 'blue',
    cancelText: '取消',
    cancelColor: 'red',
    showCancel: true,
    target,
    handleData,
    successCallback,
    successMessage,
    successMessageBuilder,
    showProcessing,
    textProcessing,
    confirmAction: ({
      target: t,
      handleData: r,
      successCallback: sc,
      successMessage: sm,
      successMessageBuilder: smb,
      showProcessing: sp,
      textProcessing: tp,
    }) => {
      getOverviewAction({
        target: t,
        handleData: r,
        successCallback: sc,
        successMessage: sm,
        successMessageBuilder: smb,
        showProcessing: sp,
        textProcessing: tp,
      });
    },
    cancelCallback: ({ message }) => {
      console.log({ message });
    },
    errorCallback: ({ message }) => {
      console.log({ message });
    },
    completeCallback: ({ message, confirm, cancel, content }) => {
      console.log({
        message,
        confirm,
        cancel,
        content,
      });
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
