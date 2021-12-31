import { _ as _classCallCheck, a as _createClass } from '../../classCallCheck.js';
import { _ as _inherits, a as _createSuper, b as _assertThisInitialized } from '../../createSuper.js';
import '../../_commonjsHelpers.js';
import { _ as _defineProperty } from '../../defineProperty.js';
import { Component } from 'react';

var AppComponent = /*#__PURE__*/function (_Component) {
  _inherits(AppComponent, _Component);

  var _super = _createSuper(AppComponent);

  function AppComponent() {
    var _this;

    _classCallCheck(this, AppComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "taroGlobalData", {
      test: "success"
    });

    return _this;
  }

  return _createClass(AppComponent);
}(Component);

export default AppComponent;
