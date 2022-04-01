import Taro from '@tarojs/taro';

import {
  getPhoneLocation,
  getSetting,
  showInfoMessage,
  sleep,
  recordObject,
  recordLog,
} from 'taro-fast-common/es/utils/tools';
import { isFunction, isUndefined } from 'taro-fast-common/es/utils/typeCheck';
import {
  locateResult,
  locationModeCollection,
  verifySignInResult,
} from 'taro-fast-common/es/utils/constants';
import Tips from 'taro-fast-common/es/utils/tips';

import {
  getEffectiveCode,
  getLastLocation,
  getLocation,
  getLocationMode,
  getMap,
  getNextCheckLoginUnixTime,
  getOpenId,
  getSessionRefreshing,
  getToken,
  removeLocation,
  removeSession,
  setEffectiveCode,
  setLastLocation,
  setLocation,
  setLocationMode,
  setMap,
  setNextCheckLoginUnixTime,
  setSession,
  setSessionRefreshing,
} from '../../utils/globalStorageAssist';
import { defaultSettingsLayoutCustom } from '../../utils/defaultSettingsSpecial';

import Common from '../Common';

const defaultLongitude = defaultSettingsLayoutCustom.getDefaultLongitude();
const defaultLatitude = defaultSettingsLayoutCustom.getDefaultLatitude();
const useLocation = defaultSettingsLayoutCustom.getUseLocation();

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

      that.setCurrentInfo();

      that.checkSession(() => {
        if (that.verifyTicketValidity) {
          that.checkTicketValidity();
        }
      });

      that.doWorkWhenRepeatedShow();

      if (that.needReLocationWhenRepeatedShow) {
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
    recordLog('exec obtainLocation');

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
    }

    if (needRelocation) {
      if (showLoading) {
        showInfoMessage({
          message: '定位中,请稍后',
          duration: 1500,
        });
      }

      const that = this;

      getPhoneLocation({
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
            // eslint-disable-next-line no-unused-vars
            fail: (res) => {
              // const { status, message } = res;

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

  // eslint-disable-next-line no-unused-vars
  dispatchSetSignInResult = (data) => {
    throw new Error(
      'dispatchSetSignInResult need to be override, it need to be return a promise',
    );
  };

  checkTicketValidity = (callback) => {
    recordLog('exec checkTicketValidity');

    const locationMode = getLocationMode();
    const signInResult = this.getSignInResult();

    const that = this;

    if (signInResult === verifySignInResult.unknown) {
      if (
        (useLocation || false) &&
        locationMode === locationModeCollection.auto
      ) {
        that.obtainLocation({
          successCallback: () => {
            that.signIn({
              data: {},
              callback,
            });
          },
          focus: false,
          showLoading: false,
          fromLaunch: false,
          failCallback: () => {
            that.signIn({
              data: {},
              callback,
            });
          },
        });
      } else {
        that.signIn({
          data: {},
          callback,
        });
      }
    } else {
      if (
        (useLocation || false) &&
        locationMode === locationModeCollection.auto
      ) {
        that.obtainLocation({
          successCallback: () => {
            that.checkTicketValidityAfterLocation(callback);
          },
          focus: false,
          showLoading: false,
          fromLaunch: false,
          failCallback: () => {
            that.checkTicketValidityAfterLocation(callback);
          },
        });
      } else {
        that.checkTicketValidityAfterLocation(callback);
      }
    }
  };

  checkTicketValidityAfterLocation(callback) {
    const ticketValidityProcessDetection =
      this.getTicketValidityProcessDetection();

    if (ticketValidityProcessDetection) {
      return;
    }

    const tokenCurrent = getToken();
    const openIdCurrent = getOpenId();
    const location = getLocation();

    if (
      (tokenCurrent || '') !== '' &&
      (openIdCurrent || '') !== '' &&
      (location || null) !== null
    ) {
      const signInResult = this.getSignInResult();

      if (signInResult === verifySignInResult.fail) {
        if (!this.verifyTicket) {
          return;
        } else {
          if (isFunction(callback)) {
            callback();
          }

          return;
        }
      }
    }

    this.checkTicketValidityCore(callback);
  }

  // eslint-disable-next-line no-unused-vars
  dispatchCheckTicketValidity = (data = {}) => {
    throw new Error(
      'dispatchCheckTicketValidity need override, dispatchCheckTicketValidity must return a promise',
    );
  };

  getCheckTicketValidityApiData = () => {
    throw new Error(
      'getCheckTicketValidityApiData need override, getCheckTicketValidityApiData must return a object',
    );
  };

  checkTicketValidityCore(callback) {
    recordLog('exec checkTicketValidityCore');

    const currentNextCheckLoginUnixTime = getNextCheckLoginUnixTime();

    const currentUnixTime = parseInt(new Date().getTime() / 1000, 10);

    if (currentUnixTime < currentNextCheckLoginUnixTime) {
      if (isFunction(callback)) {
        callback();
      }

      return;
    }

    const that = this;

    that.dispatchCheckTicketValidity({}).then(() => {
      const remoteData = that.getCheckTicketValidityApiData();

      const { dataSuccess, data: metaData } = remoteData;

      if (dataSuccess) {
        const { needRefresh, nextCheckLoginUnixTime } = metaData;

        setNextCheckLoginUnixTime(nextCheckLoginUnixTime);

        if (needRefresh) {
          that.signIn({
            data: {},
            callback,
          });
        } else {
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
    throw new Error(
      'dispatchRefreshSession need override, dispatchRefreshSession must return a promise',
    );
  };

  getRefreshSessionApiData = () => {
    throw new Error(
      'getRefreshSessionApiData need override, getRefreshSessionApiData must return a object',
    );
  };

  refreshSession = ({ callback }) => {
    recordLog('exec refreshSession');

    const sessionRefreshing = getSessionRefreshing();

    if (!sessionRefreshing) {
      setSessionRefreshing(true);

      const that = this;

      Taro.login({ timeout: 1000 })
        .then((res) => {
          recordLog('exec Taro.login');

          const { code } = res;

          if (code) {
            setEffectiveCode(code);

            that
              .dispatchRefreshSession({ code })
              .then(() => {
                const remoteData = this.getRefreshSessionApiData();

                const { dataSuccess, data: metaData } = remoteData;

                if (dataSuccess) {
                  const { code: effectiveCodeRemote, session } = metaData;
                  const effectiveCode = getEffectiveCode();

                  if (effectiveCode === (effectiveCodeRemote || 'no')) {
                    setSession(session);
                  }

                  if (isFunction(callback)) {
                    callback();
                  }
                } else {
                  removeSession();
                }

                setSessionRefreshing(false);
              })
              .catch(() => {
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
          recordObject({ error, current: that });

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
    const that = this;

    const locationMode = getLocationMode();

    if ((useLocation || false) && locationMode == locationModeCollection.auto) {
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
    recordLog('exec signInWhenCheckProcessDetection');

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

  // eslint-disable-next-line no-unused-vars
  dispatchSingIn = (data = {}) => {
    throw new Error(
      'dispatchSingIn need override, dispatchSingIn must return a promise',
    );
  };

  getSignInApiData = () => {
    throw new Error(
      'getSignInApiData need override, getSignInApiData must return a object',
    );
  };

  signInCore({ data, callback }) {
    Tips.loading('处理中');

    this.dispatchSingIn(data).then(() => {
      Tips.loaded();

      const remoteData = this.getSignInApiData();

      const { dataSuccess, data: metaData } = remoteData;

      this.setSignInProcessDetection({
        data: false,
      });

      if (dataSuccess) {
        this.doAfterSignInSuccess(metaData);

        if (isFunction(callback)) {
          callback(metaData);
        }
      } else {
        removeSession();

        showInfoMessage({
          message: '登录失败',
        });

        this.doWhenSignInFail();
      }
    });
  }

  // eslint-disable-next-line no-unused-vars
  doAfterSignInSuccess = (data) => {};

  doWhenSignInFail = () => {
    throw new Error('doWhenSignInFail need to be override');
  };
}

export default SupplementCore;
