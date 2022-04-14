import Taro from '@tarojs/taro';

import {
  getGeographicalLocation,
  getSetting,
  showInfoMessage,
  sleep,
  recordObject,
  recordLog,
  inCollection,
  recordError,
  recordDebug,
  recordInfo,
} from 'taro-fast-common/es/utils/tools';
import {
  isFunction,
  isUndefined,
  isString,
} from 'taro-fast-common/es/utils/typeCheck';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';
import {
  locateResult,
  locationModeCollection,
} from 'taro-fast-common/es/utils/constants';
import Tips from 'taro-fast-common/es/utils/tips';

import {
  getSignInResultDescription,
  getVerifySignInResult,
} from '../../utils/tools';
import {
  getEffectiveCode,
  getLastLocation,
  getLocation,
  getLocationMode,
  getMap,
  getNextCheckLoginUnixTime,
  setOpenId,
  getSessionRefreshing,
  setSessionRefreshing,
  setToken,
  removeLocation,
  removeSession,
  setEffectiveCode,
  setLastLocation,
  setLocation,
  setLocationMode,
  setMap,
  setNextCheckLoginUnixTime,
  setSession,
  getCurrentCustomer,
  setCurrentCustomer,
  removeCurrentCustomer,
} from '../../utils/globalStorageAssist';
import { defaultSettingsLayoutCustom } from '../../utils/defaultSettingsSpecial';
import { getApiDataCore } from '../../utils/actionAssist';

import Common from '../Common';

/**
 * 业务调度核心底层
 */
class SupplementCore extends Common {
  doShowTask = () => {
    if (!this.firstShowHasTriggered) {
      this.doWorkWhenFirstShow();

      this.firstShowHasTriggered = true;
    } else {
      const that = this;

      that.adjustInternalDataOnRepeatedShow();

      that.setCurrentInfo();

      that.checkSession(() => {
        if (that.verifyTicketValidity) {
          that.checkTicketValidity({
            callback: that.doWorkWhenCheckTicketValidityOnRepeatedShow,
          });
        }
      });

      that.doWorkWhenRepeatedShow();

      if (that.needReLocationWhenRepeatedShow) {
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
          that.executeLogicAfterNonautomaticReLocationWhenRepeatedShow();
        }
      }
    }

    this.doWorkWhenEveryShow();

