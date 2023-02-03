import { logObject, logText } from 'easy-soft-utility';

import {
  actionCore,
  actionModalCore,
  actionSheetCore,
} from 'taro-fast-framework';

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
    api: 'simulation/getOverview',
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
    api: 'simulation/pageList',
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

export async function getOverviewActionSheet({
  target,
  handleData,
  successCallback,
  successMessage = '执行成功',
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
      logText({ message });
    },
    completeCallback: ({ tapIndex, message }) => {
      logText({ tapIndex, message });
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
      logText({ message });
    },
    errorCallback: ({ message }) => {
      logText({ message });
    },
    completeCallback: ({ message, confirm, cancel, content }) => {
      logObject({
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
