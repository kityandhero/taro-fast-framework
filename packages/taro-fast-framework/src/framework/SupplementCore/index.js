import Taro, { ENV_TYPE, getEnv } from '@tarojs/taro';

import { getCache, setCache } from 'taro-fast-common/es/utils/cacheAssist';
import {
  locateResult,
  locationModeCollection,
} from 'taro-fast-common/es/utils/constants';
import Tips from 'taro-fast-common/es/utils/tips';
import {
  getGeographicalLocation,
  getSetting,
  inCollection,
  recordConfig,
  recordDebug,
  recordError,
  recordExecute,
  recordInfo,
  recordLog,
  recordObject,
  recordWarn,
  redirectTo,
  showErrorMessage,
  showInfoMessage,
  sleep,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import {
  isFunction,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from 'taro-fast-common/es/utils/typeCheck';
import { toNumber, toString } from 'taro-fast-common/es/utils/typeConvert';

import { defaultSettingsLayoutCustom } from '../../utils/defaultSettingsSpecial';
import {
  getAdministrativeDivisionFullData,
  getCurrentCustomer,
  getCurrentMetaData,
  getEffectiveCode,
  getLastLocation,
  getLocation,
  getLocationMode,
  getMap,
  getNextCheckLoginUnixTime,
  getSessionRefreshing,
  removeCurrentCustomer,
  removeLocation,
  removeSession,
  setAdministrativeDivisionFullData,
  setCurrentCustomer,
  setCurrentMetaData,
  setEffectiveCode,
  setLastLocation,
  setLocation,
  setLocationMode,
  setMap,
  setNextCheckLoginUnixTime,
  setOpenId,
  setSession,
  setSessionRefreshing,
  setToken,
} from '../../utils/globalStorageAssist';
import {
  getSignInResultDescription,
  getVerifySignInResult,
} from '../../utils/tools';
import Common from '../Common';

/**
 * 业务调度核心底层方法
 */
class SupplementCore extends Common {
  doShowTask = () => {
    recordExecute('doShowTask');

    recordDebug(
      `this.firstShowHasTriggered is ${this.firstShowHasTriggered} in doShowTask`,
    );

    if (!this.firstShowHasTriggered) {
      this.doWorkWhenFirstShow();

      this.firstShowHasTriggered = true;

      recordDebug('set this.firstShowHasTriggered to true');

      this.doWorkWhenEveryShow();

      this.doWorkAfterShow();
    } else {
      const that = this;

      that.adjustInternalDataOnRepeatedShow();

      that.setCurrentInfo();

      recordDebug(
        `this.repeatDoWorkWhenShow is ${this.repeatDoWorkWhenShow} in doShowTask`,
      );

      if (this.repeatDoWorkWhenShow) {
        this.doWorkWhenShow(() => {
          that.doWorkWhenRepeatedShow();

          that.doWorkWithNeedReLocationWhenRepeatedShow();

          this.doWorkWhenEveryShow();

          this.doWorkAfterShow();
        });
      } else {
        that.checkSession(() => {
          if (that.getVerifyTicketValidity()) {
            that.checkTicketValidity({
              callback: that.doWorkWhenCheckTicketValidityOnRepeatedShow,
            });
          }
        });

        that.doWorkWhenRepeatedShow();

        that.doWorkWithNeedReLocationWhenRepeatedShow();

        this.doWorkWhenEveryShow();

        this.doWorkAfterShow();
      }
    }
  };

  doWorkWithNeedReLocationWhenRepeatedShow = () => {
    recordExecute('doWorkWithNeedReLocationWhenRepeatedShow');

    const that = this;

    if (that.needReLocationWhenRepeatedShow) {
      const ENV = getEnv();

      const noAdaptationMessage = `framework with env [${ENV}] has no adaptation location, only execute executeLogicAfterNonautomaticReLocationWhenRepeatedShow`;

      switch (ENV) {
        case ENV_TYPE.WEAPP:
          break;

        case ENV_TYPE.ALIPAY:
          recordWarn(noAdaptationMessage);

          that.executeLogicAfterNonautomaticReLocationWhenRepeatedShow({});

          return;

        case ENV_TYPE.SWAN:
          recordWarn(noAdaptationMessage);

          that.executeLogicAfterNonautomaticReLocationWhenRepeatedShow({});

          return;

        case ENV_TYPE.WEB:
          recordWarn(noAdaptationMessage);

          that.executeLogicAfterNonautomaticReLocationWhenRepeatedShow({});

          return;

        default:
          recordWarn(noAdaptationMessage);

          that.executeLogicAfterNonautomaticReLocationWhenRepeatedShow({});

          return;
      }

      recordDebug(
        `this.needReLocationWhenRepeatedShow is ${this.needReLocationWhenRepeatedShow} in doShowTask`,
      );

      const useLocation = defaultSettingsLayoutCustom.getUseLocation();
      const locationMode = getLocationMode();

      if (
        (useLocation || false) &&
        locationMode === locationModeCollection.auto
      ) {
        that.obtainLocation({
          successCallback: ({ location, map }) => {
            that.executeLogicAfterAutomaticReLocationSuccessWhenRepeatedShow({
              location,
              map,
              force: false,
            });
          },
          force: false,
          showLoading: false,
          fromLaunch: false,
          failCallback: null,
        });
      } else {
        that.executeLogicAfterNonautomaticReLocationWhenRepeatedShow({});
      }
    }
  };

  obtainLocation = ({
    successCallback,
    force = false,
    showLoading = false,
    fromLaunch = false,
    failCallback,
  }) => {
    recordExecute('obtainLocation');

    const ENV = getEnv();

    const noAdaptationMessage = `framework with env [${ENV}] has no adaptation, ignore obtainLocation, only execute failCallback`;

    switch (ENV) {
      case ENV_TYPE.WEAPP:
        break;

      case ENV_TYPE.ALIPAY:
        recordWarn(noAdaptationMessage);

        if (isFunction(failCallback)) {
          failCallback();
        }

        return;

      case ENV_TYPE.SWAN:
        recordWarn(noAdaptationMessage);

        if (isFunction(failCallback)) {
          failCallback();
        }

        return;

      case ENV_TYPE.WEB:
        recordWarn(noAdaptationMessage);

        if (isFunction(failCallback)) {
          failCallback();
        }

        return;

      default:
        recordWarn(noAdaptationMessage);

        if (isFunction(failCallback)) {
          failCallback();
        }

        return;
    }

    const simulationMode = defaultSettingsLayoutCustom.getSimulationLocation();
    const simulationData =
      defaultSettingsLayoutCustom.getSimulationLocationData();

    if (simulationMode) {
      recordDebug('simulation location in config is true');

      if (!isObject(simulationData)) {
        recordObject({
          simulationLocationData: simulationData,
        });

        throw new Error(
          'simulation location Data must be an object when simulation location in config is true',
        );
      }
    }

    let needRelocation = force || false;

    const location = getLocation();
    const mapData = getMap();
    const locationMode = getLocationMode();

    if (locationMode !== locationModeCollection.auto) {
      removeLocation();
    }

    if (!force) {
      if ((location || null) == null || (mapData || null) == null) {
        needRelocation = true;
      } else {
        this.setLocationResult({
          data: {
            locationGet: true,
            locationAuth: locateResult.yes,
          },
          callback: null,
        });

        if (isFunction(successCallback)) {
          successCallback({
            location,
            map: mapData,
          });
        }
      }
    } else {
      recordDebug('obtain location force');
    }

    if (needRelocation) {
      if (showLoading) {
        showInfoMessage({
          message: '定位中,请稍后',
          duration: 1500,
        });
      }

      const that = this;

      getGeographicalLocation({
        success: (l) => {
          that.setLocationResult({
            data: {
              locationGet: true,
              locationAuth: locateResult.yes,
            },
            callback: null,
          });

          setLocationMode(locationModeCollection.auto);

          setLocation(l);

          const defaultLongitude =
            defaultSettingsLayoutCustom.getDefaultLongitude();
          const defaultLatitude =
            defaultSettingsLayoutCustom.getDefaultLatitude();
          const { latitude, longitude } = l;

          that.reverseGeocoder({
            location: {
              latitude: !latitude ? defaultLatitude : latitude,
              longitude: !longitude ? defaultLongitude : longitude,
            },
            success: (res) => {
              const { result } = res;

              setMap(result);

              setLastLocation(result);

              if (isFunction(successCallback)) {
                successCallback({
                  location: l,
                  map: result,
                });
              }
            },
            fail: (error) => {
              recordError(error);

              if (mapData != null) {
                setMap(mapData);
                setLastLocation(mapData);

                if (isFunction(successCallback)) {
                  successCallback({
                    location: l,
                    map: mapData,
                  });
                }
              } else {
                const mapDataLast = getLastLocation();

                if (mapDataLast != null) {
                  if (isFunction(successCallback)) {
                    successCallback({
                      location: l,
                      map: mapDataLast,
                    });
                  }
                } else {
                  setLocationMode(locationModeCollection.custom);

                  if (location != null) {
                    setLocation(location);
                  }

                  if (mapData != null) {
                    setMap(mapData);
                    setLastLocation(mapData);

                    if (isFunction(successCallback)) {
                      successCallback({
                        location: l,
                        map: mapData,
                      });
                    }
                  } else {
                    if (mapDataLast != null) {
                      if (isFunction(successCallback)) {
                        successCallback({
                          location: l,
                          map: mapDataLast,
                        });
                      }
                    } else {
                      setLocationMode(locationModeCollection.custom);

                      if (location != null) {
                        setLocation(location);
                      }

                      if (isFunction(successCallback)) {
                        successCallback({
                          location: l,
                          map: null,
                        });
                      }
                    }
                  }
                }
              }
            },
            complete: function () {},
          });
        },
        fail: (failLocationResult) => {
          setLocationMode(locationModeCollection.custom);

          if (location != null) {
            setLocation(location);
          }

          if (mapData != null) {
            setMap(mapData);
          }

          const { errMsg } = failLocationResult;

          if (errMsg === 'getLocation:fail auth deny') {
            that.setLocationResult({
              data: {
                locationGet: false,
                locationAuth: locateResult.no,
              },
              callback: null,
            });

            showInfoMessage({
              message: '您已禁止获取位置信息',
            });
          } else {
            getSetting({
              success: (res) => {
                const { authSetting } = res;

                let authLocation = locateResult.unknown;

                if ((authSetting || null) != null) {
                  const v = authSetting['scope.userLocation'];

                  if (!isUndefined(v)) {
                    if (v) {
                      authLocation = locateResult.yes;

                      showInfoMessage({
                        message: '获取定位失败',
                      });
                    } else {
                      authLocation = locateResult.no;

                      showInfoMessage({
                        message: '您已拒绝程序获取定位信息',
                      });
                    }
                  }
                }

                that.setLocationResult({
                  data: {
                    locationGet: false,
                    locationAuth: authLocation,
                  },
                  callback: null,
                });

                if (fromLaunch) {
                  if (authLocation === locateResult.unknown) {
                  }
                }
              },
              fail: () => {
                that.setLocationResult({
                  data: {
                    locationGet: false,
                    locationAuth: locateResult.unknown,
                  },
                  callback: null,
                });

                showInfoMessage({
                  message: '获取定位权限信息失败',
                });
              },
              complete: () => {},
            });
          }

          if (isFunction(failCallback)) {
            failCallback();
          }
        },
        complete: () => {},
        simulationMode,
        simulationData,
      });
    }
  };

  /**
   * 在重新显示时[自动定位情况下]重新定位成功后执行的业务逻辑
   * @param {*} param0
   */
  executeLogicAfterAutomaticReLocationSuccessWhenRepeatedShow = ({
    location,
    map,
    callback,
    force = false,
  }) => {
    if (isFunction(callback)) {
      callback({
        location,
        map,
        force,
      });
    }
  };

  /**
   * 在重新显示时[非自动定位情况下]跳过定位后执行的业务逻辑
   * @param {*} param0
   */
  executeLogicAfterNonautomaticReLocationWhenRepeatedShow = ({
    location,
    map,
    callback,
    force = false,
  }) => {
    recordExecute('executeLogicAfterNonautomaticReLocationWhenRepeatedShow');

    if (isFunction(callback)) {
      callback({
        location,
        map,
        force,
      });
    }
  };

  checkTicketValidity = ({ callback, signInSilentFailCallback = null }) => {
    recordExecute('checkTicketValidity');

    const ENV = getEnv();

    const noAdaptationMessage = `framework with env [${ENV}] has no adaptation, ignore checkTicketValidity, only execute signInSilentFailCallback`;

    switch (ENV) {
      case ENV_TYPE.WEAPP:
        break;

      case ENV_TYPE.ALIPAY:
        recordWarn(noAdaptationMessage);

        if (isFunction(signInSilentFailCallback)) {
          signInSilentFailCallback();
        }

        return;

      case ENV_TYPE.SWAN:
        recordWarn(noAdaptationMessage);

        if (isFunction(signInSilentFailCallback)) {
          signInSilentFailCallback();
        }

        return;

      case ENV_TYPE.WEB:
        recordWarn(noAdaptationMessage);

        if (isFunction(signInSilentFailCallback)) {
          signInSilentFailCallback();
        }

        return;

      default:
        recordWarn(noAdaptationMessage);

        if (isFunction(signInSilentFailCallback)) {
          signInSilentFailCallback();
        }

        return;
    }

    const useLocation = defaultSettingsLayoutCustom.getUseLocation();
    const locationMode = getLocationMode();
    const signInResult = this.getSignInResult();
    const verifySignInResult = getVerifySignInResult();

    const that = this;

    if (signInResult === verifySignInResult.unknown) {
      recordDebug(
        `sign in result is ${signInResult}, it mean ${getSignInResultDescription(
          signInResult,
        )}`,
      );

      if (
        (useLocation || false) &&
        locationMode === locationModeCollection.auto
      ) {
        recordInfo(
          'info use location and automatic location and sign in result is unknown',
        );

        that.obtainLocation({
          successCallback: () => {
            that.signInSilent({
              data: {},
              successCallback: callback,
              failCallback: signInSilentFailCallback,
            });
          },
          focus: false,
          showLoading: false,
          fromLaunch: false,
          failCallback: () => {
            that.signInSilent({
              data: {},
              successCallback: callback,
              failCallback: signInSilentFailCallback,
            });
          },
        });
      } else {
        that.signInSilent({
          data: {},
          successCallback: callback,
          failCallback: signInSilentFailCallback,
        });
      }
    } else {
      if (
        (useLocation || false) &&
        locationMode === locationModeCollection.auto
      ) {
        recordInfo(
          'info use location and automatic location on checkTicketValidity and sign in result is not unknown',
        );

        that.obtainLocation({
          successCallback: () => {
            that.bridgeLogicOnCheckTicketValidity({ callback });
          },
          focus: false,
          showLoading: false,
          fromLaunch: false,
          failCallback: () => {
            that.bridgeLogicOnCheckTicketValidity({ callback });
          },
        });
      } else {
        recordDebug(
          'do not use location or nonautomatic location on checkTicketValidity',
        );

        that.bridgeLogicOnCheckTicketValidity({ callback });
      }
    }
  };

  doWorkWhenCheckTicketValidityOnRepeatedShow = () => {};

  bridgeLogicOnCheckTicketValidity({ callback = null }) {
    recordExecute('bridgeLogicOnCheckTicketValidity');

    const ticketValidityProcessDetection =
      this.getTicketValidityProcessDetection();

    if (ticketValidityProcessDetection) {
      return;
    }

    const verifySignInResult = getVerifySignInResult();
    const signInResult = this.getSignInResult();

    if (signInResult === verifySignInResult.fail) {
      if (!this.getVerifyTicket()) {
        if (isFunction(callback)) {
          callback();
        }

        return;
      } else {
        this.checkTicketValidityCore({
          forceRefresh: true,
          callback,
        });

        return;
      }
    }

    this.checkTicketValidityCore({
      forceRefresh: false,
      callback,
    });
  }

  dispatchCheckTicketValidity = (data = {}) => {
    if (this.getVerifyTicket()) {
      throw new Error(
        'dispatchCheckTicketValidity need override when verifyTicket set to true, dispatchCheckTicketValidity must return a promise',
      );
    }

    return this.dispatchApi({
      type: 'schedulingControl/checkTicketValidity',
      payload: data,
      alias: defaultSettingsLayoutCustom.getCheckTicketValidityAliasName(),
    });
  };

  checkTicketValidityCore({
    forceRefresh: forceRefreshValue = false,
    callback = null,
  }) {
    recordExecute('checkTicketValidityCore');

    const that = this;

    if (forceRefreshValue) {
      that.signInSilent({
        data: {},
        successCallback: callback,
      });

      return;
    }

    const currentNextCheckLoginUnixTime = getNextCheckLoginUnixTime();

    const currentUnixTime = parseInt(new Date().getTime() / 1000, 10);

    if (currentUnixTime < currentNextCheckLoginUnixTime) {
      if (isFunction(callback)) {
        callback();
      }

      return;
    }

    that
      .dispatchCheckTicketValidity({})
      .then((remoteData) => {
        const { dataSuccess, data: metaData } = remoteData;

        if (dataSuccess) {
          const { needRefresh, nextCheckLoginUnixTime } = metaData;

          setNextCheckLoginUnixTime(nextCheckLoginUnixTime);

          if (needRefresh) {
            that.signInSilent({
              data: {},
              successCallback: callback,
            });
          } else {
            const verifySignInResult = getVerifySignInResult();
            const signInResult = that.getSignInResult();

            if (
              signInResult === verifySignInResult.fail &&
              that.getVerifyTicket()
            ) {
              that.doWhenCheckTicketValidityVerifySignInFail();
            }

            if (signInResult === verifySignInResult.success) {
              if (isFunction(callback)) {
                callback();
              }
            }

            that.setTicketValidityProcessDetection({
              data: false,
            });
          }
        }

        return remoteData;
      })
      .catch((error) => {
        recordError(error);
      });
  }

  doWhenCheckTicketValidityVerifySignInFail = () => {};

  dispatchRefreshSession = (data) => {
    if (this.getVerifySession()) {
      throw new Error(
        'dispatchRefreshSession need override, dispatchRefreshSession must return a promise',
      );
    }

    return this.dispatchApi({
      type: 'schedulingControl/refreshSession',
      payload: data,
      alias: defaultSettingsLayoutCustom.getRefreshSessionAliasName(),
    });
  };

  refreshSession = ({ callback }) => {
    recordExecute('refreshSession');

    const sessionRefreshing = getSessionRefreshing();

    if (!sessionRefreshing) {
      setSessionRefreshing(true);

      const that = this;

      Taro.login({ timeout: 1000 })
        .then((res) => {
          recordExecute('Taro.login');

          const { code } = res;

          if (code) {
            recordDebug(`code: ${code}`);

            setEffectiveCode(code);

            that
              .dispatchRefreshSession({ code })
              .then((remoteData) => {
                const { dataSuccess, data: metaData } = remoteData;

                if (dataSuccess) {
                  const { code: effectiveCodeRemote, sessionId } = metaData;
                  const effectiveCode = getEffectiveCode();

                  if (effectiveCode === (effectiveCodeRemote || 'no')) {
                    setSession(sessionId);
                  }

                  if (isFunction(callback)) {
                    // eslint-disable-next-line promise/no-callback-in-promise
                    callback();
                  }
                } else {
                  removeSession();
                }

                setSessionRefreshing(false);

                return remoteData;
              })
              .catch((error) => {
                recordError({ error });

                Tips.info('网络请求失败了，请检查下是否联网');

                removeSession();

                setSessionRefreshing(false);

                if (isFunction(callback)) {
                  // eslint-disable-next-line promise/no-callback-in-promise
                  callback();
                }
              });
          } else {
            Tips.info('获取微信Code失败');

            removeSession();

            setSessionRefreshing(false);

            if (isFunction(callback)) {
              // eslint-disable-next-line promise/no-callback-in-promise
              callback();
            }
          }

          return res;
        })
        .catch((error) => {
          recordError({ error, current: that });

          showInfoMessage({
            message: '微信登录失败',
          });

          removeSession();

          setSessionRefreshing(false);

          if (isFunction(callback)) {
            callback();
          }
        });
    } else {
      this.retryRefreshSessionWhenRefreshing({
        callback,
      });
    }
  };

  retryRefreshSessionWhenRefreshing({ callback, timeTotal = 0 }) {
    if (timeTotal > 3000) {
      Tips.info('长时间等待');

      if (isFunction(callback)) {
        callback();
      }

      return;
    }

    sleep(100, () => {
      const sessionRefreshingAfterSleep = getSessionRefreshing();

      if (sessionRefreshingAfterSleep) {
        this.retryRefreshSessionWhenRefreshing({
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

  signIn = ({
    data,
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    recordExecute('signIn');

    const that = this;

    const useLocation = defaultSettingsLayoutCustom.getUseLocation();
    const locationMode = getLocationMode();

    if ((useLocation || false) && locationMode == locationModeCollection.auto) {
      recordDebug('use location and automatic location on sign in');

      that.obtainLocation({
        // eslint-disable-next-line no-unused-vars
        successCallback: ({ location, map }) => {
          const { latitude, longitude } = location || {
            latitude: 34.7533581487,
            longitude: 113.6313915479,
          };

          data.latitude = latitude || '';
          data.longitude = longitude || '';

          const signInProcessDetection = that.getSignInProcessDetection();

          if (!signInProcessDetection) {
            that.setSignInProcessDetection({
              data: true,
              callback: () => {
                that.signInCore({
                  data,
                  successCallback,
                  failCallback,
                  completeCallback,
                });
              },
            });
          }
        },
        focus: false,
        showLoading: false,
        fromLaunch: false,
        failCallback: () => {
          const signInProcessDetection = that.getSignInProcessDetection();

          if (!signInProcessDetection) {
            that.setSignInProcessDetection({
              data: true,
              callback: () => {
                that.signInCore({
                  data,
                  successCallback,
                  failCallback,
                  completeCallback,
                });
              },
            });
          }
        },
      });
    } else {
      if (useLocation || false) {
        recordDebug('use location and nonautomatic location');

        that.signInWhenCheckProcessDetection({
          data,
          callback: (o, p) => {
            o.setSignInProcessDetection({
              data: true,
              callback: () => {
                o.signInCore({
                  data: p,
                  successCallback,
                  failCallback,
                  completeCallback,
                });
              },
            });
          },
          timeTotal: 0,
        });
      } else {
        const signInProcessDetection = that.getSignInProcessDetection();

        if (!signInProcessDetection) {
          that.setSignInProcessDetection({
            data: true,
            callback: () => {
              that.signInCore({
                data,
                successCallback,
                failCallback,
                completeCallback,
              });
            },
          });
        }
      }
    }
  };

  signInWhenCheckProcessDetection({ data, callback, timeTotal = 0 }) {
    recordExecute('signInWhenCheckProcessDetection');

    const that = this;

    if (timeTotal > 3000) {
      if (isFunction(callback)) {
        callback(that, data);
      }

      return;
    }

    sleep(100, () => {
      recordLog(`signInWhenCheckProcessDetection sleep ${timeTotal}`);

      const signInProcessDetection = that.getSignInProcessDetection();

      if (signInProcessDetection) {
        that.signInWhenCheckProcessDetection({
          data,
          callback,
          timeTotal: timeTotal + 100,
        });
      } else {
        if (isFunction(callback)) {
          callback(that, data);
        }
      }
    });
  }

  signInSilent = ({
    data,
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    recordExecute('signInSilent');

    const that = this;

    const useLocation = defaultSettingsLayoutCustom.getUseLocation();
    const locationMode = getLocationMode();

    if ((useLocation || false) && locationMode == locationModeCollection.auto) {
      recordDebug('use location and automatic location on sign in silent');

      that.obtainLocation({
        // eslint-disable-next-line no-unused-vars
        successCallback: ({ location, map }) => {
          const { latitude, longitude } = location || {
            latitude: 34.7533581487,
            longitude: 113.6313915479,
          };

          data.latitude = latitude || '';
          data.longitude = longitude || '';

          const signInProcessDetection = that.getSignInProcessDetection();

          if (!signInProcessDetection) {
            that.setSignInProcessDetection({
              data: true,
              callback: () => {
                that.signInSilentCore({
                  data,
                  successCallback,
                  failCallback,
                  completeCallback,
                });
              },
            });
          }
        },
        focus: false,
        showLoading: false,
        fromLaunch: false,
        failCallback: () => {
          const signInProcessDetection = that.getSignInProcessDetection();

          if (!signInProcessDetection) {
            that.setSignInProcessDetection({
              data: true,
              callback: () => {
                that.signInSilentCore({
                  data,
                  successCallback,
                  failCallback,
                  completeCallback,
                });
              },
            });
          }
        },
      });
    } else {
      if (useLocation || false) {
        recordDebug('use location and nonautomatic location');

        that.signInSilentWhenCheckProcessDetection({
          data,
          callback: (o, p) => {
            o.setSignInProcessDetection({
              data: true,
              callback: () => {
                o.signInSilentCore({
                  data: p,
                  successCallback,
                  failCallback,
                  completeCallback,
                });
              },
            });
          },
          timeTotal: 0,
        });
      } else {
        const signInProcessDetection = that.getSignInProcessDetection();

        if (!signInProcessDetection) {
          that.setSignInProcessDetection({
            data: true,
            callback: () => {
              that.signInSilentCore({
                data,
                successCallback,
                failCallback,
                completeCallback,
              });
            },
          });
        }
      }
    }
  };

  signInSilentWhenCheckProcessDetection({ data, callback, timeTotal = 0 }) {
    recordExecute('signInSilentWhenCheckProcessDetection');

    const that = this;

    if (timeTotal > 3000) {
      if (isFunction(callback)) {
        callback(that, data);
      }

      return;
    }

    sleep(100, () => {
      recordLog(`signInSilentWhenCheckProcessDetection sleep ${timeTotal}`);

      const signInProcessDetection = that.getSignInProcessDetection();

      if (signInProcessDetection) {
        that.signInSilentWhenCheckProcessDetection({
          data,
          callback,
          timeTotal: timeTotal + 100,
        });
      } else {
        if (isFunction(callback)) {
          callback(that, data);
        }
      }
    });
  }

  // eslint-disable-next-line no-unused-vars
  dispatchSignIn = (data = {}) => {
    throw new Error(
      'dispatchSignIn need override, dispatchSignIn must return a promise',
    );
  };

  dispatchSignInSilent = (data = {}) => {
    if (this.getVerifyTicket()) {
      throw new Error(
        'dispatchSignInSilent need override, dispatchSignInSilent must return a promise',
      );
    }

    return this.dispatchApi({
      type: 'schedulingControl/signInSilent',
      payload: data,
      alias: defaultSettingsLayoutCustom.getSignInSilentAliasName(),
    });
  };

  getSignInApiData = () => {
    throw new Error(
      'getSignInApiData need override, getSignInApiData must return a object',
    );
  };

  signInCore({
    data,
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) {
    recordExecute('signInCore');

    // Tips.loading('处理中');

    const that = this;

    that
      .dispatchSignIn(data)
      .then((remoteData) => {
        Tips.loaded();

        const { dataSuccess, data: metaData } = remoteData;

        that.setSignInProcessDetection({
          data: false,
        });

        if (dataSuccess) {
          const sessionEffective =
            that.parseSessionEffectiveFromSignInApiDataWrapper(metaData);

          if (!sessionEffective) {
            that.refreshSession({
              callback: () => {
                that.signInCore({
                  data,
                  successCallback,
                  failCallback,
                  completeCallback,
                });
              },
            });

            return;
          }

          const signInResult =
            that.parseSignInResultFromSignInApiDataWrapper(metaData);

          that.setSignInResultOnSignIn({
            signInResult,
          });

          const token = that.parseTokenFromSignInApiData(metaData);

          that.setTokenOnSignIn({
            token,
          });

          that.setOpenIdOnSignIn({
            openId: that.parseOpenIdFromSignInApiData(metaData),
          });

          removeCurrentCustomer();

          const verifySignInResult = getVerifySignInResult();

          if (toString(signInResult) === toString(verifySignInResult.success)) {
            that.getCustomer({
              successCallback: () => {
                if (isFunction(successCallback)) {
                  successCallback(metaData);
                }

                that.doAfterGetCustomerOnSignIn(metaData);

                that.doAfterSignInSuccess(metaData);
              },
              failCallback,
              completeCallback,
            });
          } else {
            that.doWhenSignInFailWrapper();

            if (isFunction(failCallback)) {
              failCallback();
            }

            if (isFunction(completeCallback)) {
              completeCallback();
            }
          }
        } else {
          removeSession();

          showInfoMessage({
            message: '登录失败',
          });

          that.doWhenSignInFailWrapper();

          if (isFunction(failCallback)) {
            failCallback();
          }

          if (isFunction(completeCallback)) {
            completeCallback();
          }
        }

        return remoteData;
      })
      .catch((error) => {
        recordError(error);
      });
  }

  signInSilentCore({
    data,
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) {
    recordExecute('signInSilentCore');

    const ENV = getEnv();

    const noAdaptationMessage = `framework with env [${ENV}] has no adaptation, ignore obtainLocation, only execute failCallback`;

    switch (ENV) {
      case ENV_TYPE.WEAPP:
        break;

      case ENV_TYPE.ALIPAY:
        recordWarn(noAdaptationMessage);

        if (isFunction(failCallback)) {
          failCallback();
        }

        if (isFunction(completeCallback)) {
          completeCallback();
        }

        return;

      case ENV_TYPE.SWAN:
        recordWarn(noAdaptationMessage);

        if (isFunction(failCallback)) {
          failCallback();
        }

        if (isFunction(completeCallback)) {
          completeCallback();
        }

        return;

      case ENV_TYPE.WEB:
        recordWarn(noAdaptationMessage);

        if (isFunction(failCallback)) {
          failCallback();
        }

        if (isFunction(completeCallback)) {
          completeCallback();
        }

        return;

      default:
        recordWarn(noAdaptationMessage);

        if (isFunction(failCallback)) {
          failCallback();
        }

        if (isFunction(completeCallback)) {
          completeCallback();
        }

        return;
    }

    // Tips.loading('处理中');

    const tryRefreshSessionKey = 'tryRefreshSessionKeyTimes';

    let tryRefreshSession = getCache({ key: tryRefreshSessionKey });

    if (!isNumber(tryRefreshSession)) {
      tryRefreshSession = 1;

      setCache({
        key: tryRefreshSessionKey,
        value: tryRefreshSession,
      });
    } else {
      // 最多重试 10 次
      if (tryRefreshSession > 10) {
        showErrorMessage({
          message:
            'signInSilentCore 重试超过最大限制,请检查 refreshSession 接口返回数据',
        });

        return;
      }

      tryRefreshSession += 1;

      setCache({
        key: tryRefreshSessionKey,
        value: tryRefreshSession,
      });
    }

    const that = this;

    that
      .dispatchSignInSilent(data)
      .then((remoteData) => {
        Tips.loaded();

        const { dataSuccess, data: metaData } = remoteData;

        that.setSignInProcessDetection({
          data: false,
        });

        if (dataSuccess) {
          const sessionEffective =
            that.parseSessionEffectiveFromSignInSilentApiDataWrapper(metaData);

          if (!sessionEffective) {
            that.refreshSession({
              callback: () => {
                that.signInSilentCore({
                  data,
                  successCallback,
                  failCallback,
                  completeCallback,
                });
              },
            });

            return;
          }

          const signInResult =
            that.parseSignInResultFromSignInSilentApiDataWrapper(metaData);

          that.setSignInResultOnSignInSilent({
            signInResult,
          });

          const token = that.parseTokenFromSignInSilentApiData(metaData);

          that.setTokenOnSignInSilent({
            token,
          });

          that.setOpenIdOnSignInSilent({
            openId: that.parseOpenIdFromSignInSilentApiData(metaData),
          });

          removeCurrentCustomer();

          const verifySignInResult = getVerifySignInResult();

          if (toString(signInResult) === toString(verifySignInResult.success)) {
            that.getCustomer({
              successCallback: () => {
                if (isFunction(successCallback)) {
                  successCallback(metaData);
                }

                that.doAfterGetCustomerOnSignInSilent(metaData);

                that.doAfterSignInSilentSuccess(metaData);
              },
              failCallback,
              completeCallback,
            });
          } else {
            if (isFunction(failCallback)) {
              failCallback();
            }

            if (isFunction(completeCallback)) {
              completeCallback();
            }

            that.doWhenSignInSilentFailWrapper();
          }
        } else {
          removeSession();

          recordObject({
            message: '静默登录失败',
          });

          if (isFunction(failCallback)) {
            failCallback();
          }

          if (isFunction(completeCallback)) {
            completeCallback();
          }

          that.doWhenSignInSilentFailWrapper();
        }

        return remoteData;
      })
      .catch((error) => {
        recordError(error);
      });
  }

  parseSessionEffectiveFromSignInApiDataWrapper = (remoteData) => {
    recordExecute('parseSessionEffectiveFromSignInApiData');

    return this.parseSessionEffectiveFromSignInApiData(remoteData);
  };

  parseSessionEffectiveFromSignInSilentApiDataWrapper = (remoteData) => {
    recordExecute('parseSessionEffectiveFromSignInSilentApiData');

    return this.parseSessionEffectiveFromSignInSilentApiData(remoteData);
  };

  parseSessionEffectiveFromSignInApiData = (remoteData) => {
    recordConfig(
      'built-in parseSessionEffectiveFromSignInApiData is "const { sessionEffective } = remoteData",if you need custom logic,you need override it: parseSessionEffectiveFromSignInApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!inCollection(Object.keys(remoteData || {}), 'sessionEffective')) {
      recordObject(remoteData);

      recordError(
        'params remoteData not exist key sessionEffective in parseSessionEffectiveFromSignInApiData',
      );

      throw new Error(
        'params remoteData not exist key sessionEffective in parseSessionEffectiveFromSignInApiData',
      );
    }

    const { sessionEffective } = {
      ...{
        sessionEffective: true,
      },
      ...remoteData,
    };

    return sessionEffective || false;
  };

  parseSessionEffectiveFromSignInSilentApiData = (remoteData) => {
    recordConfig(
      'built-in parseSessionEffectiveFromSignInSilentApiData is "const { sessionEffective } = remoteData",if you need custom logic,you need override it: parseSessionEffectiveFromSignInSilentApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!inCollection(Object.keys(remoteData || {}), 'sessionEffective')) {
      recordObject(remoteData);

      recordError(
        'params remoteData not exist key sessionEffective in parseSessionEffectiveFromSignInSilentApiData',
      );

      throw new Error(
        'params remoteData not exist key sessionEffective in parseSessionEffectiveFromSignInSilentApiData',
      );
    }

    const { sessionEffective } = {
      ...{
        sessionEffective: true,
      },
      ...remoteData,
    };

    return sessionEffective || false;
  };

  parseSignInResultFromSignInApiDataWrapper = (remoteData) => {
    recordExecute('parseSignInResultFromSignInApiData');

    return this.parseSignInResultFromSignInApiData(remoteData);
  };

  parseSignInResultFromSignInSilentApiDataWrapper = (remoteData) => {
    recordExecute('parseSignInResultFromSignInSilentApiData');

    return this.parseSignInResultFromSignInSilentApiData(remoteData);
  };

  parseSignInResultFromSignInApiData = (remoteData) => {
    recordConfig(
      'built-in parseSignInResultFromSignInApiData is "const { signInResult } = remoteData",if you need custom logic,you need override it: parseSignInResultFromSignInApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    const verifySignInResult = getVerifySignInResult();

    if (!inCollection(Object.keys(remoteData || {}), 'signInResult')) {
      recordObject(remoteData);

      recordError(
        'params remoteData not exist key signInResult in parseSignInResultFromSignInApiData',
      );
    }

    const { signInResult } = {
      ...{
        signInResult: verifySignInResult.fail,
      },
      ...remoteData,
    };

    return signInResult || verifySignInResult.fail;
  };

  parseSignInResultFromSignInSilentApiData = (remoteData) => {
    recordConfig(
      'built-in parseSignInResultFromSignInSilentApiData is "const { signInResult } = remoteData",if you need custom logic,you need override it: parseSignInResultFromSignInSilentApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    const verifySignInResult = getVerifySignInResult();

    if (!inCollection(Object.keys(remoteData || {}), 'signInResult')) {
      recordObject(remoteData);

      recordError(
        'params remoteData not exist key signInResult in parseSignInResultFromSignInSilentApiData',
      );
    }

    const { signInResult } = {
      ...{
        signInResult: verifySignInResult.fail,
      },
      ...remoteData,
    };

    return signInResult || verifySignInResult.fail;
  };

  setSignInResultOnSignIn = ({ signInResult }) => {
    recordExecute('setSignInResultOnSignIn');
    recordDebug(`signInResult: ${signInResult}`);

    const v = toNumber(signInResult);
    const verifySignInResult = getVerifySignInResult();

    if (
      !inCollection(
        [
          toNumber(verifySignInResult.unknown),
          toNumber(verifySignInResult.fail),
          toNumber(verifySignInResult.success),
        ],
        v,
      )
    ) {
      throw new Error(`signInResult not allow ${signInResult}.`);
    }

    this.setSignInResult({ data: v });
  };

  setSignInResultOnSignInSilent = ({ signInResult }) => {
    recordExecute('setSignInResultOnSignInSilent');
    recordDebug(`signInResult: ${signInResult}`);

    const v = toNumber(signInResult);
    const verifySignInResult = getVerifySignInResult();

    if (
      !inCollection(
        [
          toNumber(verifySignInResult.unknown),
          toNumber(verifySignInResult.fail),
          toNumber(verifySignInResult.success),
        ],
        v,
      )
    ) {
      throw new Error(`signInResult not allow ${signInResult}.`);
    }

    this.setSignInResult({ data: v });
  };

  parseTokenFromSignInApiData = (remoteData) => {
    recordConfig(
      'built-in parseTokenFromSignInApiData is "const { token } = remoteData",if you need custom logic,you need override it: parseTokenFromSignInApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!inCollection(Object.keys(remoteData || {}), 'token')) {
      recordObject(remoteData);

      recordError(
        'params remoteData not exist key token in parseTokenFromSignInApiData',
      );
    }

    const { token } = {
      ...{
        token: '',
      },
      ...remoteData,
    };

    return token || '';
  };

  parseTokenFromSignInSilentApiData = (remoteData) => {
    recordConfig(
      'built-in parseTokenFromSignInSilentApiData is "const { token } = remoteData",if you need custom logic,you need override it: parseTokenFromSignInSilentApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!inCollection(Object.keys(remoteData || {}), 'token')) {
      recordObject(remoteData);

      recordError(
        'params remoteData not exist key token in parseTokenFromSignInSilentApiData',
      );
    }

    const { token } = {
      ...{
        token: '',
      },
      ...remoteData,
    };

    return token || '';
  };

  setTokenOnSignIn = ({ token }) => {
    recordExecute('setTokenOnSignIn');

    if (!isString(token || '')) {
      throw new Error('setTokenOnSignIn token must be string');
    }

    setToken(token || defaultSettingsLayoutCustom.getTokenAnonymous());
  };

  /**
   * 将解析的token进行本次存储, 该方法不应重载
   * @param {*} remoteData
   */
  setTokenOnSignInSilent = ({ token }) => {
    recordExecute('setTokenOnSignInSilent');

    if (!isString(token || '')) {
      throw new Error('setTokenOnSignInSilent token must be string');
    }

    setToken(token || defaultSettingsLayoutCustom.getTokenAnonymous());
  };

  parseOpenIdFromSignInApiData = (remoteData) => {
    recordConfig(
      'built-in parseOpenIdFromSignInApiData is "const { openId } = remoteData",if you need custom logic,you need override it: parseOpenIdFromSignInApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!inCollection(Object.keys(remoteData || {}), 'openId')) {
      recordObject(remoteData);

      recordError(
        'params remoteData not exist key openId in parseOpenIdFromSignInApiData',
      );
    }

    const { openId } = {
      ...{
        openId: '',
      },
      ...remoteData,
    };

    return openId || '';
  };

  parseOpenIdFromSignInSilentApiData = (remoteData) => {
    recordConfig(
      'built-in parseOpenIdFromSignInSilentApiData is "const { openId } = remoteData",if you need custom logic,you need override it: parseOpenIdFromSignInSilentApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!inCollection(Object.keys(remoteData || {}), 'openId')) {
      recordObject(remoteData);

      recordError(
        'params remoteData not exist key openId in parseOpenIdFromSignInSilentApiData',
      );
    }

    const { openId } = {
      ...{
        openId: '',
      },
      ...remoteData,
    };

    return openId || '';
  };

  setOpenIdOnSignIn = ({ openId }) => {
    recordExecute('setOpenIdOnSignIn');

    if (!isString(openId || '')) {
      throw new Error('setOpenIdOnSignIn openId must be string');
    }

    setOpenId(openId || '');
  };

  /**
   * 将解析的openId进行本次存储, 该方法不应重载
   * @param {*} remoteData
   */
  setOpenIdOnSignInSilent = ({ openId }) => {
    recordExecute('setOpenIdOnSignInSilent');

    if (!isString(openId || '')) {
      throw new Error('setOpenIdOnSignInSilent openId must be string');
    }

    setOpenId(openId || '');
  };

  /**
   * 账户登录成功后的业务逻辑, 根据需要进行重载
   * @param {*} remoteData
   */
  // eslint-disable-next-line no-unused-vars
  doAfterSignInSuccess = (data) => {
    recordConfig(
      'doAfterSignInSuccess do nothing,if you need,you can override it: doAfterSignInSuccess = (data) => {}',
    );
  };

  /**
   * 静默登录成功后的业务逻辑, 根据需要进行重载
   * @param {*} remoteData
   */
  // eslint-disable-next-line no-unused-vars
  doAfterSignInSilentSuccess = (data) => {
    recordConfig(
      'doAfterSignInSilentSuccess do nothing,if you need,you can override it: doAfterSignInSilentSuccess = (data) => {}',
    );
  };

  /**
   * 静默登录失败时的业务逻辑, 需要重载
   */
  doWhenSignInFailWrapper = () => {
    recordExecute('doWhenSignInFail');

    this.doWhenSignInFail();
  };

  /**
   * 账户登录失败时的业务逻辑, 需要重载
   */
  doWhenSignInFail = () => {
    recordConfig(
      'doWhenSignInFail do nothing,if you need,you can override it: doWhenSignInFail = () => {}',
    );
  };

  doWhenSignInSilentFailWrapper = () => {
    recordExecute('doWhenSignInSilentFail');

    this.doWhenSignInSilentFail();

    if (
      defaultSettingsLayoutCustom.getNavigationToSignInWhenSignInSilentFail()
    ) {
      const signInPath = defaultSettingsLayoutCustom.getSignInPath();

      if (stringIsNullOrWhiteSpace(signInPath)) {
        throw new Error('缺少登录页面路径配置');
      }

      redirectTo(signInPath);
    }
  };

  /**
   * 静默登录失败时的业务逻辑, 需要重载
   */
  doWhenSignInSilentFail = () => {
    recordConfig(
      'doWhenSignInSilentFail do nothing,if you need,you can override it: doWhenSignInSilentFail = () => {}',
    );
  };

  dispatchGetCustomerWrapper = (data = {}) => {
    recordExecute('dispatchGetCustomerWrapper');

    return this.dispatchGetCustomer(data);
  };

  dispatchGetCustomer = (data = {}) => {
    recordConfig(
      'built-in dispatchGetCustomer is a simulation,if you need actual business,you need override it: dispatchGetCustomer = (data) => {} and return a promise dispatchApi like "return this.dispatchApi({type: \'schedulingControl/getCustomer\',payload: data,})"',
    );

    return this.dispatchApi({
      type: 'schedulingControl/getCustomer',
      payload: data,
    });
  };

  getCustomer = ({
    data = {},
    force: forceValue = false,
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    recordExecute('getCustomer');

    let force = forceValue;

    const currentCustomer = getCurrentCustomer();

    if (!force) {
      if ((currentCustomer || null) == null) {
        force = true;
      } else {
        if (Object.keys(currentCustomer).length === 0) {
          force = true;
        }
      }
    }

    if (!force) {
      recordDebug('getCustomer from local cache success');

      if (isFunction(successCallback)) {
        successCallback(currentCustomer);
      }

      if (isFunction(completeCallback)) {
        completeCallback(currentCustomer);
      }
    } else {
      recordDebug(
        'info getCustomer from local cache fail or force api request, shift to get from api dispatch',
      );

      const that = this;

      that
        .dispatchGetCustomerWrapper(data || {})
        .then((remoteData) => {
          const { dataSuccess, data: metaData } = remoteData;

          if (dataSuccess) {
            setCurrentCustomer(metaData);

            if (isFunction(successCallback)) {
              successCallback(metaData);
            }

            if (isFunction(completeCallback)) {
              completeCallback(metaData);
            }
          } else {
            if (isFunction(failCallback)) {
              failCallback();
            }

            if (isFunction(completeCallback)) {
              completeCallback();
            }
          }

          return remoteData;
        })
        .catch((error) => {
          recordInfo(
            'info getCustomer error,doAfterRegisterWithWeChat and callback will do not execute',
          );

          recordError(error);

          if (isFunction(failCallback)) {
            failCallback();
          }

          if (isFunction(completeCallback)) {
            completeCallback();
          }
        });
    }
  };

  // eslint-disable-next-line no-unused-vars
  doAfterGetCustomerOnSignInSilent = (data) => {
    recordConfig(
      'doAfterGetCustomerOnSignInSilent do nothing,if you need,you can override it: doAfterGetCustomerOnSignInSilent = (data) => {}',
    );
  };

  // eslint-disable-next-line no-unused-vars
  doAfterGetCustomerOnSignIn = (data) => {
    recordConfig(
      'doAfterGetCustomerOnSignIn do nothing,if you need,you can override it: doAfterGetCustomerOnSignIn = (data) => {}',
    );
  };

  parseSessionEffectiveFromExchangePhoneApiDataWrapper = (remoteData) => {
    recordExecute('parseSessionEffectiveFromExchangePhoneApiData');

    return this.parseSessionEffectiveFromExchangePhoneApiData(remoteData);
  };

  parseSessionEffectiveFromExchangePhoneApiData = (remoteData) => {
    recordConfig(
      'built-in parseSessionEffectiveFromExchangePhoneApiData is "const { sessionEffective } = remoteData",if you need custom logic,you need override it: parseSessionEffectiveFromExchangePhoneApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!inCollection(Object.keys(remoteData || {}), 'sessionEffective')) {
      recordObject(remoteData);

      recordError(
        'params remoteData not exist key sessionEffective in parseSessionEffectiveFromExchangePhoneApiData',
      );

      throw new Error(
        'params remoteData not exist key sessionEffective in parseSessionEffectiveFromExchangePhoneApiData',
      );
    }

    const { sessionEffective } = {
      ...{
        sessionEffective: true,
      },
      ...remoteData,
    };

    return sessionEffective || false;
  };

  dispatchExchangePhone = (data = {}) => {
    recordConfig(
      'built-in dispatchExchangePhone is a simulation,if you need actual business,you need override it: dispatchExchangePhone = (data) => {} and return a promise dispatchApi like "return this.dispatchApi({type: \'schedulingControl/exchangePhone\',payload: data,})"',
    );

    return this.dispatchApi({
      type: 'schedulingControl/exchangePhone',
      payload: data,
    });
  };

  exchangePhone = ({ data, callback = null }) => {
    const that = this;

    that.checkSession(() => {
      that
        .dispatchExchangePhone(data)
        .then((remoteData) => {
          const { dataSuccess, data: metaData } = remoteData;

          if (dataSuccess) {
            const sessionEffective =
              that.parseSessionEffectiveFromSignInSilentApiDataWrapper(
                metaData,
              );

            if (!sessionEffective) {
              that.refreshSession({
                callback: () => {
                  that.exchangePhone({ data, callback });
                },
              });

              return;
            }

            if (isFunction(callback)) {
              callback(metaData);
            }
          }

          return remoteData;
        })
        .catch((error) => {
          recordError(error);
        });
    });
  };

  parseSessionEffectiveFromRegisterWithWeChatApiDataWrapper = (remoteData) => {
    recordExecute('parseSessionEffectiveFromRegisterWithWeChatApiData');

    return this.parseSessionEffectiveFromRegisterWithWeChatApiData(remoteData);
  };

  parseSessionEffectiveFromRegisterWithWeChatApiData = (remoteData) => {
    recordConfig(
      'built-in parseSessionEffectiveFromRegisterWithWeChatApiData is "const { sessionEffective } = remoteData",if you need custom logic,you need override it: parseSessionEffectiveFromRegisterWithWeChatApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!inCollection(Object.keys(remoteData || {}), 'sessionEffective')) {
      recordObject(remoteData);

      recordError(
        'params remoteData not exist key sessionEffective in parseSessionEffectiveFromRegisterWithWeChatApiData',
      );

      throw new Error(
        'params remoteData not exist key sessionEffective in parseSessionEffectiveFromRegisterWithWeChatApiData',
      );
    }

    const { sessionEffective } = {
      ...{
        sessionEffective: true,
      },
      ...remoteData,
    };

    return sessionEffective || false;
  };

  dispatchRegisterWithWeChat = (data = {}) => {
    recordConfig(
      'built-in dispatchRegisterWithWeChat is a simulation,if you need actual business,you need override it: dispatchRegisterWithWeChat = (data) => {} and return a promise dispatchApi like "return this.dispatchApi({type: \'schedulingControl/exchangePhone\',payload: data,})"',
    );

    return this.dispatchApi({
      type: 'schedulingControl/registerWithWeChat',
      payload: data,
    });
  };

  registerWithWeChat = ({
    data,
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    const that = this;

    that.setState({ registering: true });

    that
      .dispatchRegisterWithWeChat(data)
      .then((remoteData) => {
        that.setState({ registering: false });

        const { dataSuccess, data: metaData } = remoteData;

        if (dataSuccess) {
          const sessionEffective =
            that.parseSessionEffectiveFromRegisterWithWeChatApiDataWrapper(
              metaData,
            );

          if (!sessionEffective) {
            that.refreshSession({
              callback: () => {
                that.signInCore({
                  data,
                  successCallback,
                  failCallback,
                  completeCallback,
                });
              },
            });

            return;
          }

          removeCurrentCustomer();

          const signInResult =
            that.parseSignInResultFromRegisterWithWeChatApiDataWrapper(
              metaData,
            );

          that.setSignInResultOnRegisterWithWeChat({
            signInResult,
          });

          const token = that.parseTokenFromRegisterWithWeChatApiData(metaData);

          that.setTokenOnRegisterWithWeChat({
            token,
          });

          that.setOpenIdOnRegisterWithWeChat({
            openId: that.parseOpenIdFromRegisterWithWeChatApiData(metaData),
          });

          const verifySignInResult = getVerifySignInResult();

          if (toString(signInResult) === toString(verifySignInResult.success)) {
            that.getCustomer({
              successCallback: () => {
                if (isFunction(successCallback)) {
                  successCallback(metaData);
                }

                that.doAfterRegisterWithWeChat(metaData);
              },
              failCallback,
              completeCallback,
            });
          } else {
            if (isFunction(failCallback)) {
              failCallback(metaData);
            }

            if (isFunction(completeCallback)) {
              completeCallback(metaData);
            }
          }
        } else {
          if (isFunction(failCallback)) {
            failCallback();
          }

          if (isFunction(completeCallback)) {
            completeCallback();
          }
        }

        return remoteData;
      })
      .catch((error) => {
        that.setState({ registering: false });

        recordError(error);

        if (isFunction(failCallback)) {
          failCallback();
        }

        if (isFunction(completeCallback)) {
          completeCallback();
        }
      });
  };

  parseSessionEffectiveFromRegisterApiDataWrapper = (remoteData) => {
    recordExecute('parseSessionEffectiveFromRegisterApiData');

    return this.parseSessionEffectiveFromRegisterApiData(remoteData);
  };

  parseSessionEffectiveFromRegisterApiData = (remoteData) => {
    recordConfig(
      'built-in parseSessionEffectiveFromRegisterApiData is "const { sessionEffective } = remoteData",if you need custom logic,you need override it: parseSessionEffectiveFromRegisterApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!inCollection(Object.keys(remoteData || {}), 'sessionEffective')) {
      recordObject(remoteData);

      recordError(
        'params remoteData not exist key sessionEffective in parseSessionEffectiveFromRegisterApiData',
      );

      throw new Error(
        'params remoteData not exist key sessionEffective in parseSessionEffectiveFromRegisterApiData',
      );
    }

    const { sessionEffective } = {
      ...{
        sessionEffective: true,
      },
      ...remoteData,
    };

    return sessionEffective || false;
  };

  dispatchRegister = (data = {}) => {
    recordConfig(
      'built-in dispatchRegister is a simulation,if you need actual business,you need override it: dispatchRegister = (data) => {} and return a promise dispatchApi like "return this.dispatchApi({type: \'schedulingControl/exchangePhone\',payload: data,})"',
    );

    return this.dispatchApi({
      type: 'schedulingControl/register',
      payload: data,
    });
  };

  /**
   * 常规注册
   * @param {*} param0
   */
  register = ({
    data,
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    const that = this;

    that
      .dispatchRegister(data)
      .then((remoteData) => {
        const { dataSuccess, data: metaData } = remoteData;

        if (dataSuccess) {
          const sessionEffective =
            that.parseSessionEffectiveFromRegisterApiDataWrapper(metaData);

          if (!sessionEffective) {
            that.refreshSession({
              callback: () => {
                that.signInCore({
                  data,
                  successCallback,
                  failCallback,
                  completeCallback,
                });
              },
            });

            return;
          }

          removeCurrentCustomer();

          const signInResult =
            that.parseSignInResultFromRegisterApiDataWrapper(metaData);

          that.setSignInResultOnRegister({
            signInResult,
          });

          const token = that.parseTokenFromRegisterApiData(metaData);

          that.setTokenOnRegister({
            token,
          });

          that.setOpenIdOnRegister({
            openId: that.parseOpenIdFromRegisterApiData(metaData),
          });

          removeCurrentCustomer();

          const verifySignInResult = getVerifySignInResult();

          if (toString(signInResult) === toString(verifySignInResult.success)) {
            that.getCustomer({
              successCallback: () => {
                if (isFunction(successCallback)) {
                  successCallback(metaData);
                }

                that.doAfterRegister(metaData);
              },
              failCallback,
              completeCallback,
            });
          } else {
            if (isFunction(failCallback)) {
              failCallback();
            }

            if (isFunction(completeCallback)) {
              completeCallback();
            }
          }
        } else {
          if (isFunction(failCallback)) {
            failCallback();
          }

          if (isFunction(completeCallback)) {
            completeCallback();
          }
        }

        return remoteData;
      })
      .catch((error) => {
        recordError(error);

        if (isFunction(failCallback)) {
          failCallback();
        }

        if (isFunction(completeCallback)) {
          completeCallback();
        }
      });
  };

  parseSignInResultFromRegisterApiDataWrapper = (remoteData) => {
    recordExecute('parseSignInResultFromRegisterApiData');

    return this.parseSignInResultFromRegisterApiData(remoteData);
  };

  parseSignInResultFromRegisterWithWeChatApiDataWrapper = (remoteData) => {
    recordExecute('parseSignInResultFromRegisterWithWeChatApiData');

    return this.parseSignInResultFromRegisterWithWeChatApiData(remoteData);
  };

  parseSignInResultFromRegisterApiData = (remoteData) => {
    recordConfig(
      'built-in parseSignInResultFromRegisterApiData is "const { signInResult } = remoteData",if you need custom logic,you need override it: parseSignInResultFromRegisterApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    const verifySignInResult = getVerifySignInResult();

    if (!inCollection(Object.keys(remoteData || {}), 'signInResult')) {
      recordObject(remoteData);

      recordError(
        'params remoteData not exist key signInResult in parseSignInResultFromRegisterApiData',
      );
    }

    const { signInResult } = {
      ...{
        signInResult: verifySignInResult.fail,
      },
      ...remoteData,
    };

    return signInResult || verifySignInResult.fail;
  };

  parseSignInResultFromRegisterWithWeChatApiData = (remoteData) => {
    recordConfig(
      'built-in parseSignInResultFromRegisterWithWeChatApiData is "const { signInResult } = remoteData",if you need custom logic,you need override it: parseSignInResultFromRegisterWithWeChatApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    const verifySignInResult = getVerifySignInResult();

    if (!inCollection(Object.keys(remoteData || {}), 'signInResult')) {
      recordObject(remoteData);

      recordError(
        'params remoteData not exist key signInResult in parseSignInResultFromRegisterWithWeChatApiData',
      );
    }

    const { signInResult } = {
      ...{
        signInResult: verifySignInResult.fail,
      },
      ...remoteData,
    };

    return signInResult || verifySignInResult.fail;
  };

  setSignInResultOnRegister = ({ signInResult }) => {
    recordExecute('setSignInResultOnSignIn');

    const v = toNumber(signInResult);
    const verifySignInResult = getVerifySignInResult();

    if (
      !inCollection(
        [
          verifySignInResult.unknown,
          verifySignInResult.fail,
          verifySignInResult.success,
        ],
        v,
      )
    ) {
      throw new Error(`signInResult not allow ${signInResult}.`);
    }

    this.setSignInResult({ data: v });
  };

  setSignInResultOnRegisterWithWeChat = ({ signInResult }) => {
    recordExecute('setSignInResultOnRegisterWithWeChat');

    const v = toNumber(signInResult);
    const verifySignInResult = getVerifySignInResult();

    if (
      !inCollection(
        [
          verifySignInResult.unknown,
          verifySignInResult.fail,
          verifySignInResult.success,
        ],
        v,
      )
    ) {
      throw new Error(`signInResult not allow ${signInResult}.`);
    }

    this.setSignInResult({ data: v });
  };

  parseTokenFromRegisterApiData = (remoteData) => {
    recordConfig(
      'built-in parseTokenFromRegisterApiData is "const { token } = remoteData",if you need custom logic,you need override it: parseTokenFromRegisterApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!inCollection(Object.keys(remoteData || {}), 'token')) {
      recordObject(remoteData);

      recordError(
        'params remoteData not exist key token in parseTokenFromRegisterApiData',
      );
    }

    const { token } = {
      ...{
        token: '',
      },
      ...remoteData,
    };

    return token || '';
  };

  parseTokenFromRegisterWithWeChatApiData = (remoteData) => {
    recordConfig(
      'built-in parseTokenFromRegisterWithWeChatApiData is "const { token } = remoteData",if you need custom logic,you need override it: parseTokenFromRegisterWithWeChatApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!inCollection(Object.keys(remoteData || {}), 'token')) {
      recordObject(remoteData);

      recordError(
        'params remoteData not exist key token in parseTokenFromRegisterWithWeChatApiData',
      );
    }

    const { token } = {
      ...{
        token: '',
      },
      ...remoteData,
    };

    return token || '';
  };

  setTokenOnRegister = ({ token }) => {
    recordExecute('setTokenOnRegister');

    if (!isString(token || '')) {
      throw new Error('setTokenOnRegister token must be string');
    }

    setToken(token || defaultSettingsLayoutCustom.getTokenAnonymous());
  };

  setTokenOnRegisterWithWeChat = ({ token }) => {
    recordExecute('setTokenOnRegisterWithWeChat');

    if (!isString(token || '')) {
      throw new Error('setTokenOnRegisterWithWeChat token must be string');
    }

    setToken(token || defaultSettingsLayoutCustom.getTokenAnonymous());
  };

  parseOpenIdFromRegisterApiData = (remoteData) => {
    recordConfig(
      'built-in parseOpenIdFromRegisterApiData is "const { openId } = remoteData",if you need custom logic,you need override it: parseOpenIdFromRegisterApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!inCollection(Object.keys(remoteData || {}), 'openId')) {
      recordObject(remoteData);

      recordError(
        'params remoteData not exist key openId in parseOpenIdFromRegisterApiData',
      );
    }

    const { openId } = {
      ...{
        openId: '',
      },
      ...remoteData,
    };

    return openId || '';
  };

  parseOpenIdFromRegisterWithWeChatApiData = (remoteData) => {
    recordConfig(
      'built-in parseOpenIdFromRegisterWithWeChatApiData is "const { openId } = remoteData",if you need custom logic,you need override it: parseOpenIdFromRegisterWithWeChatApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!inCollection(Object.keys(remoteData || {}), 'openId')) {
      recordObject(remoteData);

      recordError(
        'params remoteData not exist key openId in parseOpenIdFromRegisterWithWeChatApiData',
      );
    }

    const { openId } = {
      ...{
        openId: '',
      },
      ...remoteData,
    };

    return openId || '';
  };

  setOpenIdOnRegister = ({ openId }) => {
    recordExecute('setOpenIdOnRegister');

    if (!isString(openId || '')) {
      throw new Error('setOpenIdOnRegister openId must be string');
    }

    setOpenId(openId || '');
  };

  setOpenIdOnRegisterWithWeChat = ({ openId }) => {
    recordExecute('setOpenIdOnRegisterWithWeChat');

    if (!isString(openId || '')) {
      throw new Error('setOpenIdOnRegisterWithWeChat openId must be string');
    }

    setOpenId(openId || '');
  };

  // eslint-disable-next-line no-unused-vars
  doAfterRegisterWithWeChat = (data) => {
    recordConfig(
      'doAfterRegisterWithWeChat do nothing,if you need,you can override it: doAfterRegisterWithWeChat = (data) => {}',
    );
  };

  // eslint-disable-next-line no-unused-vars
  doAfterRegister = (data) => {
    recordConfig(
      'doAfterRegister do nothing,if you need,you can override it: doAfterRegister = (data) => {}',
    );
  };

  dispatchGetMetaDataWrapper = (data = {}) => {
    recordExecute('dispatchGetMetaDataWrapper');

    return this.dispatchGetMetaData(data);
  };

  dispatchGetMetaData = (data = {}) => {
    recordConfig(
      'built-in dispatchGetMetaData is a simulation,if you need actual business,you need override it: dispatchGetMetaData = (data) => {} and return a promise dispatchApi like "return this.dispatchApi({type: \'schedulingControl/getMetaData\',payload: data,})"',
    );

    return this.dispatchApi({
      type: 'schedulingControl/getMetaData',
      payload: data,
      alias: defaultSettingsLayoutCustom.getMetaDataAliasName(),
    });
  };

  initMetaData = ({
    data = {},
    force: forceValue = false,
    callback = null,
  }) => {
    recordExecute('initMetaData');

    let force = forceValue;

    const metaData = getCurrentMetaData();

    if (!force) {
      if ((metaData || null) == null) {
        force = true;
      } else {
        if (Object.keys(metaData).length === 0) {
          force = true;
        }
      }
    }

    if (!force) {
      recordDebug('check meta data from local cache success');

      if (isFunction(callback)) {
        callback(metaData);
      }
    } else {
      recordDebug(
        'info check meta data from local cache fail or force api request, shift to get from api dispatch',
      );

      const that = this;

      that
        .dispatchGetMetaDataWrapper(data || {})
        .then((remoteData) => {
          const { dataSuccess, data: v } = remoteData;

          if (dataSuccess) {
            setCurrentMetaData(v);

            if (isFunction(callback)) {
              callback(v);
            }

            that.doAfterLoadMetaDataByForce(v);
          }

          return remoteData;
        })
        .catch((error) => {
          recordError(error);
        });
    }
  };

  getMetaData = () => {
    return {
      ...defaultSettingsLayoutCustom.getDefaultMetaData(),
      ...(getCurrentMetaData() || {}),
    };
  };

  // eslint-disable-next-line no-unused-vars
  doAfterLoadMetaDataByForce = (data) => {};

  dispatchGetFullAdministrativeDivisionDataWrapper = (data = {}) => {
    recordExecute('dispatchGetFullAdministrativeDivisionData');

    return this.dispatchGetFullAdministrativeDivisionData(data);
  };

  dispatchGetFullAdministrativeDivisionData = (data = {}) => {
    recordConfig(
      'built-in dispatchGetFullAdministrativeDivisionData is a simulation,if you need actual business,you need override it: dispatchGetFullAdministrativeDivisionData = (data) => {} and return a promise dispatchApi like "return this.dispatchApi({type: \'schedulingControl/getFullAdministrativeDivisionData\',payload: data,})"',
    );

    return this.dispatchApi({
      type: 'schedulingControl/getFullAdministrativeDivisionData',
      payload: data,
    });
  };

  initFullAdministrativeDivisionData = ({
    data = {},
    force: forceValue = false,
    callback = null,
  }) => {
    recordExecute('initFullAdministrativeDivisionData');

    let force = forceValue;

    const { list } = getAdministrativeDivisionFullData();

    if (!force) {
      if ((list || null) == null) {
        force = true;
      } else {
        if (list.length === 0) {
          force = true;
        }
      }
    }

    if (!force) {
      recordInfo(
        'info check administrative division full data from local cache success',
      );

      if (isFunction(callback)) {
        callback(list);
      }
    } else {
      recordInfo(
        'info check administrative division full data from local cache fail or force api request, shift to get from api dispatch',
      );

      const that = this;

      that
        .dispatchGetFullAdministrativeDivisionDataWrapper(data || {})
        .then((remoteData) => {
          const { dataSuccess, list: v } = remoteData;

          if (dataSuccess) {
            setAdministrativeDivisionFullData(v);

            if (isFunction(callback)) {
              callback(v);
            }

            that.increaseCounter();
          }

          return remoteData;
        })
        .catch((error) => {
          recordError(error);
        });
    }
  };

  getFullAdministrativeDivisionData = () => {
    const { list } = getAdministrativeDivisionFullData();

    return list;
  };
}

export default SupplementCore;
