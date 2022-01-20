import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

import { showErrorMessage } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { underlyingState } from 'taro-fast-common/es/utils/constants';
import {
  ComponentBase,
  Notification,
} from 'taro-fast-common/es/customComponents';

class Infrastructure extends ComponentBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
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

  doOtherCheckComponentUpdate = () => {};

  doWorkWhenFirstShow = () => {};

  doWorkWhenRepeatedShow = () => {};

  doWorkWhenShow = () => {};

  doWorkAfterShow = () => {};

  doWorkWhenComponentHide = () => {};

  doWorkBeforeUnmount = () => {};

  doWorkAfterUnmount = () => {};

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

  bannerNotify = ({
    message,
    type = 'info',
    duration = 3000,
    customStyle = {},
    className = '',
  }) => {
    Taro.bannerNotify({
      message,
      type,
      duration,
      customStyle: customStyle,
      className: className,
    });
  };

  renderFurther() {
    return null;
  }

  render() {
    this.showRenderCount();

    return (
      <View>
        <Notification />

        {this.renderFurther()}
      </View>
    );
  }
}

export default Infrastructure;
