import Taro from '@tarojs/taro';

import {
  showErrorMessage,
  stringIsNullOrWhiteSpace,
  navigateTo,
  inCollection,
  isWechat,
  getSystemInfo,
  pageScrollTo,
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
  BackTop,
} from 'taro-fast-component/es/customComponents';
import {
  buildEmptyPlaceholder as buildEmptyPlaceholderCore,
  buildInitialActivityIndicator as buildInitialActivityIndicatorCore,
} from 'taro-fast-component/es/functionComponent';
import { isArray, isFunction } from 'taro-fast-common/es/utils/typeCheck';

const refreshingBoxEffectCollection = ['pull', 'scale'];

function getRefreshingBoxEffect(effect) {
  if (inCollection(refreshingBoxEffectCollection, effect)) {
    if (!isWechat) {
      return 'pull';
    }

    return effect;
  }

  return 'pull';
}

class Infrastructure extends ComponentBase {
  /**
   * 页面是否使用渐显效果组件包裹
   */
  useFadeSpinWrapper = false;

  /**
   * 是否模拟渐显效果, 需前置开启 useFadeSpinWrapper
   */
  useSimulationFadeSpin = false;

  /**
   * 初始加载接口后自动渐显页面, 用于非静态页面, 需前置开启 useFadeSpinWrapper; 一般不要与 useSimulationFadeSpin 同时使用
   */
  hideFadeSpinWrapperAfterLoadRemoteRequest = false;

  /**
   * 模拟渐显效果的持续时间
   */
  simulationFadeSpinDuration = 300;

  /**
   * 主视图容器自定义样式
   */
  viewStyle = {};

  /**
   * 滚动视图模式
   */
  viewScrollMode = false;

  /**
   * 启用下拉刷新
   */
  enablePullDownRefresh = false;

  /**
   * 启用刷新中提示框
   */
  enableRefreshingBox = true;

  /**
   * 当不存在数据时是否显示底部上滑加载提示组件
   */
  displayLowerLoadingFooterBoxWhenNoData = false;

  /**
   * 启用下拉刷新成功提示
   */
  enablePullDownRefreshSuccessNotification = false;

  /**
   * 启用触底加载
   */
  enableLowerLoad = false;

  /**
   * 下拉刷新提示器效果 "pull/scale", scale效果仅支持微信小程序
   */
  refreshingBoxEffect = 'pull';

  /**
   * 下拉刷新提示器颜色
   */
  refreshColor = '';

  /**
   * 下拉刷新提示器背景颜色
   */
  refreshBackgroundColor = '';

  scrollWithAnimation = true;

  scrollAnchoring = true;

  scrollEnhanced = true;

  scrollBounces = true;

  scrollShowScrollbar = true;

  scrollFastDeceleration = false;

  /**
   * 触底加载提示器位置
   */
  lowerLoadingPosition = 'footer';

  enableNavigationBarLoading = false;

  /**
   * 启用初始化加载提示器自动显示, 默认开启, 需要自定义初始加载效果时候请关闭
   */
  enableAutoInitialLoadingIndicator = true;

  /**
   * 启用容器底部触摸安全区
   */
  enableSafeAreaInsetBottom = true;

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

  /**
   * 启用返回头部, 仅默认容器模式有效
   */
  enableBackTop = false;

  /**
   * 距右侧距离
   */
  backTopRight = null;

  /**
   * 距底部距离
   */
  backTopBottom = null;

  /**
   * 圆形轮廓
   */
  backTopCircle = false;

  /**
   * 不透明度
   */
  backTopOpacity = 0.6;

  /**
   * 图标颜色
   */
  backTopIconColor = '';

  /**
   * 背景颜色
   */
  backTopBackgroundColor = '';

  /**
   * 显示触发距离，滚动超多半屏后显示
   */
  backTopThresholdDistance = 0;

