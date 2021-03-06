import { ScrollView, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import {
  ComponentBase,
  Notification,
} from 'taro-fast-common/es/customComponents';
import {
  locateResult,
  underlyingState,
} from 'taro-fast-common/es/utils/constants';
import {
  buildLinearGradient,
  getMenuButtonBoundingClientRect,
  getSystemInfo,
  getValueByKey,
  inCollection,
  isWechat,
  navigateTo,
  pageScrollTo,
  recordConfig,
  recordDebug,
  recordError,
  recordExecute,
  recordLog,
  recordObject,
  redirectTo,
  showErrorMessage,
  showRuntimeError,
  sleep,
  stringIsNullOrWhiteSpace,
  transformListData,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { isArray, isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { toString } from 'taro-fast-common/es/utils/typeConvert';
import {
  BackTop,
  Cascader,
  FadeView,
  FixedBox,
  FlexBox,
  Footer,
  Line,
  Overlay,
  Popup,
  Spin,
  VariableView,
} from 'taro-fast-component/es/customComponents';
import {
  buildEmptyPlaceholder as buildEmptyPlaceholderCore,
  buildInitialActivityIndicator as buildInitialActivityIndicatorCore,
} from 'taro-fast-component/es/functionComponent';

import { checkHasAuthority } from '../../utils/authority';
import { defaultSettingsLayoutCustom } from '../../utils/defaultSettingsSpecial';
import {
  getAdministrativeDivisionFullData,
  getLaunchOption,
  getMap,
  getSession,
  getSessionRefreshing,
  setCurrentUrl,
  setSessionRefreshing,
} from '../../utils/globalStorageAssist';
import {
  getSignInResultDescription,
  getVerifySignInResult,
} from '../../utils/tools';

const refreshingBoxEffectCollection = ['pull', 'scale'];
const defaultDispatchLocationResultData = {
  locationGet: false,
  locationAuth: locateResult.unknown,
};

function getRefreshingBoxEffect(effect) {
  if (inCollection(refreshingBoxEffectCollection, effect)) {
    if (!isWechat) {
      return 'pull';
    }

    return effect;
  }

  return 'pull';
}

export default class Infrastructure extends ComponentBase {
  /**
   * ??????????????????????????????????????????
   */
  useFadeSpinWrapper = false;

  /**
   * ????????????????????????, ??????????????? useFadeSpinWrapper
   */
  useSimulationFadeSpin = false;

  /**
   * ???????????????????????????????????????, ?????????????????????, ??????????????? useFadeSpinWrapper; ??????????????? useSimulationFadeSpin ????????????
   */
  hideFadeSpinWrapperAfterLoadRemoteRequest = false;

  /**
   * ?????????????????????????????????
   */
  simulationFadeSpinDuration = 200;

  /**
   * ???????????????????????????
   */
  enableCapsulePrompt = false;

  /**
   * ???????????????????????????
   */
  capsulePromptWithCustomHeadNavigation = false;

  /**
   * ???????????????
   */
  capsulePromptRight = 90;

  capsulePromptXIndex = 20000;

  capsulePromptBackgroundColor = '#fff0f4';

  capsulePromptDelaySecond = 4000;

  capsulePromptTimer = null;

  /**
   * ??????????????????????????????
   */
  viewStyle = {};

  /**
   * ??????????????????
   */
  scrollViewMode = false;

  /**
   * ??????????????????
   */
  enablePullDownRefresh = false;

  /**
   * ????????????????????????
   */
  enableRefreshingBox = true;

  /**
   * ???????????????????????????????????????????????????????????????
   */
  displayLowerLoadingFooterBoxWhenNoData = false;

  /**
   * ??????????????????????????????
   */
  enablePullDownRefreshSuccessNotification = false;

  /**
   * ??????????????????
   */
  enableLowerLoad = false;

  /**
   * ??????????????????????????? "pull/scale", scale??????????????????????????????
   */
  refreshingBoxEffect = 'pull';

  /**
   * ???????????????????????????
   */
  refreshColor = '';

  /**
   * ?????????????????????????????????
   */
  refreshBackgroundColor = '';

  scrollWithAnimation = true;

  scrollAnchoring = true;

  scrollEnhanced = true;

  scrollBounces = true;

  scrollShowScrollbar = true;

  scrollFastDeceleration = false;

  /**
   * ???????????????????????????
   */
  lowerLoadingPosition = 'footer';

  enableNavigationBarLoading = false;

  /**
   * ??????????????????????????????????????????, ????????????, ????????????????????????????????????????????????
   */
  enableAutoInitialLoadingIndicator = true;

  /**
   * ?????????????????????????????????
   */
  enableSafeAreaInsetBottom = true;

  /**
   * ????????????
   */
  externalParameter = null;

  /**
   * ?????????????????????????????????????????????
   */
  loadRemoteRequestDelay = 0;

  /**
   * ????????????????????????????????????????????????????????????????????????????????????????????????
   */
  pagingLoadMode = false;

  /**
   * ??????
   */
  pageNo = 0;

  /**
   * ????????????
   */
  pageSize = 10;

  /**
   * ????????????, ??????????????????
   */
  total = 10;

  /**
   * ???????????????????????????????????????
   */
  lastRequestingData = { type: '', payload: {} };

  /**
   * ??????????????????, ??????????????????????????????????????????????????????????????????????????????, ????????????????????? true, ????????????????????? false
   */
  useListDataAttachMode = true;

  /**
   * ???????????????????????????????????????, ??????????????????, ??????????????????
   */
  clearListDataBeforeAttach = false;

  /**
   * pageScrollTop
   */
  pageScrollTop = 0;

  /**
   * ?????? Footer
   */
  enableFooter = false;

  /**
   * ??????????????????, ???????????????????????????
   */
  enableBackTop = false;

  /**
   * ???????????????
   */
  backTopRight = null;

  /**
   * ???????????????
   */
  backTopBottom = null;

  /**
   * ????????????
   */
  backTopCircle = false;

  /**
   * ????????????
   */
  backTopOpacity = 0.6;

  /**
   * ????????????
   */
  backTopIconColor = '';

  /**
   * ????????????
   */
  backTopBackgroundColor = '';

  /**
   * ????????????????????????????????????????????????
   */
  backTopThresholdDistance = 0;

  /**
   * ????????????
   */
  currentInstance = Taro.getCurrentInstance();

  /**
   * ???????????????????????????????????????????????????????????????
   */
  needReLocationWhenRepeatedShow = false;

  /**
   * ???????????? Session ?????????????????????,???????????????????????? checkTicket???checkTicketValidity???signInSilent ????????????????????????
   */
  ignoreSessionRelatedLogic = false;

  /**
   * ??????Session, ??????????????????????????????????????????
   */
  verifySession = false;

  /**
   * ????????????????????????
   */
  verifyTicket = false;

  /**
   * ?????????????????????????????????[?????????????????????????????????], ???????????????????????????????????????, ??????????????????
   */
  verifyTicketValidity = false;

  /**
   * ?????????????????????
   */
  initMetaDataForce = false;

  initMetaDataRequestData = {};

  useFullAdministrativeDivisionSelector = false;

  fullAdministrativeDivisionSelectorHeight = 400;

  /**
   * ??????????????????
   */
  bottomSpaceHeight = 0;

  sidePosition = 'left';
  sideWidth = 100;
  sideStyle = {};

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...underlyingState,
      ...{
        spin: true,
        signInSilentOverlayVisible: false,
        backTopVisible: false,
        capsulePromptVisible: false,
        initCapsulePrompt: false,
        fullAdministrativeDivisionSelectorVisible: false,
      },
    };

    const { screenHeight } = getSystemInfo();

    this.backTopThresholdDistance = screenHeight / 2;
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  checkSchedulingControlExistence = () => {
    const { schedulingControl } = this.props;

    if ((schedulingControl || null) == null) {
      showErrorMessage({
        message: 'config error,check in console',
      });

      recordObject(this);

      throw new Error(
        'schedulingControl in props not exist, please connect it first',
      );
    }
  };

  initializeInternalData = () => {
    recordConfig(
      'initializeInternalData do nothing, if you need to initialize internal data, please override it: initializeInternalData = () => {}',
    );
  };

  // eslint-disable-next-line no-unused-vars
  adjustByScene = (scene) => {
    recordConfig(
      'adjustByScene do nothing, if you need to adjust something by different scene, please override it: adjustByScene = (scene) => {}',
    );
  };

  adjustInternalDataOnRepeatedShow = () => {
    recordConfig(
      'adjustInternalDataOnRepeatedShow do nothing, if you need to adjust initialize internal data, please override it: adjustInternalDataOnRepeatedShow = () => {}',
    );
  };

  receiveExternalParameter = () => {
    if ((this.externalParameter || null) == null) {
      this.externalParameter = this.currentInstance.router.params;
    }
  };

  setNavigationBarTitle = (params) => {
    return Taro.setNavigationBarTitle(params);
  };

  showModal = (params) => {
    return Taro.showModal(params);
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
      const text = '?????????????????????, ????????????????????????';

      showErrorMessage({
        message: text,
      });

      return true;
    }

    return false;
  };

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
      const text = '????????????????????????, ????????????';

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
    if (this.ignoreSessionRelatedLogic) {
      if (this.needSignIn) {
        throw new Error(
          'ignoreSessionRelatedLogic and needSignIn cannot be true at the same time',
        );
      }

      this.verifySession = false;
      this.verifyTicket = false;
      this.verifyTicketValidity = false;
    } else {
      if (this.needSignIn) {
        recordDebug(
          `needSignIn is true; set checkTicket, checkTicketValidity, signInSilent and so on to true`,
        );

        this.verifySession = true;
        this.verifyTicket = true;
        this.verifyTicketValidity = true;
      }
    }

    const { scene } = {
      ...{
        scene: '',
      },
      ...getLaunchOption(),
    };

    this.adjustByScene(scene || '');

    this.checkSchedulingControlExistence();

    this.initializeInternalData();

    this.receiveExternalParameter();

    this.setCurrentInfo();

    const checkNeedSignInDidMountResult = this.checkNeedSignInDidMount();

    if (!checkNeedSignInDidMountResult) {
      this.doWorkWhenCheckNeedSignInDidMountFail();
    } else {
      const checkPermissionResult = this.checkPermission();

      if (!checkPermissionResult) {
        this.doWorkWhenCheckPermission();
      } else {
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
      }
    }
  };

  checkNeedSignInDidMount = () => {
    if (!this.needSignIn) {
      return true;
    }

    recordExecute('checkNeedSignInDidMount');

    const signInResult = this.getSignInResult();
    const verifySignInResult = getVerifySignInResult();

    if (signInResult !== verifySignInResult.success) {
      return false;
    }

    return true;
  };

  doWorkWhenCheckNeedSignInDidMountFail = () => {
    recordExecute('doWorkWhenCheckNeedSignInDidMountFail');

    const that = this;

    const signInResult = this.getSignInResult();
    const verifySignInResult = getVerifySignInResult();

    if (toString(signInResult) === toString(verifySignInResult.fail)) {
      if (this.autoRedirectToSignIn) {
        const signInPath = defaultSettingsLayoutCustom.getSignInPath();

        if (stringIsNullOrWhiteSpace(signInPath)) {
          throw new Error('?????????????????????signInPath');
        }

        setTimeout(() => {
          redirectTo(signInPath);
        }, 200);
      } else {
        this.doWorkWhenCheckNeedSignInDidMountFailAndNotAutoRedirectToSignIn();
      }
    } else {
      that.setState({ signInSilentOverlayVisible: true });

      that.checkSession(() => {
        that.checkTicketValidity({
          callback: () => {
            that.setState({ signInSilentOverlayVisible: false });

            that.doDidMountTask();
          },
          signInSilentFailCallback: () => {
            recordDebug(
              'signInSilentFailCallback in doWorkWhenCheckNeedSignInDidMountFail and class Infrastructure',
            );

            if (this.autoRedirectToSignIn) {
              const signInPath = defaultSettingsLayoutCustom.getSignInPath();

              if (stringIsNullOrWhiteSpace(signInPath)) {
                throw new Error('?????????????????????signInPath');
              }

              redirectTo(signInPath);
            } else {
              that.setState({
                spin: false,
                signInSilentOverlayVisible: false,
              });

              this.doWorkWhenCheckNeedSignInDidMountFailAndNotAutoRedirectToSignIn();
            }
          },
        });
      });
    }
  };

  doWorkWhenCheckNeedSignInDidMountFailAndNotAutoRedirectToSignIn = () => {
    recordConfig(
      'doWorkWhenCheckNeedSignInDidMountFailAndNotAutoRedirectToSignIn do nothing, if you need to do anything when check sign in fail and do not aut redirect to sign in path, please override it: doWorkWhenCheckNeedSignInDidMountFailAndNotAutoRedirectToSignIn = () => {}',
    );
  };

  checkPermission = () => {
    if (stringIsNullOrWhiteSpace(this.componentAuthority)) {
      return true;
    } else if (this.checkAuthority(this.componentAuthority)) {
      return true;
    }

    return false;
  };

  checkAuthority = (permission) => checkHasAuthority(permission);

  doWorkWhenCheckPermissionFail = () => {
    recordExecute('doWorkWhenCheckPermissionFail');

    const text = `???????????????: ${this.componentAuthority || ''}`;

    showRuntimeError({
      message: text,
    });

    const withoutPermissionRedirectPath =
      defaultSettingsLayoutCustom.getWithoutPermissionRedirectPath();

    if (stringIsNullOrWhiteSpace(withoutPermissionRedirectPath)) {
      throw new Error('??????????????????????????????????????????');
    }

    redirectTo(withoutPermissionRedirectPath);
  };

  goToSignIn = () => {
    if (this.needSignIn) {
    }
  };

  doShowTask = () => {
    if (!this.firstShowHasTriggered) {
      this.doWorkWhenFirstShow();

      this.firstShowHasTriggered = true;
    } else {
      this.adjustInternalDataOnRepeatedShow();

      this.doWorkWhenRepeatedShow();
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
   * ??????????????????????????????, ?????????????????????
   */
  doSimulationFadeSpin = (callback = null) => {
    recordExecute('doSimulationFadeSpin');

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
    recordExecute('prepareLoadRemoteRequest');

    const that = this;

    if (that.ignoreSessionRelatedLogic) {
      recordDebug(
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
    } else {
      that.checkSession(() => {
        that.initMetaData({
          data: that.initMetaDataRequestData || {},
          force: !!that.initMetaDataForce,
          callback: () => {
            if (!that.verifyTicket) {
              that.checkTicketValidity({
                callback: () => {
                  that.doWorkWhenCheckTicketValidityOnPrepareLoadRemoteRequest();
                },
              });

              if (that.loadRemoteRequestAfterMount) {
                that.doLoadRemoteRequest();
              }
            } else {
              that.checkTicketValidity({
                callback: () => {
                  if (that.loadRemoteRequestAfterMount) {
                    that.doLoadRemoteRequest();
                  }

                  that.doWorkWhenCheckTicketValidityOnPrepareLoadRemoteRequest();
                },
              });
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
    }
  };

  /**
   * ??????Session
   * @param {*} callback
   */
  checkSession = (callback) => {
    recordExecute('checkSession');

    const sessionRefreshing = getSessionRefreshing();

    const that = this;

    if (!sessionRefreshing) {
      const session = getSession();

      if ((session || '') === '') {
        recordDebug('session is empty');

        that.refreshSession({ callback });
      } else {
        Taro.checkSession({
          success: () => {
            recordDebug('session is effective, ignore session refresh');

            if (isFunction(callback)) {
              callback();
            }
          },
          fail(data) {
            recordDebug('session is expired');

            recordObject(data);

            that.refreshSession({ callback });
          },
        });
      }
    } else {
      that.checkSessionWhenSessionRefreshing({
        callback: () => {
          that.checkSession({ callback });
        },
      });
    }
  };

  checkSessionWhenSessionRefreshing({ callback, timeTotal = 0 }) {
    recordExecute('checkSessionWhenSessionRefreshing');

    if (timeTotal > 3000) {
      setSessionRefreshing(false);

      if (isFunction(callback)) {
        callback();
      }

      return;
    }

    const that = this;

    sleep(100, () => {
      recordLog(`checkSessionWhenSessionRefreshing sleep ${timeTotal}`);

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
   * ??????????????????
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
   * ?????????????????????????????????
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
          callback();
        }

        return null;
      })
      .catch((error) => {
        recordError(error);
      });
  };

  dispatchSetSignInProcessDetection = (data) => {
    return this.dispatchApi({
      type: 'schedulingControl/setSignInProcessDetection',
      payload: !!data,
    });
  };

  getSignInProcessDetection = () => {
    recordExecute('getSignInProcessDetection');

    const {
      schedulingControl: { signInProcessDetection },
    } = this.props;

    return !!signInProcessDetection;
  };

  setSignInProcessDetection = ({ data, callback }) => {
    recordLog(`setSignInProcessDetection ${data}`);

    const that = this;

    that
      .dispatchSetSignInProcessDetection(!!data)
      .then(() => {
        recordExecute('dispatchSetSignInProcessDetection then');

        if (isFunction(callback)) {
          callback();
        }

        return null;
      })
      .catch((error) => {
        recordError(error);
      });
  };

  dispatchSetSignInResult = (data) => {
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
    recordExecute('getSignInResult');

    const {
      schedulingControl: { signInResult },
    } = this.props;

    return signInResult;
  };

  setSignInResult = ({ data, callback }) => {
    recordExecute('setSignInResult');
    recordDebug(
      `sign in result is ${data}, it mean ${getSignInResultDescription(data)} `,
    );

    const that = this;

    that
      .dispatchSetSignInResult(data)
      .then(() => {
        recordExecute('dispatchSetSignInResult then');

        if (isFunction(callback)) {
          callback();
        }

        return null;
      })
      .catch((error) => {
        recordError(error);
      });
  };

  dispatchLocationResult = (data = defaultDispatchLocationResultData) => {
    return this.dispatchApi({
      type: 'schedulingControl/setLocationResult',
      payload: data,
    });
  };

  getLocationResult() {
    const { locationResult } = this.getGlobalWrapper();

    return locationResult;
  }

  setLocationResult({ data, callback = null }) {
    this.dispatchLocationResult(data)
      .then((d) => {
        if (isFunction(callback)) {
          callback(d);
        }

        return d;
      })
      .catch((error) => {
        recordError(error);
      });
  }

  getCurrentLocation = ({ callback = null }) => {
    const that = this;

    const map = getMap();

    if (map == null) {
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
      that.getLocationWeatherCore({
        data: map,
        callback,
      });
    }
  };

  getLocationWeather = ({ callback = null }) => {
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
    const {
      address_component: { province, city },
    } = data;

    this.getWeather({
      data: {
        province,
        city,
      },
      callback,
    });
  };

  getWeather = ({ data = {}, callback = null }) => {
    return this.dispatchApi({
      type: 'schedulingControl/getWeather',
      payload: data,
    })
      .then(() => {
        const { weather } = getValueByKey({
          data: this.props,
          key: 'schedulingControl',
        });

        if (isFunction(callback)) {
          callback(weather);
        }

        return weather;
      })
      .catch((error) => {
        recordError(error);
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
            message: '????????????',
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
   * ???????????????????????????????????????
   * @returns bool
   */
  judgeInitialActivityIndicatorVisible = () => {
    const { firstLoadSuccess, dataLoading } = this.state;

    return !firstLoadSuccess && dataLoading;
  };

  /**
   * ?????????????????????????????????
   * @returns bool
   */
  judgeEmptyPlaceholderVisible = () => {
    const { firstLoadSuccess, metaListData } = this.state;

    return (
      firstLoadSuccess && isArray(metaListData) && metaListData.length === 0
    );
  };

  /**
   * ?????????????????????
   */
  buildEmptyPlaceholder = ({
    icon = '',
    iconSize = 180,
    iconStyle = {},
    image = '',
    imageStyle = {},
    imageWidth = 140,
    imageAspectRatio = 1,
    description = '????????????',
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
   * ???????????????????????????
   */
  buildInitialActivityIndicator = ({
    type = 'comet',
    description = '?????????',
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
   * ??????????????????????????????, ????????????????????????, ???????????? true, ?????????????????????????????????
   * @returns bool
   */
  judgeNeedNextLoad = () => {
    return true;
  };

  buildRefreshingBox = () => null;

  /**
   * ??????????????????????????????
   * @returns
   */
  buildLowerLoadingSuspendBox = () => null;

  /**
   * ??????????????????????????????
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
        zIndex={20000}
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
   * ?????????????????????????????????????????????????????????????????????
   */
  buildExtendArea = () => {
    return null;
  };

  /**
   * ??????????????????????????????
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
        header="????????????"
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

    const image = defaultSettingsLayoutCustom.getFooterImage();
    const text = defaultSettingsLayoutCustom.getFooterText();
    const description = defaultSettingsLayoutCustom.getFooterDescription();

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

  /**
   * ???????????????????????????
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
                ???????????????
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

    const vw = (
      <VariableView
        style={{
          ...this.viewStyle,
          ...{
            width: '100%',
          },
        }}
        scroll={this.scrollViewMode}
        height="100vh"
        enablePullDownRefresh={this.enablePullDownRefresh}
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

    let mainContent = null;
    const sideView = this.buildSideView();

    if (sideView != null) {
      if (this.sidePosition === 'left') {
        mainContent = (
          <FlexBox
            flexAuto="right"
            leftStyle={{
              ...{
                width: transformSize(this.sideWidth),
              },
            }}
            left={
              <View
                style={{
                  ...(this.sideStyle || {}),
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
                    ...{
                      height: '100vh',
                      width: '100%',
                    },
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
        );
      } else {
        mainContent = (
          <FlexBox
            flexAuto="left"
            left={vw}
            rightStyle={{
              ...{
                width: transformSize(this.sideWidth),
              },
            }}
            right={
              <View
                style={{
                  ...(this.sideStyle || {}),
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
                    ...{
                      height: '100vh',
                    },
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
    } else {
      mainContent = vw;
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

        {this.buildSignInSilentOverlay()}
      </>
    );
  }
}
