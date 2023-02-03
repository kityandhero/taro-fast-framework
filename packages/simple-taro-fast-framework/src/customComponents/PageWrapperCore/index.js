import { logObject, transformListData } from 'easy-soft-utility';

import {
  AuthorizationWrapper,
  getAdministrativeDivisionFullDataCache,
  getMap,
} from 'taro-fast-framework';

import { getQQMapWX } from '../../utils/tools';

/**
 * PageWrapperCore
 */
class PageWrapperCore extends AuthorizationWrapper {
  loadRemoteRequestDelay = 100;

  useFadeSpinWrapper = true;

  useSimulationFadeSpin = true;

  simulationFadeSpinDuration = 800;

  hideFadeSpinWrapperAfterLoadRemoteRequest = false;

  showRenderCountInConsole = false;

  viewStyle = {
    backgroundColor: '#fff',
  };

  getGlobal = () => {
    const { global } = this.props;

    return global;
  };

  getRemoteMetaData = () => {
    const global = this.getGlobalWrapper();

    return global;
  };

  /**
   * 登录校验失败时候的回调, 例如访问需要登录才能调用的接口
   * @returns
   */
  authorizeFailCallback = (remoteData) => {
    logObject(remoteData);
  };

  reverseGeocoder = ({ location, success, fail }) => {
    const map = getQQMapWX();

    map.reverseGeocoder({
      location,
      success,
      fail,
    });
  };

  dispatchGetFullAdministrativeDivisionData = (data = {}) => {
    return this.dispatchApi({
      type: 'administrativeDivision/singeList',
      payload: data,
    });
  };

  transformFullAdministrativeDivisionData = () => {
    const { list } = getAdministrativeDivisionFullDataCache();

    return (
      transformListData({
        list: list,
        convert: (data) => {
          const { name, code } = data;

          return {
            label: name,
            value: code,
          };
        },
        recursiveKey: 'children',
      }) || []
    );
  };

  /**
   * 此处重载仅为避免调用真实定位，实际使用请勿参照，直接使用即可
   * @param {*} param0
   */
  getLocationWeather = ({ callback = null }) => {
    const that = this;

    const map = getMap();

    if (map == null) {
      that.obtainLocation({
        successCallback: ({ map: mapSource }) => {
          that.getLocationWeatherCore({
            data: mapSource,
            callback,
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
}

export default PageWrapperCore;