  currentInstance = Taro.getCurrentInstance();

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...underlyingState,
      ...{
        spin: true,
        backTopVisible: false,
      },
    };

    const { screenHeight } = getSystemInfo();

    this.backTopThresholdDistance = screenHeight / 2;
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  getUrlParams() {
    if (stringIsNullOrWhiteSpace(this.urlParamsCore)) {
      this.urlParamsCore = this.currentInstance.router.params;
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
    const { backTopVisible } = this.state;
    const { scrollTop } = e;

    this.pageScrollTop = scrollTop;

    this.onScroll({ scrollTop });

    if (!backTopVisible && e.scrollTop >= this.backTopThresholdDistance) {
      this.setState({
        backTopVisible: true,
      });
    }

    if (backTopVisible && e.scrollTop < this.backTopThresholdDistance) {
      this.setState({
        backTopVisible: false,
      });
    }
  }

  onPullDownRefresh() {
    this.onRefresh();
  }

  onReachBottom() {
    if (this.enableLowerLoad && this.judgeNeedNextLoad()) {
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
    duration = 1500,
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

  onRefresh = () => {
    const that = this;

    that.reloadData({
      callback: () => {
        if (that.enablePullDownRefreshSuccessNotification) {
          that.bannerNotify({
            message: '刷新成功',
            type: 'success',
          });
        }
      },
    });
  };

  existLoadApi = () => {
    const { loadApiPath } = this.state;

    return !stringIsNullOrWhiteSpace(loadApiPath);
  };

  onLowerLoad = () => {
    this.loadNextPage({});
  };

  // eslint-disable-next-line no-unused-vars
  loadNextPage = ({ otherState = {}, delay = 0, callback = null }) => {};

  // eslint-disable-next-line no-unused-vars
  reloadData = ({ otherState, callback = null, delay = 0 }) => {};

  showScrollRefreshing = () => {
    const { firstLoadSuccess, dataLoading, reloading } = this.state;

    return (
      (this.loadRemoteRequestAfterMount &&
        this.existLoadApi() &&
        !this.pagingLoadMode &&
        this.enableAutoInitialLoadingIndicator &&
        !firstLoadSuccess &&
        dataLoading) ||
      reloading
    );
  };

  showLowerLoading = () => {
    const { firstLoadSuccess, dataLoading, reloading } = this.state;

    return (
      (this.loadRemoteRequestAfterMount &&
        this.existLoadApi() &&
        this.pagingLoadMode &&
        this.enableAutoInitialLoadingIndicator &&
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

  getEnableBackTop = () => {
    return !this.viewScrollMode && this.enableBackTop;
  };

  renderView() {
    const { spin, backTopVisible } = this.state;

    const vw = (
      <VariableView
        style={this.viewStyle}
        scroll={this.viewScrollMode}
        height="100vh"
        enablePullDownRefresh={this.enablePullDownRefresh}
        enableLowerLoad={
          this.viewScrollMode ? this.enableLowerLoad : this.pagingLoadMode
        }
        enableSafeAreaInsetBottom={this.enableSafeAreaInsetBottom}
        enableCustomPullDown
        useRefreshingBox={this.enableRefreshingBox}
        refreshingBoxEffect={getRefreshingBoxEffect(this.refreshingBoxEffect)}
        refreshColor={this.refreshColor}
        refreshBackgroundColor={this.refreshBackgroundColor}
        scrollWithAnimation={this.scrollWithAnimation}
        scrollAnchoring={this.scrollAnchoring}
        scrollEnhanced={this.scrollEnhanced}
        scrollBounces={this.scrollBounces}
        scrollShowScrollbar={this.scrollShowScrollbar}
        scrollFastDeceleration={this.scrollFastDeceleration}
        scrollRefresherThreshold={100}
        scrollRefresherDefaultStyle="white"
        scrollRefresherBackground=""
        onRefresh={this.onRefresh}
        onLowerLoad={this.onLowerLoad}
        refreshing={this.showScrollRefreshing()}
        lowerLoading={this.showLowerLoading()}
        needNextLoad={this.judgeNeedNextLoad()}
        lowerLoadingPosition={this.lowerLoadingPosition}
        refreshingBox={this.buildRefreshingBox()}
        lowerLoadingSuspendBox={this.buildLowerLoadingSuspendBox()}
        lowerLoadingFooterBox={this.buildLowerLoadingFooterBox()}
        displayLowerLoadingFooterBoxWhenNoData={
          this.displayLowerLoadingFooterBoxWhenNoData
        }
        existData={!this.judgeEmptyPlaceholderVisible()}
        upperBox={this.buildUpperBox()}
        onExternalScroll={(callback) => {
          this.onScroll(callback);
        }}
      >
        {this.renderFurther()}
      </VariableView>
    );

    const backTopElement = this.getEnableBackTop() ? (
      <BackTop
        visible={backTopVisible}
        {...{
          ...(this.backTopRight == null ? {} : { right: this.backTopRight }),
          ...(this.backTopBottom == null ? {} : { bottom: this.backTopBottom }),
          ...{ circle: !!this.backTopCircle },
          ...(stringIsNullOrWhiteSpace(this.backTopIconColor)
            ? {}
            : { iconColor: this.backTopIconColor }),
          ...(stringIsNullOrWhiteSpace(this.backTopBackgroundColor)
            ? {}
            : { backgroundColor: this.backTopBackgroundColor }),
          ...(this.backTopOpacity == null
            ? {}
            : { opacity: this.backTopOpacity }),
        }}
        onClick={() => {
          pageScrollTo({
            scrollTop: 0,
            duration: 300,
          });
        }}
      />
    ) : null;

    if (this.useFadeSpinWrapper) {
      return (
        <Spin fullscreen spin={spin}>
          <Notification />

          <FadeView show={!spin}>{vw}</FadeView>

          {backTopElement}
        </Spin>
      );
    }

    return (
      <>
        <Notification />

        {vw}

        {backTopElement}
      </>
    );
  }
}

export default Infrastructure;
