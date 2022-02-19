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
import { isArray, isFunction } from 'taro-fast-common/es/utils/typeCheck';

class Infrastructure extends ComponentBase {
  useFadeSpinWrapper = false;

  useSimulationFadeSpin = false;

  hideFadeSpinWrapperAfterLoadRemoteRequest = false;

  simulationFadeSpinDuration = 300;

  urlParamsCore = null;

  viewStyle = {};

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...underlyingState,
      ...{
        spin: true,
        scrollView: false,
        enablePullDownRefresh: false,
        enableCustomPullDown: false,
        enableScrollLowerLoad: false,
        enableEmptyPlaceholder: false,
        enableInitialActivityIndicator: false,
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
        scrollFastDeceleration: false,
        lowerLoadingPosition: 'footer',
      },
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  doDidMountTask = () => {
    this.checkPermission();

    this.doWorkBeforeAdjustDidMount();

    this.doWorkAdjustDidMount();

    this.doWorkAfterAdjustDidMount();

    this.doWorkAfterDidMount();

    if (this.loadRemoteRequestAfterMount) {
      this.doSimulationFadeSpin(this.doLoadRemoteRequest);
    } else {
      this.doSimulationFadeSpin();
    }

    this.doOtherRemoteRequest();

    this.doOtherWorkAfterDidMount();
  };

  /**
   * 执行模拟渐显加载效果, 该方法不要覆写
   */
  doSimulationFadeSpin = (callback = null) => {
    const { spin } = this.state;

    const that = this;

    if (that.useSimulationFadeSpin && spin) {
      setTimeout(() => {
        that.setState({ spin: false }, () => {
          if (isFunction(callback)) {
            callback();
          }
        });
      }, that.simulationFadeSpinDuration);
    } else {
      if (isFunction(callback)) {
        callback();
      }
    }
  };

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
    const {
      enableInitialActivityIndicator,
      firstLoadSuccess,
      dataLoading,
      reloading,
    } = this.state;

    return (
      (!enableInitialActivityIndicator && !firstLoadSuccess && dataLoading) ||
      reloading
    );
  };

  showScrollLowerLoading = () => {
    const {
      enableInitialActivityIndicator,
      enablePullDownRefresh,
      firstLoadSuccess,
      dataLoading,
    } = this.state;

    return (
      (!enableInitialActivityIndicator &&
        !firstLoadSuccess &&
        !enablePullDownRefresh &&
        dataLoading) ||
      (firstLoadSuccess && dataLoading)
    );
  };

  showInitialActivityIndicator = () => {
    const { enableInitialActivityIndicator, firstLoadSuccess, dataLoading } =
      this.state;

    return enableInitialActivityIndicator && !firstLoadSuccess && dataLoading;
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
  buildLowerLoadingSuspendBox = () => null;

  /**
   * 构建底部加载提示组件
   * @param {*} lowerLoading
   * @param {*} needNextLoad
   * @returns
   */
  // eslint-disable-next-line no-unused-vars
  buildLowerLoadingFooterBox = (lowerLoading, needNextLoad) => null;

  renderView() {
    const {
      spin,
      scrollView,
      enablePullDownRefresh,
      enableCustomPullDown,
      enableScrollLowerLoad,
      enableEmptyPlaceholder,
      enableInitialActivityIndicator,
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
      lowerLoadingPosition,
    } = this.state;

    const vw = (
      <VariableView
        style={this.viewStyle}
        scroll={scrollView}
        height={height}
        enablePullDownRefresh={enablePullDownRefresh}
        enableScrollLowerLoad={enableScrollLowerLoad}
        enableCustomPullDown={enableCustomPullDown}
        enableEmptyPlaceholder={enableEmptyPlaceholder}
        enableInitialActivityIndicator={enableInitialActivityIndicator}
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
        lowerLoadingPosition={lowerLoadingPosition}
        refreshingBox={this.buildRefreshingBox()}
        lowerLoadingSuspendBox={this.buildLowerLoadingSuspendBox()}
        lowerLoadingFooterBox={this.buildLowerLoadingFooterBox()}
        emptyPlaceholder={this.buildEmptyPlaceholder()}
        initialActivityIndicatorVisible={this.showInitialActivityIndicator()}
        upperBox={this.buildUpperBox()}
      >
        {this.renderFurther()}
      </VariableView>
    );

    if (this.useFadeSpinWrapper) {
      return (
        <Spin fullscreen spin={spin}>
          <Notification />

          <FadeView show={!spin}>{vw}</FadeView>
        </Spin>
      );
    }

    return (
      <>
        <Notification />

        {vw}
      </>
    );
  }
}

export default Infrastructure;
