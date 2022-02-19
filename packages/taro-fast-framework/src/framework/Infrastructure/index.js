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

  viewStyle = {};

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...underlyingState,
      ...{
        spin: false,
        scrollView: false,
        enablePullDownRefresh: false,
        enableCustomPullDown: false,
        enableScrollLowerLoad: false,
        enableEmptyPlaceholder: false,
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
        scrollShowScrollbar: false,
        scrollFastDeceleration: false,
        lowerLoadingBoxPosition: 'footer',
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

  onRefresh = () => {};

  onScrollLowerLoad = () => {};

  showScrollRefreshing = () => {
    const { firstLoadSuccess, dataLoading, reloading } = this.state;

    return (!firstLoadSuccess && dataLoading) || reloading;
  };

  showScrollLowerLoading = () => {
    const { firstLoadSuccess, dataLoading } = this.state;

    return firstLoadSuccess && dataLoading;
  };

  showEmptyPlaceholder = () => {
    const { enableEmptyPlaceholder, firstLoadSuccess, metaListData } =
      this.state;

    return (
      enableEmptyPlaceholder &&
      firstLoadSuccess &&
      isArray(metaListData) &&
      metaListData.length === 0
    );
  };

  buildEmptyPlaceholder = () => {
    return null;
  };

  buildUpperBox = () => {
    return null;
  };

  /**
   * 判断时候还有更多数据, 用于分页加载场景, 默认范围 true, 可根据需要进行重载覆写
   * @returns bool
   */
  judgeNeedNextLoad = () => {
    return true;
  };

  buildRefreshingBox = () => null;

  /**
   * 构建外部加载提示组件
   * @returns
   */
  buildLowerLoadingBox = () => null;

  /**
   * 构建底部加载提示组件
   * @param {*} lowerLoading
   * @param {*} needNextLoad
   * @returns
   */
  // eslint-disable-next-line no-unused-vars
  lowerLoadingBoxBottom = (lowerLoading, needNextLoad) => null;

  renderView() {
    const {
      spin,
      scrollView,
      enablePullDownRefresh,
      enableCustomPullDown,
      enableScrollLowerLoad,
      enableEmptyPlaceholder,
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
      lowerLoadingBoxPosition,
    } = this.state;

    return (
      <Spin fullscreen spin={spin}>
        <Notification />

        <FadeView show={!spin}>
          <VariableView
            style={this.viewStyle}
            scroll={scrollView}
            height={height}
            enablePullDownRefresh={enablePullDownRefresh}
            enableScrollLowerLoad={enableScrollLowerLoad}
            enableCustomPullDown={enableCustomPullDown}
            enableEmptyPlaceholder={enableEmptyPlaceholder}
            refreshColor={refreshColor}
            refreshBackgroundColor={refreshBackgroundColor}
            scrollWithAnimation={scrollWithAnimation}
            scrollAnchoring={scrollAnchoring}
            scrollEnhanced={scrollEnhanced}
            scrollBounces={scrollBounces}
            scrollShowScrollbar={scrollShowScrollbar}
            scrollFastDeceleration={scrollFastDeceleration}
            scrollRefresherThreshold={scrollRefresherThreshold}
            scrollRefresherDefaultStyle={scrollRefresherDefaultStyle}
            scrollRefresherBackground={scrollRefresherBackground}
            onRefresh={this.onRefresh}
            onScrollLowerLoad={this.onScrollLowerLoad}
            refreshing={this.showScrollRefreshing()}
            lowerLoading={this.showScrollLowerLoading()}
            needNextLoad={this.judgeNeedNextLoad()}
            emptyPlaceholderVisible={this.showEmptyPlaceholder()}
            lowerLoadingBoxPosition={lowerLoadingBoxPosition}
            refreshingBox={this.buildRefreshingBox()}
            lowerLoadingBox={this.buildLowerLoadingBox()}
            lowerLoadingBoxBottom={this.lowerLoadingBoxBottom()}
            emptyPlaceholder={this.buildEmptyPlaceholder()}
            upperBox={this.buildUpperBox()}
          >
            {this.renderFurther()}
          </VariableView>
        </FadeView>
      </Spin>
    );
  }
}

export default Infrastructure;
