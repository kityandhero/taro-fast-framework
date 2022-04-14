import {
  removeLocalStorage,
  getJsonFromLocalStorage,
  getStringFromLocalStorage,
  saveJsonToLocalStorage,
  saveStringToLocalStorage,
  clearLocalStorage,
  showInfoMessage,
  recordWarn,
  recordDebug,
  recordInfo,
} from 'taro-fast-common/es/utils/tools';
import { isArray } from 'taro-fast-common/es/utils/typeCheck';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';
import {
  hasCache,
  setCache,
  getCache,
} from 'taro-fast-common/es/utils/cacheAssist';
import {
  locationModeCollection,
  accessWaySpecialCollection,
} from 'taro-fast-common/es/utils/constants';

export const storageKeyCollection = {
  token: 'token',
  accessWayCollection: 'accessWayCollection',
  nearestLocalhostNotify: 'nearestLocalhostNotify',
  authorityCollection: 'authorityCollection',
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
};

export function getNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  if ((d.nearestTime || null) == null) {
    return null;
  }

  return d || null;
}

export function setNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;

  const now = parseInt(new Date().getTime() / 1000, 10);

  const d = {
    nearestTime: now,
  };

  return saveJsonToLocalStorage(key, d);
}

export function removeNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;
  removeLocalStorage(key);
}

export function getAccessWayCollectionCache() {
  let result = {};

  const key = storageKeyCollection.accessWayCollection;

  const existCache = hasCache({ key });

  if (existCache) {
    result = getCache({ key });

    if (isArray(result)) {
      return result;
    }
  }

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return { ...(accessWaySpecialCollection || {}) };
  }

  result = { ...(d || null), ...(accessWaySpecialCollection || {}) };

  setCache({
    key,
    value: result,
  });

  return result;
}

export function setAccessWayCollectionCache(o) {
  const key = storageKeyCollection.accessWayCollection;

  saveJsonToLocalStorage(key, o || {});
}

/**
 * 获取useParamsData缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getParamsDataCache(key) {
  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    removeParamsDataCache(key);
    return null;
  }

  if ((d.dataVersion || '') === '') {
    removeParamsDataCache(key);
    return null;
  }

  const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  if (d.dataVersion < now) {
    removeParamsDataCache(key);
    return null;
  }

  return d.useParamsData || null;
}

/**
 * 设置useParamsData缓存
 *
 * @export
 * @param {o} useParamsData数据
 * @returns
 */
export function setParamsDataCache(key, o) {
  const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  const d = {
    useParamsData: o || null,
    dataVersion: now,
  };

  return saveJsonToLocalStorage(key, d);
}

/**
 * 移除信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeParamsDataCache(key) {
  removeLocalStorage(key);
}

/**
 * 获取Token键名
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getTokenKeyName() {
  return storageKeyCollection.token;
}

export function getTokenObject() {
  const tokenSetObject = {};
  tokenSetObject[`${getTokenKeyName()}`] = getToken() || '';

  return tokenSetObject;
}

/**
 * Get Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getToken() {
  const key = storageKeyCollection.token;

  const token = getStringFromLocalStorage(key);

  if ((token || null) == null) {
    setToken('');
  }

  return token;
}

/**
 * Set Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setToken(v) {
  const key = storageKeyCollection.token;

  return saveStringToLocalStorage(key, v);
}

/**
 * 移除Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeToken() {
  const key = storageKeyCollection.token;

  return removeLocalStorage(key);
}

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
  recordInfo('info getSession');

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
  recordInfo(`info setSession ${session}`);

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
  recordInfo('info removeSession');

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
  recordInfo('info getSessionRefreshing');

  const key = storageKeyCollection.sessionRefreshing;

  const v = getStringFromLocalStorage(key);

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
  recordInfo(`info setSessionRefreshing ${sessionRefreshing}`);

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
  recordInfo('info removeSessionRefreshing');

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
      message: text,
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
  recordDebug('exec getCurrentCustomer from local cache');

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
    recordWarn('info current customer cache expired, will return null');

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
  recordDebug('exec setCurrentCustomer to local cache');

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
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */
export function clearCustomData() {
  clearLocalStorage();
}
