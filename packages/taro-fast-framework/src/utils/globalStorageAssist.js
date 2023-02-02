import {
  flushLocalStorage,
  getJsonFromLocalStorage,
  getStringFromLocalStorage,
  isArray,
  logDebug,
  logExecute,
  logInfo,
  logWarn,
  removeLocalStorage,
  saveJsonToLocalStorage,
  saveStringToLocalStorage,
  showInfoMessage,
  toMd5,
  toNumber,
} from 'easy-soft-utility';

import { locationModeCollection } from 'taro-fast-common/es/utils/constants';

export const storageKeyCollection = {
  currentUrl: 'currentUrl',
  openId: 'openId',
  location: 'location',
  map: 'map',
  effectiveCode: 'effectiveCode',
  session: 'session',
  sessionRefreshing: 'sessionRefreshing',
  nextCheckLoginUnixTime: 'nextCheckLoginUnixTime',
  needSyncInfo: 'needSyncInfo',
  locationMode: 'locationMode',
  lastLocation: 'lastLocation',
  remoteCheck: 'remoteCheck',
  weather: 'weather',
  currentCustomer: 'currentCustomer',
  administrativeDivisionFullData: 'administrativeDivisionFullData',
  selectedAddressData: 'selectedAddressData',
  launchOption: 'launchOption',
};

