import Taro from '@tarojs/taro';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  environmentCollection,
  getCache,
  getLocalMetaData,
  isFunction,
  isNumber,
  isObject,
  isString,
  isUndefined,
  logConfig,
  logData,
  logDebug,
  logException,
  logExecute,
  logInfo,
  logObject,
  logWarn,
  redirectTo,
  setCache,
  setLocalMetaData,
  setToken,
  showErrorMessage,
  showInfoMessage,
  sleep,
  toNumber,
  toString,
} from 'easy-soft-utility';

import {
  emptyLogic,
  getGeographicalLocation,
  getSetting,
  locateResult,
  locationModeCollection,
  Tips,
} from 'taro-fast-common';

import { getAdministrativeDivisionFullData } from '../../services/schedulingControl';
import { setAdministrativeDivisionFullDataCache } from '../../utils/administrativeDivisionFullDataCacheAssist';
import {
  getSignInResultDescription,
  getVerifySignInResult,
} from '../../utils/common';
import {
  getCurrentCustomer,
  removeCurrentCustomer,
  setCurrentCustomer,
} from '../../utils/currentCustomerAssist';
import {
  getEffectiveCode,
  setEffectiveCode,
} from '../../utils/effectiveCodeAssist';
import {
  getLastLocation,
  getLocation,
  getLocationMode,
  getMap,
  removeLocation,
  setLastLocation,
  setLocation,
  setLocationMode,
  setMap,
} from '../../utils/locationAssist';
import {
  getNextCheckLoginUnixTime,
  setNextCheckLoginUnixTime,
} from '../../utils/nextCheckLoginUnixTimeAssist';
import { setOpenId } from '../../utils/openIdAssist';
import { removeSession, setSession } from '../../utils/sessionAssist';
import {
  getSessionRefreshing,
  setSessionRefreshing,
} from '../../utils/sessionRefreshingAssist';
import {
  getCheckTicketValidityAliasName,
  getDefaultLatitude,
  getDefaultLongitude,
  getDefaultMetaData,
  getGetCustomerAliasName,
  getMetaDataAliasName,
  getNavigationToSignInWhenSignInSilentFail,
  getRefreshSessionAliasName,
  getSignInAliasName,
  getSignInPath,
  getSignInSilentAliasName,
  getSimulationLocation,
  getSimulationLocationData,
  getTokenAnonymous,
  getUseLocation,
} from '../../utils/settingsAssist';
import { Common } from '../Common';

const primaryCallName = 'framework::SupplementCore';

/**
 * 业务调度核心底层方法
 */
class SupplementCore extends Common {
  doShowTask = () => {
    this.logCallTrack({}, primaryCallName, 'doShowTask');

    logDebug(
      `this.firstShowHasTriggered is ${this.firstShowHasTriggered} in doShowTask`,
    );

    if (this.firstShowHasTriggered) {
      const that = this;

      that.logCallTrace(
        {},
        primaryCallName,
        'doShowTask',
        'adjustInternalDataOnRepeatedShow',
      );

      that.adjustInternalDataOnRepeatedShow();

      that.logCallTrace({}, primaryCallName, 'doShowTask', 'setCurrentInfo');

      that.setCurrentInfo();

      logDebug(
        `this.repeatDoWorkWhenShow is ${this.repeatDoWorkWhenShow} in doShowTask`,
      );

      if (this.repeatDoWorkWhenShow) {
        that.logCallTrace({}, primaryCallName, 'doShowTask', 'doWorkWhenShow');

        this.doWorkWhenShow(() => {
          that.logCallTrace(
            {},
            primaryCallName,
            'doShowTask',
            'doWorkWhenShow',
            'callback',
            'doWorkWhenRepeatedShow',
          );

          that.doWorkWhenRepeatedShow();

          that.logCallTrace(
            {},
            primaryCallName,
            'doShowTask',
            'doWorkWhenShow',
            'callback',
            'doWorkWithNeedReLocationWhenRepeatedShow',
          );

          that.doWorkWithNeedReLocationWhenRepeatedShow();

          that.logCallTrace(
            {},
            primaryCallName,
            'doShowTask',
            'doWorkWhenShow',
            'callback',
            'doWorkWhenEveryShow',
          );

          this.doWorkWhenEveryShow();

          that.logCallTrace(
            {},
            primaryCallName,
            'doShowTask',
            'doWorkWhenShow',
            'callback',
            'doWorkAfterShow',
          );

          this.doWorkAfterShow();
        });
      } else {
        that.logCallTrace(
          {},
          primaryCallName,
          'doShowTask',
          'doWorkWhenShow',
          'callback',
          'checkSession',
        );

        that.checkSession(() => {
          that.logCallTrace(
            {},
            primaryCallName,
            'doShowTask',
            'doWorkWhenShow',
            'callback',
            'checkSession',
            'callback',
            'getVerifyTicketValidity',
          );

          if (that.getVerifyTicketValidity()) {
            that.logCallTrace(
              {},
              primaryCallName,
              'doShowTask',
              'doWorkWhenShow',
              'callback',
              'checkSession',
              'callback',
              'checkTicketValidity',
            );

            that.checkTicketValidity({
              callback: that.doWorkWhenCheckTicketValidityOnRepeatedShow,
            });
          }
        });

        that.logCallTrace(
          {},
          primaryCallName,
          'doShowTask',
          'doWorkWhenShow',
          'callback',
          'doWorkWhenRepeatedShow',
        );

        that.doWorkWhenRepeatedShow();

        that.logCallTrace(
          {},
          primaryCallName,
          'doShowTask',
          'doWorkWhenShow',
          'callback',
          'doWorkWithNeedReLocationWhenRepeatedShow',
        );

        that.doWorkWithNeedReLocationWhenRepeatedShow();

        that.logCallTrace(
          {},
          primaryCallName,
          'doShowTask',
          'doWorkWhenShow',
          'callback',
          'doWorkWhenEveryShow',
        );

        this.doWorkWhenEveryShow();

        that.logCallTrace(
          {},
          primaryCallName,
          'doShowTask',
          'doWorkWhenShow',
          'callback',
          'doWorkAfterShow',
        );

        this.doWorkAfterShow();
      }
    } else {
      this.logCallTrace(
        {},
        primaryCallName,
        'doShowTask',
        'doWorkWhenFirstShow',
      );

      this.doWorkWhenFirstShow();

      this.firstShowHasTriggered = true;

      logDebug('set this.firstShowHasTriggered to true');

      this.logCallTrace(
        {},
        primaryCallName,
        'doShowTask',
        'doWorkWhenEveryShow',
      );

      this.doWorkWhenEveryShow();

      this.logCallTrace({}, primaryCallName, 'doShowTask', 'doWorkAfterShow');

      this.doWorkAfterShow();
    }
  };

