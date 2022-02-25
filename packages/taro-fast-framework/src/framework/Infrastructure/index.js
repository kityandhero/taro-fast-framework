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
import {
  buildEmptyPlaceholder as buildEmptyPlaceholderCore,
  buildInitialActivityIndicator as buildInitialActivityIndicatorCore,
} from 'taro-fast-component/es/functionComponent';
import { isArray, isFunction } from 'taro-fast-common/es/utils/typeCheck';

class Infrastructure extends ComponentBase {
  //#region fade spin config

  useFadeSpinWrapper = false;

  useSimulationFadeSpin = false;

  hideFadeSpinWrapperAfterLoadRemoteRequest = false;

  simulationFadeSpinDuration = 300;

  //#endregion

  //#region view config

  viewStyle = {};

  viewScrollMode = false;

  enablePullDownRefresh = false;

  //#endregion

  urlParamsCore = null;

  /**
   * 初始化时加载数据请求的延迟时间
   */
  loadRemoteRequestDelay = 0;

  /**
   * 使用分页加载模式，该模式下自动附加页码等参数以及使用相关交互效果
   */
  pagingLoadMode = false;

  /**
   * 页码
   */
  pageNo = 0;

  /**
   * 页条目数
   */
  pageSize = 10;

  /**
   * 总条目数, 来自数据接口
   */
  total = 10;

  /**
   * 最后一次接口请求的参数缓存
   */
  lastRequestingData = { type: '', payload: {} };

  /**
   * 数据追加模式, 用于分页请求模式下是否将请求的数据附加到前次数据之后, 下拉刷新时设为 true, 分页展示时设为 false
   */
  useListDataAttachMode = true;

  /**
   * 追加数据时是否清除前次数据, 用于内部控制, 不要覆盖此值
   */
  clearListDataBeforeAttach = false;

  pageScrollTop = 0;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...underlyingState,
      ...{
        spin: true,
        enableCustomPullDown: false,
        enableLowerLoad: false,
        scrollRefresherThreshold: 100,
        scrollRefresherDefaultStyle: 'white',
        scrollRefresherBackground: '',
        refreshingBoxEffect: 'pull',
        refreshColor: '',
        refreshBackgroundColor: '',
        scrollWithAnimation: true,
        scrollAnchoring: true,
        scrollEnhanced: true,
        scrollBounces: true,
        scrollShowScrollbar: true,
        scrollFastDeceleration: false,
        lowerLoadingPosition: 'footer',
        enableNavigationBarLoading: false,
        enableAutoInitialLoadingIndicator: true,
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

  onPageScroll(e) {
    const { scrollTop } = e;

    this.pageScrollTop = scrollTop;

    this.onScroll({ scrollTop });
  }

  onPullDownRefresh() {
    this.onRefresh();
  }

  onReachBottom() {
    if (this.judgeNeedNextLoad()) {
      this.onLowerLoad();
    }
  }

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

  onScroll = (callback) => {
    if (isFunction(callback)) {
      callback({ scrollTop: this.pageScrollTop });
    }
  };

  onRefresh = () => {};

  onLowerLoad = () => {};

  existLoadApi = () => {
    const { loadApiPath } = this.state;

    return !stringIsNullOrWhiteSpace(loadApiPath);
  };

  showScrollRefreshing = () => {
    const {
      enableAutoInitialLoadingIndicator,
      firstLoadSuccess,
      dataLoading,
      reloading,
    } = this.state;

    return (
      (this.loadRemoteRequestAfterMount &&
        this.existLoadApi() &&
        !this.pagingLoadMode &&
        enableAutoInitialLoadingIndicator &&
        !firstLoadSuccess &&
        dataLoading) ||
      reloading
    );
  };

  showLowerLoading = () => {
    const {
      enableAutoInitialLoadingIndicator,
      firstLoadSuccess,
      dataLoading,
      reloading,
    } = this.state;

    return (
      (this.loadRemoteRequestAfterMount &&
        this.existLoadApi() &&
        this.pagingLoadMode &&
        enableAutoInitialLoadingIndicator &&
        !firstLoadSuccess &&
        dataLoading) ||
      (firstLoadSuccess && dataLoading && !reloading)
    );
  };

  /**
   * 判断是否显示初始加载提示器
   * @returns bool
   */
  judgeInitialActivityIndicatorVisible = () => {
    const { firstLoadSuccess, dataLoading } = this.state;

    return !firstLoadSuccess && dataLoading;
  };

  /**
   * 判断是否显示空数据占位
   * @returns bool
   */
  judgeEmptyPlaceholderVisible = () => {
    const { firstLoadSuccess, metaListData } = this.state;

    return (
      firstLoadSuccess && isArray(metaListData) && metaListData.length === 0
    );
  };

  /**
   * 构建空数据占位
   */
  buildEmptyPlaceholder = ({
    icon = 'alert-circle',
    iconSize = 180,
    iconStyle = {},
    image = '',
    imageStyle = {},
    description = '暂无数据',
    onImageClick = null,
    onDescriptionClick = null,
  }) => {
    return buildEmptyPlaceholderCore({
      icon,
      iconSize,
      iconStyle,
      image,
      imageStyle,
      description,
      onImageClick,
      onDescriptionClick,
    });
  };

  /**
   * 构建初始加载提示器
   */
  buildInitialActivityIndicator = ({
    type = 'comet',
    description = '加载中',
  }) => {
    return buildInitialActivityIndicatorCore({
      type,
      description,
    });
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
      enableCustomPullDown,
      enableLowerLoad,
      scrollRefresherThreshold,
      scrollRefresherDefaultStyle,
      scrollRefresherBackground,
      refreshColor,
      refreshingBoxEffect,
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
        scroll={this.viewScrollMode}
        height="100vh"
        enablePullDownRefresh={this.enablePullDownRefresh}
        enableLowerLoad={
          this.viewScrollMode ? enableLowerLoad : this.pagingLoadMode
        }
        enableCustomPullDown={enableCustomPullDown}
        refreshingBoxEffect={refreshingBoxEffect}
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
        onLowerLoad={this.onLowerLoad}
        refreshing={this.showScrollRefreshing()}
        lowerLoading={this.showLowerLoading()}
        needNextLoad={this.judgeNeedNextLoad()}
        lowerLoadingPosition={lowerLoadingPosition}
        refreshingBox={this.buildRefreshingBox()}
        lowerLoadingSuspendBox={this.buildLowerLoadingSuspendBox()}
        lowerLoadingFooterBox={this.buildLowerLoadingFooterBox()}
        upperBox={this.buildUpperBox()}
        onExternalScroll={(callback) => {
          this.onScroll(callback);
        }}
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
