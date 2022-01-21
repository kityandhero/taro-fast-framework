import { Component } from 'react';

import { recordError, showErrorMessage, recordText } from '../../utils/tools';
import { isFunction, isObject } from '../../utils/typeCheck';

const hasOwnProperty = Object.prototype.hasOwnProperty;

function filterModel(props) {
  const result = { ...props };

  delete result.loading;

  Object.entries(result).forEach((o) => {
    const [k, v] = o;

    if (isObject(v)) {
      if (!!v.fromRemote) {
        delete result[k];
      }
    }
  });

  return result;
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(a, b) {
  // 调用Object.is判断是否相等, 相同返回true, 不同返回false
  if (Object.is(a, b)) {
    return true;
  }

  // object.is比较发现不等, 但并不代表真的不等, object对象还需要比较
  // 这里判断是否是object, 如果不是, 那直接返回false
  if (
    typeof a !== 'object' ||
    a === null ||
    typeof b !== 'object' ||
    b === null
  ) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // 比较对象中的keys长度, 不等返回false
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 比较对象中相同的key的val是否相等
  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call(b, keysA[i]) ||
      !Object.is(a[keysA[i]], b[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
}

class ComponentBase extends Component {
  loadRemoteRequestAfterMount = false;

  firstShowHasTriggered = false;

  /**
   *显示render次数开关, 用于开发时候调试页面渲染性能
   */
  showRenderCountInConsole = false;

  renderCount = 0;

  constructor(props) {
    super(props);

    const { showRenderCount } = props;

    this.showRenderCountInConsole =
      this.showRenderCountInConsole || !!showRenderCount;

    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidMount() {
    this.checkPermission();

    this.doWorkBeforeAdjustDidMount();

    this.doWorkAdjustDidMount();

    this.doWorkAfterAdjustDidMount();

    this.doWorkAfterDidMount();

    if (this.loadRemoteRequestAfterMount) {
      this.doLoadRemoteRequest();
    }

    this.doOtherRemoteRequest();

    this.doOtherWorkAfterDidMount();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { dispatchComplete } = {
      ...{ dispatchComplete: true },
      ...nextState,
    };

    if (!!!dispatchComplete) {
      return false;
    }

    const checkComponentUpdate = this.doOtherCheckComponentUpdate(
      nextProps,
      nextState,
    );

    if ((checkComponentUpdate || null) != null) {
      return !!checkComponentUpdate;
    }

    const nextPropsIgnoreModel = filterModel(nextProps);
    const currentPropsIgnoreModel = filterModel(this.props);

    return (
      !shallowEqual(nextPropsIgnoreModel, currentPropsIgnoreModel) ||
      !shallowEqual(nextState, this.state)
    );
  }

  componentDidCatchError(error, info) {
    this.doWhenCatchError(error, info);
  }

  // eslint-disable-next-line react/sort-comp
  getSnapshotBeforeUpdate(preProps, preState) {
    return this.doWorkWhenGetSnapshotBeforeUpdate(preProps, preState);
  }

  componentDidUpdate(preProps, preState, snapshot) {
    this.doWorkWhenDidUpdate(preProps, preState, snapshot);
  }

  componentWillUnmount() {
    this.doWorkBeforeUnmount();

    this.setState = () => {};

    this.doWorkAfterUnmount();
  }

  componentDidShow() {
    if (!this.firstShowHasTriggered) {
      this.doWorkWhenFirstShow();

      this.firstShowHasTriggered = true;
    }

    this.doWorkWhenRepeatedShow();

    this.doWorkWhenShow();

    this.doWorkAfterShow();
  }

  componentDidHide() {
    this.doWorkWhenComponentHide();
  }

  checkPermission = () => {};

  doWorkBeforeAdjustDidMount = () => {};

  doWorkAdjustDidMount = () => {};

  doWorkAfterAdjustDidMount = () => {};

  doWorkAfterDidMount = () => {};

  doLoadRemoteRequest = () => {};

  doOtherRemoteRequest = () => {};

  doOtherWorkAfterDidMount = () => {};

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {};

  doOtherCheckComponentUpdate = () => {};

  doWorkWhenGetSnapshotBeforeUpdate = () => {};

  doWhenCatchError = (error, info) => {
    showErrorMessage({
      message: 'error occurred, please view in console.',
    });

    recordError({
      error,
      info,
    });
  };

  doWorkBeforeUnmount = () => {};

  doWorkAfterUnmount = () => {};

  doWorkWhenFirstShow = () => {};

  doWorkWhenRepeatedShow = () => {};

  doWorkWhenShow = () => {};

  doWorkAfterShow = () => {};

  doWorkWhenComponentHide = () => {};

  /**
   * 当登录失败时调用
   * @param {*} remoteData [object] 远程返回数据
   * @param {*} callback [function] 登录失败回调函数
   */
  // eslint-disable-next-line no-unused-vars
  doWhenAuthorizeFail = (remoteData, callback) => {
    if (isFunction(callback)) {
      callback(remoteData);
    }
  };

  /**
   * 登录失败时的回调定义
   * @param {*} remoteData [object] 远程返回数据
   */
  // eslint-disable-next-line no-unused-vars
  authorizeFailCallback = (remoteData) => {};

  showRenderCount() {
    if (this.showRenderCountInConsole) {
      this.renderCount += 1;

      recordText({ renderFrequency: this.renderCount });
    }
  }

  renderFurther() {
    return null;
  }

  renderView() {
    return this.renderFurther();
  }

  render() {
    this.showRenderCount();

    return this.renderView();
  }
}

export default ComponentBase;
