import { setLocalStorageHandler } from './localStorageAssist';
import { setNavigationHandler } from './navigationAssist';

/**
 * 设置 easy-soft-utility 处理器
 */
export function setEasySoftUtilityHandler() {
  setLocalStorageHandler();
  setNavigationHandler();
}
