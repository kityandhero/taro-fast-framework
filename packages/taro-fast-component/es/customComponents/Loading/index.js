import { _ as _inherits, a as _createSuper, b as _classCallCheck, c as _createClass, d as jsxRuntime_2, j as jsxRuntime_1 } from '../../jsx-runtime.js';
import { Component } from 'react';
import { View } from '@tarojs/components';
import { pxTransform } from 'taro-fast-component/es/utils/tools';
import { toString, toNumber } from 'taro-fast-component/es/utils/typeConvert';

var Loading = /*#__PURE__*/function (_Component) {
  _inherits(Loading, _Component);

  var _super = _createSuper(Loading);

  function Loading() {
    _classCallCheck(this, Loading);

    return _super.apply(this, arguments);
  }

  _createClass(Loading, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          color = _this$props.color,
          size = _this$props.size;
      var loadingSize = typeof size === 'string' ? size : toString(size);
      var sizeStyle = {
        width: size ? "".concat(pxTransform(toNumber(loadingSize))) : '',
        height: size ? "".concat(pxTransform(toNumber(loadingSize))) : ''
      };
      var colorStyle = {
        border: color ? "1px solid ".concat(color) : '',
        borderColor: color ? "".concat(color, " transparent transparent transparent") : ''
      };
      var ringStyle = Object.assign({}, colorStyle, sizeStyle);
      return /*#__PURE__*/jsxRuntime_2(View, {
        className: "tff_loading",
        style: sizeStyle,
        children: [/*#__PURE__*/jsxRuntime_1(View, {
          className: "tff_loading__ring",
          style: ringStyle
        }), /*#__PURE__*/jsxRuntime_1(View, {
          className: "tff_loading__ring",
          style: ringStyle
        }), /*#__PURE__*/jsxRuntime_1(View, {
          className: "tff_loading__ring",
          style: ringStyle
        })]
      });
    }
  }]);

  return Loading;
}(Component);

Loading.defaultProps = {
  size: 0,
  color: ''
};

export { Loading as default };
