import {
  logDevelop,
  messageTypeCollection,
  setErrorMessageDisplayMonitor,
  setInfoMessageDisplayMonitor,
  setOpenMessageDisplayMonitor,
  setSuccessMessageDisplayMonitor,
  setWarningMessageDisplayMonitor,
  setWarnMessageDisplayMonitor,
} from 'easy-soft-utility';

import { buildPromptModuleInfoText } from './definition';
import { Tips } from './tips';

/**
 * Module Name.
 */
const moduleName = 'messageAssist';

function showMessage({ type, duration = 1500, text, onClose = () => {} }) {
  requestAnimationFrame(() => {
    switch (type) {
      case messageTypeCollection.success: {
        Tips.success(text, duration, onClose);
        break;
      }

      case messageTypeCollection.error: {
        Tips.error(text, duration, onClose);
        break;
      }

      case messageTypeCollection.info: {
        Tips.info(text, duration, onClose);
        break;
      }

      case messageTypeCollection.warning: {
        Tips.warning(text, duration, onClose);
        break;
      }

      case messageTypeCollection.warn: {
        Tips.warn(text, duration, onClose);
        break;
      }

      default: {
        Tips.toast(text, duration, onClose);
        break;
      }
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

/**
 * 设置 MessageDisplayMonitor 显示处理
 */
export function setMessageDisplayMonitor() {
  logDevelop(
    {},
    buildPromptModuleInfoText(
      moduleName,
      'setMessageDisplayMonitor',
      'fill implementation with easy-soft-utility',
    ),
  );

  setInfoMessageDisplayMonitor(showInfoMessage);
  setOpenMessageDisplayMonitor(showOpenMessage);
  setWarnMessageDisplayMonitor(showWarnMessage);
  setWarningMessageDisplayMonitor(showWarningMessage);
  setSuccessMessageDisplayMonitor(showSuccessMessage);
  setErrorMessageDisplayMonitor(showErrorMessage);
}