/**
 * 获取CurrentUrl
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getCurrentUrl() {
  const key = storageKeyCollection.currentUrl;

  return getJsonFromLocalStorage(key);
}

/**
 * 设置CurrentUrl
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setCurrentUrl(url) {
  const key = storageKeyCollection.currentUrl;

  const isTab = (url || '').startsWith('/pages/');

  const data = {
    url: url || '',
    isTab,
  };

  return saveJsonToLocalStorage(key, data);
}

/**
 * 移除CurrentUrl
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeCurrentUrl() {
  const key = storageKeyCollection.currentUrl;

  removeLocalStorage(key);
}

/**
 * 获取OpenId
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getOpenId() {
  const key = storageKeyCollection.openId;

  return getStringFromLocalStorage(key);
}

/**
 * 设置OpenId
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setOpenId(openId) {
  const key = storageKeyCollection.openId;

  return saveStringToLocalStorage(key, openId || '');
}

/**
 * 移除OpenId
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeOpenId() {
  const key = storageKeyCollection.openId;

  removeLocalStorage(key);
}

/**
 * 获取EffectiveCode
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getEffectiveCode() {
  const key = storageKeyCollection.effectiveCode;

  return getStringFromLocalStorage(key);
}

/**
 * 设置EffectiveCode
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setEffectiveCode(effectiveCode) {
  const key = storageKeyCollection.effectiveCode;

  saveStringToLocalStorage(key, effectiveCode || '');
}

/**
 * 移除EffectiveCode
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeEffectiveCode() {
  const key = storageKeyCollection.effectiveCode;

  removeLocalStorage(key);
}

/**
 * 获取Session
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getSession() {
  logExecute('getSession');

  const key = storageKeyCollection.session;

  return getStringFromLocalStorage(key);
}

/**
 * 设置Session
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setSession(session) {
  logDebug(`setSession ${session}`);

  const key = storageKeyCollection.session;

  saveStringToLocalStorage(key, session || '');
}

/**
 * 移除Session
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeSession() {
  logInfo('removeSession');

  const key = storageKeyCollection.session;

  removeLocalStorage(key);
}

/**
 * 获取SessionRefreshing
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getSessionRefreshing() {
  const key = storageKeyCollection.sessionRefreshing;

  const v = getStringFromLocalStorage(key);

  logDebug(`getSessionRefreshing: ${v === 'true'}`);

  return v === 'true';
}

/**
 * 设置SessionRefreshing
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setSessionRefreshing(sessionRefreshing) {
  logDebug(`setSessionRefreshing ${sessionRefreshing}`);

  const key = storageKeyCollection.sessionRefreshing;

  saveStringToLocalStorage(key, sessionRefreshing || false ? 'true' : 'false');
}

/**
 * 移除SessionRefreshing
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeSessionRefreshing() {
  logInfo('removeSessionRefreshing');

  const key = storageKeyCollection.sessionRefreshing;

  removeLocalStorage(key);
}

/**
 * 获取nextCheckLoginUnixTime
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getNextCheckLoginUnixTime() {
  const key = storageKeyCollection.nextCheckLoginUnixTime;

  return toNumber(getStringFromLocalStorage(key));
}

/**
 * 设置NextCheckLoginUnixTime
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setNextCheckLoginUnixTime(nextCheckLoginUnixTime) {
  const key = storageKeyCollection.nextCheckLoginUnixTime;

  saveStringToLocalStorage(key, nextCheckLoginUnixTime || '');
}

/**
 * 移除NextCheckLoginUnixTime
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeNextCheckLoginUnixTime() {
  const key = storageKeyCollection.nextCheckLoginUnixTime;

  removeLocalStorage(key);
}

/**
 * 获取LocationMode
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getLocationMode() {
  const key = storageKeyCollection.locationMode;

  const s = getStringFromLocalStorage(key);

  const v = parseInt(s, 10);

  return v === locationModeCollection.auto ||
    v === locationModeCollection.custom
    ? v
    : locationModeCollection.unknown;
}

/**
 * 设置LocationMode
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setLocationMode(locationMode) {
  const key = storageKeyCollection.locationMode;

  if (locationMode === locationModeCollection.custom) {
    removeMap();
  }

  const v = parseInt(
    locationMode || 0 ? locationMode : locationModeCollection.unknown,
    10,
  );

  saveStringToLocalStorage(
    key,
    v === locationModeCollection.auto || v === locationModeCollection.custom
      ? v
      : locationModeCollection.unknown,
  );
}

/**
 * 获取map
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getMap() {
  const key = storageKeyCollection.map;

  const data = getJsonFromLocalStorage(key);

  if ((data || null) == null) {
    return null;
  }

  const locationMode = getLocationMode();

  if (locationMode === locationModeCollection.auto) {
    const { dataVersion } = data;

    if ((dataVersion || null) == null) {
      return null;
    }

    // 地理位置信息有效期30分钟
    const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

    if (dataVersion !== now) {
      return null;
    }

    return data;
  }

  return data;
}

/**
 * 设置map
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setMap(map) {
  const key = storageKeyCollection.map;

  // 地理位置信息有效期30分钟
  const nowVersion = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  map.dataVersion = nowVersion;

  return saveJsonToLocalStorage(key, map || '');
}

/**
 * 移除map
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeMap() {
  const key = storageKeyCollection.map;

  removeLocalStorage(key);
}

/**
 * 获取经纬度信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getLocation() {
  const key = storageKeyCollection.location;

  const l = getJsonFromLocalStorage(key);

  if ((l || null) == null) {
    return null;
  }

  const locationMode = getLocationMode();

  if (locationMode === locationModeCollection.auto) {
    const { dataVersion } = l;

    if ((dataVersion || null) == null) {
      return null;
    }

    // 地理位置信息有效期30分钟
    const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

    if (dataVersion !== now) {
      return null;
    }

    return l;
  }

  return l;
}

/**
 * 设置经纬度信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setLocation(location) {
  const key = storageKeyCollection.location;

  // 地理位置信息有效期30分钟
  const nowVersion = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  location.dataVersion = nowVersion;

  return saveJsonToLocalStorage(key, location || '');
}

/**
 * 移除经纬度信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeLocation() {
  const key = storageKeyCollection.location;

  removeLocalStorage(key);
}

/**
 * 获取是否需要同步用户信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getNeedSyncInfo() {
  const key = storageKeyCollection.needSyncInfo;

  const need = (getStringFromLocalStorage(key) || '') === '0';

  return need;
}

/**
 * 设置是否需要同步用户信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setNeedSyncInfo(need) {
  const key = storageKeyCollection.needSyncInfo;

  saveStringToLocalStorage(key, `${(need || false) == false ? 0 : 1}`);
}

/**
 * 获取用户最后位置信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getLastLocation() {
  const key = storageKeyCollection.lastLocation;

  let data = getJsonFromLocalStorage(key);

  if (data != null) {
    const { location } = data;

    if ((location || null) != null) {
      return location;
    }
  }

  return null;
}

/**
 * 设置用户最后位置信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setLastLocation(data) {
  if ((data || null) == null) {
    const text = '无法存数无效位置数据';

    showInfoMessage({
      text: text,
    });

    return;
  }

  const key = storageKeyCollection.lastLocation;

  const lastLocation = {
    location: data,
    version: 0,
  };

  saveJsonToLocalStorage(key, lastLocation || {});
}

/**
 * 获取remoteCheck缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getRemoteCheckCache() {
  const key = storageKeyCollection.remoteCheck;

  const o = getJsonFromLocalStorage(key);

  if ((o || null) == null) {
    return null;
  }

  if ((o.dataVersion || null) === null) {
    return null;
  }

  const now = parseInt(new Date().getTime() / 1000 / 10, 10);

  if (o.dataVersion !== now) {
    return null;
  }

  const { data } = {
    ...{
      data: null,
    },
    ...o,
  };

  return data || null;
}

/**
 * 设置remoteCheck缓存,10秒钟过期
 *
 * @export
 * @param {o} metaData数据
 * @returns
 */
