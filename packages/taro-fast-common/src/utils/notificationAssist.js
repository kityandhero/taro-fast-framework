import Taro from '@tarojs/taro';

import {
  checkStringIsNullOrWhiteSpace,
  notificationTypeCollection,
  setErrorNotificationDisplayMonitor,
  setInfoNotificationDisplayMonitor,
  setLoadingNotificationDisplayMonitor,
  setOpenNotificationDisplayMonitor,
  setSuccessNotificationDisplayMonitor,
  setWarningNotificationDisplayMonitor,
  setWarnNotificationDisplayMonitor,
} from 'easy-soft-utility';

/**
 * 发送页面通知
 */
export function notify({
  type,
  title = '',
  description = '',
  placement,
  duration = 3000,
  onClose = () => {},
}) {
  setTimeout(() => {
    Taro.notifyMessage({
      title,
      message: description,
      type,
      duration,
      placement,
      onClose,
    });
  }, 600);
}

function showOpenNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  notify({
    type: notificationTypeCollection.open,
    title,
    description,
    placement,
    duration,
    onClose,
  });
}

function showLoadingNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  notify({
    type: notificationTypeCollection.loading,
    title,
    description,
    placement,
    duration,
    onClose,
  });
}

function showInfoNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  notify({
    type: notificationTypeCollection.info,
    title,
    description,
    placement,
    duration,
    onClose,
  });
}

function showWarnNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  notify({
    type: notificationTypeCollection.warn,
    title,
    description,
    placement,
    duration,
    onClose,
  });
}

function showWarningNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  notify({
    type: notificationTypeCollection.warning,
    title,
    description,
    placement,
    duration,
    onClose,
  });
}

function showSuccessNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  notify({
    type: notificationTypeCollection.success,
    title,
    description: checkStringIsNullOrWhiteSpace(description)
      ? '操作成功，请进行后续操作。'
      : description,
    placement,
    duration,
    onClose,
  });
}

function showErrorNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  notify({
    type: notificationTypeCollection.error,
    title,
    description,
    placement,
    duration,
    onClose,
  });
}

/**
 * 设置 NotificationDisplayMonitor 显示处理
 */
export function setNotificationDisplayMonitor() {
  setOpenNotificationDisplayMonitor(showOpenNotification);
  setLoadingNotificationDisplayMonitor(showLoadingNotification);
  setInfoNotificationDisplayMonitor(showInfoNotification);
  setWarnNotificationDisplayMonitor(showWarnNotification);
  setWarningNotificationDisplayMonitor(showWarningNotification);
  setSuccessNotificationDisplayMonitor(showSuccessNotification);
  setErrorNotificationDisplayMonitor(showErrorNotification);
}
