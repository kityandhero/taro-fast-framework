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
import {
  VariableView,
  Spin,
  FadeView,
} from 'taro-fast-component/es/customComponents';
import { isArray } from 'taro-fast-common/es/utils/typeCheck';

class Infrastructure extends ComponentBase {
  urlParamsCore = null;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...underlyingState,
      ...{
        spin: false,
        scrollView: false,
        pullDownRefresh: false,
        useCustomPullDown: false,
        scrollRefresherThreshold: 100,
        scrollRefresherDefaultStyle: 'white',
        scrollRefresherBackground: '',
        height: '100vh',
        refreshColor: '',
        refreshBackgroundColor: '',
        scrollWithAnimation: true,
        scrollAnchoring: true,
        scrollEnhanced: true,
        scrollBounces: true,
        scrollShowScrollbar: true,
        scrollFastDeceleration: true,
        useScrollEmptyPlaceholder: true,
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

  onScrollLowerLoad = () => {};

  showScrollRefreshing = () => {
    const { firstLoadSuccess, dataLoading, reloading } = this.state;

    return (!firstLoadSuccess && dataLoading) || reloading;
  };

  showScrollLowerLoading = () => {
    const { firstLoadSuccess, dataLoading } = this.state;

    return firstLoadSuccess && dataLoading;
  };

  showScrollEmptyPlaceholder = () => {
    const { useScrollEmptyPlaceholder, firstLoadSuccess, metaListData } =
      this.state;

    return (
      useScrollEmptyPlaceholder &&
      firstLoadSuccess &&
      isArray(metaListData) &&
      metaListData.length === 0
    );
  };

  buildScrollEmptyPlaceholder = () => {
    return null;
  };

  renderView() {
    const {
      spin,
      scrollView,
      pullDownRefresh,
      useCustomPullDown,
      scrollRefresherThreshold,
      scrollRefresherDefaultStyle,
      scrollRefresherBackground,
      height,
      refreshColor,
      refreshBackgroundColor,
      scrollWithAnimation,
      scrollAnchoring,
      scrollEnhanced,
      scrollBounces,
      scrollShowScrollbar,
      scrollFastDeceleration,
    } = this.state;

    return (
      <Spin fullscreen spin={spin}>
        <Notification />

        <FadeView show={!spin}>
          <VariableView
            scroll={scrollView}
            height={height}
            refreshColor={refreshColor}
            refreshBackgroundColor={refreshBackgroundColor}
            scrollWithAnimation={scrollWithAnimation}
            scrollAnchoring={scrollAnchoring}
            scrollEnhanced={scrollEnhanced}
            scrollBounces={scrollBounces}
            scrollShowScrollbar={scrollShowScrollbar}
            scrollFastDeceleration={scrollFastDeceleration}
            enablePullDownRefresh={pullDownRefresh}
            useCustomPullDown={useCustomPullDown}
            scrollRefresherThreshold={scrollRefresherThreshold}
            scrollRefresherDefaultStyle={scrollRefresherDefaultStyle}
            scrollRefresherBackground={scrollRefresherBackground}
            onReload={this.onReload}
            onScrollLowerLoad={this.onScrollLowerLoad}
            refreshing={this.showScrollRefreshing()}
            lowerLoading={this.showScrollLowerLoading()}
            showScrollEmptyPlaceholder={this.showScrollEmptyPlaceholder()}
            scrollEmptyPlaceholder={this.buildScrollEmptyPlaceholder()}
          >
            {this.renderFurther()}
          </VariableView>
        </FadeView>
      </Spin>
    );
  }
}

export default Infrastructure;
