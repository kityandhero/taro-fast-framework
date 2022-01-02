import { _ as _inherits, a as _createSuper, b as _classCallCheck, c as _createClass, j as jsxRuntime_1 } from '../../jsx-runtime.js';
import { PureComponent } from 'react';
import { View } from '@tarojs/components';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

var VerticalBox = /*#__PURE__*/function (_PureComponent) {
  _inherits(VerticalBox, _PureComponent);

  var _super = _createSuper(VerticalBox);

  function VerticalBox() {
    _classCallCheck(this, VerticalBox);

    return _super.apply(this, arguments);
  }

  _createClass(VerticalBox, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          style = _this$props.style,
          align = _this$props.align,
          alignJustify = _this$props.alignJustify;
      var alignStyle = "center";

      switch (align) {
        case "top":
          alignStyle = "flex-start";
          break;

        case "center":
          alignStyle = "center";
          break;

        case "bottom":
          alignStyle = "flex-end";
          break;

        default:
          alignStyle = "center";
          break;
      }

      var alignJustifyStyle = "flex-start";

      switch (alignJustify) {
        case "start":
          alignJustifyStyle = "flex-start";
          break;

        case "center":
          alignJustifyStyle = "center";
          break;

        case "end":
          alignJustifyStyle = "flex-end";
          break;

        case "between":
          alignJustifyStyle = "space-between";
          break;

        case "around":
          alignJustifyStyle = "space-around";
          break;

        default:
          alignJustifyStyle = "flex-start";
          break;
      }

      var flexStyle = _objectSpread2(_objectSpread2(_objectSpread2({}, style || {}), {
        display: "flex",
        width: "100%",
        height: "100%"
      }), {
        alignItems: alignStyle,
        justifyContent: alignJustifyStyle
      });

      return /*#__PURE__*/jsxRuntime_1(View, {
        children: /*#__PURE__*/jsxRuntime_1(View, {
          style: flexStyle,
          children: this.props.children
        })
      });
    }
  }]);

  return VerticalBox;
}(PureComponent);

VerticalBox.defaultProps = {
  fitWidth: true,
  style: {},
  align: "center",
  alignJustify: "flex-start"
};

export { VerticalBox as default };