  doWorkWithNeedReLocationWhenRepeatedShow = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'doWorkWithNeedReLocationWhenRepeatedShow',
    );

    const that = this;

    if (that.needReLocationWhenRepeatedShow) {
      that.logCallTrace(
        {},
        primaryCallName,
        'doWorkWithNeedReLocationWhenRepeatedShow',
        'getEnvironment',
      );

      const environment = this.getEnvironment();

      const noAdaptationMessage = `framework with env [${environment}] has no adaptation location, only execute executeLogicAfterNonautomaticReLocationWhenRepeatedShow`;

      switch (environment) {
        case environmentCollection.WEAPP: {
          break;
        }

        case environmentCollection.ALIPAY: {
          logWarn(noAdaptationMessage);

          that.logCallTrace(
            {},
            primaryCallName,
            'doWorkWithNeedReLocationWhenRepeatedShow',
            'executeLogicAfterNonautomaticReLocationWhenRepeatedShow',
          );

          that.executeLogicAfterNonautomaticReLocationWhenRepeatedShow({});

          return;
        }

        case environmentCollection.SWAN: {
          logWarn(noAdaptationMessage);

          that.logCallTrace(
            {},
            primaryCallName,
            'doWorkWithNeedReLocationWhenRepeatedShow',
            'executeLogicAfterNonautomaticReLocationWhenRepeatedShow',
          );

          that.executeLogicAfterNonautomaticReLocationWhenRepeatedShow({});

          return;
        }

        case environmentCollection.WEB: {
          logWarn(noAdaptationMessage);

          that.logCallTrace(
            {},
            primaryCallName,
            'doWorkWithNeedReLocationWhenRepeatedShow',
            'executeLogicAfterNonautomaticReLocationWhenRepeatedShow',
          );

          that.executeLogicAfterNonautomaticReLocationWhenRepeatedShow({});

          return;
        }

        default: {
          logWarn(noAdaptationMessage);

          that.logCallTrace(
            {},
            primaryCallName,
            'doWorkWithNeedReLocationWhenRepeatedShow',
            'executeLogicAfterNonautomaticReLocationWhenRepeatedShow',
          );

          that.executeLogicAfterNonautomaticReLocationWhenRepeatedShow({});

          return;
        }
      }

      logDebug(
        `this.needReLocationWhenRepeatedShow is ${this.needReLocationWhenRepeatedShow} in doShowTask`,
      );

      const useLocation = getUseLocation();
      const locationMode = getLocationMode();

      if (
        (useLocation || false) &&
        locationMode === locationModeCollection.auto
      ) {
        logDebug(
          `useLocation is false and locationMode is locationModeCollection.auto`,
        );

        that.logCallTrace(
          {},
          primaryCallName,
          'doWorkWithNeedReLocationWhenRepeatedShow',
          'obtainLocation',
        );

        that.obtainLocation({
          successCallback: ({ location, map }) => {
            that.logCallTrace(
              { location, map },
              primaryCallName,
              'doWorkWithNeedReLocationWhenRepeatedShow',
              'obtainLocation',
              'successCallback',
              'executeLogicAfterAutomaticReLocationSuccessWhenRepeatedShow',
            );

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
        that.logCallTrace(
          {},
          primaryCallName,
          'doWorkWithNeedReLocationWhenRepeatedShow',
          'executeLogicAfterNonautomaticReLocationWhenRepeatedShow',
        );

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
    const that = this;

    that.logCallTrack(
      {
        force,
        showLoading,
        fromLaunch,
      },
      primaryCallName,
      'obtainLocation',
    );

    that.logCallTrace({}, primaryCallName, 'obtainLocation', 'getEnvironment');

    const environment = that.getEnvironment();

    const noAdaptationMessage = `framework with env [${environment}] has no adaptation, ignore obtainLocation, only execute failCallback`;

    switch (environment) {
      case environmentCollection.WEAPP: {
        break;
      }

      case environmentCollection.ALIPAY: {
        logWarn(noAdaptationMessage);

        if (isFunction(failCallback)) {
          that.logCallTrace(
            {},
            primaryCallName,
            'obtainLocation',
            'failCallback',
          );

          failCallback();
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'obtainLocation',
            'failCallback',
            emptyLogic,
          );
        }

        return;
      }

      case environmentCollection.SWAN: {
        logWarn(noAdaptationMessage);

        if (isFunction(failCallback)) {
          that.logCallTrace(
            {},
            primaryCallName,
            'obtainLocation',
            'failCallback',
          );

          failCallback();
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'obtainLocation',
            'failCallback',
            emptyLogic,
          );
        }

        return;
      }

      case environmentCollection.WEB: {
        logWarn(noAdaptationMessage);

        if (isFunction(failCallback)) {
          that.logCallTrace(
            {},
            primaryCallName,
            'obtainLocation',
            'failCallback',
          );

          failCallback();
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'obtainLocation',
            'failCallback',
            emptyLogic,
          );
        }

        return;
      }

      default: {
        logWarn(noAdaptationMessage);

        if (isFunction(failCallback)) {
          that.logCallTrace(
            {},
            primaryCallName,
            'obtainLocation',
            'failCallback',
          );

          failCallback();
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'obtainLocation',
            'failCallback',
            emptyLogic,
          );
        }

        return;
      }
    }

    const simulationMode = getSimulationLocation();
    const simulationData = getSimulationLocationData();

    if (simulationMode) {
      logDebug('simulation location in config is true');

      if (!isObject(simulationData)) {
        const info =
          'simulation location Data must be an object when simulation location in config is true';

        that.logCallTrace(
          {
            simulationLocationData: simulationData,
            error: info,
          },
          primaryCallName,
          'obtainLocation',
          'error',
        );

        throw new Error(info);
      }
    }

    let needRelocation = force || false;

    const location = getLocation();
    const mapData = getMap();
    const locationMode = getLocationMode();

    if (locationMode !== locationModeCollection.auto) {
      removeLocation();
    }

    if (force) {
      logDebug('obtain location force');
    } else {
      if ((location || null) == null || (mapData || null) == null) {
        needRelocation = true;
      } else {
        that.logCallTrace(
          {
            data: {
              locationGet: true,
              locationAuth: locateResult.yes,
            },
          },
          primaryCallName,
          'obtainLocation',
          'setLocationResult',
        );

        that.setLocationResult({
          data: {
            locationGet: true,
            locationAuth: locateResult.yes,
          },
          callback: null,
        });

        if (isFunction(successCallback)) {
          that.logCallTrace(
            {
              location,
              map: mapData,
            },
            primaryCallName,
            'obtainLocation',
            'successCallback',
          );

          successCallback({
            location,
            map: mapData,
          });
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'obtainLocation',
            'successCallback',
            emptyLogic,
          );
        }
      }
    }

    if (needRelocation) {
      if (showLoading) {
        showInfoMessage({
          text: '定位中,请稍后',
          duration: 1500,
        });
      }

      getGeographicalLocation({
        success: (l) => {
          that.logCallTrace(
            {
              data: {
                locationGet: true,
                locationAuth: locateResult.yes,
              },
            },
            primaryCallName,
            'obtainLocation',
            'getGeographicalLocation',
            'success',
            'setLocationResult',
          );

          that.setLocationResult({
            data: {
              locationGet: true,
              locationAuth: locateResult.yes,
            },
            callback: null,
          });

          setLocationMode(locationModeCollection.auto);

          setLocation(l);

          const defaultLongitude = getDefaultLongitude();
          const defaultLatitude = getDefaultLatitude();
          const { latitude, longitude } = l;

          that.logCallTrace(
            {
              location: {
                latitude: latitude ?? defaultLatitude,
                longitude: longitude ?? defaultLongitude,
              },
            },
            primaryCallName,
            'obtainLocation',
            'getGeographicalLocation',
            'success',
            'reverseGeocoder',
          );

          that.reverseGeocoder({
            location: {
              latitude: latitude ?? defaultLatitude,
              longitude: longitude ?? defaultLongitude,
            },
            success: (response) => {
              const { result } = response;

              setMap(result);

              setLastLocation(result);

              if (isFunction(successCallback)) {
                that.logCallTrace(
                  {
                    location: l,
                    map: result,
                  },
                  primaryCallName,
                  'obtainLocation',
                  'getGeographicalLocation',
                  'success',
                  'reverseGeocoder',
                  'success',
                  'successCallback',
                );

                successCallback({
                  location: l,
                  map: result,
                });
              } else {
                that.logCallTrace(
                  {},
                  primaryCallName,
                  'obtainLocation',
                  'getGeographicalLocation',
                  'success',
                  'reverseGeocoder',
                  'success',
                  'successCallback',
                  emptyLogic,
                );
              }
            },
            fail: (error) => {
              that.logCallTrace(
                { error },
                primaryCallName,
                'obtainLocation',
                'getGeographicalLocation',
                'success',
                'reverseGeocoder',
                'fail',
                'error',
              );

              logException(error);

              if (mapData == null) {
                const mapDataLast = getLastLocation();

                if (mapDataLast == null) {
                  setLocationMode(locationModeCollection.custom);

                  if (location != null) {
                    setLocation(location);
                  }

                  if (mapData == null) {
                    if (mapDataLast == null) {
                      setLocationMode(locationModeCollection.custom);

                      if (location != null) {
                        setLocation(location);
                      }

                      if (isFunction(successCallback)) {
                        that.logCallTrace(
                          {
                            location: l,
                            map: null,
                          },
                          primaryCallName,
                          'obtainLocation',
                          'getGeographicalLocation',
                          'success',
                          'reverseGeocoder',
                          'fail',
                          'successCallback',
                        );

                        successCallback({
                          location: l,
                          map: null,
                        });
                      } else {
                        that.logCallTrace(
                          {},
                          primaryCallName,
                          'obtainLocation',
                          'getGeographicalLocation',
                          'success',
                          'reverseGeocoder',
                          'fail',
                          'successCallback',
                          emptyLogic,
                        );
                      }
                    } else {
                      if (isFunction(successCallback)) {
                        that.logCallTrace(
                          {
                            location: l,
                            map: mapDataLast,
                          },
                          primaryCallName,
                          'obtainLocation',
                          'getGeographicalLocation',
                          'success',
                          'reverseGeocoder',
                          'fail',
                          'successCallback',
                        );

                        successCallback({
                          location: l,
                          map: mapDataLast,
                        });
                      } else {
                        that.logCallTrace(
                          {},
                          primaryCallName,
                          'obtainLocation',
                          'getGeographicalLocation',
                          'success',
                          'reverseGeocoder',
                          'fail',
                          'successCallback',
                          emptyLogic,
                        );
                      }
                    }
                  } else {
                    setMap(mapData);
                    setLastLocation(mapData);

                    if (isFunction(successCallback)) {
                      that.logCallTrace(
                        {
                          location: l,
                          map: mapData,
                        },
                        primaryCallName,
                        'obtainLocation',
                        'getGeographicalLocation',
                        'success',
                        'reverseGeocoder',
                        'fail',
                        'successCallback',
                      );

                      successCallback({
                        location: l,
                        map: mapData,
                      });
                    } else {
                      that.logCallTrace(
                        {},
                        primaryCallName,
                        'obtainLocation',
                        'getGeographicalLocation',
                        'success',
                        'reverseGeocoder',
                        'fail',
                        'successCallback',
                        emptyLogic,
                      );
                    }
                  }
                } else {
                  if (isFunction(successCallback)) {
                    that.logCallTrace(
                      {
                        location: l,
                        map: mapDataLast,
                      },
                      primaryCallName,
                      'obtainLocation',
                      'getGeographicalLocation',
                      'success',
                      'reverseGeocoder',
                      'fail',
                      'successCallback',
                    );

                    successCallback({
                      location: l,
                      map: mapDataLast,
                    });
                  } else {
                    that.logCallTrace(
                      {},
                      primaryCallName,
                      'obtainLocation',
                      'getGeographicalLocation',
                      'success',
                      'reverseGeocoder',
                      'fail',
                      'successCallback',
                      emptyLogic,
                    );
                  }
                }
              } else {
                setMap(mapData);
                setLastLocation(mapData);

                if (isFunction(successCallback)) {
                  that.logCallTrace(
                    {
                      location: l,
                      map: mapData,
                    },
                    primaryCallName,
                    'obtainLocation',
                    'getGeographicalLocation',
                    'success',
                    'reverseGeocoder',
                    'fail',
                    'successCallback',
                  );

                  successCallback({
                    location: l,
                    map: mapData,
                  });
                } else {
                  that.logCallTrace(
                    {},
                    primaryCallName,
                    'obtainLocation',
                    'getGeographicalLocation',
                    'success',
                    'reverseGeocoder',
                    'fail',
                    'successCallback',
                    emptyLogic,
                  );
                }
              }
            },
            complete: function () {
              that.logCallTrace(
                {},
                primaryCallName,
                'obtainLocation',
                'getGeographicalLocation',
                'success',
                'reverseGeocoder',
                'complete',
                emptyLogic,
              );
            },
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
            that.logCallTrace(
              {
                data: {
                  locationGet: false,
                  locationAuth: locateResult.no,
                },
              },
              primaryCallName,
              'obtainLocation',
              'getGeographicalLocation',
              'fail',
              'setLocationResult',
            );

            that.setLocationResult({
              data: {
                locationGet: false,
                locationAuth: locateResult.no,
              },
              callback: null,
            });

            showInfoMessage({
              text: '您已禁止获取位置信息',
            });
          } else {
            that.logCallTrace(
              {},
              primaryCallName,
              'obtainLocation',
              'getGeographicalLocation',
              'fail',
              'getSetting',
            );

            getSetting({
              success: (response) => {
                const { authSetting } = response;

                let authLocation = locateResult.unknown;

                if ((authSetting || null) != null) {
                  const v = authSetting['scope.userLocation'];

                  if (!isUndefined(v)) {
                    if (v) {
                      authLocation = locateResult.yes;

                      showInfoMessage({
                        text: '获取定位失败',
                      });
                    } else {
                      authLocation = locateResult.no;

                      showInfoMessage({
                        text: '您已拒绝程序获取定位信息',
                      });
                    }
                  }
                }

                that.logCallTrace(
                  {
                    data: {
                      locationGet: false,
                      locationAuth: authLocation,
                    },
                  },
                  primaryCallName,
                  'obtainLocation',
                  'getGeographicalLocation',
                  'fail',
                  'getSetting',
                  'success',
                  'setLocationResult',
                );

                that.setLocationResult({
                  data: {
                    locationGet: false,
                    locationAuth: authLocation,
                  },
                  callback: null,
                });

                if (fromLaunch && authLocation === locateResult.unknown) {
                  //do nothing
                }
              },
              fail: () => {
                that.logCallTrace(
                  {
                    data: {
                      locationGet: false,
                      locationAuth: locateResult.unknown,
                    },
                  },
                  primaryCallName,
                  'obtainLocation',
                  'getGeographicalLocation',
                  'fail',
                  'getSetting',
                  'fail',
                  'setLocationResult',
                );

                that.setLocationResult({
                  data: {
                    locationGet: false,
                    locationAuth: locateResult.unknown,
                  },
                  callback: null,
                });

                showInfoMessage({
                  text: '获取定位权限信息失败',
                });
              },
              complete: () => {
                that.logCallTrace(
                  {},
                  primaryCallName,
                  'obtainLocation',
                  'getGeographicalLocation',
                  'fail',
                  'getSetting',
                  'complete',
                  emptyLogic,
                );
              },
            });
          }

          if (isFunction(failCallback)) {
            that.logCallTrace(
              {
                data: {
                  locationGet: false,
                  locationAuth: locateResult.no,
                },
              },
              primaryCallName,
              'obtainLocation',
              'getGeographicalLocation',
              'fail',
              'failCallback',
            );

            failCallback();
          } else {
            that.logCallTrace(
              {},
              primaryCallName,
              'obtainLocation',
              'getGeographicalLocation',
              'fail',
              'failCallback',
              emptyLogic,
            );
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
    this.logCallTrack(
      {
        location,
        map,
        force,
      },
      primaryCallName,
      'executeLogicAfterAutomaticReLocationSuccessWhenRepeatedShow',
    );

    if (isFunction(callback)) {
      this.logCallTrace(
        {
          location,
          map,
          force,
        },
        primaryCallName,
        'executeLogicAfterAutomaticReLocationSuccessWhenRepeatedShow',
        'callback',
      );

      callback({
        location,
        map,
        force,
      });
    } else {
      this.logCallTrace(
        {},
        primaryCallName,
        'executeLogicAfterAutomaticReLocationSuccessWhenRepeatedShow',
        'callback',
        emptyLogic,
      );
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
    this.logCallTrack(
      {
        location,
        map,
        force,
      },
      primaryCallName,
      'executeLogicAfterNonautomaticReLocationWhenRepeatedShow',
    );

    if (isFunction(callback)) {
      this.logCallTrace(
        {
          location,
          map,
          force,
        },
        primaryCallName,
        'executeLogicAfterNonautomaticReLocationWhenRepeatedShow',
        'callback',
      );

      callback({
        location,
        map,
        force,
      });
    } else {
      this.logCallTrace(
        {},
        primaryCallName,
        'executeLogicAfterNonautomaticReLocationWhenRepeatedShow',
        'callback',
        emptyLogic,
      );
    }
  };

  checkTicketValidity = ({ callback, signInSilentFailCallback = null }) => {
    this.logCallTrack({}, primaryCallName, 'checkTicketValidity');

    this.logCallTrace(
      {},
      primaryCallName,
      'checkTicketValidity',
      'getEnvironment',
    );

    const environment = this.getEnvironment();

    const noAdaptationMessage = `framework with env [${environment}] has no adaptation, ignore checkTicketValidity, only execute callback and signInSilentFailCallback`;

    switch (environment) {
      case environmentCollection.WEAPP: {
        break;
      }

      case environmentCollection.ALIPAY: {
        logWarn(noAdaptationMessage);

        if (isFunction(callback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'checkTicketValidity',
            'callback',
          );

          callback();
        } else {
          this.logCallTrace(
            {},
            primaryCallName,
            'checkTicketValidity',
            'callback',
            emptyLogic,
          );
        }

        if (isFunction(signInSilentFailCallback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'checkTicketValidity',
            'signInSilentFailCallback',
          );

          signInSilentFailCallback();
        } else {
          this.logCallTrace(
            {},
            primaryCallName,
            'checkTicketValidity',
            'signInSilentFailCallback',
            emptyLogic,
          );
        }

        return;
      }

      case environmentCollection.SWAN: {
        logWarn(noAdaptationMessage);

        if (isFunction(callback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'checkTicketValidity',
            'callback',
          );

          callback();
        } else {
          this.logCallTrace(
            {},
            primaryCallName,
            'checkTicketValidity',
            'callback',
            emptyLogic,
          );
        }

        if (isFunction(signInSilentFailCallback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'checkTicketValidity',
            'signInSilentFailCallback',
          );

          signInSilentFailCallback();
        } else {
          this.logCallTrace(
            {},
            primaryCallName,
            'checkTicketValidity',
            'signInSilentFailCallback',
            emptyLogic,
          );
        }

        return;
      }

      case environmentCollection.WEB: {
        logWarn(noAdaptationMessage);

        if (isFunction(callback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'checkTicketValidity',
            'callback',
          );

          callback();
        } else {
          this.logCallTrace(
            {},
            primaryCallName,
            'checkTicketValidity',
            'callback',
            emptyLogic,
          );
        }

        if (isFunction(signInSilentFailCallback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'checkTicketValidity',
            'signInSilentFailCallback',
          );

          signInSilentFailCallback();
        } else {
          this.logCallTrace(
            {},
            primaryCallName,
            'checkTicketValidity',
            'signInSilentFailCallback',
            emptyLogic,
          );
        }

        return;
      }

      default: {
        logWarn(noAdaptationMessage);

        if (isFunction(callback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'checkTicketValidity',
            'callback',
          );

          callback();
        } else {
          this.logCallTrace(
            {},
            primaryCallName,
            'checkTicketValidity',
            'callback',
            emptyLogic,
          );
        }

        if (isFunction(signInSilentFailCallback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'checkTicketValidity',
            'signInSilentFailCallback',
          );

          signInSilentFailCallback();
        } else {
          this.logCallTrace(
            {},
            primaryCallName,
            'checkTicketValidity',
            'signInSilentFailCallback',
            emptyLogic,
          );
        }

        return;
      }
    }

    const useLocation = getUseLocation();
    const locationMode = getLocationMode();

    this.logCallTrace(
      {},
      primaryCallName,
      'checkTicketValidity',
      'getSignInResult',
    );

    const signInResult = this.getSignInResult();

    const verifySignInResult = getVerifySignInResult();

    const that = this;

    if (signInResult === verifySignInResult.unknown) {
      logDebug(
        `sign in result is ${signInResult}, it mean ${getSignInResultDescription(
          signInResult,
        )}`,
      );

      if (
        (useLocation || false) &&
        locationMode === locationModeCollection.auto
      ) {
        logInfo(
          'info use location and automatic location and sign in result is unknown',
        );

        that.logCallTrace(
          {},
          primaryCallName,
          'checkTicketValidity',
          'obtainLocation',
        );

        that.obtainLocation({
          successCallback: () => {
            that.logCallTrace(
              {},
              primaryCallName,
              'checkTicketValidity',
              'obtainLocation',
              'successCallback',
              'signInSilent',
            );

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
            that.logCallTrace(
              {},
              primaryCallName,
              'checkTicketValidity',
              'obtainLocation',
              'failCallback',
              'signInSilent',
            );

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
        logInfo(
          'info use location and automatic location on checkTicketValidity and sign in result is not unknown',
        );

        that.logCallTrace(
          {},
          primaryCallName,
          'checkTicketValidity',
          'obtainLocation',
        );

        that.obtainLocation({
          successCallback: () => {
            that.logCallTrace(
              {},
              primaryCallName,
              'checkTicketValidity',
              'obtainLocation',
              'successCallback',
              'bridgeLogicOnCheckTicketValidity',
            );

            that.bridgeLogicOnCheckTicketValidity({ callback });
          },
          focus: false,
          showLoading: false,
          fromLaunch: false,
          failCallback: () => {
            that.logCallTrace(
              {},
              primaryCallName,
              'checkTicketValidity',
              'obtainLocation',
              'failCallback',
              'bridgeLogicOnCheckTicketValidity',
            );

            that.bridgeLogicOnCheckTicketValidity({ callback });
          },
        });
      } else {
        logDebug(
          'do not use location or nonautomatic location on checkTicketValidity',
        );

        that.logCallTrace(
          {},
          primaryCallName,
          'checkTicketValidity',
          'bridgeLogicOnCheckTicketValidity',
        );

        that.bridgeLogicOnCheckTicketValidity({ callback });
      }
    }
  };

  doWorkWhenCheckTicketValidityOnRepeatedShow = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'doWorkWhenCheckTicketValidityOnRepeatedShow',
      emptyLogic,
    );
  };

  bridgeLogicOnCheckTicketValidity({ callback = null }) {
    this.logCallTrack({}, primaryCallName, 'bridgeLogicOnCheckTicketValidity');

    this.logCallTrace(
      {},
      primaryCallName,
      'bridgeLogicOnCheckTicketValidity',
      'getTicketValidityProcessDetection',
    );

    const ticketValidityProcessDetection =
      this.getTicketValidityProcessDetection();

    if (ticketValidityProcessDetection) {
      return;
    }

    this.logCallTrace(
      {},
      primaryCallName,
      'bridgeLogicOnCheckTicketValidity',
      'getVerifySignInResult',
    );

    const verifySignInResult = getVerifySignInResult();

    this.logCallTrace(
      {},
      primaryCallName,
      'bridgeLogicOnCheckTicketValidity',
      'getSignInResult',
    );

    const signInResult = this.getSignInResult();

    if (signInResult === verifySignInResult.fail) {
      this.logCallTrace(
        {},
        primaryCallName,
        'bridgeLogicOnCheckTicketValidity',
        'getVerifyTicket',
      );

      if (this.getVerifyTicket()) {
        const forceRefresh = true;

        this.logCallTrace(
          { forceRefresh },
          primaryCallName,
          'bridgeLogicOnCheckTicketValidity',
          'checkTicketValidityCore',
        );

        this.checkTicketValidityCore({
          forceRefresh,
          callback,
        });

        return;
      } else {
        if (isFunction(callback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'bridgeLogicOnCheckTicketValidity',
            'callback',
          );

          callback();
        } else {
          this.logCallTrace(
            {},
            primaryCallName,
            'bridgeLogicOnCheckTicketValidity',
            'callback',
            emptyLogic,
          );
        }

        return;
      }
    }

    this.logCallTrace(
      {},
      primaryCallName,
      'bridgeLogicOnCheckTicketValidity',
      'checkTicketValidityCore',
    );

    this.checkTicketValidityCore({
      forceRefresh: false,
      callback,
    });
  }

  dispatchCheckTicketValidity = (data = {}) => {
    this.logCallTrack({ data }, primaryCallName, 'dispatchCheckTicketValidity');

    this.logCallTrace(
      o,
      primaryCallName,
      'dispatchCheckTicketValidity',
      'getVerifyTicket',
    );

    if (this.getVerifyTicket()) {
      const info =
        'dispatchCheckTicketValidity need override when verifyTicket set to true, dispatchCheckTicketValidity must return a promise';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'dispatchCheckTicketValidity',
        'error',
      );

      throw new Error(info);
    }

    const o = {
      type: 'schedulingControl/checkTicketValidity',
      payload: data,
      alias: getCheckTicketValidityAliasName(),
    };

    this.logCallTrace(
      o,
      primaryCallName,
      'dispatchCheckTicketValidity',
      'dispatchApi',
    );

    return this.dispatchApi(o);
  };

  checkTicketValidityCore({
    forceRefresh: forceRefreshValue = false,
    callback = null,
  }) {
    this.logCallTrack(
      {
        forceRefresh: forceRefreshValue,
      },
      primaryCallName,
      'checkTicketValidityCore',
    );

    const that = this;

    if (forceRefreshValue) {
      that.logCallTrace(
        {},
        primaryCallName,
        'checkTicketValidityCore',
        'signInSilent',
      );

      that.signInSilent({
        data: {},
        successCallback: callback,
      });

      return;
    }

    const currentNextCheckLoginUnixTime = getNextCheckLoginUnixTime();

    const currentUnixTime = Number.parseInt(Date.now() / 1000, 10);

    if (currentUnixTime < currentNextCheckLoginUnixTime) {
      if (isFunction(callback)) {
        that.logCallTrace(
          {},
          primaryCallName,
          'checkTicketValidityCore',
          'callback',
        );

        callback();
      } else {
        that.logCallTrace(
          {},
          primaryCallName,
          'checkTicketValidityCore',
          'callback',
          emptyLogic,
        );
      }

      return;
    }

    that.logCallTrace(
      {},
      primaryCallName,
      'checkTicketValidityCore',
      'dispatchCheckTicketValidity',
    );

    that
      .dispatchCheckTicketValidity({})
      .then((remoteData) => {
        const { dataSuccess, data: metaData } = remoteData;

        if (dataSuccess) {
          const { needRefresh, nextCheckLoginUnixTime } = metaData;

          setNextCheckLoginUnixTime(nextCheckLoginUnixTime);

          if (needRefresh) {
            that.logCallTrace(
              {
                data: {},
              },
              primaryCallName,
              'checkTicketValidityCore',
              'dispatchCheckTicketValidity',
              'then',
              'signInSilent',
            );

            that.signInSilent({
              data: {},
              successCallback: callback,
            });
          } else {
            const verifySignInResult = getVerifySignInResult();

            that.logCallTrace(
              {},
              primaryCallName,
              'checkTicketValidityCore',
              'dispatchCheckTicketValidity',
              'then',
              'getSignInResult',
            );

            const signInResult = that.getSignInResult();

            that.logCallTrace(
              {},
              primaryCallName,
              'checkTicketValidityCore',
              'dispatchCheckTicketValidity',
              'then',
              'getVerifyTicket',
            );

            if (
              signInResult === verifySignInResult.fail &&
              that.getVerifyTicket()
            ) {
              that.logCallTrace(
                {},
                primaryCallName,
                'checkTicketValidityCore',
                'dispatchCheckTicketValidity',
                'then',
                'doWhenCheckTicketValidityVerifySignInFail',
              );

              that.doWhenCheckTicketValidityVerifySignInFail();
            }

            if (
              signInResult === verifySignInResult.success &&
              isFunction(callback)
            ) {
              that.logCallTrace(
                {},
                primaryCallName,
                'checkTicketValidityCore',
                'dispatchCheckTicketValidity',
                'then',
                'callback',
              );

              // eslint-disable-next-line promise/no-callback-in-promise
              callback();
            } else {
              that.logCallTrace(
                {},
                primaryCallName,
                'checkTicketValidityCore',
                'dispatchCheckTicketValidity',
                'then',
                'callback',
                emptyLogic,
              );
            }

            that.logCallTrace(
              {
                data: false,
              },
              primaryCallName,
              'checkTicketValidityCore',
              'dispatchCheckTicketValidity',
              'then',
              'setTicketValidityProcessDetection',
            );

            that.setTicketValidityProcessDetection({
              data: false,
            });
          }
        }

        return remoteData;
      })
      .catch((error) => {
        that.logCallTrace(
          { error },
          primaryCallName,
          'checkTicketValidityCore',
          'dispatchCheckTicketValidity',
          'catch',
          'error',
        );

        logException(error);
      });
  }

  doWhenCheckTicketValidityVerifySignInFail = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'doWhenCheckTicketValidityVerifySignInFail',
      emptyLogic,
    );
  };

  dispatchRefreshSession = (data) => {
    this.logCallTrack(data, primaryCallName, 'dispatchRefreshSession');

    this.logCallTrace(
      {},
      primaryCallName,
      'dispatchRefreshSession',
      'getRefreshSessionApiEffect',
    );

    const { type, payload, alias } = {
      type: '',
      payload: null,
      ...this.getRefreshSessionApiEffect(data),
      alias: getRefreshSessionAliasName(),
    };

    if (checkStringIsNullOrWhiteSpace(type)) {
      const info = 'getRefreshSessionApiEffect type disallow empty';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'dispatchRefreshSession',
        'error',
      );

      throw new Error(info);
    }

    const o = {
      type,
      payload,
      alias,
    };

    this.logCallTrace(
      o,
      primaryCallName,
      'dispatchRefreshSession',
      'dispatchApi',
    );

    return this.dispatchApi(o);
  };

  getRefreshSessionApiEffect = (data) => {
    const info =
      'getRefreshSessionApiEffect need override, getRefreshSessionApiEffect must return a object like {type,payload,alias:""}';

    this.logCallTrack(
      data,
      primaryCallName,
      'getRefreshSessionApiEffect',
      'error',
      info,
    );

    throw new Error(info);
  };

  refreshSession = ({ callback }) => {
    this.logCallTrack({}, primaryCallName, 'refreshSession');

    const sessionRefreshing = getSessionRefreshing();

    if (sessionRefreshing) {
      this.logCallTrace(
        {},
        primaryCallName,
        'refreshSession',
        'retryRefreshSessionWhenRefreshing',
      );

      this.retryRefreshSessionWhenRefreshing({
        callback,
      });
    } else {
      setSessionRefreshing(true);

      const that = this;

      that.logCallTrace({}, primaryCallName, 'refreshSession', 'Taro.login');

      Taro.login({ timeout: 1000 })
        .then((response) => {
          that.logCallTrace(
            response,
            primaryCallName,
            'refreshSession',
            'Taro.login',
            'then',
          );

          const { code } = response;

          if (code) {
            logDebug(`code: ${code}`);

            setEffectiveCode(code);

            that.logCallTrace(
              {
                code,
              },
              primaryCallName,
              'refreshSession',
              'Taro.login',
              'then',
              'dispatchRefreshSession',
            );

            that
              .dispatchRefreshSession({ code })
              // eslint-disable-next-line promise/no-nesting
              .then((remoteData) => {
                const { dataSuccess, data: metaData } = remoteData;

                if (dataSuccess) {
                  const { code: effectiveCodeRemote, sessionId } = metaData;
                  const effectiveCode = getEffectiveCode();

                  if (effectiveCode === (effectiveCodeRemote || 'no')) {
                    setSession(sessionId);
                  }

                  if (isFunction(callback)) {
                    that.logCallTrace(
                      {},
                      primaryCallName,
                      'refreshSession',
                      'Taro.login',
                      'then',
                      'dispatchRefreshSession',
                      'then',
                      'callback',
                    );

                    // eslint-disable-next-line promise/no-callback-in-promise
                    callback();
                  } else {
                    that.logCallTrace(
                      {},
                      primaryCallName,
                      'refreshSession',
                      'Taro.login',
                      'then',
                      'dispatchRefreshSession',
                      'then',
                      'callback',
                      emptyLogic,
                    );
                  }
                } else {
                  removeSession();
                }

                setSessionRefreshing(false);

                return remoteData;
              })
              // eslint-disable-next-line promise/no-nesting
              .catch((error) => {
                that.logCallTrace(
                  { error },
                  primaryCallName,
                  'refreshSession',
                  'Taro.login',
                  'then',
                  'dispatchRefreshSession',
                  'catch',
                );

                Tips.info('网络请求失败了，请检查下是否联网');

                removeSession();

                setSessionRefreshing(false);

                if (isFunction(callback)) {
                  that.logCallTrace(
                    {},
                    primaryCallName,
                    'refreshSession',
                    'Taro.login',
                    'then',
                    'dispatchRefreshSession',
                    'catch',
                    'callback',
                  );

                  // eslint-disable-next-line promise/no-callback-in-promise
                  callback();
                } else {
                  that.logCallTrace(
                    {},
                    primaryCallName,
                    'refreshSession',
                    'Taro.login',
                    'then',
                    'dispatchRefreshSession',
                    'catch',
                    'callback',
                    emptyLogic,
                  );
                }
              });
          } else {
            Tips.info('获取微信Code失败');

            removeSession();

            setSessionRefreshing(false);

            if (isFunction(callback)) {
              that.logCallTrace(
                response,
                primaryCallName,
                'refreshSession',
                'Taro.login',
                'then',
                'callback',
              );

              // eslint-disable-next-line promise/no-callback-in-promise
              callback();
            } else {
              that.logCallTrace(
                {},
                primaryCallName,
                'refreshSession',
                'Taro.login',
                'then',
                'callback',
                emptyLogic,
              );
            }
          }

          return response;
        })
        .catch((error) => {
          that.logCallTrace(
            { error },
            primaryCallName,
            'refreshSession',
            'Taro.login',
            'catch',
          );

          showInfoMessage({
            text: '微信登录失败',
          });

          removeSession();

          setSessionRefreshing(false);

          if (isFunction(callback)) {
            that.logCallTrace(
              {},
              primaryCallName,
              'refreshSession',
              'Taro.login',
              'catch',
              'callback',
            );

            // eslint-disable-next-line promise/no-callback-in-promise
            callback();
          } else {
            that.logCallTrace(
              {},
              primaryCallName,
              'refreshSession',
              'Taro.login',
              'catch',
              'callback',
              emptyLogic,
            );
          }
        });
    }
  };

  retryRefreshSessionWhenRefreshing({ callback, timeTotal = 0 }) {
    this.logCallTrack(
      {
        timeTotal,
      },
      primaryCallName,
      'retryRefreshSessionWhenRefreshing',
    );

    if (timeTotal > 3000) {
      Tips.info('长时间等待');

      if (isFunction(callback)) {
        this.logCallTrack(
          {
            timeTotal,
          },
          primaryCallName,
          'retryRefreshSessionWhenRefreshing',
          'callback',
        );

        callback();
      } else {
        this.logCallTrack(
          {},
          primaryCallName,
          'retryRefreshSessionWhenRefreshing',
          'callback',
          emptyLogic,
        );
      }

      return;
    }

    this.logCallTrack(
      100,
      primaryCallName,
      'retryRefreshSessionWhenRefreshing',
      'sleep',
    );

    sleep(100, () => {
      const sessionRefreshingAfterSleep = getSessionRefreshing();

      if (sessionRefreshingAfterSleep) {
        const timeTotalAdjust = timeTotal + 100;

        this.logCallTrack(
          {
            timeTotal: timeTotalAdjust,
          },
          primaryCallName,
          'retryRefreshSessionWhenRefreshing',
          'sleep',
          'retryRefreshSessionWhenRefreshing',
        );

        this.retryRefreshSessionWhenRefreshing({
          callback,
          timeTotal: timeTotalAdjust,
        });
      } else {
        if (isFunction(callback)) {
          this.logCallTrack(
            {},
            primaryCallName,
            'retryRefreshSessionWhenRefreshing',
            'sleep',
            'callback',
          );

          callback();
        } else {
          this.logCallTrack(
            {},
            primaryCallName,
            'retryRefreshSessionWhenRefreshing',
            'sleep',
            'callback',
            emptyLogic,
          );
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
    const that = this;

    that.logCallTrack({ data }, primaryCallName, 'signIn');

    const useLocation = getUseLocation();
    const locationMode = getLocationMode();

    if ((useLocation || false) && locationMode == locationModeCollection.auto) {
      logDebug(
        {
          useLocation,
          locationMode,
        },
        'use location and automatic location on sign in',
      );

      that.logCallTrace({}, primaryCallName, 'signIn', 'obtainLocation');

      that.obtainLocation({
        // eslint-disable-next-line no-unused-vars
        successCallback: ({ location, map }) => {
          const { latitude, longitude } = location || {
            latitude: 34.753_358_148_7,
            longitude: 113.631_391_547_9,
          };

          data.latitude = latitude || '';
          data.longitude = longitude || '';

          that.logCallTrace(
            {},
            primaryCallName,
            'signIn',
            'obtainLocation',
            'successCallback',
            'getSignInProcessDetection',
          );

          const signInProcessDetection = that.getSignInProcessDetection();

          if (!signInProcessDetection) {
            that.logCallTrace(
              {
                data: true,
              },
              primaryCallName,
              'signIn',
              'obtainLocation',
              'successCallback',
              'setSignInProcessDetection',
            );

            that.setSignInProcessDetection({
              data: true,
              callback: () => {
                that.logCallTrace(
                  {
                    data,
                  },
                  primaryCallName,
                  'signIn',
                  'obtainLocation',
                  'successCallback',
                  'setSignInProcessDetection',
                  'callback',
                  'signInCore',
                );

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
          that.logCallTrace(
            {},
            primaryCallName,
            'signIn',
            'obtainLocation',
            'failCallback',
            'getSignInProcessDetection',
          );

          const signInProcessDetection = that.getSignInProcessDetection();

          if (!signInProcessDetection) {
            that.logCallTrace(
              { data: true },
              primaryCallName,
              'signIn',
              'obtainLocation',
              'failCallback',
              'setSignInProcessDetection',
            );

            that.setSignInProcessDetection({
              data: true,
              callback: () => {
                that.logCallTrace(
                  { data },
                  primaryCallName,
                  'signIn',
                  'obtainLocation',
                  'failCallback',
                  'setSignInProcessDetection',
                  'callback',
                  'signInCore',
                );

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
        logDebug({ useLocation }, 'use location and nonautomatic location');

        that.logCallTrace(
          {
            data,
          },
          primaryCallName,
          'signIn',
          'signInWhenCheckProcessDetection',
        );

        that.signInWhenCheckProcessDetection({
          data,
          callback: (o, p) => {
            that.logCallTrace(
              {
                data: true,
              },
              primaryCallName,
              'signIn',
              'signInWhenCheckProcessDetection',
              'callback',
              'setSignInProcessDetection',
            );

            o.setSignInProcessDetection({
              data: true,
              callback: () => {
                that.logCallTrace(
                  {
                    data: p,
                  },
                  primaryCallName,
                  'signIn',
                  'signInWhenCheckProcessDetection',
                  'callback',
                  'setSignInProcessDetection',
                  'callback',
                  'signInCore',
                );

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
        that.logCallTrace(
          {},
          primaryCallName,
          'signIn',
          'getSignInProcessDetection',
        );

        const signInProcessDetection = that.getSignInProcessDetection();

        if (!signInProcessDetection) {
          that.logCallTrace(
            { data: true },
            primaryCallName,
            'signIn',
            'setSignInProcessDetection',
          );

          that.setSignInProcessDetection({
            data: true,
            callback: () => {
              that.logCallTrace(
                { data },
                primaryCallName,
                'signIn',
                'setSignInProcessDetection',
                'callback',
                'signInCore',
              );

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
    const that = this;

    this.logCallTrack(
      {
        data,
        timeTotal,
      },
      primaryCallName,
      'signInWhenCheckProcessDetection',
    );

    if (timeTotal > 3000) {
      if (isFunction(callback)) {
        this.logCallTrace(
          data,
          primaryCallName,
          'signInWhenCheckProcessDetection',
          'callback',
        );

        callback(that, data);
      } else {
        this.logCallTrace(
          {},
          primaryCallName,
          'signInWhenCheckProcessDetection',
          'callback',
          emptyLogic,
        );
      }

      return;
    }

    logData(`signInWhenCheckProcessDetection sleep ${timeTotal}`);

    that.logCallTrace(
      {},
      primaryCallName,
      'signInWhenCheckProcessDetection',
      'sleep',
    );

    sleep(100, () => {
      that.logCallTrace(
        {},
        primaryCallName,
        'signInWhenCheckProcessDetection',
        'sleep',
        'getSignInProcessDetection',
      );

      const signInProcessDetection = that.getSignInProcessDetection();

      if (signInProcessDetection) {
        const timeTotalAdjust = timeTotal + 100;

        that.logCallTrace(
          {
            data,
            timeTotal: timeTotalAdjust,
          },
          primaryCallName,
          'signInWhenCheckProcessDetection',
          'sleep',
          'signInWhenCheckProcessDetection',
        );

        that.signInWhenCheckProcessDetection({
          data,
          callback,
          timeTotal: timeTotalAdjust,
        });
      } else {
        if (isFunction(callback)) {
          that.logCallTrace(
            data,
            primaryCallName,
            'signInWhenCheckProcessDetection',
            'sleep',
            'callback',
          );

          callback(that, data);
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'signInWhenCheckProcessDetection',
            'sleep',
            'callback',
            emptyLogic,
          );
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
    const that = this;

    this.logCallTrack({ data }, primaryCallName, 'signInSilent');

    const useLocation = getUseLocation();
    const locationMode = getLocationMode();

    if ((useLocation || false) && locationMode == locationModeCollection.auto) {
      logDebug(
        {
          useLocation,
          locationMode,
        },
        'use location and automatic location on sign in silent',
      );

      that.logCallTrace({}, primaryCallName, 'signInSilent', 'obtainLocation');

      that.obtainLocation({
        // eslint-disable-next-line no-unused-vars
        successCallback: ({ location, map }) => {
          const { latitude, longitude } = location || {
            latitude: 34.753_358_148_7,
            longitude: 113.631_391_547_9,
          };

          data.latitude = latitude || '';
          data.longitude = longitude || '';

          that.logCallTrace(
            {},
            primaryCallName,
            'signInSilent',
            'obtainLocation',
            'successCallback',
            'getSignInProcessDetection',
          );

          const signInProcessDetection = that.getSignInProcessDetection();

          if (!signInProcessDetection) {
            that.logCallTrace(
              { data: true },
              primaryCallName,
              'signInSilent',
              'obtainLocation',
              'successCallback',
              'setSignInProcessDetection',
            );

            that.setSignInProcessDetection({
              data: true,
              callback: () => {
                that.logCallTrace(
                  { data },
                  primaryCallName,
                  'signInSilent',
                  'obtainLocation',
                  'successCallback',
                  'setSignInProcessDetection',
                  'callback',
                  'signInSilentCore',
                );

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
          that.logCallTrace(
            {},
            primaryCallName,
            'signInSilent',
            'obtainLocation',
            'failCallback',
            'getSignInProcessDetection',
          );

          const signInProcessDetection = that.getSignInProcessDetection();

          if (!signInProcessDetection) {
            that.logCallTrace(
              { data: true },
              primaryCallName,
              'signInSilent',
              'obtainLocation',
              'failCallback',
              'setSignInProcessDetection',
            );

            that.setSignInProcessDetection({
              data: true,
              callback: () => {
                that.logCallTrace(
                  { data },
                  primaryCallName,
                  'signInSilent',
                  'obtainLocation',
                  'failCallback',
                  'setSignInProcessDetection',
                  'callback',
                  'signInSilentCore',
                );

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
        logDebug({ useLocation }, 'use location and nonautomatic location');

        that.logCallTrace(
          { data },
          primaryCallName,
          'signInSilent',
          'signInSilentWhenCheckProcessDetection',
        );

        that.signInSilentWhenCheckProcessDetection({
          data,
          callback: (o, p) => {
            that.logCallTrace(
              { data: true },
              primaryCallName,
              'signInSilent',
              'signInSilentWhenCheckProcessDetection',
              'callback',
              'setSignInProcessDetection',
            );

            o.setSignInProcessDetection({
              data: true,
              callback: () => {
                that.logCallTrace(
                  { data: p },
                  primaryCallName,
                  'signInSilent',
                  'signInSilentWhenCheckProcessDetection',
                  'callback',
                  'setSignInProcessDetection',
                  'callback',
                  'signInSilentCore',
                );

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
        that.logCallTrace(
          {},
          primaryCallName,
          'signInSilent',
          'getSignInProcessDetection',
        );

        const signInProcessDetection = that.getSignInProcessDetection();

        if (!signInProcessDetection) {
          that.logCallTrace(
            { data: true },
            primaryCallName,
            'signInSilent',
            'setSignInProcessDetection',
          );

          that.setSignInProcessDetection({
            data: true,
            callback: () => {
              that.logCallTrace(
                { data },
                primaryCallName,
                'signInSilent',
                'setSignInProcessDetection',
                'callback',
                'signInSilentCore',
              );

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
    this.logCallTrack(
      { data, timeTotal },
      primaryCallName,
      'signInSilentWhenCheckProcessDetection',
    );

    const that = this;

    if (timeTotal > 3000) {
      if (isFunction(callback)) {
        that.logCallTrack(
          {},
          primaryCallName,
          'signInSilentWhenCheckProcessDetection',
          'callback',
        );

        callback(that, data);
      } else {
        that.logCallTrack(
          {},
          primaryCallName,
          'signInSilentWhenCheckProcessDetection',
          'callback',
          emptyLogic,
        );
      }

      return;
    }

    that.logCallTrack(
      {},
      primaryCallName,
      'signInSilentWhenCheckProcessDetection',
      'sleep',
    );

    sleep(100, () => {
      logDebug(`signInSilentWhenCheckProcessDetection sleep ${timeTotal}`);

      that.logCallTrack(
        {},
        primaryCallName,
        'signInSilentWhenCheckProcessDetection',
        'sleep',
        'getSignInProcessDetection',
      );

      const signInProcessDetection = that.getSignInProcessDetection();

      if (signInProcessDetection) {
        const timeTotalAdjust = timeTotal + 100;

        that.logCallTrack(
          { data, timeTotal: timeTotalAdjust },
          primaryCallName,
          'signInSilentWhenCheckProcessDetection',
          'sleep',
          'signInSilentWhenCheckProcessDetection',
        );

        that.signInSilentWhenCheckProcessDetection({
          data,
          callback,
          timeTotal: timeTotalAdjust,
        });
      } else {
        if (isFunction(callback)) {
          that.logCallTrack(
            {},
            primaryCallName,
            'signInSilentWhenCheckProcessDetection',
            'sleep',
            'callback',
          );

          callback(that, data);
        } else {
          that.logCallTrack(
            {},
            primaryCallName,
            'signInSilentWhenCheckProcessDetection',
            'sleep',
            'callback',
            emptyLogic,
          );
        }
      }
    });
  }

  dispatchSignIn = (data = {}) => {
    this.logCallTrack({ data }, primaryCallName, 'dispatchSignIn');

    this.logCallTrace(
      {},
      primaryCallName,
      'dispatchSignIn',
      'getSignInApiEffect',
    );

    const { type, payload, alias } = {
      type: '',
      payload: null,
      ...this.getSignInApiEffect(data),
      alias: getSignInAliasName(),
    };

    if (checkStringIsNullOrWhiteSpace(type)) {
      const info = 'signInApiEffect type disallow empty';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'dispatchSignIn',
        'error',
      );

      throw new Error(info);
    }

    const o = {
      type,
      payload,
      alias,
    };

    this.logCallTrace(o, primaryCallName, 'dispatchSignIn', 'dispatchApi');

    return this.dispatchApi(o);
  };

  getSignInApiEffect = (data) => {
    const info =
      'getSignInApiEffect need override, getSignInApiEffect must return a object like {type,payload,alias:""}';

    this.logCallTrack(
      data,
      primaryCallName,
      'getSignInApiEffect',
      'error',
      info,
    );

    throw new Error(info);
  };

  dispatchSignInSilent = (data = {}) => {
    this.logCallTrack({ data }, primaryCallName, 'dispatchSignInSilent');

    this.logCallTrace(
      {},
      primaryCallName,
      'dispatchSignInSilent',
      'getSignInApiEffect',
    );

    const { type, payload, alias } = {
      type: '',
      payload: null,
      ...this.getSignInSilentApiEffect(data),
      alias: getSignInSilentAliasName(),
    };

    if (checkStringIsNullOrWhiteSpace(type)) {
      const info = 'signInSilentApiEffect type disallow empty';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'dispatchSignInSilent',
        'error',
      );

      throw new Error(info);
    }

    const o = {
      type,
      payload,
      alias,
    };

    this.logCallTrace(
      o,
      primaryCallName,
      'dispatchSignInSilent',
      'dispatchApi',
    );

    return this.dispatchApi(o);
  };

  getSignInSilentApiEffect = (data) => {
    const info =
      'getSignInSilentApiEffect need override, getSignInSilentApiEffect must return a object like {type,payload,alias:""}';

    this.logCallTrack(
      data,
      primaryCallName,
      'getSignInSilentApiEffect',
      'error',
      info,
    );

    throw new Error(info);
  };

  getSignInApiData = () => {
    const info =
      'getSignInApiData need override, getSignInApiData must return a object';

    this.logCallTrack({}, primaryCallName, 'getSignInApiData', 'error', info);

    throw new Error(info);
  };

  signInCore({
    data,
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) {
    // Tips.loading('处理中');

    const that = this;

    that.logCallTrack({ data }, primaryCallName, 'signInCore');

    that.logCallTrace(data, primaryCallName, 'signInCore', 'dispatchSignIn');

    that
      .dispatchSignIn(data)
      .then((remoteData) => {
        Tips.loaded();

        const { dataSuccess, data: metaData } = remoteData;

        that.logCallTrace(
          { data: false },
          primaryCallName,
          'signInCore',
          'dispatchSignIn',
          'then',
          'setSignInProcessDetection',
        );

        that.setSignInProcessDetection({
          data: false,
        });

        if (dataSuccess) {
          that.logCallTrace(
            { metaData },
            primaryCallName,
            'signInCore',
            'dispatchSignIn',
            'then',
            'setSignInProcessDetection',
            'parseSessionEffectiveFromSignInApiDataWrapper',
          );

          const sessionEffective =
            that.parseSessionEffectiveFromSignInApiDataWrapper(metaData);

          if (!sessionEffective) {
            that.logCallTrace(
              {},
              primaryCallName,
              'signInCore',
              'dispatchSignIn',
              'then',
              'setSignInProcessDetection',
              'parseSessionEffectiveFromSignInApiDataWrapper',
              'refreshSession',
            );

            that.refreshSession({
              callback: () => {
                that.logCallTrace(
                  { data },
                  primaryCallName,
                  'signInCore',
                  'dispatchSignIn',
                  'then',
                  'setSignInProcessDetection',
                  'parseSessionEffectiveFromSignInApiDataWrapper',
                  'refreshSession',
                  'callback',
                  'signInCore',
                );

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

          that.logCallTrace(
            { metaData },
            primaryCallName,
            'signInCore',
            'dispatchSignIn',
            'then',
            'setSignInProcessDetection',
            'parseSignInResultFromSignInApiDataWrapper',
          );

          const signInResult =
            that.parseSignInResultFromSignInApiDataWrapper(metaData);

          that.logCallTrace(
            { signInResult },
            primaryCallName,
            'signInCore',
            'dispatchSignIn',
            'then',
            'setSignInProcessDetection',
            'parseSignInResultFromSignInApiDataWrapper',
            'setSignInResultOnSignIn',
          );

          that.setSignInResultOnSignIn({
            signInResult,
          });

          that.logCallTrace(
            { metaData },
            primaryCallName,
            'signInCore',
            'dispatchSignIn',
            'then',
            'setSignInProcessDetection',
            'parseSignInResultFromSignInApiDataWrapper',
            'parseTokenFromSignInApiData',
          );

          const token = that.parseTokenFromSignInApiData(metaData);

          that.logCallTrace(
            { token },
            primaryCallName,
            'signInCore',
            'dispatchSignIn',
            'then',
            'setSignInProcessDetection',
            'parseSignInResultFromSignInApiDataWrapper',
            'setTokenOnSignIn',
          );

          that.setTokenOnSignIn({
            token,
          });

          that.logCallTrace(
            { metaData },
            primaryCallName,
            'signInCore',
            'dispatchSignIn',
            'then',
            'setSignInProcessDetection',
            'parseSignInResultFromSignInApiDataWrapper',
            'parseOpenIdFromSignInApiData',
          );

          const openId = that.parseOpenIdFromSignInApiData(metaData);

          that.logCallTrace(
            { openId },
            primaryCallName,
            'signInCore',
            'dispatchSignIn',
            'then',
            'setSignInProcessDetection',
            'parseSignInResultFromSignInApiDataWrapper',
            'setOpenIdOnSignIn',
          );

          that.setOpenIdOnSignIn({
            openId,
          });

          removeCurrentCustomer();

          that.logCallTrace(
            {},
            primaryCallName,
            'signInCore',
            'dispatchSignIn',
            'then',
            'setSignInProcessDetection',
            'parseSignInResultFromSignInApiDataWrapper',
            'getVerifySignInResult',
          );

          const verifySignInResult = getVerifySignInResult();

          if (toString(signInResult) === toString(verifySignInResult.success)) {
            that.logCallTrace(
              {},
              primaryCallName,
              'signInCore',
              'dispatchSignIn',
              'then',
              'setSignInProcessDetection',
              'parseSignInResultFromSignInApiDataWrapper',
              'getCustomer',
            );

            that.getCustomer({
              successCallback: () => {
                if (isFunction(successCallback)) {
                  that.logCallTrace(
                    metaData,
                    primaryCallName,
                    'signInCore',
                    'dispatchSignIn',
                    'then',
                    'setSignInProcessDetection',
                    'parseSignInResultFromSignInApiDataWrapper',
                    'getCustomer',
                    'successCallback',
                  );

                  successCallback(metaData);
                } else {
                  that.logCallTrace(
                    {},
                    primaryCallName,
                    'signInCore',
                    'dispatchSignIn',
                    'then',
                    'setSignInProcessDetection',
                    'parseSignInResultFromSignInApiDataWrapper',
                    'getCustomer',
                    'successCallback',
                    emptyLogic,
                  );
                }

                that.logCallTrace(
                  metaData,
                  primaryCallName,
                  'signInCore',
                  'dispatchSignIn',
                  'then',
                  'setSignInProcessDetection',
                  'parseSignInResultFromSignInApiDataWrapper',
                  'getCustomer',
                  'successCallback',
                  'doAfterGetCustomerOnSignIn',
                );

                that.doAfterGetCustomerOnSignIn(metaData);

                that.logCallTrace(
                  metaData,
                  primaryCallName,
                  'signInCore',
                  'dispatchSignIn',
                  'then',
                  'setSignInProcessDetection',
                  'parseSignInResultFromSignInApiDataWrapper',
                  'getCustomer',
                  'successCallback',
                  'doAfterSignInSuccess',
                );

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
            text: '登录失败',
          });

          that.logCallTrace(
            {},
            primaryCallName,
            'signInCore',
            'dispatchSignIn',
            'then',
            'doWhenSignInFailWrapper',
          );

          that.doWhenSignInFailWrapper();

          if (isFunction(failCallback)) {
            that.logCallTrace(
              {},
              primaryCallName,
              'signInCore',
              'dispatchSignIn',
              'then',
              'failCallback',
            );

            failCallback();
          } else {
            that.logCallTrace(
              {},
              primaryCallName,
              'signInCore',
              'dispatchSignIn',
              'then',
              'failCallback',
              emptyLogic,
            );
          }

          if (isFunction(completeCallback)) {
            that.logCallTrace(
              {},
              primaryCallName,
              'signInCore',
              'dispatchSignIn',
              'then',
              'completeCallback',
            );

            completeCallback();
          } else {
            that.logCallTrace(
              {},
              primaryCallName,
              'signInCore',
              'dispatchSignIn',
              'then',
              'completeCallback',
              emptyLogic,
            );
          }
        }

        return remoteData;
      })
      .catch((error) => {
        that.logCallTrace(
          { error },
          primaryCallName,
          'signInCore',
          'dispatchSignIn',
          'catch',
        );

        logException(error);
      });
  }

  signInSilentCore({
    data,
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) {
    this.logCallTrack({ data }, primaryCallName, 'signInSilentCore');

    this.logCallTrace(
      {},
      primaryCallName,
      'signInSilentCore',
      'getEnvironment',
    );

    const environment = this.getEnvironment();

    const noAdaptationMessage = `framework with env [${environment}] has no adaptation, ignore obtainLocation, only execute failCallback`;

    switch (environment) {
      case environmentCollection.WEAPP: {
        break;
      }

      case environmentCollection.ALIPAY: {
        logWarn(noAdaptationMessage);

        if (isFunction(failCallback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'signInSilentCore',
            environmentCollection.ALIPAY,
            'failCallback',
          );

          failCallback();
        } else {
          this.logCallTrace(
            {},
            primaryCallName,
            'signInSilentCore',
            environmentCollection.ALIPAY,
            'failCallback',
            emptyLogic,
          );
        }

        if (isFunction(completeCallback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'signInSilentCore',
            environmentCollection.ALIPAY,
            'completeCallback',
          );

          completeCallback();
        } else {
          this.logCallTrace(
            {},
            primaryCallName,
            'signInSilentCore',
            environmentCollection.ALIPAY,
            'completeCallback',
            emptyLogic,
          );
        }

        return;
      }

      case environmentCollection.SWAN: {
        logWarn(noAdaptationMessage);

        if (isFunction(failCallback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'signInSilentCore',
            environmentCollection.SWAN,
            'failCallback',
          );

          failCallback();
        } else {
          this.logCallTrace(
            {},
            primaryCallName,
            'signInSilentCore',
            environmentCollection.SWAN,
            'failCallback',
            emptyLogic,
          );
        }

        if (isFunction(completeCallback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'signInSilentCore',
            environmentCollection.ALIPAY,
            'completeCallback',
          );

          completeCallback();
        } else {
          this.logCallTrace(
            {},
            primaryCallName,
            'signInSilentCore',
            environmentCollection.SWAN,
            'completeCallback',
            emptyLogic,
          );
        }

        return;
      }

      case environmentCollection.WEB: {
        logWarn(noAdaptationMessage);

        if (isFunction(failCallback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'signInSilentCore',
            environmentCollection.WEB,
            'failCallback',
          );

          failCallback();
        } else {
          this.logCallTrace(
            {},
            primaryCallName,
            'signInSilentCore',
            environmentCollection.WEB,
            'failCallback',
            emptyLogic,
          );
        }

        if (isFunction(completeCallback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'signInSilentCore',
            environmentCollection.WEB,
            'completeCallback',
          );

          completeCallback();
        } else {
          this.logCallTrace(
            {},
            primaryCallName,
            'signInSilentCore',
            environmentCollection.WEB,
            'completeCallback',
            emptyLogic,
          );
        }

        return;
      }

      default: {
        logWarn(noAdaptationMessage);

        if (isFunction(failCallback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'signInSilentCore',
            'case none',
            'failCallback',
          );

          failCallback();
        } else {
          this.logCallTrace(
            {},
            primaryCallName,
            'signInSilentCore',
            'case none',
            'failCallback',
            emptyLogic,
          );
        }

        if (isFunction(completeCallback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'signInSilentCore',
            'case none',
            'completeCallback',
          );

          completeCallback();
        } else {
          this.logCallTrace(
            {},
            primaryCallName,
            'signInSilentCore',
            'case none',
            'completeCallback',
            emptyLogic,
          );
        }

        return;
      }
    }

    // Tips.loading('处理中');

    const tryRefreshSessionKey = 'tryRefreshSessionKeyTimes';

    let tryRefreshSession = getCache({ key: tryRefreshSessionKey });

    if (isNumber(tryRefreshSession)) {
      // 最多重试 10 次
      if (tryRefreshSession > 10) {
        showErrorMessage({
          text: 'signInSilentCore 重试超过最大限制,请检查 refreshSession 接口返回数据',
        });

        return;
      }

      tryRefreshSession += 1;

      setCache({
        key: tryRefreshSessionKey,
        value: tryRefreshSession,
      });
    } else {
      tryRefreshSession = 1;

      setCache({
        key: tryRefreshSessionKey,
        value: tryRefreshSession,
      });
    }

    const that = this;

    that.logCallTrace(
      data,
      primaryCallName,
      'signInSilentCore',
      'dispatchSignInSilent',
    );

    that
      .dispatchSignInSilent(data)
      .then((remoteData) => {
        Tips.loaded();

        const { dataSuccess, data: metaData } = remoteData;

        that.logCallTrace(
          { data: false },
          primaryCallName,
          'signInSilentCore',
          'dispatchSignInSilent',
          'then',
          'setSignInProcessDetection',
        );

        that.setSignInProcessDetection({
          data: false,
        });

        if (dataSuccess) {
          that.logCallTrace(
            metaData,
            primaryCallName,
            'signInSilentCore',
            'dispatchSignInSilent',
            'then',
            'parseSessionEffectiveFromSignInSilentApiDataWrapper',
          );

          const sessionEffective =
            that.parseSessionEffectiveFromSignInSilentApiDataWrapper(metaData);

          if (!sessionEffective) {
            that.logCallTrace(
              {},
              primaryCallName,
              'signInSilentCore',
              'dispatchSignInSilent',
              'then',
              'refreshSession',
            );

            that.refreshSession({
              callback: () => {
                that.logCallTrace(
                  { data },
                  primaryCallName,
                  'signInSilentCore',
                  'dispatchSignInSilent',
                  'then',
                  'refreshSession',
                  'callback',
                  'signInSilentCore',
                );

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

          that.logCallTrace(
            metaData,
            primaryCallName,
            'signInSilentCore',
            'dispatchSignInSilent',
            'then',
            'parseSignInResultFromSignInSilentApiDataWrapper',
          );

          const signInResult =
            that.parseSignInResultFromSignInSilentApiDataWrapper(metaData);

          that.logCallTrace(
            { signInResult },
            primaryCallName,
            'signInSilentCore',
            'dispatchSignInSilent',
            'then',
            'setSignInResultOnSignInSilent',
          );

          that.setSignInResultOnSignInSilent({
            signInResult,
          });

          that.logCallTrace(
            metaData,
            primaryCallName,
            'signInSilentCore',
            'dispatchSignInSilent',
            'then',
            'parseTokenFromSignInSilentApiData',
          );

          const token = that.parseTokenFromSignInSilentApiData(metaData);

          that.logCallTrace(
            { token },
            primaryCallName,
            'signInSilentCore',
            'dispatchSignInSilent',
            'then',
            'setTokenOnSignInSilent',
          );

          that.setTokenOnSignInSilent({
            token,
          });

          that.logCallTrace(
            metaData,
            primaryCallName,
            'signInSilentCore',
            'dispatchSignInSilent',
            'then',
            'parseOpenIdFromSignInSilentApiData',
          );

          const openId = that.parseOpenIdFromSignInSilentApiData(metaData);

          that.logCallTrace(
            { openId },
            primaryCallName,
            'signInSilentCore',
            'dispatchSignInSilent',
            'then',
            'setOpenIdOnSignInSilent',
          );

          that.setOpenIdOnSignInSilent({
            openId,
          });

          removeCurrentCustomer();

          const verifySignInResult = getVerifySignInResult();

          if (toString(signInResult) === toString(verifySignInResult.success)) {
            that.logCallTrace(
              {},
              primaryCallName,
              'signInSilentCore',
              'dispatchSignInSilent',
              'then',
              'getCustomer',
            );

            that.getCustomer({
              successCallback: () => {
                if (isFunction(successCallback)) {
                  that.logCallTrace(
                    { metaData },
                    primaryCallName,
                    'signInSilentCore',
                    'dispatchSignInSilent',
                    'then',
                    'getCustomer',
                    'successCallback',
                  );

                  successCallback(metaData);
                } else {
                  that.logCallTrace(
                    {},
                    primaryCallName,
                    'signInSilentCore',
                    'dispatchSignInSilent',
                    'then',
                    'getCustomer',
                    'successCallback',
                    emptyLogic,
                  );
                }

                that.logCallTrace(
                  { metaData },
                  primaryCallName,
                  'signInSilentCore',
                  'dispatchSignInSilent',
                  'then',
                  'getCustomer',
                  'successCallback',
                  'doAfterGetCustomerOnSignInSilent',
                );

                that.doAfterGetCustomerOnSignInSilent(metaData);

                that.logCallTrace(
                  { metaData },
                  primaryCallName,
                  'signInSilentCore',
                  'dispatchSignInSilent',
                  'then',
                  'getCustomer',
                  'successCallback',
                  'doAfterSignInSilentSuccess',
                );

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

          logObject({
            message: '静默登录失败',
          });

          if (isFunction(failCallback)) {
            that.logCallTrace(
              {},
              primaryCallName,
              'signInSilentCore',
              'dispatchSignInSilent',
              'then',
              'failCallback',
            );

            failCallback();
          } else {
            that.logCallTrace(
              {},
              primaryCallName,
              'signInSilentCore',
              'dispatchSignInSilent',
              'then',
              'failCallback',
              emptyLogic,
            );
          }

          if (isFunction(completeCallback)) {
            that.logCallTrace(
              {},
              primaryCallName,
              'signInSilentCore',
              'dispatchSignInSilent',
              'then',
              'completeCallback',
            );

            completeCallback();
          } else {
            that.logCallTrace(
              {},
              primaryCallName,
              'signInSilentCore',
              'dispatchSignInSilent',
              'then',
              'completeCallback',
              emptyLogic,
            );
          }

          that.logCallTrace(
            {},
            primaryCallName,
            'signInSilentCore',
            'dispatchSignInSilent',
            'then',
            'doWhenSignInSilentFailWrapper',
          );

          that.doWhenSignInSilentFailWrapper();
        }

        return remoteData;
      })
      .catch((error) => {
        that.logCallTrace(
          {
            error,
            dispatchSignInSilentParams: data,
          },
          primaryCallName,
          'signInSilentCore',
          'dispatchSignInSilent',
          'catch',
        );

        logException(error);
      });
  }

  parseSessionEffectiveFromSignInApiDataWrapper = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseSessionEffectiveFromSignInApiDataWrapper',
    );

    this.logCallTrace(
      remoteData,
      primaryCallName,
      'parseSessionEffectiveFromSignInApiDataWrapper',
      'parseSessionEffectiveFromSignInApiData',
    );

    return this.parseSessionEffectiveFromSignInApiData(remoteData);
  };

  parseSessionEffectiveFromSignInSilentApiDataWrapper = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseSessionEffectiveFromSignInSilentApiDataWrapper',
    );

    this.logCallTrace(
      remoteData,
      primaryCallName,
      'parseSessionEffectiveFromSignInSilentApiDataWrapper',
      'parseSessionEffectiveFromSignInSilentApiData',
    );

    return this.parseSessionEffectiveFromSignInSilentApiData(remoteData);
  };

  parseSessionEffectiveFromSignInApiData = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseSessionEffectiveFromSignInApiData',
    );

    logConfig(
      'built-in parseSessionEffectiveFromSignInApiData is "const { sessionEffective } = remoteData",if you need custom logic,you need override it: parseSessionEffectiveFromSignInApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!checkInCollection(Object.keys(remoteData || {}), 'sessionEffective')) {
      logException(
        remoteData,
        'params remoteData not exist key sessionEffective in parseSessionEffectiveFromSignInApiData',
      );

      return false;
    }

    const { sessionEffective } = {
      sessionEffective: true,
      ...remoteData,
    };

    return sessionEffective || false;
  };

  parseSessionEffectiveFromSignInSilentApiData = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseSessionEffectiveFromSignInSilentApiData',
    );

    logConfig(
      'built-in parseSessionEffectiveFromSignInSilentApiData is "const { sessionEffective } = remoteData",if you need custom logic,you need override it: parseSessionEffectiveFromSignInSilentApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!checkInCollection(Object.keys(remoteData || {}), 'sessionEffective')) {
      logException(
        remoteData,
        'params remoteData not exist key sessionEffective in parseSessionEffectiveFromSignInSilentApiData',
      );

      return false;
    }

    const { sessionEffective } = {
      sessionEffective: true,
      ...remoteData,
    };

    return sessionEffective || false;
  };

  parseSignInResultFromSignInApiDataWrapper = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseSignInResultFromSignInApiDataWrapper',
    );

    this.logCallTrace(
      remoteData,
      primaryCallName,
      'parseSignInResultFromSignInApiDataWrapper',
      'parseSignInResultFromSignInApiData',
    );

    return this.parseSignInResultFromSignInApiData(remoteData);
  };

  parseSignInResultFromSignInSilentApiDataWrapper = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseSignInResultFromSignInSilentApiDataWrapper',
    );

    this.logCallTrace(
      remoteData,
      primaryCallName,
      'parseSignInResultFromSignInSilentApiDataWrapper',
      'parseSignInResultFromSignInSilentApiData',
    );

    return this.parseSignInResultFromSignInSilentApiData(remoteData);
  };

  parseSignInResultFromSignInApiData = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseSignInResultFromSignInApiData',
    );

    logConfig(
      'built-in parseSignInResultFromSignInApiData is "const { signInResult } = remoteData",if you need custom logic,you need override it: parseSignInResultFromSignInApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    const verifySignInResult = getVerifySignInResult();

    if (!checkInCollection(Object.keys(remoteData || {}), 'signInResult')) {
      logException(
        remoteData,
        'params remoteData not exist key signInResult in parseSignInResultFromSignInApiData',
      );
    }

    const { signInResult } = {
      signInResult: verifySignInResult.fail,
      ...remoteData,
    };

    return signInResult || verifySignInResult.fail;
  };

  parseSignInResultFromSignInSilentApiData = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseSignInResultFromSignInSilentApiData',
    );

    logConfig(
      'built-in parseSignInResultFromSignInSilentApiData is "const { signInResult } = remoteData",if you need custom logic,you need override it: parseSignInResultFromSignInSilentApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    const verifySignInResult = getVerifySignInResult();

    if (!checkInCollection(Object.keys(remoteData || {}), 'signInResult')) {
      logException(
        remoteData,
        'params remoteData not exist key signInResult in parseSignInResultFromSignInSilentApiData',
      );
    }

    const { signInResult } = {
      signInResult: verifySignInResult.fail,
      ...remoteData,
    };

    return signInResult || verifySignInResult.fail;
  };

  setSignInResultOnSignIn = ({ signInResult }) => {
    this.logCallTrack(
      { signInResult },
      primaryCallName,
      'setSignInResultOnSignIn',
    );

    logDebug(`signInResult: ${signInResult}`);

    const v = toNumber(signInResult);
    const verifySignInResult = getVerifySignInResult();

    if (
      !checkInCollection(
        [
          toNumber(verifySignInResult.unknown),
          toNumber(verifySignInResult.fail),
          toNumber(verifySignInResult.success),
        ],
        v,
      )
    ) {
      const info = `signInResult not allow ${signInResult}.`;

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'setSignInResultOnSignIn',
        'error',
      );

      throw new Error(info);
    }

    this.logCallTrace(
      { data: v },
      primaryCallName,
      'setSignInResultOnSignIn',
      'setSignInResult',
    );

    this.setSignInResult({ data: v });
  };

  setSignInResultOnSignInSilent = ({ signInResult }) => {
    this.logCallTrack(
      { signInResult },
      primaryCallName,
      'setSignInResultOnSignInSilent',
    );

    const v = toNumber(signInResult);

    const verifySignInResult = getVerifySignInResult();

    if (
      !checkInCollection(
        [
          toNumber(verifySignInResult.unknown),
          toNumber(verifySignInResult.fail),
          toNumber(verifySignInResult.success),
        ],
        v,
      )
    ) {
      const info = `signInResult not allow ${signInResult}.`;

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'setSignInResultOnSignInSilent',
        'error',
      );

      throw new Error(info);
    }

    this.logCallTrace(
      { data: v },
      primaryCallName,
      'setSignInResultOnSignInSilent',
      'setSignInResult',
    );

    this.setSignInResult({ data: v });
  };

  parseTokenFromSignInApiData = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseTokenFromSignInApiData',
    );

    logConfig(
      'built-in parseTokenFromSignInApiData is "const { token } = remoteData",if you need custom logic,you need override it: parseTokenFromSignInApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!checkInCollection(Object.keys(remoteData || {}), 'token')) {
      logException(
        remoteData,
        'params remoteData not exist key token in parseTokenFromSignInApiData',
      );
    }

    const { token } = {
      token: '',
      ...remoteData,
    };

    return token || '';
  };

  parseTokenFromSignInSilentApiData = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseTokenFromSignInSilentApiData',
    );

    logConfig(
      'built-in parseTokenFromSignInSilentApiData is "const { token } = remoteData",if you need custom logic,you need override it: parseTokenFromSignInSilentApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!checkInCollection(Object.keys(remoteData || {}), 'token')) {
      logException(
        remoteData,
        'params remoteData not exist key token in parseTokenFromSignInSilentApiData',
      );
    }

    const { token } = {
      token: '',
      ...remoteData,
    };

    return token || '';
  };

  setTokenOnSignIn = ({ token }) => {
    this.logCallTrack({ token }, primaryCallName, 'setTokenOnSignIn');

    if (!isString(token || '')) {
      const info = 'token must be string';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'setTokenOnSignIn',
        'error',
      );

      throw new Error(info);
    }

    setToken(token || getTokenAnonymous());
  };

  /**
   * 将解析的token进行本次存储, 该方法不应重载
   * @param {*} remoteData
   */
  setTokenOnSignInSilent = ({ token }) => {
    this.logCallTrack({ token }, primaryCallName, 'setTokenOnSignInSilent');

    if (!isString(token || '')) {
      const info = 'token must be string';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'setTokenOnSignInSilent',
        'error',
      );

      throw new Error(info);
    }

    setToken(token || getTokenAnonymous());
  };

  parseOpenIdFromSignInApiData = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseOpenIdFromSignInApiData',
    );

    logConfig(
      'built-in parseOpenIdFromSignInApiData is "const { openId } = remoteData",if you need custom logic,you need override it: parseOpenIdFromSignInApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!checkInCollection(Object.keys(remoteData || {}), 'openId')) {
      logException(
        remoteData,
        'params remoteData not exist key openId in parseOpenIdFromSignInApiData',
      );
    }

    const { openId } = {
      openId: '',
      ...remoteData,
    };

    return openId || '';
  };

  parseOpenIdFromSignInSilentApiData = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseOpenIdFromSignInSilentApiData',
    );

    logConfig(
      'built-in parseOpenIdFromSignInSilentApiData is "const { openId } = remoteData",if you need custom logic,you need override it: parseOpenIdFromSignInSilentApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!checkInCollection(Object.keys(remoteData || {}), 'openId')) {
      logException(
        remoteData,
        'params remoteData not exist key openId in parseOpenIdFromSignInSilentApiData',
      );
    }

    const { openId } = {
      openId: '',
      ...remoteData,
    };

    return openId || '';
  };

  setOpenIdOnSignIn = ({ openId }) => {
    this.logCallTrack({ openId }, primaryCallName, 'setOpenIdOnSignIn');

    if (!isString(openId || '')) {
      const info = 'openId must be string';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'setOpenIdOnSignIn',
        'error',
      );

      throw new Error(info);
    }

    setOpenId(openId || '');
  };

  /**
   * 将解析的openId进行本次存储, 该方法不应重载
   * @param {*} remoteData
   */
  setOpenIdOnSignInSilent = ({ openId }) => {
    this.logCallTrack({ openId }, primaryCallName, 'setOpenIdOnSignInSilent');

    if (!isString(openId || '')) {
      const info = 'openId must be string';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'setOpenIdOnSignInSilent',
        'error',
      );

      throw new Error(info);
    }

    setOpenId(openId || '');
  };

  /**
   * 账户登录成功后的业务逻辑, 根据需要进行重载
   * @param {*} remoteData
   */
  // eslint-disable-next-line no-unused-vars
  doAfterSignInSuccess = (data) => {
    this.logCallTrack(data, primaryCallName, 'doAfterSignInSuccess');

    logConfig(
      'doAfterSignInSuccess do nothing,if you need,you can override it: doAfterSignInSuccess = (data) => {}',
    );
  };

  /**
   * 静默登录成功后的业务逻辑, 根据需要进行重载
   * @param {*} remoteData
   */
  // eslint-disable-next-line no-unused-vars
  doAfterSignInSilentSuccess = (data) => {
    this.logCallTrack(data, primaryCallName, 'doAfterSignInSilentSuccess');

    logConfig(
      'doAfterSignInSilentSuccess do nothing,if you need,you can override it: doAfterSignInSilentSuccess = (data) => {}',
    );
  };

  /**
   * 静默登录失败时的业务逻辑, 需要重载
   */
  doWhenSignInFailWrapper = () => {
    this.logCallTrack({}, primaryCallName, 'doWhenSignInFailWrapper');

    this.logCallTrace(
      {},
      primaryCallName,
      'doWhenSignInFailWrapper',
      'doWhenSignInFail',
    );

    this.doWhenSignInFail();
  };

  /**
   * 账户登录失败时的业务逻辑, 需要重载
   */
  doWhenSignInFail = () => {
    this.logCallTrack({}, primaryCallName, 'doWhenSignInFail');

    logConfig(
      'doWhenSignInFail do nothing,if you need,you can override it: doWhenSignInFail = () => {}',
    );
  };

  doWhenSignInSilentFailWrapper = () => {
    this.logCallTrack({}, primaryCallName, 'doWhenSignInSilentFailWrapper');

    this.logCallTrace(
      {},
      primaryCallName,
      'doWhenSignInSilentFailWrapper',
      'doWhenSignInSilentFail',
    );

    this.doWhenSignInSilentFail();

    if (getNavigationToSignInWhenSignInSilentFail()) {
      const signInPath = getSignInPath();

      if (checkStringIsNullOrWhiteSpace(signInPath)) {
        const info = '缺少登录页面路径配置';

        this.logCallTrace(
          { error: info },
          primaryCallName,
          'doWhenSignInSilentFailWrapper',
          'doWhenSignInSilentFail',
          'error',
        );

        throw new Error(info);
      }

      redirectTo(signInPath);
    }
  };

  /**
   * 静默登录失败时的业务逻辑, 需要重载
   */
  doWhenSignInSilentFail = () => {
    this.logCallTrack({}, primaryCallName, 'doWhenSignInSilentFail');

    logConfig(
      'doWhenSignInSilentFail do nothing,if you need,you can override it: doWhenSignInSilentFail = () => {}',
    );
  };

  dispatchGetCustomerWrapper = (data = {}) => {
    this.logCallTrack(data, primaryCallName, 'dispatchGetCustomerWrapper');

    this.logCallTrace(
      data,
      primaryCallName,
      'dispatchGetCustomerWrapper',
      'dispatchGetCustomer',
    );

    return this.dispatchGetCustomer(data);
  };

  dispatchGetCustomer = (data = {}) => {
    this.logCallTrack({ data }, primaryCallName, 'dispatchGetCustomer');

    this.logCallTrace(
      {},
      primaryCallName,
      'dispatchGetCustomer',
      'getGetCustomerApiEffect',
    );

    const { type, payload, alias } = {
      type: '',
      payload: null,
      ...this.getGetCustomerApiEffect(data),
      alias: getGetCustomerAliasName(),
    };

    if (checkStringIsNullOrWhiteSpace(type)) {
      const info = 'getGetCustomerApiEffect type disallow empty';

      this.logCallTrace(
        {
          error: info,
          type,
          payload,
          alias,
        },
        primaryCallName,
        'dispatchGetCustomer',
        'error',
      );

      throw new Error(info);
    }

    const o = {
      type,
      payload,
      alias,
    };

    this.logCallTrace(o, primaryCallName, 'dispatchGetCustomer', 'dispatchApi');

    return this.dispatchApi(o);
  };

  getGetCustomerApiEffect = (data) => {
    logConfig(
      'built-in getGetCustomerApiEffect is a simulation,if you need actual business,you need override it: getGetCustomerApiEffect = (data) => {} and return a object like "return {type: \'schedulingControl/getCustomer\',payload: data,}"',
    );

    return {
      type: 'schedulingControl/getCustomer',
      payload: data,
    };
  };

  getCustomer = ({
    data = {},
    force: forceValue = false,
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    this.logCallTrack({ data, force }, primaryCallName, 'getCustomer');

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

    const that = this;

    if (force) {
      logDebug(
        'info getCustomer from local cache fail or force api request, shift to get from api dispatch',
      );

      that.logCallTrace(
        data,
        primaryCallName,
        'getCustomer',
        'dispatchGetCustomerWrapper',
      );

      that
        .dispatchGetCustomerWrapper(data || {})
        .then((remoteData) => {
          const { dataSuccess, data: metaData } = remoteData;
          logDebug(`dataSuccess is ${dataSuccess}`);

          if (dataSuccess) {
            setCurrentCustomer(metaData);

            if (isFunction(successCallback)) {
              that.logCallTrace(
                metaData,
                primaryCallName,
                'getCustomer',
                'dispatchGetCustomerWrapper',
                'then',
                'successCallback',
              );

              successCallback(metaData);
            } else {
              that.logCallTrace(
                {},
                primaryCallName,
                'getCustomer',
                'dispatchGetCustomerWrapper',
                'then',
                'successCallback',
                emptyLogic,
              );
            }

            if (isFunction(completeCallback)) {
              that.logCallTrace(
                metaData,
                primaryCallName,
                'getCustomer',
                'dispatchGetCustomerWrapper',
                'then',
                'completeCallback',
              );

              completeCallback(metaData);
            } else {
              that.logCallTrace(
                {},
                primaryCallName,
                'getCustomer',
                'dispatchGetCustomerWrapper',
                'then',
                'completeCallback',
                emptyLogic,
              );
            }
          } else {
            if (isFunction(failCallback)) {
              that.logCallTrace(
                metaData,
                primaryCallName,
                'getCustomer',
                'dispatchGetCustomerWrapper',
                'then',
                'failCallback',
              );

              failCallback();
            } else {
              that.logCallTrace(
                {},
                primaryCallName,
                'getCustomer',
                'dispatchGetCustomerWrapper',
                'then',
                'failCallback',
                emptyLogic,
              );
            }

            if (isFunction(completeCallback)) {
              that.logCallTrace(
                metaData,
                primaryCallName,
                'getCustomer',
                'dispatchGetCustomerWrapper',
                'then',
                'completeCallback',
              );

              completeCallback(metaData);
            } else {
              that.logCallTrace(
                {},
                primaryCallName,
                'getCustomer',
                'dispatchGetCustomerWrapper',
                'then',
                'completeCallback',
                emptyLogic,
              );
            }
          }

          return remoteData;
        })
        .catch((error) => {
          that.logCallTrace(
            { error },
            primaryCallName,
            'getCustomer',
            'dispatchGetCustomerWrapper',
            'catch',
          );

          logInfo(
            error,
            'info getCustomer error,doAfterRegisterWithWeChat and callback will do not execute',
          );

          logException(error);

          if (isFunction(failCallback)) {
            that.logCallTrace(
              {},
              primaryCallName,
              'getCustomer',
              'dispatchGetCustomerWrapper',
              'catch',
              'failCallback',
            );

            failCallback();
          } else {
            that.logCallTrace(
              {},
              primaryCallName,
              'getCustomer',
              'dispatchGetCustomerWrapper',
              'catch',
              'failCallback',
              emptyLogic,
            );
          }

          if (isFunction(completeCallback)) {
            that.logCallTrace(
              {},
              primaryCallName,
              'getCustomer',
              'dispatchGetCustomerWrapper',
              'catch',
              'completeCallback',
            );

            completeCallback();
          } else {
            that.logCallTrace(
              {},
              primaryCallName,
              'getCustomer',
              'dispatchGetCustomerWrapper',
              'catch',
              'completeCallback',
              emptyLogic,
            );
          }
        });
    } else {
      logDebug('getCustomer from local cache success');

      if (isFunction(successCallback)) {
        that.logCallTrace(
          currentCustomer,
          primaryCallName,
          'getCustomer',
          'successCallback',
        );

        successCallback(currentCustomer);
      } else {
        that.logCallTrace(
          {},
          primaryCallName,
          'getCustomer',
          'successCallback',
          emptyLogic,
        );
      }

      if (isFunction(completeCallback)) {
        that.logCallTrace(
          currentCustomer,
          primaryCallName,
          'getCustomer',
          'completeCallback',
        );

        completeCallback(currentCustomer);
      } else {
        that.logCallTrace(
          {},
          primaryCallName,
          'getCustomer',
          'completeCallback',
          emptyLogic,
        );
      }
    }
  };

  doAfterGetCustomerOnSignInSilent = (data) => {
    this.logCallTrack(
      data,
      primaryCallName,
      'doAfterGetCustomerOnSignInSilent',
    );

    logConfig(
      'doAfterGetCustomerOnSignInSilent do nothing,if you need,you can override it: doAfterGetCustomerOnSignInSilent = (data) => {}',
    );
  };

  doAfterGetCustomerOnSignIn = (data) => {
    this.logCallTrack(data, primaryCallName, 'doAfterGetCustomerOnSignIn');

    logConfig(
      'doAfterGetCustomerOnSignIn do nothing,if you need,you can override it: doAfterGetCustomerOnSignIn = (data) => {}',
    );
  };

  parseSessionEffectiveFromExchangePhoneApiDataWrapper = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseSessionEffectiveFromExchangePhoneApiDataWrapper',
    );

    this.logCallTrace(
      remoteData,
      primaryCallName,
      'parseSessionEffectiveFromExchangePhoneApiDataWrapper',
      'parseSessionEffectiveFromExchangePhoneApiData',
    );

    return this.parseSessionEffectiveFromExchangePhoneApiData(remoteData);
  };

  parseSessionEffectiveFromExchangePhoneApiData = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseSessionEffectiveFromExchangePhoneApiData',
    );

    logConfig(
      'built-in parseSessionEffectiveFromExchangePhoneApiData is "const { sessionEffective } = remoteData",if you need custom logic,you need override it: parseSessionEffectiveFromExchangePhoneApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!checkInCollection(Object.keys(remoteData || {}), 'sessionEffective')) {
      const info =
        'params remoteData not exist key sessionEffective in parseSessionEffectiveFromExchangePhoneApiData';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'parseSessionEffectiveFromExchangePhoneApiData',
        'error',
      );

      logException(remoteData, info);

      throw new Error(info);
    }

    const { sessionEffective } = {
      sessionEffective: true,
      ...remoteData,
    };

    return sessionEffective || false;
  };

  dispatchExchangePhone = (data = {}) => {
    this.logCallTrack(data, primaryCallName, 'dispatchExchangePhone');

    logConfig(
      'built-in dispatchExchangePhone is a simulation,if you need actual business,you need override it: dispatchExchangePhone = (data) => {} and return a promise dispatchApi like "return this.dispatchApi({type: \'schedulingControl/exchangePhone\',payload: data,})"',
    );

    const o = {
      type: 'schedulingControl/exchangePhone',
      payload: data,
    };

    this.logCallTrace(
      o,
      primaryCallName,
      'dispatchExchangePhone',
      'dispatchApi',
    );

    return this.dispatchApi(o);
  };

  exchangePhone = ({ data, callback = null }) => {
    const that = this;

    this.logCallTrack({ data }, primaryCallName, 'exchangePhone');

    that.logCallTrace({}, primaryCallName, 'exchangePhone', 'checkSession');

    that.checkSession(() => {
      that.logCallTrace(
        data,
        primaryCallName,
        'exchangePhone',
        'checkSession',
        'callback',
        'dispatchExchangePhone',
      );

      that
        .dispatchExchangePhone(data)
        .then((remoteData) => {
          const { dataSuccess, data: metaData } = remoteData;

          logDebug(`dataSuccess is ${dataSuccess}`);

          if (dataSuccess) {
            that.logCallTrace(
              metaData,
              primaryCallName,
              'exchangePhone',
              'checkSession',
              'callback',
              'dispatchExchangePhone',
              'then',
              'parseSessionEffectiveFromSignInSilentApiDataWrapper',
            );

            const sessionEffective =
              that.parseSessionEffectiveFromSignInSilentApiDataWrapper(
                metaData,
              );

            logDebug(`sessionEffective is ${sessionEffective}`);

            if (!sessionEffective) {
              that.logCallTrace(
                metaData,
                primaryCallName,
                'exchangePhone',
                'checkSession',
                'callback',
                'dispatchExchangePhone',
                'then',
                'refreshSession',
              );

              that.refreshSession({
                callback: () => {
                  that.logCallTrace(
                    { data },
                    primaryCallName,
                    'exchangePhone',
                    'checkSession',
                    'callback',
                    'dispatchExchangePhone',
                    'then',
                    'refreshSession',
                    'callback',
                    'exchangePhone',
                  );

                  that.exchangePhone({ data, callback });
                },
              });

              return;
            }

            if (isFunction(callback)) {
              that.logCallTrace(
                metaData,
                primaryCallName,
                'exchangePhone',
                'checkSession',
                'callback',
                'dispatchExchangePhone',
                'then',
                'callback',
              );

              // eslint-disable-next-line promise/no-callback-in-promise
              callback(metaData);
            } else {
              that.logCallTrace(
                {},
                primaryCallName,
                'exchangePhone',
                'checkSession',
                'callback',
                'dispatchExchangePhone',
                'then',
                'callback',
                emptyLogic,
              );
            }
          }

          return remoteData;
        })
        .catch((error) => {
          that.logCallTrace(
            { error },
            primaryCallName,
            'exchangePhone',
            'checkSession',
            'callback',
            'dispatchExchangePhone',
            'catch',
          );

          logException(error);
        });
    });
  };

  parseSessionEffectiveFromRegisterWithWeChatApiDataWrapper = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseSessionEffectiveFromRegisterWithWeChatApiDataWrapper',
    );

    this.logCallTrace(
      remoteData,
      primaryCallName,
      'parseSessionEffectiveFromRegisterWithWeChatApiDataWrapper',
      'parseSessionEffectiveFromRegisterWithWeChatApiData',
    );

    return this.parseSessionEffectiveFromRegisterWithWeChatApiData(remoteData);
  };

  parseSessionEffectiveFromRegisterWithWeChatApiData = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseSessionEffectiveFromRegisterWithWeChatApiData',
    );

    logConfig(
      'built-in parseSessionEffectiveFromRegisterWithWeChatApiData is "const { sessionEffective } = remoteData",if you need custom logic,you need override it: parseSessionEffectiveFromRegisterWithWeChatApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!checkInCollection(Object.keys(remoteData || {}), 'sessionEffective')) {
      const info =
        'params remoteData not exist key sessionEffective in parseSessionEffectiveFromRegisterWithWeChatApiData';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'parseSessionEffectiveFromRegisterWithWeChatApiData',
        'error',
      );

      logException(remoteData, info);

      throw new Error(info);
    }

    const { sessionEffective } = {
      sessionEffective: true,
      ...remoteData,
    };

    return sessionEffective || false;
  };

  dispatchRegisterWithWeChat = (data = {}) => {
    this.logCallTrack(data, primaryCallName, 'dispatchRegisterWithWeChat');

    logConfig(
      'built-in dispatchRegisterWithWeChat is a simulation,if you need actual business,you need override it: dispatchRegisterWithWeChat = (data) => {} and return a promise dispatchApi like "return this.dispatchApi({type: \'schedulingControl/exchangePhone\',payload: data,})"',
    );

    const o = {
      type: 'schedulingControl/registerWithWeChat',
      payload: data,
    };

    this.logCallTrace(
      {},
      primaryCallName,
      'dispatchRegisterWithWeChat',
      'dispatchApi',
    );

    return this.dispatchApi(o);
  };

  registerWithWeChat = ({
    data,
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    const that = this;

    that.logCallTrack({ data }, primaryCallName, 'registerWithWeChat');

    that.setState({ registering: true });

    that.logCallTrace(
      data,
      primaryCallName,
      'registerWithWeChat',
      'dispatchRegisterWithWeChat',
    );

    that
      .dispatchRegisterWithWeChat(data)
      .then((remoteData) => {
        that.setState({ registering: false });

        const { dataSuccess, data: metaData } = remoteData;

        logDebug(`dataSuccess is ${dataSuccess}`);

        if (dataSuccess) {
          that.logCallTrace(
            metaData,
            primaryCallName,
            'registerWithWeChat',
            'dispatchRegisterWithWeChat',
            'then',
            'parseSessionEffectiveFromRegisterWithWeChatApiDataWrapper',
          );

          const sessionEffective =
            that.parseSessionEffectiveFromRegisterWithWeChatApiDataWrapper(
              metaData,
            );

          if (!sessionEffective) {
            that.logCallTrace(
              metaData,
              primaryCallName,
              'registerWithWeChat',
              'dispatchRegisterWithWeChat',
              'then',
              'refreshSession',
            );

            that.refreshSession({
              callback: () => {
                that.logCallTrace(
                  data,
                  primaryCallName,
                  'registerWithWeChat',
                  'dispatchRegisterWithWeChat',
                  'then',
                  'refreshSession',
                  'callback',
                  'signInCore',
                );

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

          that.logCallTrace(
            metaData,
            primaryCallName,
            'registerWithWeChat',
            'dispatchRegisterWithWeChat',
            'then',
            'parseSignInResultFromRegisterWithWeChatApiDataWrapper',
          );

          const signInResult =
            that.parseSignInResultFromRegisterWithWeChatApiDataWrapper(
              metaData,
            );

          that.logCallTrace(
            { signInResult },
            primaryCallName,
            'registerWithWeChat',
            'dispatchRegisterWithWeChat',
            'then',
            'setSignInResultOnRegisterWithWeChat',
          );

          that.setSignInResultOnRegisterWithWeChat({
            signInResult,
          });

          that.logCallTrace(
            metaData,
            primaryCallName,
            'registerWithWeChat',
            'dispatchRegisterWithWeChat',
            'then',
            'parseTokenFromRegisterWithWeChatApiData',
          );

          const token = that.parseTokenFromRegisterWithWeChatApiData(metaData);

          that.logCallTrace(
            { token },
            primaryCallName,
            'registerWithWeChat',
            'dispatchRegisterWithWeChat',
            'then',
            'setTokenOnRegisterWithWeChat',
          );

          that.setTokenOnRegisterWithWeChat({
            token,
          });

          that.logCallTrace(
            metaData,
            primaryCallName,
            'registerWithWeChat',
            'dispatchRegisterWithWeChat',
            'then',
            'parseOpenIdFromRegisterWithWeChatApiData',
          );

          const openId =
            that.parseOpenIdFromRegisterWithWeChatApiData(metaData);

          that.logCallTrace(
            { openId },
            primaryCallName,
            'registerWithWeChat',
            'dispatchRegisterWithWeChat',
            'then',
            'setOpenIdOnRegisterWithWeChat',
          );

          that.setOpenIdOnRegisterWithWeChat({ openId });

          const verifySignInResult = getVerifySignInResult();

          if (toString(signInResult) === toString(verifySignInResult.success)) {
            that.logCallTrace(
              {},
              primaryCallName,
              'registerWithWeChat',
              'dispatchRegisterWithWeChat',
              'then',
              'getCustomer',
            );

            that.getCustomer({
              successCallback: () => {
                if (isFunction(successCallback)) {
                  that.logCallTrace(
                    metaData,
                    primaryCallName,
                    'registerWithWeChat',
                    'dispatchRegisterWithWeChat',
                    'then',
                    'getCustomer',
                    'successCallback',
                  );

                  successCallback(metaData);
                } else {
                  that.logCallTrace(
                    {},
                    primaryCallName,
                    'registerWithWeChat',
                    'dispatchRegisterWithWeChat',
                    'then',
                    'getCustomer',
                    'successCallback',
                    emptyLogic,
                  );
                }

                that.logCallTrace(
                  metaData,
                  primaryCallName,
                  'registerWithWeChat',
                  'dispatchRegisterWithWeChat',
                  'then',
                  'getCustomer',
                  'successCallback',
                  'doAfterRegisterWithWeChat',
                );

                that.doAfterRegisterWithWeChat(metaData);
              },
              failCallback,
              completeCallback,
            });
          } else {
            if (isFunction(failCallback)) {
              that.logCallTrace(
                metaData,
                primaryCallName,
                'registerWithWeChat',
                'dispatchRegisterWithWeChat',
                'then',
                'failCallback',
              );

              failCallback(metaData);
            } else {
              that.logCallTrace(
                {},
                primaryCallName,
                'registerWithWeChat',
                'dispatchRegisterWithWeChat',
                'then',
                'failCallback',
                emptyLogic,
              );
            }

            if (isFunction(completeCallback)) {
              that.logCallTrace(
                metaData,
                primaryCallName,
                'registerWithWeChat',
                'dispatchRegisterWithWeChat',
                'then',
                'completeCallback',
              );

              completeCallback(metaData);
            } else {
              that.logCallTrace(
                {},
                primaryCallName,
                'registerWithWeChat',
                'dispatchRegisterWithWeChat',
                'then',
                'completeCallback',
                emptyLogic,
              );
            }
          }
        } else {
          if (isFunction(failCallback)) {
            that.logCallTrace(
              {},
              primaryCallName,
              'registerWithWeChat',
              'dispatchRegisterWithWeChat',
              'then',
              'failCallback',
            );

            failCallback();
          } else {
            that.logCallTrace(
              {},
              primaryCallName,
              'registerWithWeChat',
              'dispatchRegisterWithWeChat',
              'then',
              'failCallback',
              emptyLogic,
            );
          }

          if (isFunction(completeCallback)) {
            that.logCallTrace(
              {},
              primaryCallName,
              'registerWithWeChat',
              'dispatchRegisterWithWeChat',
              'then',
              'completeCallback',
            );

            completeCallback();
          } else {
            that.logCallTrace(
              {},
              primaryCallName,
              'registerWithWeChat',
              'dispatchRegisterWithWeChat',
              'then',
              'completeCallback',
              emptyLogic,
            );
          }
        }

        return remoteData;
      })
      .catch((error) => {
        that.setState({ registering: false });

        that.logCallTrace(
          { error },
          primaryCallName,
          'registerWithWeChat',
          'dispatchRegisterWithWeChat',
          'catch',
        );

        logException(error);

        if (isFunction(failCallback)) {
          that.logCallTrace(
            {},
            primaryCallName,
            'registerWithWeChat',
            'dispatchRegisterWithWeChat',
            'catch',
            'failCallback',
          );

          failCallback();
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'registerWithWeChat',
            'dispatchRegisterWithWeChat',
            'catch',
            'failCallback',
            emptyLogic,
          );
        }

        if (isFunction(completeCallback)) {
          that.logCallTrace(
            {},
            primaryCallName,
            'registerWithWeChat',
            'dispatchRegisterWithWeChat',
            'catch',
            'completeCallback',
          );

          completeCallback();
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'registerWithWeChat',
            'dispatchRegisterWithWeChat',
            'catch',
            'completeCallback',
            emptyLogic,
          );
        }
      });
  };

  parseSessionEffectiveFromRegisterApiDataWrapper = (remoteData) => {
    logExecute('parseSessionEffectiveFromRegisterApiData');

    return this.parseSessionEffectiveFromRegisterApiData(remoteData);
  };

  parseSessionEffectiveFromRegisterApiData = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseSessionEffectiveFromRegisterApiData',
    );

    logConfig(
      'built-in parseSessionEffectiveFromRegisterApiData is "const { sessionEffective } = remoteData",if you need custom logic,you need override it: parseSessionEffectiveFromRegisterApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!checkInCollection(Object.keys(remoteData || {}), 'sessionEffective')) {
      const info =
        'params remoteData not exist key sessionEffective in parseSessionEffectiveFromRegisterApiData';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'parseSessionEffectiveFromRegisterApiData',
        'error',
      );

      logException(remoteData, info);

      throw new Error(info);
    }

    const { sessionEffective } = {
      sessionEffective: true,
      ...remoteData,
    };

    return sessionEffective || false;
  };

  dispatchRegister = (data = {}) => {
    this.logCallTrack(data, primaryCallName, 'dispatchRegister');

    logConfig(
      'built-in dispatchRegister is a simulation,if you need actual business,you need override it: dispatchRegister = (data) => {} and return a promise dispatchApi like "return this.dispatchApi({type: \'schedulingControl/exchangePhone\',payload: data,})"',
    );

    const o = {
      type: 'schedulingControl/register',
      payload: data,
    };

    this.logCallTrace(o, primaryCallName, 'dispatchRegister', 'dispatchApi');

    return this.dispatchApi(o);
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

    that.logCallTrack({ data }, primaryCallName, 'register');

    that.logCallTrace(data, primaryCallName, 'register', 'dispatchRegister');

    that
      .dispatchRegister(data)
      .then((remoteData) => {
        const { dataSuccess, data: metaData } = remoteData;

        logDebug(`dataSuccess is ${dataSuccess}`);

        if (dataSuccess) {
          that.logCallTrace(
            metaData,
            primaryCallName,
            'register',
            'dispatchRegister',
            'then',
            'parseSessionEffectiveFromRegisterApiDataWrapper',
          );

          const sessionEffective =
            that.parseSessionEffectiveFromRegisterApiDataWrapper(metaData);

          if (!sessionEffective) {
            that.logCallTrace(
              {},
              primaryCallName,
              'register',
              'dispatchRegister',
              'then',
              'refreshSession',
            );

            that.refreshSession({
              callback: () => {
                that.logCallTrace(
                  { data },
                  primaryCallName,
                  'register',
                  'dispatchRegister',
                  'then',
                  'refreshSession',
                  'callback',
                  'signInCore',
                );

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

          that.logCallTrace(
            metaData,
            primaryCallName,
            'register',
            'dispatchRegister',
            'then',
            'parseSignInResultFromRegisterApiDataWrapper',
          );

          const signInResult =
            that.parseSignInResultFromRegisterApiDataWrapper(metaData);

          that.logCallTrace(
            { signInResult },
            primaryCallName,
            'register',
            'dispatchRegister',
            'then',
            'setSignInResultOnRegister',
          );

          that.setSignInResultOnRegister({
            signInResult,
          });

          that.logCallTrace(
            metaData,
            primaryCallName,
            'register',
            'dispatchRegister',
            'then',
            'parseTokenFromRegisterApiData',
          );

          const token = that.parseTokenFromRegisterApiData(metaData);

          that.logCallTrace(
            { token },
            primaryCallName,
            'register',
            'dispatchRegister',
            'then',
            'setTokenOnRegister',
          );

          that.setTokenOnRegister({
            token,
          });

          that.logCallTrace(
            metaData,
            primaryCallName,
            'register',
            'dispatchRegister',
            'then',
            'parseOpenIdFromRegisterApiData',
          );

          const openId = that.parseOpenIdFromRegisterApiData(metaData);

          that.logCallTrace(
            { openId },
            primaryCallName,
            'register',
            'dispatchRegister',
            'then',
            'setOpenIdOnRegister',
          );

          that.setOpenIdOnRegister({ openId });

          removeCurrentCustomer();

          const verifySignInResult = getVerifySignInResult();

          if (toString(signInResult) === toString(verifySignInResult.success)) {
            that.logCallTrace(
              {},
              primaryCallName,
              'register',
              'dispatchRegister',
              'then',
              'getCustomer',
            );

            that.getCustomer({
              successCallback: () => {
                if (isFunction(successCallback)) {
                  that.logCallTrace(
                    metaData,
                    primaryCallName,
                    'register',
                    'dispatchRegister',
                    'then',
                    'getCustomer',
                    'successCallback',
                    'successCallback',
                  );

                  successCallback(metaData);
                } else {
                  that.logCallTrace(
                    {},
                    primaryCallName,
                    'register',
                    'dispatchRegister',
                    'then',
                    'getCustomer',
                    'successCallback',
                    'successCallback',
                    emptyLogic,
                  );
                }

                that.logCallTrace(
                  metaData,
                  primaryCallName,
                  'register',
                  'dispatchRegister',
                  'then',
                  'getCustomer',
                  'successCallback',
                  'doAfterRegister',
                );

                that.doAfterRegister(metaData);
              },
              failCallback,
              completeCallback,
            });
          } else {
            if (isFunction(failCallback)) {
              that.logCallTrace(
                {},
                primaryCallName,
                'register',
                'dispatchRegister',
                'then',
                'getCustomer',
                'successCallback',
                'failCallback',
              );

              failCallback();
            } else {
              that.logCallTrace(
                {},
                primaryCallName,
                'register',
                'dispatchRegister',
                'then',
                'getCustomer',
                'successCallback',
                'failCallback',
                emptyLogic,
              );
            }

            if (isFunction(completeCallback)) {
              that.logCallTrace(
                {},
                primaryCallName,
                'register',
                'dispatchRegister',
                'then',
                'getCustomer',
                'successCallback',
                'completeCallback',
              );

              completeCallback();
            } else {
              that.logCallTrace(
                {},
                primaryCallName,
                'register',
                'dispatchRegister',
                'then',
                'getCustomer',
                'successCallback',
                'completeCallback',
                emptyLogic,
              );
            }
          }
        } else {
          if (isFunction(failCallback)) {
            that.logCallTrace(
              {},
              primaryCallName,
              'register',
              'dispatchRegister',
              'then',
              'failCallback',
            );

            failCallback();
          } else {
            that.logCallTrace(
              {},
              primaryCallName,
              'register',
              'dispatchRegister',
              'then',
              'failCallback',
              emptyLogic,
            );
          }

          if (isFunction(completeCallback)) {
            that.logCallTrace(
              {},
              primaryCallName,
              'register',
              'dispatchRegister',
              'then',
              'completeCallback',
            );

            completeCallback();
          } else {
            that.logCallTrace(
              {},
              primaryCallName,
              'register',
              'dispatchRegister',
              'then',
              'completeCallback',
              emptyLogic,
            );
          }
        }

        return remoteData;
      })
      .catch((error) => {
        that.logCallTrace(
          { error },
          primaryCallName,
          'register',
          'dispatchRegister',
          'catch',
        );

        logException(error);

        if (isFunction(failCallback)) {
          that.logCallTrace(
            {},
            primaryCallName,
            'register',
            'dispatchRegister',
            'catch',
            'failCallback',
          );

          failCallback();
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'register',
            'dispatchRegister',
            'catch',
            'failCallback',
            emptyLogic,
          );
        }

        if (isFunction(completeCallback)) {
          that.logCallTrace(
            {},
            primaryCallName,
            'register',
            'dispatchRegister',
            'catch',
            'completeCallback',
          );

          completeCallback();
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'register',
            'dispatchRegister',
            'catch',
            'completeCallback',
            emptyLogic,
          );
        }
      });
  };

  parseSignInResultFromRegisterApiDataWrapper = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseSignInResultFromRegisterApiDataWrapper',
    );

    this.logCallTrace(
      remoteData,
      primaryCallName,
      'parseSignInResultFromRegisterApiDataWrapper',
      'parseSignInResultFromRegisterApiData',
    );

    return this.parseSignInResultFromRegisterApiData(remoteData);
  };

  parseSignInResultFromRegisterWithWeChatApiDataWrapper = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseSignInResultFromRegisterWithWeChatApiDataWrapper',
    );

    this.logCallTrace(
      remoteData,
      primaryCallName,
      'parseSignInResultFromRegisterWithWeChatApiDataWrapper',
      'parseSignInResultFromRegisterWithWeChatApiData',
    );

    return this.parseSignInResultFromRegisterWithWeChatApiData(remoteData);
  };

  parseSignInResultFromRegisterApiData = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseSignInResultFromRegisterApiData',
    );

    logConfig(
      'built-in parseSignInResultFromRegisterApiData is "const { signInResult } = remoteData",if you need custom logic,you need override it: parseSignInResultFromRegisterApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    const verifySignInResult = getVerifySignInResult();

    if (!checkInCollection(Object.keys(remoteData || {}), 'signInResult')) {
      const info =
        'params remoteData not exist key signInResult in parseSignInResultFromRegisterApiData';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'parseSignInResultFromRegisterApiData',
        'error',
      );

      logException(remoteData, info);
    }

    const { signInResult } = {
      signInResult: verifySignInResult.fail,
      ...remoteData,
    };

    return signInResult || verifySignInResult.fail;
  };

  parseSignInResultFromRegisterWithWeChatApiData = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseSignInResultFromRegisterWithWeChatApiData',
    );

    logConfig(
      'built-in parseSignInResultFromRegisterWithWeChatApiData is "const { signInResult } = remoteData",if you need custom logic,you need override it: parseSignInResultFromRegisterWithWeChatApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    const verifySignInResult = getVerifySignInResult();

    if (!checkInCollection(Object.keys(remoteData || {}), 'signInResult')) {
      const info =
        'params remoteData not exist key signInResult in parseSignInResultFromRegisterWithWeChatApiData';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'parseSignInResultFromRegisterWithWeChatApiData',
        'error',
      );

      logException(remoteData, info);
    }

    const { signInResult } = {
      signInResult: verifySignInResult.fail,
      ...remoteData,
    };

    return signInResult || verifySignInResult.fail;
  };

  setSignInResultOnRegister = ({ signInResult }) => {
    this.logCallTrack(
      {
        signInResult,
      },
      primaryCallName,
      'setSignInResultOnRegister',
    );

    const v = toNumber(signInResult);
    const verifySignInResult = getVerifySignInResult();

    if (
      !checkInCollection(
        [
          verifySignInResult.unknown,
          verifySignInResult.fail,
          verifySignInResult.success,
        ],
        v,
      )
    ) {
      const info = `signInResult not allow ${signInResult}.`;

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'setSignInResultOnRegister',
        'error',
      );

      throw new Error(info);
    }

    this.logCallTrace(
      { data: v },
      primaryCallName,
      'setSignInResultOnRegister',
      'setSignInResult',
    );

    this.setSignInResult({ data: v });
  };

  setSignInResultOnRegisterWithWeChat = ({ signInResult }) => {
    this.logCallTrack(
      {
        signInResult,
      },
      primaryCallName,
      'setSignInResultOnRegisterWithWeChat',
    );

    const v = toNumber(signInResult);
    const verifySignInResult = getVerifySignInResult();

    if (
      !checkInCollection(
        [
          verifySignInResult.unknown,
          verifySignInResult.fail,
          verifySignInResult.success,
        ],
        v,
      )
    ) {
      const info = `signInResult not allow ${signInResult}.`;

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'setSignInResultOnRegisterWithWeChat',
        'error',
      );

      throw new Error(info);
    }

    this.logCallTrace(
      { data: v },
      primaryCallName,
      'setSignInResultOnRegisterWithWeChat',
      'setSignInResult',
    );

    this.setSignInResult({ data: v });
  };

  parseTokenFromRegisterApiData = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseTokenFromRegisterApiData',
    );

    logConfig(
      'built-in parseTokenFromRegisterApiData is "const { token } = remoteData",if you need custom logic,you need override it: parseTokenFromRegisterApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!checkInCollection(Object.keys(remoteData || {}), 'token')) {
      const info =
        'params remoteData not exist key token in parseTokenFromRegisterApiData';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'parseTokenFromRegisterApiData',
        'error',
      );

      logException(remoteData, info);
    }

    const { token } = {
      token: '',
      ...remoteData,
    };

    return token || '';
  };

  parseTokenFromRegisterWithWeChatApiData = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseTokenFromRegisterWithWeChatApiData',
    );

    logConfig(
      'built-in parseTokenFromRegisterWithWeChatApiData is "const { token } = remoteData",if you need custom logic,you need override it: parseTokenFromRegisterWithWeChatApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!checkInCollection(Object.keys(remoteData || {}), 'token')) {
      const info =
        'params remoteData not exist key token in parseTokenFromRegisterWithWeChatApiData';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'parseTokenFromRegisterWithWeChatApiData',
        'error',
      );

      logException(remoteData, info);
    }

    const { token } = {
      token: '',
      ...remoteData,
    };

    return token || '';
  };

  setTokenOnRegister = ({ token }) => {
    this.logCallTrack({ token }, primaryCallName, 'setTokenOnRegister');

    if (!isString(token || '')) {
      const info = 'setTokenOnRegister token must be string';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'setTokenOnRegister',
        'error',
      );

      throw new Error(info);
    }

    setToken(token || getTokenAnonymous());
  };

  setTokenOnRegisterWithWeChat = ({ token }) => {
    this.logCallTrack(
      { token },
      primaryCallName,
      'setTokenOnRegisterWithWeChat',
    );

    if (!isString(token || '')) {
      const info = 'setTokenOnRegisterWithWeChat token must be string';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'setTokenOnRegisterWithWeChat',
        'error',
      );

      throw new Error(info);
    }

    setToken(token || getTokenAnonymous());
  };

  parseOpenIdFromRegisterApiData = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseOpenIdFromRegisterApiData',
    );

    logConfig(
      'built-in parseOpenIdFromRegisterApiData is "const { openId } = remoteData",if you need custom logic,you need override it: parseOpenIdFromRegisterApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!checkInCollection(Object.keys(remoteData || {}), 'openId')) {
      const info =
        'params remoteData not exist key openId in parseOpenIdFromRegisterApiData';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'parseOpenIdFromRegisterApiData',
        'error',
      );

      logException(remoteData, info);
    }

    const { openId } = {
      openId: '',
      ...remoteData,
    };

    return openId || '';
  };

  parseOpenIdFromRegisterWithWeChatApiData = (remoteData) => {
    this.logCallTrack(
      remoteData,
      primaryCallName,
      'parseOpenIdFromRegisterWithWeChatApiData',
    );

    logConfig(
      'built-in parseOpenIdFromRegisterWithWeChatApiData is "const { openId } = remoteData",if you need custom logic,you need override it: parseOpenIdFromRegisterWithWeChatApiData = (remoteData) => {} and return a verifySignInResult value',
    );

    if (!checkInCollection(Object.keys(remoteData || {}), 'openId')) {
      const info =
        'params remoteData not exist key openId in parseOpenIdFromRegisterWithWeChatApiData';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'parseOpenIdFromRegisterApiData',
        'error',
      );

      logException(remoteData, info);
    }

    const { openId } = {
      openId: '',
      ...remoteData,
    };

    return openId || '';
  };

  setOpenIdOnRegister = ({ openId }) => {
    this.logCallTrack({ openId }, primaryCallName, 'setOpenIdOnRegister');

    if (!isString(openId || '')) {
      const info = 'setOpenIdOnRegister openId must be string';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'setOpenIdOnRegister',
        'error',
      );

      logException(info);

      throw new Error(info);
    }

    setOpenId(openId || '');
  };

  setOpenIdOnRegisterWithWeChat = ({ openId }) => {
    this.logCallTrack(
      { openId },
      primaryCallName,
      'setOpenIdOnRegisterWithWeChat',
    );

    if (!isString(openId || '')) {
      const info = 'setOpenIdOnRegisterWithWeChat openId must be string';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'setOpenIdOnRegisterWithWeChat',
        'error',
      );

      logException(info);

      throw new Error(info);
    }

    setOpenId(openId || '');
  };

  doAfterRegisterWithWeChat = (data) => {
    this.logCallTrack(data, primaryCallName, 'doAfterRegisterWithWeChat');

    logConfig(
      'doAfterRegisterWithWeChat do nothing,if you need,you can override it: doAfterRegisterWithWeChat = (data) => {}',
    );
  };

  doAfterRegister = (data) => {
    this.logCallTrack(data, primaryCallName, 'doAfterRegister');

    logConfig(
      'doAfterRegister do nothing,if you need,you can override it: doAfterRegister = (data) => {}',
    );
  };

  dispatchGetMetaDataWrapper = (data = {}) => {
    this.logCallTrack(data, primaryCallName, 'dispatchGetMetaDataWrapper');

    this.logCallTrace(
      data,
      primaryCallName,
      'dispatchGetMetaDataWrapper',
      'dispatchGetMetaData',
    );

    return this.dispatchGetMetaData(data);
  };

  dispatchGetMetaData = (data = {}) => {
    this.logCallTrack({ data }, primaryCallName, 'dispatchGetMetaData');

    this.logCallTrace(
      {},
      primaryCallName,
      'dispatchGetMetaData',
      'getMetaDataApiEffect',
    );

    const { type, payload, alias } = {
      type: '',
      payload: null,
      ...this.getMetaDataApiEffect(data),
      alias: getMetaDataAliasName(),
    };

    if (checkStringIsNullOrWhiteSpace(type)) {
      const info = 'getMetaDataApiEffect type disallow empty';

      this.logCallTrace(
        { error: info },
        primaryCallName,
        'dispatchGetMetaData',
        'error',
      );

      throw new Error(info);
    }

    const o = {
      type,
      payload,
      alias,
    };

    this.logCallTrace(o, primaryCallName, 'dispatchGetMetaData', 'dispatchApi');

    return this.dispatchApi(o);
  };

  getMetaDataApiEffect = (data) => {
    this.logCallTrack(data, primaryCallName, 'getMetaDataApiEffect');

    logConfig(
      'built-in getMetaDataApiEffect is a simulation,if you need actual business,you need override it: getMetaDataApiEffect = (data) => {} and return a object like "return {type: \'schedulingControl/getMetaData\',payload: data,}"',
    );

    return {
      type: 'schedulingControl/getMetaData',
      payload: data,
    };
  };

  initMetaData = ({
    data = {},
    force: forceValue = false,
    callback = null,
  }) => {
    this.logCallTrack(
      {
        data,
        force: forceValue,
      },
      primaryCallName,
      'initMetaData',
    );

    let force = forceValue;

    const metaData = getLocalMetaData();

    if (!force) {
      if ((metaData || null) == null) {
        force = true;
      } else {
        if (Object.keys(metaData).length === 0) {
          force = true;
        }
      }
    }

    if (force) {
      logDebug(
        'info check meta data from local cache fail or force api request, shift to get from api dispatch',
      );

      const that = this;

      that.logCallTrace(
        data,
        primaryCallName,
        'initMetaData',
        'dispatchGetMetaDataWrapper',
      );

      that
        .dispatchGetMetaDataWrapper(data || {})
        .then((remoteData) => {
          const { dataSuccess, data: v } = remoteData;

          logDebug(`dataSuccess is ${dataSuccess}`);

          if (dataSuccess) {
            setLocalMetaData(v);

            if (isFunction(callback)) {
              that.logCallTrace(
                v,
                primaryCallName,
                'initMetaData',
                'dispatchGetMetaDataWrapper',
                'then',
                'callback',
              );

              // eslint-disable-next-line promise/no-callback-in-promise
              callback(v);
            } else {
              that.logCallTrace(
                {},
                primaryCallName,
                'initMetaData',
                'dispatchGetMetaDataWrapper',
                'then',
                'callback',
                emptyLogic,
              );
            }

            that.logCallTrace(
              v,
              primaryCallName,
              'initMetaData',
              'dispatchGetMetaDataWrapper',
              'then',
              'doAfterLoadMetaDataByForce',
            );

            that.doAfterLoadMetaDataByForce(v);
          }

          return remoteData;
        })
        .catch((error) => {
          that.logCallTrace(
            { error },
            primaryCallName,
            'initMetaData',
            'dispatchGetMetaDataWrapper',
            'catch',
          );

          logException(error);
        });
    } else {
      logDebug('check meta data from local cache success');

      if (isFunction(callback)) {
        this.logCallTrace({}, primaryCallName, 'initMetaData', 'callback');

        callback(metaData);
      } else {
        this.logCallTrace(
          {},
          primaryCallName,
          'initMetaData',
          'callback',
          emptyLogic,
        );
      }
    }
  };

  getMetaData = () => {
    this.logCallTrack({}, primaryCallName, 'getMetaData');

    return {
      ...getDefaultMetaData(),
      ...getLocalMetaData(),
    };
  };

  doAfterLoadMetaDataByForce = (data) => {
    this.logCallTrack(
      data,
      primaryCallName,
      'doAfterLoadMetaDataByForce',
      emptyLogic,
    );
  };

  dispatchGetFullAdministrativeDivisionDataWrapper = (data = {}) => {
    this.logCallTrack(
      data,
      primaryCallName,
      'dispatchGetFullAdministrativeDivisionDataWrapper',
    );

    this.logCallTrace(
      data,
      primaryCallName,
      'dispatchGetFullAdministrativeDivisionDataWrapper',
      'dispatchGetFullAdministrativeDivisionData',
    );

    return this.dispatchGetFullAdministrativeDivisionData(data);
  };

  dispatchGetFullAdministrativeDivisionData = (data = {}) => {
    this.logCallTrack(
      data,
      primaryCallName,
      'dispatchGetFullAdministrativeDivisionData',
    );

    logConfig(
      'built-in dispatchGetFullAdministrativeDivisionData is a simulation,if you need actual business,you need override it: dispatchGetFullAdministrativeDivisionData = (data) => {} and return a promise dispatchApi like "return this.dispatchApi({type: \'schedulingControl/getFullAdministrativeDivisionData\',payload: data,})"',
    );

    const o = {
      type: 'schedulingControl/getFullAdministrativeDivisionData',
      payload: data,
    };

    this.logCallTrace(
      o,
      primaryCallName,
      'dispatchGetFullAdministrativeDivisionData',
      'dispatchApi',
    );

    return this.dispatchApi(o);
  };

  initFullAdministrativeDivisionData = ({
    data = {},
    force: forceValue = false,
    callback = null,
  }) => {
    this.logCallTrack(
      {
        data,
        force: forceValue,
      },
      primaryCallName,
      'initFullAdministrativeDivisionData',
    );

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

    if (force) {
      logInfo(
        'info check administrative division full data from local cache fail or force api request, shift to get from api dispatch',
      );

      const that = this;

      that.logCallTrace(
        data,
        primaryCallName,
        'initFullAdministrativeDivisionData',
        'dispatchGetFullAdministrativeDivisionDataWrapper',
      );

      that
        .dispatchGetFullAdministrativeDivisionDataWrapper(data || {})
        .then((remoteData) => {
          const { dataSuccess, list: v } = remoteData;

          logDebug(`dataSuccess is ${dataSuccess}`);

          if (dataSuccess) {
            setAdministrativeDivisionFullDataCache(v);

            if (isFunction(callback)) {
              that.logCallTrace(
                v,
                primaryCallName,
                'initFullAdministrativeDivisionData',
                'dispatchGetFullAdministrativeDivisionDataWrapper',
                'then',
                'callback',
              );

              // eslint-disable-next-line promise/no-callback-in-promise
              callback(v);
            } else {
              that.logCallTrace(
                {},
                primaryCallName,
                'initFullAdministrativeDivisionData',
                'dispatchGetFullAdministrativeDivisionDataWrapper',
                'then',
                'callback',
                emptyLogic,
              );
            }

            that.logCallTrace(
              {},
              primaryCallName,
              'initFullAdministrativeDivisionData',
              'dispatchGetFullAdministrativeDivisionDataWrapper',
              'then',
              'increaseCounter',
            );

            that.increaseCounter();
          }

          return remoteData;
        })
        .catch((error) => {
          that.logCallTrace(
            { error },
            primaryCallName,
            'initFullAdministrativeDivisionData',
            'dispatchGetFullAdministrativeDivisionDataWrapper',
            'catch',
          );

          logException(error);
        });
    } else {
      logInfo(
        'info check administrative division full data from local cache success',
      );

      if (isFunction(callback)) {
        this.logCallTrace(
          {},
          primaryCallName,
          'initFullAdministrativeDivisionData',
          'callback',
        );

        callback();
      } else {
        this.logCallTrace(
          {},
          primaryCallName,
          'initFullAdministrativeDivisionData',
          'callback',
          emptyLogic,
        );
      }
    }
  };

  getFullAdministrativeDivisionData = () => {
    this.logCallTrack({}, primaryCallName, 'getFullAdministrativeDivisionData');

    const { list } = getAdministrativeDivisionFullData();

    return list;
  };
}

export { SupplementCore };
