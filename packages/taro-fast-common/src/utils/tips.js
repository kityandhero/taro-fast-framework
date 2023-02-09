import Taro from '@tarojs/taro';

import { isFunction, logException } from 'easy-soft-utility';

/**
 * 提示与加载工具类
 */
const Tips = {
  isLoading: false,

  /**
   * 信息提示
   */
  toast(title, duration = 1500, closeCallback = null) {
    setTimeout(() => {
      Taro.showToast({
        title: title || '',
        icon: 'none',
        mask: true,
        duration: duration,
      })
        .then((response) => {
          if (isFunction(closeCallback)) {
            setTimeout(() => {
              closeCallback(response);
            }, 500);
          }

          return response;
        })
        .catch((error) => {
          logException(error);
        });
    }, 500);
  },

  /**
   * 弹出加载提示
   */
  loading(title = '加载中', force = false) {
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
  },

  /**
   * 加载完毕
   */
  loaded() {
    let duration = 0;

    if (this.isLoading) {
      this.isLoading = false;
      if (Taro.hideLoading) {
        Taro.hideLoading();
      } else {
        if (process.env.TARO_ENV === 'weapp') {
          Taro.hideNavigationBarLoading();
        }
      }

      duration = 500;
    }
    // 隐藏动画大约500ms, 避免后面直接toast时的显示bug
    return new Promise((resolve) => setTimeout(resolve, duration));
  },

  /**
   * 弹出成功提示框
   */
  success(title, duration = 1500, closeCallback = null) {
    setTimeout(() => {
      Taro.showToast({
        title: title || '',
        icon: 'success',
        mask: true,
        duration: duration,
      })
        .then((response) => {
          if (isFunction(closeCallback)) {
            closeCallback(response);
          }

          return response;
        })
        .catch((error) => {
          logException(error);
        });
    }, 500);
  },

  /**
   * 弹出错误提示框
   */
  error(title, duration = 1500, closeCallback = null) {
    setTimeout(() => {
      Taro.showToast({
        title: title || '',
        icon: 'none',
        mask: true,
        duration: duration,
      })
        .then((response) => {
          if (isFunction(closeCallback)) {
            closeCallback(response);
          }

          return response;
        })
        .catch((error) => {
          logException(error);
        });
    }, 500);
  },

  /**
   * 弹出警告提示框
   */
  warning(title, duration = 1500, closeCallback = null) {
    setTimeout(() => {
      Taro.showToast({
        title: title || '',
        icon: 'none',
        mask: true,
        duration: duration,
      })
        .then((response) => {
          if (isFunction(closeCallback)) {
            closeCallback(response);
          }

          return response;
        })
        .catch((error) => {
          logException(error);
        });
    }, 500);
  },

  /**
   * 弹出警告提示框
   */
  warn(title, duration = 1500, closeCallback = null) {
    setTimeout(() => {
      Taro.showToast({
        title: title || '',
        icon: 'none',
        mask: true,
        duration: duration,
      })
        .then((response) => {
          if (isFunction(closeCallback)) {
            closeCallback(response);
          }

          return response;
        })
        .catch((error) => {
          logException(error);
        });
    }, 500);
  },

  /**
   * 弹出警告提示框
   */
  info(title, duration = 1500, closeCallback = null) {
    setTimeout(() => {
      Taro.showToast({
        title: title || '',
        icon: 'none',
        mask: true,
        duration: duration,
      })
        .then((response) => {
          if (isFunction(closeCallback)) {
            closeCallback(response);
          }

          return response;
        })
        .catch((error) => {
          logException(error);
        });
    }, 500);
  },
};

export { Tips };