export function setRemoteCheckCache(o) {
  const key = storageKeyCollection.remoteCheck;

  const now = parseInt(new Date().getTime() / 1000 / 10, 10);

  const d = {
    data: o || null,
    dataVersion: now,
  };

  return saveJsonToLocalStorage(key, d);
}

/**
 * 获取天气信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getWeather() {
  const key = storageKeyCollection.weather;

  const o = getJsonFromLocalStorage(key);

  if ((o || null) == null) {
    return null;
  }

  const { dataVersion } = o;

  if ((dataVersion || null) == null) {
    return null;
  }

  // 地理位置信息有效期30分钟
  const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  if (dataVersion !== now) {
    return null;
  }

  const { data } = {
    ...{
      data: null,
    },
    ...o,
  };

  return data || null;
}

/**
 * 设置天气信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setWeather(weather) {
  const key = storageKeyCollection.weather;

  // 地理位置信息有效期30分钟
  const nowVersion = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  weather.dataVersion = nowVersion;

  const o = {
    data: weather,
    dataVersion: nowVersion,
  };

  return saveJsonToLocalStorage(key, o);
}

/**
 * 移除天气信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeWeather() {
  const key = storageKeyCollection.weather;

  removeLocalStorage(key);
}

/**
 * 获取当前登陆人信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getCurrentCustomer() {
  logExecute('getCurrentCustomer from local cache');

  const key = storageKeyCollection.currentCustomer;

  const o = getJsonFromLocalStorage(key);

  if ((o || null) == null) {
    return null;
  }

  const { dataVersion } = o;

  if ((dataVersion || null) == null) {
    return null;
  }

  // 信息有效期30分钟
  const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  if (dataVersion !== now) {
    logWarn('info current customer cache expired, will return null');

    return null;
  }

  const { data } = {
    ...{
      data: null,
    },
    ...o,
  };

  return data || null;
}

/**
 * 设置当前登陆人信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setCurrentCustomer(data) {
  logExecute('setCurrentCustomer to local cache');

  const key = storageKeyCollection.currentCustomer;

  // 信息有效期30分钟
  const nowVersion = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  const o = {
    data,
    dataVersion: nowVersion,
  };

  return saveJsonToLocalStorage(key, o);
}

/**
 * 移除当前登陆人信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeCurrentCustomer() {
  const key = storageKeyCollection.currentCustomer;

  removeLocalStorage(key);
}

/**
 * 获取地区数据资源缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getAdministrativeDivisionFullData() {
  logExecute('getAdministrativeDivisionFullData from local cache');

  const key = storageKeyCollection.administrativeDivisionFullData;

  const { list, flag } = {
    ...{
      list: [],
      flag: 'md5',
    },
    ...getJsonFromLocalStorage(key),
  };

  return { list: list || [], flag: flag || 'md5' };
}

/**
 * 设置地区数据资源缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setAdministrativeDivisionFullData(data) {
  logExecute('setAdministrativeDivisionFullData to local cache');

  const key = storageKeyCollection.administrativeDivisionFullData;

  const l = isArray(data) ? data : [];

  const v = {
    list: l,
    flag: toMd5(l || []),
  };

  return saveJsonToLocalStorage(key, v);
}

/**
 * 移除地区数据资源缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeAdministrativeDivisionFullData() {
  logExecute('removeAdministrativeDivisionFullData');

  const key = storageKeyCollection.administrativeDivisionFullData;

  removeLocalStorage(key);
}

/**
 * 获取已选择的地址
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getSelectedAddressData() {
  logExecute('getSelectedAddressData from local cache');

  const key = storageKeyCollection.selectedAddressData;

  return getJsonFromLocalStorage(key) || null;
}

/**
 * 设置已选择的地址
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setSelectedAddressData(data) {
  logExecute('setSelectedAddressData to local cache');

  const key = storageKeyCollection.selectedAddressData;

  return saveJsonToLocalStorage(key, data || '');
}

/**
 * 移除已选择的地址
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeSelectedAddressData() {
  logExecute('removeSelectedAddressData');

  const key = storageKeyCollection.selectedAddressData;

  removeLocalStorage(key);
}

/**
 * 获取 launch option
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getLaunchOption() {
  logExecute('getLaunchOption from local cache');

  const key = storageKeyCollection.launchOption;

  return getJsonFromLocalStorage(key) || null;
}

/**
 * 设置 launch option
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setLaunchOption(data) {
  logExecute('setLaunchOption to local cache');

  const key = storageKeyCollection.launchOption;

  return saveJsonToLocalStorage(key, data || '');
}

/**
 * 移除 launch option
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeLaunchOption() {
  logExecute('removeLaunchOption');

  const key = storageKeyCollection.launchOption;

  removeLocalStorage(key);
}

/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */
export function clearCustomData() {
  flushLocalStorage();
}
