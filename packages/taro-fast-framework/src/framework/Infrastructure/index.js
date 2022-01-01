import Taro from '@tarojs/taro';
import { Component } from 'react';

import { showErrorMessage } from '../../utils/tools';
import { isObject } from '../../utils/typeCheck';
import { underlyingState } from '../../utils/constants';

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

class Infrastructure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...underlyingState,
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  /**
   * 该生命周期不产生控制台输出
   */
  componentWillMount() {
    this.doWorkBeforeAdjustWillMount();

    this.doWorkAdjustWillMount();

    this.doWorkAfterAdjustWillMount();
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

  firstShowHasTriggered = false;

  loadRemoteRequestAfterMount = false;

  /**
   *显示render次数开关, 用于开发时候调试页面渲染性能
   */
  showRenderCountInConsole = false;

  renderCount = 0;

  doWorkBeforeAdjustWillMount = () => {};

  doWorkAdjustWillMount = () => {};

  doWorkAfterAdjustWillMount = () => {};

  checkPermission = () => {};

  doWorkBeforeAdjustDidMount = () => {};

  doWorkAdjustDidMount = () => {};

  doWorkAfterAdjustDidMount = () => {};

  doWorkAfterDidMount = () => {};

  doLoadRemoteRequest = () => {};

  doOtherRemoteRequest = () => {};

  doOtherWorkAfterDidMount = () => {};

  doWorkWhenGetSnapshotBeforeUpdate = () => {};

  doWorkWhenDidUpdate = () => {};

  doOtherCheckComponentUpdate = () => {};

  doWorkWhenFirstShow = () => {};

  doWorkWhenRepeatedShow = () => {};

  doWorkWhenShow = () => {};

  doWorkAfterShow = () => {};

  doWorkWhenComponentHide = () => {};

  doWorkBeforeUnmount = () => {};

  doWorkAfterUnmount = () => {};

  getUrlParams() {
    return this.$router.params;
  }

  getSetting(params) {
    Taro.getSetting(params);
  }

  switchTab(params) {
    Taro.switchTab(params);
  }

  reLaunch(params) {
    Taro.reLaunch(params);
  }

  navigateTo(params) {
    Taro.navigateTo(params);
  }

  redirectTo(params) {
    Taro.redirectTo(params);
  }

  navigateBack(params) {
    Taro.navigateBack(params);
  }

  getSystemInfoSync() {
    return Taro.getSystemInfoSync();
  }

  createSelectorQuery() {
    return Taro.createSelectorQuery();
  }

  createAnimation(params) {
    return Taro.createAnimation(params);
  }

  getPhoneLocation(params) {
    return Taro.getLocation(params);
  }

  requestPayment(params) {
    return Taro.requestPayment(params);
  }

  uploadFile(params) {
    return Taro.uploadFile(params);
  }

  downloadFile(params) {
    return Taro.downloadFile(params);
  }

  getClipboardData(params) {
    return Taro.getClipboardData(params);
  }

  setClipboardData(params) {
    return Taro.setClipboardData(params);
  }

  makePhoneCall(params) {
    return Taro.makePhoneCall(params);
  }

  setNavigationBarTitle(params) {
    return Taro.setNavigationBarTitle(params);
  }

  showNavigationBarLoading() {
    Taro.showNavigationBarLoading();
  }

  hideNavigationBarLoading() {
    Taro.hideNavigationBarLoading();
  }

  stopPullDownRefresh() {
    Taro.stopPullDownRefresh();
  }

  /**
   * 判断小程序的API, 回调, 参数, 组件等是否在当前版本可用
   * @param {*} schema
   */
  canIUse(schema) {
    return Taro.canIUse(schema);
  }

  getUpdateManager() {
    return Taro.getUpdateManager();
  }

  showModal(params) {
    return Taro.showModal(params);
  }

  getCurrentPages() {
    return Taro.getCurrentPages();
  }

  showRenderCount() {
    if (this.showRenderCountInConsole) {
      this.renderCount += 1;

      console.log(`render frequency: ${this.renderCount}`);
    }
  }

  checkWorkDoing() {
    const {
      dataLoading,
      reloading,
      searching,
      refreshing,
      paging,
      processing,
    } = this.state;

    if (
      dataLoading ||
      reloading ||
      searching ||
      refreshing ||
      paging ||
      processing
    ) {
      const text = '数据正在处理中, 请稍等一下再点哦';

      showErrorMessage({
        message: text,
      });

      return true;
    }

    return false;
  }

  renderFurther() {
    return null;
  }

  render() {
    this.showRenderCount();

    return this.renderFurther();
  }
}

export default Infrastructure;
