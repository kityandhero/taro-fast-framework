import { setStateDefaultCode } from 'easy-soft-dva';
import {
  buildPromptModuleInfo,
  logDebug,
  messageTypeCollection,
  setCacheMount,
  setErrorMessageDisplayMonitor,
  setInfoMessageDisplayMonitor,
  setLoggerDisplaySwitch,
  setOpenMessageDisplayMonitor,
  setSuccessMessageDisplayMonitor,
  setWarningMessageDisplayMonitor,
  setWarnMessageDisplayMonitor,
} from 'easy-soft-utility';

import Tips from 'taro-fast-common/es/utils/tips';
import {
  getTaroGlobalData,
  requestAnimationFrame,
  setLocalStorageHandler,
} from 'taro-fast-common/es/utils/tools';

import { defaultSettingsLayoutCustom } from './defaultSettingsSpecial';
import { modulePackageName } from './definition';

let configEnvironmentComplete = false;

/**
 * Module Name.
 */
const moduleName = 'configAssist';

function showMessage({ type, duration = 1500, text, onClose = () => {} }) {
  requestAnimationFrame(() => {
    switch (type) {
      case messageTypeCollection.success:
        Tips.success(text, duration, onClose);
        break;

      case messageTypeCollection.error:
        Tips.error(text, duration, onClose);
        break;

      case messageTypeCollection.info:
        Tips.info(text, duration, onClose);
        break;

      case messageTypeCollection.warning:
        Tips.warning(text, duration, onClose);
        break;

      case messageTypeCollection.warn:
        Tips.warn(text, duration, onClose);
        break;

      default:
        Tips.toast(text, duration, onClose);
        break;
    }
  });
}

function showSuccessMessage({ duration = 1500, text, onClose = () => {} }) {
  showMessage({
    type: messageTypeCollection.success,
    text,
    duration,
    onClose,
  });
}

function showErrorMessage({ duration = 1500, text, onClose = () => {} }) {
  showMessage({
    type: messageTypeCollection.error,
    text,
    duration,
    onClose,
  });
}

function showWarnMessage({ duration = 1500, text, onClose = () => {} }) {
  showMessage({
    type: messageTypeCollection.warn,
    text,
    duration,
    onClose,
  });
}

/**
 * 显示警告信息框
 */
function showWarningMessage({ duration = 1500, text, onClose = () => {} }) {
  showMessage({
    type: messageTypeCollection.warning,
    text,
    duration,
    onClose,
  });
}

/**
 * 显示消息信息
 */
function showInfoMessage({ duration = 1500, text, onClose = () => {} }) {
  showMessage({
    type: messageTypeCollection.info,
    text,
    duration,
    onClose,
  });
}

function showOpenMessage({ duration = 1500, text, onClose = () => {} }) {
  showMessage({
    type: messageTypeCollection.open,
    text,
    duration,
    onClose,
  });
}

export function configEnvironment() {
  if (configEnvironmentComplete) {
    return;
  }

  setLoggerDisplaySwitch(defaultSettingsLayoutCustom.getShowLogInConsole());

  setLocalStorageHandler();

  setStateDefaultCode(defaultSettingsLayoutCustom.getApiSuccessCode());

  setCacheMount(getTaroGlobalData());

  setInfoMessageDisplayMonitor(showInfoMessage);
  setOpenMessageDisplayMonitor(showOpenMessage);
  setWarnMessageDisplayMonitor(showWarnMessage);
  setWarningMessageDisplayMonitor(showWarningMessage);
  setSuccessMessageDisplayMonitor(showSuccessMessage);
  setErrorMessageDisplayMonitor(showErrorMessage);

  logDebug(
    buildPromptModuleInfo(
      modulePackageName,
      'configEnvironment -> config complete',
      moduleName,
    ),
  );
}