    this.doWorkAfterShow();
  };

  /**
   * 获取定位
   * @param {*} param0
   */
  obtainLocation({
    successCallback,
    force = false,
    showLoading = false,
    fromLaunch = false,
    failCallback,
  }) {
    recordDebug('exec obtainLocation');

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
      recordInfo('info obtain location force');
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
      });
    }
  }

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
    if (isFunction(callback)) {
      callback({
        location,
        map,
        force,
      });
    }
  };

  checkTicketValidity = ({ callback }) => {
    recordDebug('exec checkTicketValidity');

    const useLocation = defaultSettingsLayoutCustom.getUseLocation();
    const locationMode = getLocationMode();
    const signInResult = this.getSignInResult();
    const verifySignInResult = getVerifySignInResult();

    const that = this;

    if (signInResult === verifySignInResult.unknown) {
      recordInfo(
        `info sign in result is ${signInResult}, it mean ${getSignInResultDescription(
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
              callback,
            });
          },
          focus: false,
          showLoading: false,
          fromLaunch: false,
          failCallback: () => {
            that.signInSilent({
              data: {},
              callback,
            });
          },
        });
      } else {
        that.signInSilent({
          data: {},
          callback,
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
        recordInfo(
          'info do not use location or nonautomatic location on checkTicketValidity',
        );

        that.bridgeLogicOnCheckTicketValidity({ callback });
      }
    }
  };

  doWorkWhenCheckTicketValidityOnRepeatedShow = () => {};

  bridgeLogicOnCheckTicketValidity({ callback = null }) {
    recordDebug('exec bridgeLogicOnCheckTicketValidity');

    const ticketValidityProcessDetection =
      this.getTicketValidityProcessDetection();

    if (ticketValidityProcessDetection) {
      return;
    }

    const verifySignInResult = getVerifySignInResult();
    const signInResult = this.getSignInResult();

    if (signInResult === verifySignInResult.fail) {
      if (!this.verifyTicket) {
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

  // eslint-disable-next-line no-unused-vars
  dispatchCheckTicketValidity = (data = {}) => {
    if (this.verifyTicket) {
      throw new Error(
        'dispatchCheckTicketValidity need override when verifyTicket set to true, dispatchCheckTicketValidity must return a promise',
      );
    }

    return this.dispatchApi({
      type: 'schedulingControl/checkTicketValidity',
      payload: data,
    });
  };

  getCheckTicketValidityApiData = () => {
    if (this.verifyTicket) {
      throw new Error(
        'getCheckTicketValidityApiData need override when verifyTicket set to true, getCheckTicketValidityApiData must return a object',
      );
    }

    const data = getApiDataCore({
      props: this.props,
      modelName: 'schedulingControl',
    });

    return data;
  };

  checkTicketValidityCore({
    forceRefresh: forceRefreshValue = false,
    callback = null,
  }) {
    recordDebug('exec checkTicketValidityCore');

    const that = this;

    if (forceRefreshValue) {
      that.signInSilent({
        data: {},
        callback,
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

    that.dispatchCheckTicketValidity({}).then(() => {
      const remoteData = that.getCheckTicketValidityApiData();

      const { dataSuccess, data: metaData } = remoteData;

      if (dataSuccess) {
        const { needRefresh, nextCheckLoginUnixTime } = metaData;

        setNextCheckLoginUnixTime(nextCheckLoginUnixTime);

        if (needRefresh) {
          that.signInSilent({
            data: {},
            callback,
          });
        } else {
          const verifySignInResult = getVerifySignInResult();
          const signInResult = that.getSignInResult();

          if (signInResult === verifySignInResult.fail && that.verifyTicket) {
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
    });
  }

  doWhenCheckTicketValidityVerifySignInFail = () => {};

  // eslint-disable-next-line no-unused-vars
  dispatchRefreshSession = (data) => {
    if (this.verifySession) {
      throw new Error(
        'dispatchRefreshSession need override, dispatchRefreshSession must return a promise',
      );
    }

    return this.dispatchApi({
      type: 'schedulingControl/refreshSession',
      payload: data,
    });
  };

  getRefreshSessionApiData = () => {
    if (this.verifySession) {
      throw new Error(
        'getRefreshSessionApiData need override, getRefreshSessionApiData must return a object',
      );
    }

    const data = getApiDataCore({
      props: this.props,
      modelName: 'schedulingControl',
    });

    return data;
  };

  refreshSession = ({ callback }) => {
    recordDebug('exec refreshSession');

    const sessionRefreshing = getSessionRefreshing();

    if (!sessionRefreshing) {
      setSessionRefreshing(true);

      const that = this;

      Taro.login({ timeout: 1000 })
        .then((res) => {
          recordDebug('exec Taro.login');

          const { code } = res;

          if (code) {
            recordInfo(`info code: ${code}`);

            setEffectiveCode(code);

            that
              .dispatchRefreshSession({ code })
              .then(() => {
                const remoteData = this.getRefreshSessionApiData();

                const { dataSuccess, data: metaData } = remoteData;

                if (dataSuccess) {
                  const { code: effectiveCodeRemote, sessionId } = metaData;
                  const effectiveCode = getEffectiveCode();

                  if (effectiveCode === (effectiveCodeRemote || 'no')) {
                    setSession(sessionId);
                  }

                  if (isFunction(callback)) {
                    callback();
                  }
                } else {
                  removeSession();
                }

                setSessionRefreshing(false);
              })
              .catch((error) => {
                recordError({ error });

                Tips.info('网络请求失败了，请检查下是否联网');

                removeSession();

                setSessionRefreshing(false);

                if (isFunction(callback)) {
                  callback();
                }
              });
          } else {
            Tips.info('获取微信Code失败');

            removeSession();

            setSessionRefreshing(false);

            if (isFunction(callback)) {
              callback();
            }
          }
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

  signIn = ({ data, callback }) => {
    recordDebug('exec signIn');

    const that = this;

    const useLocation = defaultSettingsLayoutCustom.getUseLocation();
    const locationMode = getLocationMode();

    if ((useLocation || false) && locationMode == locationModeCollection.auto) {
      recordInfo('info use location and automatic location on sign in');

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
                  callback,
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
                  callback,
                });
              },
            });
          }
        },
      });
    } else {
      if (useLocation || false) {
        recordInfo('info use location and nonautomatic location');

        that.signInWhenCheckProcessDetection({
          data,
          callback: (o, p) => {
            o.setSignInProcessDetection({
              data: true,
              callback: () => {
                o.signInCore({
                  data: p,
                  callback,
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
              that.signInCore({ data, callback });
            },
          });
        }
      }
    }
  };

  signInWhenCheckProcessDetection({ data, callback, timeTotal = 0 }) {
    recordDebug('exec signInWhenCheckProcessDetection');

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

  signInSilent = ({ data, callback }) => {
    recordDebug('exec signInSilent');

    const that = this;

    const useLocation = defaultSettingsLayoutCustom.getUseLocation();
    const locationMode = getLocationMode();

    if ((useLocation || false) && locationMode == locationModeCollection.auto) {
      recordInfo('info use location and automatic location on sign in silent');

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
                  callback,
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
                  callback,
                });
              },
            });
          }
        },
      });
    } else {
      if (useLocation || false) {
        recordInfo('info use location and nonautomatic location');

        that.signInSilentWhenCheckProcessDetection({
          data,
          callback: (o, p) => {
            o.setSignInProcessDetection({
              data: true,
              callback: () => {
                o.signInSilentCore({
                  data: p,
                  callback,
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
              that.signInSilentCore({ data, callback });
            },
          });
        }
      }
    }
  };

  signInSilentWhenCheckProcessDetection({ data, callback, timeTotal = 0 }) {
    recordDebug('exec signInSilentWhenCheckProcessDetection');

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

  // eslint-disable-next-line no-unused-vars
  dispatchSignInSilent = (data = {}) => {
    if (this.verifyTicket) {
      throw new Error(
        'dispatchSignInSilent need override, dispatchSignInSilent must return a promise',
      );
    }

    return this.dispatchApi({
      type: 'schedulingControl/signInSilent',
      payload: data,
    });
  };

  getSignInApiData = () => {
    throw new Error(
      'getSignInApiData need override, getSignInApiData must return a object',
    );
  };

  getSignInSilentApiData = () => {
    if (this.verifyTicket) {
      throw new Error(
        'getSignInSilentApiData need override, getSignInSilentApiData must return a object',
      );
    }

    const data = getApiDataCore({
      props: this.props,
      modelName: 'schedulingControl',
    });

    return data;
  };

  signInCore({ data, callback }) {
    recordDebug('exec signInCore');

    // Tips.loading('处理中');

    const that = this;

    that.dispatchSignIn(data).then(() => {
      Tips.loaded();

      const remoteData = that.getSignInApiData();

      const { dataSuccess, data: metaData } = remoteData;

      that.setSignInProcessDetection({
        data: false,
      });

      if (dataSuccess) {
        that.setSignInResultOnSignIn({
          signInResult:
            that.parseSignInResultFromRemoteApiDataWrapper(metaData),
        });

        that.setTokenOnSignIn({
          token: that.parseTokenFromSignInApiData(metaData),
        });

        that.setOpenIdOnSignIn({
          token: that.parseOpenIdFromSignInApiData(metaData),
        });

        removeCurrentCustomer();

        that.getCustomer({
          callback: that.doAfterGetCustomerOnSignIn,
        });

        that.doAfterSignInSuccess(metaData);

        if (isFunction(callback)) {
          callback(metaData);
        }
      } else {
        removeSession();

        showInfoMessage({
          message: '登录失败',
        });

        that.doWhenSignInFail();
      }
    });
  }

  signInSilentCore({ data, callback }) {
    recordDebug('exec signInSilentCore');

    // Tips.loading('处理中');

    const that = this;

    that.dispatchSignInSilent(data).then(() => {
      Tips.loaded();

      const remoteData = that.getSignInSilentApiData();

      const { dataSuccess, data: metaData } = remoteData;

      that.setSignInProcessDetection({
        data: false,
      });

      if (dataSuccess) {
        that.setSignInResultOnSignIn({
          signInResult:
            that.parseSignInResultFromRemoteApiDataWrapper(metaData),
        });

        that.setTokenOnSignInSilent({
          token: that.parseTokenFromSignInSilentApiData(metaData),
        });

        that.setOpenIdOnSignInSilent({
          token: that.parseOpenIdFromSignInApiData(metaData),
        });

        removeCurrentCustomer();

        that.getCustomer({
          callback: that.doAfterGetCustomerOnSignInSilent,
        });

        that.doAfterSignInSilentSuccess(metaData);

        if (isFunction(callback)) {
          callback(metaData);
        }
      } else {
        removeSession();

        recordObject({
          message: '静默登录失败',
        });

        that.doWhenSignInSilentFail();
      }
    });
  }

  parseSignInResultFromRemoteApiDataWrapper = (remoteData) => {
    recordDebug('exec parseSignInResultFromRemoteApiDataWrapper');

    const verifySignInResult = getVerifySignInResult();

    const { signInResult } = {
      ...{
        signInResult: verifySignInResult.fail,
      },
      ...this.parseSignInResultFromRemoteApiData(remoteData),
    };

    return signInResult;
  };

  /**
   * 从接口数据中解析出sign in result
   * @param {*} remoteData
   */
  // eslint-disable-next-line no-unused-vars
  parseSignInResultFromRemoteApiData = (remoteData) => {
    const verifySignInResult = getVerifySignInResult();

    throw new Error(
      `parseSignInResultFromRemoteApiData token must be number as ${verifySignInResult.unknown}/${verifySignInResult.fail}/${verifySignInResult.success}, ${verifySignInResult.unknown} mean unknown; ${verifySignInResult.fail} mean fail; ${verifySignInResult.success} mean success.`,
    );
  };

  /**
   * 将解析的 sign in result 进行本次存储, 该方法不应重载
   * @param {*} remoteData
   */
  setSignInResultOnSignIn = ({ signInResult }) => {
    recordDebug('exec setSignInResultOnSignIn');

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

    recordInfo(
      `info sign in result is ${signInResult}, it mean ${getSignInResultDescription(
        signInResult,
      )}`,
    );

    this.setSignInResult({ data: v });
  };

  /**
   * 从接口数据中解析出sign in result
   * @param {*} remoteData
   */
  // eslint-disable-next-line no-unused-vars
  parseTokenFromSignInApiData = (remoteData) => {
    throw new Error(
      'parseTokenFromSignInApiData need to be override, it must return a string',
    );
  };

  /**
   * 从接口数据中解析出sign in result
   * @param {*} remoteData
   */
  // eslint-disable-next-line no-unused-vars
  parseTokenFromSignInSilentApiData = (remoteData) => {
    if (this.verifyTicket) {
      throw new Error(
        'parseTokenFromSignInSilentApiData need to be override, it must return a string',
      );
    }

    const { token } = remoteData;

    return token || '';
  };

  /**
   * 将解析的token进行本次存储, 该方法不应重载
   * @param {*} remoteData
   */
  setTokenOnSignIn = ({ token }) => {
    recordDebug('exec setTokenOnSignIn');

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
    recordDebug('exec setTokenOnSignInSilent');

    if (!isString(token || '')) {
      throw new Error('setTokenOnSignInSilent token must be string');
    }

    setToken(token || defaultSettingsLayoutCustom.getTokenAnonymous());
  };

  /**
   * 从接口数据中解析出sign in result
   * @param {*} remoteData
   */
  // eslint-disable-next-line no-unused-vars
  parseOpenIdFromSignInApiData = (remoteData) => {
    throw new Error(
      'parseOpenIdFromSignInApiData need to be override, it must return a string',
    );
  };

  /**
   * 从接口数据中解析出sign in result
   * @param {*} remoteData
   */
  // eslint-disable-next-line no-unused-vars
  parseOpenIdFromSignInSilentApiData = (remoteData) => {
    if (this.verifyTicket) {
      throw new Error(
        'parseOpenIdFromSignInSilentApiData need to be override, it must return a string',
      );
    }

    const { openId } = remoteData;

    return openId || '';
  };

  /**
   * 将解析的openId进行本次存储, 该方法不应重载
   * @param {*} remoteData
   */
  setOpenIdOnSignIn = ({ openId }) => {
    recordDebug('exec setOpenIdOnSignIn');

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
    recordDebug('exec setOpenIdOnSignInSilent');

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
    recordInfo(
      'info doAfterSignInSuccess do nothing,if you need,you can override it: doAfterSignInSuccess = (data) => {}',
    );
  };

  /**
   * 静默登录成功后的业务逻辑, 根据需要进行重载
   * @param {*} remoteData
   */
  // eslint-disable-next-line no-unused-vars
  doAfterSignInSilentSuccess = (data) => {
    recordInfo(
      'info doAfterSignInSilentSuccess do nothing,if you need,you can override it: doAfterSignInSilentSuccess = (data) => {}',
    );
  };

  /**
   * 账户登录失败时的业务逻辑, 需要重载
   */
  doWhenSignInFail = () => {
    recordInfo(
      'info doWhenSignInFail do nothing,if you need,you can override it: doWhenSignInFail = () => {}',
    );
  };

  /**
   * 静默登录失败时的业务逻辑, 需要重载
   */
  doWhenSignInSilentFail = () => {
    recordInfo(
      'info doWhenSignInSilentFail do nothing,if you need,you can override it: doWhenSignInSilentFail = () => {}',
    );
  };

  dispatchGetCustomer = (data = {}) => {
    recordInfo(
      'info built-in dispatchGetCustomer is a simulation,if you need actual business,you need override it: dispatchGetCustomer = (data) => {} and return a promise dispatchApi like "return this.dispatchApi({type: \'schedulingControl/getCustomer\',payload: data,})"',
    );

    return this.dispatchApi({
      type: 'schedulingControl/getCustomer',
      payload: data,
    });
  };

  parseCustomerFromRemoteApiData = () => {
    recordInfo(
      'info built-in parseCustomerFromRemoteApiData is a simulation,if you need actual business,you need override it: parseCustomerFromRemoteApiData = () => {} and return a object like "return getApiDataCore({props: this.props,modelName: \'schedulingControl\',})"',
    );

    const data = getApiDataCore({
      props: this.props,
      modelName: 'schedulingControl',
    });

    return data;
  };

  getCustomer = ({ data = {}, force: forceValue = false, callback = null }) => {
    recordDebug('exec getCustomer');

    let force = forceValue;

    const currentCustomer = getCurrentCustomer();

    if (!force) {
      if ((currentCustomer || null) == null) {
        force = true;
      }
    }

    if (!force) {
      recordInfo('info getCustomer from local cache success');

      if (isFunction(callback)) {
        callback(currentCustomer);
      }
    } else {
      recordInfo(
        'info getCustomer from local cache fail or force api request, shift to get from api dispatch',
      );

      this.dispatchGetCustomer(data || {}).then(() => {
        const remoteData = this.parseCustomerFromRemoteApiData();

        const { dataSuccess, data: metaData } = remoteData;

        if (dataSuccess) {
          setCurrentCustomer(metaData);

          if (isFunction(callback)) {
            callback(metaData);
          }
        }
      });
    }
  };

  // eslint-disable-next-line no-unused-vars
  doAfterGetCustomerOnSignInSilent = (data) => {
    recordInfo(
      'info doAfterGetCustomerOnSignInSilent do nothing,if you need,you can override it: doAfterGetCustomerOnSignInSilent = (data) => {}',
    );
  };

  // eslint-disable-next-line no-unused-vars
  doAfterGetCustomerOnSignIn = (data) => {
    recordInfo(
      'info doAfterGetCustomerOnSignIn do nothing,if you need,you can override it: doAfterGetCustomerOnSignIn = (data) => {}',
    );
  };

  dispatchExchangePhone = (data = {}) => {
    recordInfo(
      'info built-in dispatchExchangePhone is a simulation,if you need actual business,you need override it: dispatchExchangePhone = (data) => {} and return a promise dispatchApi like "return this.dispatchApi({type: \'schedulingControl/exchangePhone\',payload: data,})"',
    );

    return this.dispatchApi({
      type: 'schedulingControl/exchangePhone',
      payload: data,
    });
  };

  getExchangePhoneApiData = () => {
    return getApiDataCore({
      props: this.props,
      modelName: 'schedulingControl',
    });
  };

  exchangePhone = ({ data, callback = null }) => {
    const that = this;

    that
      .dispatchExchangePhone(data)
      .then(() => {
        const remoteData = that.getExchangePhoneApiData();

        const { dataSuccess, data: metaData } = remoteData;

        if (dataSuccess) {
          if (isFunction(callback)) {
            callback(metaData);
          }
        }
      })
      .catch((error) => {
        recordError(error);
      });
  };
}

export default SupplementCore;
