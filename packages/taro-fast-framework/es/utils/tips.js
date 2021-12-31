import { a as _createClass, _ as _classCallCheck } from '../classCallCheck.js';
import { _ as _defineProperty } from '../defineProperty.js';
import 'lodash';
import { isFunction } from './typeCheck.js';
import Taro from '@tarojs/taro';

/**
 * 提示与加载工具类
 */

var Tips = /*#__PURE__*/function () {
  function Tips() {
    _classCallCheck(this, Tips);
  }

  _createClass(Tips, null, [{
    key: "toast",
    value:
    /**
     * 信息提示
     */
    function toast(title) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
      var closeCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      setTimeout(function () {
        Taro.showToast({
          title: title || "",
          icon: "none",
          mask: true,
          duration: duration
        }).then(function (res) {
          if (isFunction(closeCallback)) {
            setTimeout(function () {
              closeCallback(res);
            }, 500);
          }
        });
      }, 0);
    }
    /**
     * 弹出加载提示
     */

  }, {
    key: "loading",
    value: function loading() {
      var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "加载中";
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this.isLoading && !force) {
        return;
      }

      this.isLoading = true;

      if (Taro.showLoading) {
        Taro.showLoading({
          title: title || "",
          mask: true
        });
      } else {
        Taro.showNavigationBarLoading();
      }
    }
    /**
     * 加载完毕
     */

  }, {
    key: "loaded",
    value: function loaded() {
      var duration = 0;

      if (this.isLoading) {
        this.isLoading = false;

        if (Taro.hideLoading) {
          Taro.hideLoading();
        } else {
          Taro.hideNavigationBarLoading();
        }

        duration = 500;
      } // 隐藏动画大约500ms，避免后面直接toast时的显示bug


      return new Promise(function (resolve) {
        return setTimeout(resolve, duration);
      });
    }
    /**
     * 弹出成功提示框
     */

  }, {
    key: "success",
    value: function success(title) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
      var closeCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      setTimeout(function () {
        Taro.showToast({
          title: title || "",
          icon: "success",
          mask: true,
          duration: duration
        }).then(function (res) {
          if (isFunction(closeCallback)) {
            closeCallback(res);
          }
        });
      }, 0);
    }
    /**
     * 弹出警告提示框
     */

  }, {
    key: "info",
    value: function info(title) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
      var closeCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      setTimeout(function () {
        Taro.showToast({
          title: title || "",
          icon: "none",
          mask: true,
          duration: duration
        }).then(function (res) {
          if (isFunction(closeCallback)) {
            closeCallback(res);
          }
        });
      }, 0);
    }
  }]);

  return Tips;
}();

_defineProperty(Tips, "isLoading", false);

export default Tips;
