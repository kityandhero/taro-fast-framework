import Taro from '@tarojs/taro';

import { isFunction } from './typeCheck';

/**
 * 提示与加载工具类
 */
export default class Tips {
  static isLoading = false;

  /**
   * 信息提示
   */
  static toast(title, duration = 1500, closeCallback = null) {
    setTimeout(() => {
      Taro.showToast({
        title: title || '',
        icon: 'none',
        mask: true,
        duration: duration,
      }).then((res) => {
        if (isFunction(closeCallback)) {
          setTimeout(() => {
            closeCallback(res);
          }, 500);
        }
      });
    }, 500);
  }

  /**
   * 弹出加载提示
   */
  static loading(title = '加载中', force = false) {
    if (this.isLoading && !force) {
      return;
    }

    this.isLoading = true;

    if (Taro.showLoading) {
      Taro.showLoading({
        title: title || '',
        mask: true,
      });
    } else {
      Taro.showNavigationBarLoading();
    }
  }

  /**
   * 加载完毕
   */
  static loaded() {
    let duration = 0;

    if (this.isLoading) {
      this.isLoading = false;
      if (Taro.hideLoading) {
        Taro.hideLoading();
      } else {
        Taro.hideNavigationBarLoading();
      }
      duration = 500;
    }
    // 隐藏动画大约500ms, 避免后面直接toast时的显示bug
    return new Promise((resolve) => setTimeout(resolve, duration));
  }

  /**
   * 弹出成功提示框
   */
  static success(title, duration = 1500, closeCallback = null) {
    setTimeout(() => {
      Taro.showToast({
        title: title || '',
        icon: 'success',
        mask: true,
        duration: duration,
      }).then((res) => {
        if (isFunction(closeCallback)) {
          closeCallback(res);
        }
      });
    }, 500);
  }

  /**
   * 弹出错误提示框
   */
  static error(title, duration = 1500, closeCallback = null) {
    setTimeout(() => {
      Taro.showToast({
        title: title || '',
        icon: 'none',
        mask: true,
        duration: duration,
      }).then((res) => {
        if (isFunction(closeCallback)) {
          closeCallback(res);
        }
      });
    }, 500);
  }

  /**
   * 弹出警告提示框
   */
  static warning(title, duration = 1500, closeCallback = null) {
    setTimeout(() => {
      Taro.showToast({
        title: title || '',
        icon: 'none',
        mask: true,
        duration: duration,
      }).then((res) => {
        if (isFunction(closeCallback)) {
          closeCallback(res);
        }
      });
    }, 500);
  }

  /**
   * 弹出警告提示框
   */
  static warn(title, duration = 1500, closeCallback = null) {
    setTimeout(() => {
      Taro.showToast({
        title: title || '',
        icon: 'none',
        mask: true,
        duration: duration,
      }).then((res) => {
        if (isFunction(closeCallback)) {
          closeCallback(res);
        }
      });
    }, 500);
  }

  /**
   * 弹出警告提示框
   */
  static info(title, duration = 1500, closeCallback = null) {
    setTimeout(() => {
      Taro.showToast({
        title: title || '',
        icon: 'none',
        mask: true,
        duration: duration,
      }).then((res) => {
        if (isFunction(closeCallback)) {
          closeCallback(res);
        }
      });
    }, 500);
  }
}
