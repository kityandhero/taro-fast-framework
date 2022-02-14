import Taro from '@tarojs/taro';

import {
  showErrorMessage,
  stringIsNullOrWhiteSpace,
  navigateTo,
} from 'taro-fast-common/es/utils/tools';
import { underlyingState } from 'taro-fast-common/es/utils/constants';
import {
  ComponentBase,
  Notification,
} from 'taro-fast-common/es/customComponents';
import { VariableView } from 'taro-fast-component/es/customComponents';

class Infrastructure extends ComponentBase {
  urlParamsCore = null;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...underlyingState,
      ...{
        scrollView: false,
        pullDownRefresh: false,
        height: '100vh',
        refreshColor: '',
        refreshBackgroundColor: '',
      },
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  getUrlParams() {
    if (stringIsNullOrWhiteSpace(this.urlParamsCore)) {
      this.urlParamsCore = Taro.getCurrentInstance().router.params;
    }

    return this.urlParamsCore || {};
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

  goToWebPage(pagePath, title, url) {
    if (stringIsNullOrWhiteSpace(url)) {
      const text = '缺少目标页面地址, 无法跳转';

      showErrorMessage({
        message: text,
      });

      return;
    }

    const titleEncode = encodeURIComponent(title || '');
    const urlEncode = encodeURIComponent(url);

    navigateTo(`${pagePath}?title=${titleEncode}&url=${urlEncode}`);
  }

  onReload = () => {};

  onLoadMore = () => {};

  renderView() {
    const {
      scrollView,
      pullDownRefresh,
      height,
      refreshColor,
      refreshBackgroundColor,
    } = this.state;

    return (
      <VariableView
        scroll={scrollView}
        height={height}
        refreshColor={refreshColor}
        refreshBackgroundColor={refreshBackgroundColor}
        enablePullDownRefresh={pullDownRefresh}
        onReload={this.onReload}
        onLoadMore={this.onLoadMore}
      >
        <Notification />

        {this.renderFurther()}
      </VariableView>
    );
  }
}

export default Infrastructure;
