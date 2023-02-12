import { ScrollView, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import {
  buildLinearGradient,
  checkHasAuthority,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  environmentCollection,
  isArray,
  isFunction,
  logConfig,
  logData,
  logDebug,
  logException,
  logExecute,
  logInfo,
  logObject,
  logWarn,
  navigateTo,
  redirectTo,
  showErrorMessage,
  showRuntimeError,
  sleep,
  toString,
  transformListData,
  underlyingState,
} from 'easy-soft-utility';

import {
  AbstractComponent,
  checkWeAppEnvironment,
  getMenuButtonBoundingClientRect,
  getSystemInfo,
  locateResult,
  Notification,
  pageScrollTo,
  transformSize,
} from 'taro-fast-common';
import {
  BackTop,
  buildEmptyPlaceholder as buildEmptyPlaceholderCore,
  buildInitialActivityIndicator as buildInitialActivityIndicatorCore,
  Cascader,
  CenterBox,
  FadeView,
  FixedBox,
  FlexBox,
  Footer,
  Line,
  Modal,
  Overlay,
  Popup,
  Spin,
  VariableView,
} from 'taro-fast-component';

import { getAdministrativeDivisionFullData } from '../../services/schedulingControl';
import {
  getSignInResultDescription,
  getVerifySignInResult,
} from '../../utils/common';
import { setCurrentUrl } from '../../utils/currentUrlAssist';
import { getSettingsAgency } from '../../utils/defaultSettingsSpecial';
import { getLaunchOption } from '../../utils/launchOptionAssist';
import { getMap } from '../../utils/locationAssist';
import { getSession } from '../../utils/sessionAssist';
import {
  getSessionRefreshing,
  setSessionRefreshing,
} from '../../utils/sessionRefreshingAssist';

const refreshingBoxEffectCollection = ['pull', 'scale'];
const defaultDispatchLocationResultData = {
  locationGet: false,
  locationAuth: locateResult.unknown,
};

function getRefreshingBoxEffect(effect) {
  if (checkInCollection(refreshingBoxEffectCollection, effect)) {
    if (!checkWeAppEnvironment()) {
      return 'pull';
    }

    return effect;
  }

  return 'pull';
}

class Infrastructure extends AbstractComponent {
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
  simulationFadeSpinDuration = 200;

  /**
   * 启用右上角操作提示
   */
  enableCapsulePrompt = false;

  /**
   * 适配自定义头部布局
   */
  capsulePromptWithCustomHeadNavigation = false;

  /**
   * 距右侧距离
   */
  capsulePromptRight = 90;

  capsulePromptXIndex = 20_000;

  capsulePromptBackgroundColor = '#fff0f4';

  capsulePromptDelaySecond = 4000;

  capsulePromptTimer = null;

  /**
   * 主视图容器自定义样式
   */
  viewStyle = {};

  /**
   * 滚动视图模式
   */
  scrollViewMode = false;

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

  /**
   * 外部参数
   */
  externalParameter = null;

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

  /**
   * pageScrollTop
   */
  pageScrollTop = 0;

  /**
   * 启用 Footer
   */
  enableFooter = false;

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

  /**
   * 当前实例
   */
  currentInstance = Taro.getCurrentInstance();

  /**
   * 需要重新定位当再次呈现并且为自动定位模式时
   */
  needReLocationWhenRepeatedShow = false;

  /**
   * 是否忽略 Session 相关的业务逻辑,如果忽略，将跳过 checkTicket、checkTicketValidity、signInSilent 以及其他相关逻辑
   */
  ignoreSessionRelatedLogic = false;

  /**
   * 校验Session, 开启登录校验等功能前必须开启
   */
  verifySession = false;

  /**
   * 校验本地登录凭据
   */
  verifyTicket = false;

  /**
   * 本地登录凭据有效性校验[凭据存在有效期的情况下], 框架根据请求频次间隔性校验, 无需人工干预
   */
  verifyTicketValidity = false;

  /**
   * 强制刷新元数据
   */
  initMetaDataForce = false;

  initMetaDataRequestData = {};

  useFullAdministrativeDivisionSelector = false;

  fullAdministrativeDivisionSelectorHeight = 400;

  /**
   * 底部填充高度
   */
  bottomSpaceHeight = 0;

  sidePosition = 'left';
  sideWidth = 100;
  sideStyle = {};

  repeatDoWorkWhenShow = false;

  firstShowHasTriggered = false;

  privateCache = {
    enablePullDownRefresh: null,
    verifySession: null,
    verifyTicket: null,
    verifyTicketValidity: null,
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      ...underlyingState,

      spin: true,
      signInPromptModalVisible: false,
      signInSilentOverlayVisible: false,
      backTopVisible: false,
      capsulePromptVisible: false,
      initCapsulePrompt: false,
      fullAdministrativeDivisionSelectorVisible: false,
    };

    const { screenHeight } = getSystemInfo();

    this.backTopThresholdDistance = screenHeight / 2;
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    return null;
  }

  checkSchedulingControlExistence = () => {
    const { schedulingControl } = this.props;

    if ((schedulingControl || null) == null) {
      showErrorMessage({
        text: 'config error,check in console',
      });

      logObject(this);

      throw new Error(
        'schedulingControl in props not exist, please connect it first',
      );
    }
  };

  initializeInternalData = () => {
    logConfig(
      'initializeInternalData do nothing, if you need to initialize internal data, please override it: initializeInternalData = () => {}',
    );
  };

  // eslint-disable-next-line no-unused-vars
  adjustByScene = (scene) => {
    logConfig(
      'adjustByScene do nothing, if you need to adjust something by different scene, please override it: adjustByScene = (scene) => {}',
    );
  };

  adjustInternalDataOnRepeatedShow = () => {
    logConfig(
      'adjustInternalDataOnRepeatedShow do nothing, if you need to adjust initialize internal data, please override it: adjustInternalDataOnRepeatedShow = () => {}',
    );
  };

  receiveExternalParameter = () => {
    if ((this.externalParameter || null) == null) {
      this.externalParameter = this.currentInstance.router.params;
    }
  };

  setNavigationBarTitle = (parameters) => {
    return Taro.setNavigationBarTitle(parameters);
  };

  showModal = (parameters) => {
    return Taro.showModal(parameters);
  };

  getCurrentPages = () => {
    return Taro.getCurrentPages();
  };

  checkWorkDoing = () => {
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
        text: text,
      });

      return true;
    }

    return false;
  };

  onPageScroll(event) {
    const { backTopVisible } = this.state;
    const { scrollTop } = event;

    this.pageScrollTop = scrollTop;

    this.onScroll({ scrollTop });

    if (!backTopVisible && scrollTop >= this.backTopThresholdDistance) {
      this.setState({
        backTopVisible: true,
      });
    }

    if (backTopVisible && scrollTop < this.backTopThresholdDistance) {
      this.setState({
        backTopVisible: false,
      });
    }

    this.doWhenScroll({ scrollTop });
  }

  // eslint-disable-next-line no-unused-vars
  doWhenScroll = ({ scrollTop }) => {};

  onPullDownRefresh() {
    this.onRefresh();
  }

  onReachBottom() {
    if (this.enableLowerLoad && this.judgeNeedNextLoad()) {
      this.onLowerLoad();
    }
  }

  goToWebPage(pagePath, title, url) {
    if (checkStringIsNullOrWhiteSpace(url)) {
      const text = '缺少目标页面地址, 无法跳转';

      showErrorMessage({
        text: text,
      });

      return;
    }

    const titleEncode = encodeURIComponent(title || '');
    const urlEncode = encodeURIComponent(url);

    navigateTo(`${pagePath}?title=${titleEncode}&url=${urlEncode}`);
  }

  doDidMountTask = () => {
    const { scene } = {
      scene: '',
      ...getLaunchOption(),
    };

    this.adjustByScene(scene || '');

    this.checkSchedulingControlExistence();

    this.initializeInternalData();

    this.receiveExternalParameter();

    this.setCurrentInfo();

    this.doWorkWhenShow();
  };

  doWorkWhenShow = (callback = null) => {
    logExecute('doWorkWhenShow');

    const checkNeedSignInWhenShowResult = this.checkNeedSignInWhenShow();

    if (checkNeedSignInWhenShowResult) {
      const checkPermissionResult = this.checkPermission();

      if (checkPermissionResult) {
        this.repeatDoWorkWhenShow = false;

        this.doWorkBeforeAdjustDidMount();

        this.doWorkAdjustDidMount();

        this.doWorkAfterAdjustDidMount();

        this.doWorkAfterDidMount();

        this.doSimulationFadeSpin(this.prepareLoadRemoteRequest);

        this.doOtherRemoteRequest();

        this.doOtherWorkAfterDidMount();

        const that = this;

        if (this.enableCapsulePrompt) {
          that.capsulePromptTimer = setTimeout(() => {
            that.setState(
              {
                capsulePromptVisible: true,
                initCapsulePrompt: true,
              },
              () => {
                that.capsulePromptTimer = setTimeout(
                  () => {
                    that.setState({
                      capsulePromptVisible: false,
                    });
                  },
                  that.capsulePromptDelaySecond <= 0
                    ? 2000
                    : that.capsulePromptDelaySecond,
                );
              },
            );
          }, 2000);
        }

        if (isFunction(callback)) {
          callback();
        }
      } else {
        this.doWorkWhenCheckPermission();
      }
    } else {
      this.doWorkWhenCheckNeedSignInDidMountFail();
    }
  };

  checkNeedSignInWhenShow = () => {
    if (!this.needSignIn) {
      return true;
    }

    logExecute('checkNeedSignInWhenShow');

    const signInResult = this.getSignInResult();
    const verifySignInResult = getVerifySignInResult();

    if (signInResult !== verifySignInResult.success) {
      return false;
    }

    return true;
  };

  doWorkWhenCheckNeedSignInDidMountFail = () => {
    logExecute('doWorkWhenCheckNeedSignInDidMountFail');

    const that = this;

    const signInResult = this.getSignInResult();
    const verifySignInResult = getVerifySignInResult();

    if (toString(signInResult) === toString(verifySignInResult.fail)) {
      if (this.autoRedirectToSignIn) {
        const signInPath = getSettingsAgency().getSignInPath();

        if (checkStringIsNullOrWhiteSpace(signInPath)) {
          throw new Error('未配置登录页面signInPath');
        }

        this.repeatDoWorkWhenShow = true;

        logDebug('set this.repeatDoWorkWhenShow to true');

        setTimeout(() => {
          redirectTo(signInPath);
        }, 200);
      } else {
        that.setState({
          spin: false,
        });

        logDebug('set state spin to false');

        this.repeatDoWorkWhenShow = true;

        logDebug('set this.repeatDoWorkWhenShow to true');

        this.doWorkWhenCheckNeedSignInDidMountFailAndNotAutoRedirectToSignIn();
      }
    } else {
      that.setState({ signInSilentOverlayVisible: true });

      logDebug('set state signInSilentOverlayVisible to true');

      that.checkSession(() => {
        that.checkTicketValidity({
          callback: () => {
            that.setState({ signInSilentOverlayVisible: false });

            logDebug('set state signInSilentOverlayVisible to false');

            that.doDidMountTask();
          },
          signInSilentFailCallback: () => {
            logDebug(
              'signInSilentFailCallback in doWorkWhenCheckNeedSignInDidMountFail and class Infrastructure.',
            );

            if (this.autoRedirectToSignIn) {
              const signInPath = getSettingsAgency().getSignInPath();

              if (checkStringIsNullOrWhiteSpace(signInPath)) {
                throw new Error('未配置登录页面signInPath');
              }

              this.repeatDoWorkWhenShow = true;

              logDebug('set this.repeatDoWorkWhenShow to true');

              redirectTo(signInPath);
            } else {
              that.setState({
                spin: false,
                signInSilentOverlayVisible: false,
              });

              logDebug(
                'set state spin to true, signInSilentOverlayVisible to false',
              );

              this.repeatDoWorkWhenShow = true;

              logDebug('set this.repeatDoWorkWhenShow to true');

              this.doWorkWhenCheckNeedSignInDidMountFailAndNotAutoRedirectToSignIn();
            }
          },
        });
      });
    }
  };

  doWorkWhenCheckNeedSignInDidMountFailAndNotAutoRedirectToSignIn = () => {
    logExecute(
      'doWorkWhenCheckNeedSignInDidMountFailAndNotAutoRedirectToSignIn',
    );

    this.setState({
      signInPromptModalVisible: true,
    });
  };

  checkPermission = () => {
    if (checkStringIsNullOrWhiteSpace(this.componentAuthority)) {
      return true;
    } else if (this.checkAuthority(this.componentAuthority)) {
      return true;
    }

    return false;
  };

  checkAuthority = (permission) => checkHasAuthority(permission);

  doWorkWhenCheckPermissionFail = () => {
    this.repeatDoWorkWhenShow = true;

    logExecute('doWorkWhenCheckPermissionFail');

    const text = `无交互权限: ${this.componentAuthority || ''}`;

    showRuntimeError({
      message: text,
    });

    const withoutPermissionRedirectPath =
      getSettingsAgency().getWithoutPermissionRedirectPath();

    if (checkStringIsNullOrWhiteSpace(withoutPermissionRedirectPath)) {
      throw new Error('未配置无交互权限时的跳转目标');
    }

    redirectTo(withoutPermissionRedirectPath);
  };

  goToSignIn = () => {
    const signInPath = getSettingsAgency().getSignInPath();

    if (checkStringIsNullOrWhiteSpace(signInPath)) {
      throw new Error('未配置登录页面signInPath');
    }

    navigateTo(signInPath);
  };

  doShowTask = () => {
    logDebug(
      `this.firstShowHasTriggered is ${this.firstShowHasTriggered} in doShowTask`,
    );

    if (this.firstShowHasTriggered) {
      logDebug(
        `this.repeatDoWorkWhenShow is ${this.repeatDoWorkWhenShow} in doShowTask`,
      );

      if (this.repeatDoWorkWhenShow) {
        this.doWorkWhenShow();
      }

      this.adjustInternalDataOnRepeatedShow();

      this.doWorkWhenRepeatedShow();
    } else {
      this.doWorkWhenFirstShow();

      this.firstShowHasTriggered = true;

      logDebug('set this.firstShowHasTriggered to true');
    }

    this.doWorkWhenEveryShow();

    this.doWorkAfterShow();
  };

  componentWillUnmount() {
    clearTimeout(this.capsulePromptTimer);

    this.doWorkBeforeUnmount();

    this.doWorkAfterUnmount();

    this.setState = () => {};
  }

  getDispatch = () => {
    const { dispatch } = this.props;

    if ((dispatch || null) == null) {
      throw new Error(
        'dispatch is null, please set dispatch in props or override getDispatch,if use dva, please connect a model ',
      );
    }

    return dispatch;
  };

  /**
   * 执行模拟渐显加载效果, 该方法不要覆写
   */
  doSimulationFadeSpin = (callback = null) => {
    logExecute('doSimulationFadeSpin');

    const { spin } = this.state;

    const that = this;

    if (that.useSimulationFadeSpin && spin) {
      setTimeout(() => {
        that.setState({ spin: false });
      }, that.simulationFadeSpinDuration);

      if (isFunction(callback)) {
        callback();
      }
    } else {
      if (isFunction(callback)) {
        callback();
      }
    }
  };

  prepareLoadRemoteRequest = () => {
    logExecute('prepareLoadRemoteRequest');

    const that = this;

    if (that.ignoreSessionRelatedLogic) {
      that.prepareLoadRemoteRequestOnlyMetaData();
    } else {
      that.prepareLoadRemoteRequestWithCheckSession();
    }
  };

  prepareLoadRemoteRequestOnlyMetaData = () => {
    const that = this;

    logDebug(
      `ignoreSessionRelatedLogic is true; ignore checkTicket, checkTicketValidity, signInSilent and so on`,
    );

    that.initMetaData({
      data: that.initMetaDataRequestData || {},
      force: !!that.initMetaDataForce,
      callback: () => {
        if (that.loadRemoteRequestAfterMount) {
          that.doLoadRemoteRequest();
        }

        that.doWorkWhenCheckTicketValidityOnPrepareLoadRemoteRequest();
      },
    });

    if (that.useFullAdministrativeDivisionSelector) {
      that.initFullAdministrativeDivisionData({
        callback: (l) => {
          that.doAfterInitFullAdministrativeDivisionData(l);
        },
      });
    }
  };

  prepareLoadRemoteRequestWithCheckSession = () => {
    const that = this;

    that.checkSession(() => {
      that.initMetaData({
        data: that.initMetaDataRequestData || {},
        force: !!that.initMetaDataForce,
        callback: () => {
          if (that.verifyTicket) {
            that.checkTicketValidity({
              callback: () => {
                if (that.loadRemoteRequestAfterMount) {
                  that.doLoadRemoteRequest();
                }

                that.doWorkWhenCheckTicketValidityOnPrepareLoadRemoteRequest();
              },
            });
          } else {
            that.checkTicketValidity({
              callback: () => {
                that.doWorkWhenCheckTicketValidityOnPrepareLoadRemoteRequest();
              },
            });

            if (that.loadRemoteRequestAfterMount) {
              that.doLoadRemoteRequest();
            }
          }
        },
      });

      if (that.useFullAdministrativeDivisionSelector) {
        that.initFullAdministrativeDivisionData({
          callback: (l) => {
            that.doAfterInitFullAdministrativeDivisionData(l);
          },
        });
      }
    });
  };

  /**
   * 检测Session
   * @param {*} callback
   */
  checkSession = (callback) => {
    logExecute('checkSession');

    const environment = this.getEnvironment();

    const noAdaptationMessage = `framework with env [${environment}] has no adaptation, ignore checkSession, only execute callback`;

    switch (environment) {
      case environmentCollection.WEAPP: {
        break;
      }

      case environmentCollection.ALIPAY: {
        logWarn(noAdaptationMessage);

        if (isFunction(callback)) {
          callback();
        }

        return;
      }

      case environmentCollection.SWAN: {
        logWarn(noAdaptationMessage);

        if (isFunction(callback)) {
          callback();
        }

        return;
      }

      case environmentCollection.WEB: {
        logWarn(noAdaptationMessage);

        if (isFunction(callback)) {
          callback();
        }

        return;
      }

      default: {
        logWarn(noAdaptationMessage);

        if (isFunction(callback)) {
          callback();
        }

        return;
      }
    }

    const sessionRefreshing = getSessionRefreshing();

    const that = this;

    if (sessionRefreshing) {
      that.checkSessionWhenSessionRefreshing({
        callback: () => {
          that.checkSession({ callback });
        },
      });
    } else {
      const session = getSession();

      if ((session || '') === '') {
        logDebug('session is empty');

        that.refreshSession({ callback });
      } else {
        Taro.checkSession({
          success: () => {
            logDebug('session is effective, ignore session refresh');

            if (isFunction(callback)) {
              callback();
            }
          },
          fail(data) {
            logDebug('session is expired');

            logObject(data);

            that.refreshSession({ callback });
          },
        });
      }
    }
  };

  checkSessionWhenSessionRefreshing({ callback, timeTotal = 0 }) {
    logExecute('checkSessionWhenSessionRefreshing');

    if (timeTotal > 3000) {
      setSessionRefreshing(false);

      if (isFunction(callback)) {
        callback();
      }

      return;
    }

    const that = this;

    sleep(100, () => {
      logData(`checkSessionWhenSessionRefreshing sleep ${timeTotal}`);

      const sessionRefreshingAfterSleep = getSessionRefreshing();

      if (sessionRefreshingAfterSleep) {
        that.checkSessionWhenSessionRefreshing({
          callback,
          timeTotal: timeTotal + 100,
        });
      } else {
        if (isFunction(callback)) {
          callback();
        }
      }
    });
  }

  initMetaData = ({
    // eslint-disable-next-line no-unused-vars
    data = {},
    // eslint-disable-next-line no-unused-vars
    force: forceValue = false,
    callback = null,
  }) => {
    if (isFunction(callback)) {
      callback();
    }
  };

  initFullAdministrativeDivisionData = ({
    // eslint-disable-next-line no-unused-vars
    data = {},
    // eslint-disable-next-line no-unused-vars
    force: forceValue = false,
    callback = null,
  }) => {
    if (isFunction(callback)) {
      callback();
    }
  };

  doAfterInitFullAdministrativeDivisionData = () => {};

  /**
   * 检测登录凭据
   * @param {*} callback
   */
  checkTicketValidity = ({ callback, signInSilentFailCallback = null }) => {
    if (signInSilentFailCallback) {
      throw new Error(
        'signInSilentFailCallback is not supported in base class Infrastructure',
      );
    }

    if (isFunction(callback)) {
      callback();
    }
  };

  doWorkWhenCheckTicketValidityOnPrepareLoadRemoteRequest = () => {};

  /**
   * 调度并设置登录检测状态
   * @param {*} data
   */
  // eslint-disable-next-line no-unused-vars
  dispatchSetTicketValidityProcessDetection = (data) => {
    return this.dispatchApi({
      type: 'schedulingControl/setTicketValidityProcessDetection',
      payload: !!data,
    });
  };

  getTicketValidityProcessDetection = () => {
    const {
      schedulingControl: { ticketValidityProcessDetection },
    } = this.props;

    return !!ticketValidityProcessDetection;
  };

  setTicketValidityProcessDetection = ({ data, callback }) => {
    this.dispatchSetTicketValidityProcessDetection(!!data)
      .then(() => {
        if (isFunction(callback)) {
          // eslint-disable-next-line promise/no-callback-in-promise
          callback();
        }

        return null;
      })
      .catch((error) => {
        logException(error);
      });
  };

  dispatchSetSignInProcessDetection = (data) => {
    return this.dispatchApi({
      type: 'schedulingControl/setSignInProcessDetection',
      payload: !!data,
    });
  };

  getSignInProcessDetection = () => {
    logExecute('getSignInProcessDetection');

    const {
      schedulingControl: { signInProcessDetection },
    } = this.props;

    return !!signInProcessDetection;
  };

  setSignInProcessDetection = ({ data, callback }) => {
    logData(`setSignInProcessDetection ${data}`);

    const that = this;

    that
      .dispatchSetSignInProcessDetection(!!data)
      .then(() => {
        logExecute('dispatchSetSignInProcessDetection then');

        if (isFunction(callback)) {
          // eslint-disable-next-line promise/no-callback-in-promise
          callback();
        }

        return null;
      })
      .catch((error) => {
        logException(error);
      });
  };

  dispatchSetSignInResult = (data) => {
    logExecute('dispatchSetSignInResult');

    return this.dispatchApi({
      type: 'schedulingControl/setSignInResult',
      payload: data,
    });
  };

  checkSignInSuccess = () => {
    const verifySignInResult = getVerifySignInResult();
    const v = this.getSignInResult();

    return v === verifySignInResult.success;
  };

  getSignInResult = () => {
    logExecute('getSignInResult');

    const {
      schedulingControl: { signInResult },
    } = this.props;

    return signInResult;
  };

  setSignInResult = ({ data, callback }) => {
    logExecute('setSignInResult');
    logDebug(
      `sign in result is ${data}, it mean ${getSignInResultDescription(data)} `,
    );

    const that = this;

    that
      .dispatchSetSignInResult(data)
      .then(() => {
        logExecute('dispatchSetSignInResult then');

        if (isFunction(callback)) {
          // eslint-disable-next-line promise/no-callback-in-promise
          callback();
        }

        return null;
      })
      .catch((error) => {
        logException(error);
      });
  };

  dispatchLocationResult = (data = defaultDispatchLocationResultData) => {
    return this.dispatchApi({
      type: 'schedulingControl/setLocationResult',
      payload: data,
    });
  };

  getVerifySession = () => {
    if (this.privateCache.verifySession != null) {
      return this.privateCache.verifySession;
    }

    logExecute('getVerifySession');

    if (this.ignoreSessionRelatedLogic) {
      logInfo(
        'because ignoreSessionRelatedLogic is true, so verifySession return false',
      );

      this.privateCache.verifySession = false;
    } else {
      const environment = this.getEnvironment();

      const noAdaptationMessage = `framework with env [${environment}] has no adaptation, so verifySession return false`;

      switch (environment) {
        case environmentCollection.WEAPP: {
          if (this.needSignIn) {
            logDebug(
              `because needSignIn is true, so verifySession return true`,
            );

            this.privateCache.verifySession = true;
          } else {
            this.privateCache.verifySession = this.verifySession;
          }

          break;
        }

        case environmentCollection.ALIPAY: {
          logWarn(noAdaptationMessage);

          this.privateCache.verifySession = false;

          break;
        }

        case environmentCollection.SWAN: {
          logWarn(noAdaptationMessage);

          this.privateCache.verifySession = false;

          break;
        }

        case environmentCollection.WEB: {
          logWarn(noAdaptationMessage);

          this.privateCache.verifySession = false;

          break;
        }

        default: {
          logWarn(noAdaptationMessage);

          this.privateCache.verifySession = false;

          break;
        }
      }
    }

    logInfo(`cache the verifySession -> ${this.privateCache.verifySession}`);

    return this.privateCache.verifySession;
  };

  getVerifyTicket = () => {
    if (this.privateCache.verifyTicket != null) {
      return this.privateCache.verifyTicket;
    }

    logExecute('getVerifyTicket');

    if (this.ignoreSessionRelatedLogic) {
      logInfo(
        'because ignoreSessionRelatedLogic is true, so verifyTicket return false',
      );

      this.privateCache.verifyTicket = false;
    } else {
      const environment = this.getEnvironment();

      const noAdaptationMessage = `framework with env [${environment}] has no adaptation, so verifyTicket return false`;

      switch (environment) {
        case environmentCollection.WEAPP: {
          if (this.needSignIn) {
            logDebug(`because needSignIn is true, so verifyTicket return true`);

            this.privateCache.verifyTicket = true;
          } else {
            this.privateCache.verifyTicket = this.verifyTicket;
          }

          break;
        }

        case environmentCollection.ALIPAY: {
          logWarn(noAdaptationMessage);

          this.privateCache.verifyTicket = false;

          break;
        }

        case environmentCollection.SWAN: {
          logWarn(noAdaptationMessage);

          this.privateCache.verifyTicket = false;

          break;
        }

        case environmentCollection.WEB: {
          logWarn(noAdaptationMessage);

          this.privateCache.verifyTicket = false;

          break;
        }

        default: {
          logWarn(noAdaptationMessage);

          this.privateCache.verifyTicket = false;

          break;
        }
      }
    }

    logInfo(`cache the verifyTicket -> ${this.privateCache.verifyTicket}`);

    return this.privateCache.verifyTicket;
  };

  getVerifyTicketValidity = () => {
    if (this.privateCache.verifyTicketValidity != null) {
      return this.privateCache.verifyTicketValidity;
    }

    logExecute('getVerifyTicketValidity');

    if (this.ignoreSessionRelatedLogic) {
      logInfo(
        'because ignoreSessionRelatedLogic is true, so verifyTicketValidity return false',
      );

      this.privateCache.verifyTicketValidity = false;
    } else {
      const environment = this.getEnvironment();

      const noAdaptationMessage = `framework with env [${environment}] has no adaptation, so verifyTicketValidity return false`;

      switch (environment) {
        case environmentCollection.WEAPP: {
          if (this.needSignIn) {
            logDebug(
              `because needSignIn is true, so verifyTicketValidity return true`,
            );

            this.privateCache.verifyTicketValidity = true;
          } else {
            this.privateCache.verifyTicketValidity = this.verifyTicketValidity;
          }

          break;
        }

        case environmentCollection.ALIPAY: {
          logWarn(noAdaptationMessage);

          this.privateCache.verifyTicketValidity = false;

          break;
        }

        case environmentCollection.SWAN: {
          logWarn(noAdaptationMessage);

          this.privateCache.verifyTicketValidity = false;

          break;
        }

        case environmentCollection.WEB: {
          logWarn(noAdaptationMessage);

          this.privateCache.verifyTicketValidity = false;

          break;
        }

        default: {
          logWarn(noAdaptationMessage);

          this.privateCache.verifyTicketValidity = false;

          break;
        }
      }
    }

    logInfo(
      `cache the verifyTicketValidity -> ${this.privateCache.verifyTicketValidity}`,
    );

    return this.privateCache.verifyTicketValidity;
  };

  getEnablePullDownRefresh = () => {
    if (this.privateCache.enablePullDownRefresh != null) {
      return this.privateCache.enablePullDownRefresh;
    }

    logExecute('getEnablePullDownRefresh');

    const environment = this.getEnvironment();

    const noAdaptationMessage = `framework with env [${environment}] has no adaptation, so enablePullDownRefresh return false`;

    switch (environment) {
      case environmentCollection.WEAPP: {
        this.privateCache.enablePullDownRefresh = this.enablePullDownRefresh;

        break;
      }

      case environmentCollection.ALIPAY: {
        logWarn(noAdaptationMessage);

        this.privateCache.enablePullDownRefresh = false;

        break;
      }

      case environmentCollection.SWAN: {
        logWarn(noAdaptationMessage);

        this.privateCache.enablePullDownRefresh = false;

        break;
      }

      case environmentCollection.WEB: {
        logWarn(noAdaptationMessage);

        this.privateCache.enablePullDownRefresh = false;

        break;
      }

      default: {
        logWarn(noAdaptationMessage);

        this.privateCache.enablePullDownRefresh = false;

        break;
      }
    }

    logInfo(
      `cache the enablePullDownRefresh -> ${this.privateCache.enablePullDownRefresh}`,
    );

    return this.privateCache.enablePullDownRefresh;
  };

  getLocationResult() {
    const { locationResult } = this.getGlobalWrapper();

    return locationResult;
  }

  setLocationResult({ data, callback = null }) {
    this.dispatchLocationResult(data)
      .then((d) => {
        if (isFunction(callback)) {
          // eslint-disable-next-line promise/no-callback-in-promise
          callback(d);
        }

        return d;
      })
      .catch((error) => {
        logException(error);
      });
  }

  getCurrentLocation = ({ callback = null }) => {
    logExecute('getCurrentLocation');

    const that = this;

    const map = getMap();

    if ((map || null) == null) {
      logInfo('map is null');

      that.obtainLocation({
        successCallback: ({ map: mapSource }) => {
          callback({
            map: mapSource,
          });
        },
        force: false,
        showLoading: false,
        fromLaunch: false,
        failCallback: null,
      });
    } else {
      logInfo('map is not null');

      callback({
        map,
      });
    }
  };

  getLocationWeather = ({ callback = null }) => {
    logExecute('getLocationWeather');

    const that = this;

    that.getCurrentLocation({
      callback: ({ map: mapSource }) => {
        that.getLocationWeatherCore({
          data: mapSource,
          callback,
        });
      },
    });
  };

  getLocationWeatherCore = ({ data, callback = null }) => {
    logExecute('getLocationWeatherCore');

    logObject({
      data,
    });

    const {
      address_component: { province, city },
    } = {
      address_component: {
        province: '',
        city: '',
      },
      ...data,
    };

    this.getWeather({
      data: {
        province: province || '',
        city: city || '',
      },
      callback,
    });
  };

  getWeather = ({ data = {}, callback = null }) => {
    return this.dispatchApi({
      type: 'schedulingControl/getWeather',
      payload: data,
    })
      .then((remoteData) => {
        const { weather } = remoteData;

        if (isFunction(callback)) {
          // eslint-disable-next-line promise/no-callback-in-promise
          callback(weather);
        }

        return weather;
      })
      .catch((error) => {
        logException(error);
      });
  };

  // eslint-disable-next-line no-unused-vars
  reverseGeocoder = ({ location, success, fail }) => {};

  setCurrentInfo = () => {
    const { path, params } = this.currentInstance.router;

    let p = '';

    const keys = Object.keys(params || {});

    if (keys.length > 0) {
      p = keys.map((o) => `${o}=${params[o]}`).join('&');
    }

    setCurrentUrl(`${path}${p === '' ? '' : `?${p}`}`);
  };

  notifyMessage = ({
    message,
    type = 'info',
    duration = 1500,
    customStyle = {},
    className = '',
  }) => {
    Taro.notifyMessage({
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
          that.notifyMessage({
            message: '刷新成功',
            type: 'success',
          });
        }
      },
    });
  };

  existLoadApi = () => {
    const { loadApiPath } = this.state;

    return !checkStringIsNullOrWhiteSpace(loadApiPath);
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
    icon = '',
    iconSize = 180,
    iconStyle = {},
    image = '',
    imageStyle = {},
    imageWidth = 140,
    imageAspectRatio = 1,
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
      imageWidth,
      imageAspectRatio,
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

  buildLowerLoadingFooterBoxElement = () => {
    return this.buildLowerLoadingFooterBox(
      this.showLowerLoading(),
      this.judgeNeedNextLoad(),
    );
  };

  getEnableBackTop = () => {
    return !this.scrollViewMode && this.enableBackTop;
  };

  buildHeadNavigation = () => {
    return null;
  };

  buildSimulationFadeSpinLoading = () => {
    return null;
  };

  buildCapsulePrompt = () => {
    return null;
  };

  buildCapsulePromptWrapper = () => {
    const { initCapsulePrompt, capsulePromptVisible } = this.state;

    if (!this.enableCapsulePrompt || !initCapsulePrompt) {
      return null;
    }

    const environment = this.getEnvironment();

    const noAdaptationMessage = `framework with env [${environment}] has no adaptation, ignore execute buildCapsulePromptWrapper`;

    switch (environment) {
      case environmentCollection.WEAPP: {
        break;
      }

      case environmentCollection.ALIPAY: {
        logWarn(noAdaptationMessage);

        return null;
      }

      case environmentCollection.SWAN: {
        logWarn(noAdaptationMessage);

        return null;
      }

      case environmentCollection.WEB: {
        logWarn(noAdaptationMessage);

        return null;
      }

      default: {
        logWarn(noAdaptationMessage);

        return null;
      }
    }

    const rect = getMenuButtonBoundingClientRect();

    const { height, top } = rect;

    return (
      <FixedBox
        show={capsulePromptVisible}
        useTransition
        top={
          this.capsulePromptWithCustomHeadNavigation
            ? `${height + top + 8}px`
            : `7px`
        }
        right={90}
        zIndex={20_000}
        style={{
          position: 'relative',
          backgroundColor: this.capsulePromptBackgroundColor,
          boxShadow: `0 0 ${transformSize(5)} ${transformSize(5)} ${
            this.capsulePromptBackgroundColor
          }`,
          borderRadius: transformSize(10),
          padding: `${transformSize(10)} ${transformSize(20)}`,
        }}
      >
        <View>{this.buildCapsulePrompt()}</View>

        <View
          style={{
            display: 'block',
            position: 'absolute',
            top: transformSize(-34),
            right: transformSize(30),
            width: transformSize(0),
            height: transformSize(0),
            borderTop: `${transformSize(20)} solid transparent`,
            borderRight: `${transformSize(20)} solid transparent`,
            borderBottom: `${transformSize(20)} solid ${
              this.capsulePromptBackgroundColor
            }`,
            borderLeft: `${transformSize(20)} solid transparent`,
          }}
        />
      </FixedBox>
    );
  };

  /**
   * 创建扩展显示区域，应仅用于单窗等交互组件的创建
   */
  buildExtendArea = () => {
    return null;
  };

  /**
   * 创建地址选择弹出面板
   */
  buildFullAdministrativeDivisionSelectorArea = () => {
    if (!this.useFullAdministrativeDivisionSelector) {
      return null;
    }

    const { fullAdministrativeDivisionSelectorVisible } = this.state;

    const { flag } = getAdministrativeDivisionFullData();

    return (
      <Popup
        visible={fullAdministrativeDivisionSelectorVisible}
        header="选择地区"
        position="bottom"
        mode="through"
        showClose={false}
        scroll={false}
        closeWhenOverlayClick
        arcTop
        arcBottom={false}
        space={false}
        onClose={this.hideFullAdministrativeDivisionSelector}
      >
        <Cascader
          options={this.transformFullAdministrativeDivisionData()}
          useOptionCompareFlag
          optionCompareFlag={flag}
          scroll
          height={this.fullAdministrativeDivisionSelectorHeight}
          afterChange={(v, option) => {
            this.doAfterFullAdministrativeDivisionSelectorChanged({
              value: v,
              optionList: option,
            });
          }}
        />

        <Line color="#eee" height={2} />

        <Line transparent height={40} />
      </Popup>
    );
  };

  buildFooter = () => {
    if (!this.enableFooter) {
      return null;
    }

    const image = getSettingsAgency().getFooterImage();
    const text = getSettingsAgency().getFooterText();
    const description = getSettingsAgency().getFooterDescription();

    if (image || text || description) {
      {
        return <Footer image={image} text={text} description={description} />;
      }
    }

    return null;
  };

  closeCapsulePrompt = () => {
    this.setState({
      capsulePromptVisible: false,
    });
  };

  showFullAdministrativeDivisionSelector = () => {
    this.setState({
      fullAdministrativeDivisionSelectorVisible: true,
    });
  };

  hideFullAdministrativeDivisionSelector = () => {
    this.setState({
      fullAdministrativeDivisionSelectorVisible: false,
    });

    this.doAfterHideFullAdministrativeDivisionSelector();
  };

  transformFullAdministrativeDivisionData = () => {
    const { list } = getAdministrativeDivisionFullData();

    return (
      transformListData({
        list: list,
        convert: null,
        recursiveKey: 'children',
      }) || []
    );
  };

  doAfterFullAdministrativeDivisionSelectorChanged = ({
    // eslint-disable-next-line no-unused-vars
    value,
    // eslint-disable-next-line no-unused-vars
    optionList,
  }) => {};

  doAfterHideFullAdministrativeDivisionSelector = () => {};

  buildSideView = () => {
    return null;
  };

  buildSignInSilentOverlay = () => {
    if (!this.needSignIn) {
      return null;
    }

    const { signInSilentOverlayVisible } = this.state;

    return (
      <Overlay
        visible={signInSilentOverlayVisible}
        mode="fullScreen"
        transparent
        zIndex={8000}
        onClick={this.hidePoster}
      >
        {this.buildSignInSilentOverlayPrompt()}
      </Overlay>
    );
  };

  buildSignInPromptArea = () => {
    const { signInPromptModalVisible } = this.state;

    return (
      <Modal
        visible={signInPromptModalVisible}
        header={<CenterBox>操作提示</CenterBox>}
        hideFooter
      >
        <View
          style={{
            paddingTop: transformSize(14),
            paddingBottom: transformSize(14),
          }}
        >
          <CenterBox>登录后才能查看这里的内容哦，快去登陆吧。</CenterBox>
        </View>
        <CenterBox>
          <View
            style={{
              width: transformSize(380),
            }}
            onClick={() => {
              this.setState({ signInPromptModalVisible: false });

              this.goToSignIn();
            }}
          >
            <View
              style={{
                backgroundColor: '#128904',
                borderRadius: transformSize(14),
                height: transformSize(60),
                lineHeight: transformSize(60),
                color: '#fff',
                textAlign: 'center',
                fontSize: transformSize(28),
                marginTop: transformSize(14),
                marginBottom: transformSize(14),
                marginLeft: transformSize(12),
                marginRight: transformSize(12),
              }}
            >
              立即登录
            </View>
          </View>
        </CenterBox>
      </Modal>
    );
  };

  buildSignInPromptWrapper = () => {
    if (!this.needSignIn || this.autoRedirectToSignIn) {
      return null;
    }

    return this.buildSignInPromptArea();
  };

  /**
   * 创建自动登录提示器
   */
  buildSignInSilentOverlayPrompt = () => {
    return (
      <FlexBox
        style={{
          height: '100%',
        }}
        flexAuto="top"
        top={<View></View>}
        bottom={
          <>
            <View
              style={{
                position: 'relative',
                width: transformSize(220),
                height: transformSize(40),
                borderRadius: transformSize(8),
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  backgroundImage: buildLinearGradient({
                    direct: 45,
                    list: ['#55904e', '#f9454c', '#755314'],
                  }),
                  backgroundSize: '400% 400%',
                  top: transformSize(-10),
                  left: '0',
                  height: transformSize(60),
                  width: '100%',
                  zIndex: '0',
                  opacity: '1',
                  animation:
                    'tfc-sign-in-silent-overlay-prompt 3s ease infinite',
                }}
              />

              <View
                style={{
                  position: 'relative',
                  zIndex: '1',
                  top: '0',
                  left: '0',
                  widows: '100%',
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: transformSize(28),
                  height: transformSize(40),
                  lineHeight: transformSize(40),
                }}
              >
                自动登陆中
              </View>
            </View>

            <Line transparent height={80} />
          </>
        }
      ></FlexBox>
    );
  };

  renderView() {
    const { spin, backTopVisible } = this.state;

    const sideView = this.buildSideView();

    const vw = (
      <VariableView
        style={{
          width: sideView == null ? 'auto' : '100%',
          ...this.viewStyle,
        }}
        scroll={this.scrollViewMode}
        height="100vh"
        enablePullDownRefresh={this.getEnablePullDownRefresh()}
        enableLowerLoad={
          this.scrollViewMode ? this.enableLowerLoad : this.pagingLoadMode
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
        lowerLoadingFooterBox={this.buildLowerLoadingFooterBoxElement()}
        displayLowerLoadingFooterBoxWhenNoData={
          this.displayLowerLoadingFooterBoxWhenNoData
        }
        existData={!this.judgeEmptyPlaceholderVisible()}
        upperBox={this.buildUpperBox()}
        footer={this.buildFooter()}
        bottomSpaceHeight={this.bottomSpaceHeight}
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
          circle: !!this.backTopCircle,
          ...(checkStringIsNullOrWhiteSpace(this.backTopIconColor)
            ? {}
            : { iconColor: this.backTopIconColor }),
          ...(checkStringIsNullOrWhiteSpace(this.backTopBackgroundColor)
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

    let mainContent = null;

    if (sideView == null) {
      mainContent = vw;
    } else {
      mainContent =
        this.sidePosition === 'left' ? (
          <FlexBox
            flexAuto="right"
            leftStyle={{
              width: transformSize(this.sideWidth),
            }}
            left={
              <View
                style={{
                  ...this.sideStyle,
                  position: 'fixed',
                  zIndex: '1',
                  top: '0',
                  left: '0',
                  height: '100vh',
                  width: transformSize(this.sideWidth),
                  padding: '0',
                  margin: '0',
                  border: '0',
                }}
              >
                <ScrollView
                  style={{
                    height: '100vh',
                    width: '100%',
                  }}
                  scrollX={false}
                  scrollY
                  scrollWithAnimation
                  scrollAnchoring
                  enhanced
                  bounces
                  showScrollbar={false}
                >
                  {sideView}
                </ScrollView>
              </View>
            }
            right={vw}
          />
        ) : (
          <FlexBox
            flexAuto="left"
            left={vw}
            rightStyle={{
              width: transformSize(this.sideWidth),
            }}
            right={
              <View
                style={{
                  ...this.sideStyle,
                  position: 'fixed',
                  zIndex: '1',
                  top: '0',
                  right: '0',
                  height: '100vh',
                  width: transformSize(this.sideWidth),
                  padding: '0',
                  margin: '0',
                  border: '0',
                }}
              >
                <ScrollView
                  style={{
                    height: '100vh',
                  }}
                  scrollX={false}
                  scrollY
                  scrollWithAnimation
                  scrollAnchoring
                  enhanced
                  bounces
                  showScrollbar={false}
                >
                  {sideView}
                </ScrollView>
              </View>
            }
          />
        );
    }

    if (this.useFadeSpinWrapper) {
      return (
        <>
          {this.buildHeadNavigation()}

          {this.buildCapsulePromptWrapper()}

          <Spin
            fullscreen
            spin={spin}
            customLoading={this.buildSimulationFadeSpinLoading()}
          >
            <Notification />

            <FadeView show={!spin}>{mainContent}</FadeView>

            {backTopElement}
          </Spin>

          {this.buildFullAdministrativeDivisionSelectorArea()}

          {this.buildExtendArea()}

          {this.buildSignInPromptWrapper()}

          {this.buildSignInSilentOverlay()}
        </>
      );
    }

    return (
      <>
        {this.buildHeadNavigation()}

        {this.buildCapsulePromptWrapper()}

        <Notification />

        {mainContent}

        {backTopElement}

        {this.buildFullAdministrativeDivisionSelectorArea()}

        {this.buildExtendArea()}

        {this.buildSignInPromptWrapper()}

        {this.buildSignInSilentOverlay()}
      </>
    );
  }
}

export { Infrastructure };
