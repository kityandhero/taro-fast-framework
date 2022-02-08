import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

import { showErrorMessage } from 'taro-fast-common/es/utils/tools';
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

  renderView() {
    return (
      <View>
        <Notification />

        {this.renderFurther()}
      </View>
    );
  }
}

export default Infrastructure;
