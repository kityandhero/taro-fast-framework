import {
  getCache,
  hasCache,
  setCache,
} from 'taro-fast-common/es/utils/cacheAssist';
import {
  accessWaySpecialCollection,
  locationModeCollection,
} from 'taro-fast-common/es/utils/constants';
import {
  clearLocalStorage,
  getJsonFromLocalStorage,
  getStringFromLocalStorage,
  md5,
  recordDebug,
  recordExecute,
  recordInfo,
  recordWarn,
  removeLocalStorage,
  saveJsonToLocalStorage,
  saveStringToLocalStorage,
  showInfoMessage,
} from 'taro-fast-common/es/utils/tools';
import { isArray } from 'taro-fast-common/es/utils/typeCheck';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';

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
  modelNameList: 'modelNameList',
  metaData: 'metaData',
  administrativeDivisionFullData: 'administrativeDivisionFullData',
  selectedAddressData: 'selectedAddressData',
  launchOption: 'launchOption',
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
 * ??????useParamsData??????
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
 * ??????useParamsData??????
 *
 * @export
 * @param {o} useParamsData??????
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
 * ????????????
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeParamsDataCache(key) {
  removeLocalStorage(key);
}

/**
 * ??????Token??????
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
 * ??????Token
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
 * ??????CurrentUrl
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
 * ??????CurrentUrl
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
 * ??????CurrentUrl
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
 * ??????OpenId
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
 * ??????OpenId
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
 * ??????OpenId
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
 * ??????EffectiveCode
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
 * ??????EffectiveCode
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
 * ??????EffectiveCode
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
 * ??????Session
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getSession() {
  recordExecute('getSession');

  const key = storageKeyCollection.session;

  return getStringFromLocalStorage(key);
}

/**
 * ??????Session
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setSession(session) {
  recordDebug(`setSession ${session}`);

  const key = storageKeyCollection.session;

  saveStringToLocalStorage(key, session || '');
}

/**
 * ??????Session
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeSession() {
  recordInfo('removeSession');

  const key = storageKeyCollection.session;

  removeLocalStorage(key);
}

/**
 * ??????SessionRefreshing
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getSessionRefreshing() {
  const key = storageKeyCollection.sessionRefreshing;

  const v = getStringFromLocalStorage(key);

  recordDebug(`getSessionRefreshing: ${v === 'true'}`);

  return v === 'true';
}

/**
 * ??????SessionRefreshing
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setSessionRefreshing(sessionRefreshing) {
  recordDebug(`setSessionRefreshing ${sessionRefreshing}`);

  const key = storageKeyCollection.sessionRefreshing;

  saveStringToLocalStorage(key, sessionRefreshing || false ? 'true' : 'false');
}

/**
 * ??????SessionRefreshing
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeSessionRefreshing() {
  recordInfo('removeSessionRefreshing');

  const key = storageKeyCollection.sessionRefreshing;

  removeLocalStorage(key);
}

/**
 * ??????nextCheckLoginUnixTime
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
 * ??????NextCheckLoginUnixTime
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
 * ??????NextCheckLoginUnixTime
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
 * ??????LocationMode
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
 * ??????LocationMode
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
 * ??????map
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

    // ???????????????????????????30??????
    const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

    if (dataVersion !== now) {
      return null;
    }

    return data;
  }

  return data;
}

/**
 * ??????map
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setMap(map) {
  const key = storageKeyCollection.map;

  // ???????????????????????????30??????
  const nowVersion = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  map.dataVersion = nowVersion;

  return saveJsonToLocalStorage(key, map || '');
}

/**
 * ??????map
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
 * ?????????????????????
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

    // ???????????????????????????30??????
    const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

    if (dataVersion !== now) {
      return null;
    }

    return l;
  }

  return l;
}

/**
 * ?????????????????????
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setLocation(location) {
  const key = storageKeyCollection.location;

  // ???????????????????????????30??????
  const nowVersion = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  location.dataVersion = nowVersion;

  return saveJsonToLocalStorage(key, location || '');
}

/**
 * ?????????????????????
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
 * ????????????????????????????????????
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
 * ????????????????????????????????????
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
 * ??????????????????????????????
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
 * ??????????????????????????????
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setLastLocation(data) {
  if ((data || null) == null) {
    const text = '??????????????????????????????';

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
 * ??????remoteCheck??????
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
 * ??????remoteCheck??????,10????????????
 *
 * @export
 * @param {o} metaData??????
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
 * ??????????????????
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

  // ???????????????????????????30??????
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
 * ??????????????????
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setWeather(weather) {
  const key = storageKeyCollection.weather;

  // ???????????????????????????30??????
  const nowVersion = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  weather.dataVersion = nowVersion;

  const o = {
    data: weather,
    dataVersion: nowVersion,
  };

  return saveJsonToLocalStorage(key, o);
}

/**
 * ??????????????????
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
 * ???????????????????????????
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getCurrentCustomer() {
  recordExecute('getCurrentCustomer from local cache');

  const key = storageKeyCollection.currentCustomer;

  const o = getJsonFromLocalStorage(key);

  if ((o || null) == null) {
    return null;
  }

  const { dataVersion } = o;

  if ((dataVersion || null) == null) {
    return null;
  }

  // ???????????????30??????
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
 * ???????????????????????????
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setCurrentCustomer(data) {
  recordExecute('setCurrentCustomer to local cache');

  const key = storageKeyCollection.currentCustomer;

  // ???????????????30??????
  const nowVersion = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  const o = {
    data,
    dataVersion: nowVersion,
  };

  return saveJsonToLocalStorage(key, o);
}

/**
 * ???????????????????????????
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
 * ?????? modelNameList
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getModelNameList() {
  const key = storageKeyCollection.modelNameList;

  return getStringFromLocalStorage(key);
}

/**
 * ?????? modelNameList
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setModelNameList(modelNameList) {
  const key = storageKeyCollection.modelNameList;

  return saveStringToLocalStorage(key, modelNameList || '');
}

/**
 * ?????? modelNameList
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeModelNameList() {
  const key = storageKeyCollection.modelNameList;

  removeLocalStorage(key);
}

/**
 * ???????????????
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getCurrentMetaData() {
  recordExecute('getCurrentMetaData from local cache');

  const key = storageKeyCollection.metaData;

  const o = getJsonFromLocalStorage(key);

  if ((o || null) == null) {
    return null;
  }

  const { dataVersion } = o;

  if ((dataVersion || null) == null) {
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
 * ???????????????
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setCurrentMetaData(data) {
  recordExecute('setMetaData to local cache');

  const key = storageKeyCollection.metaData;

  // ???????????????30??????
  const nowVersion = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  const o = {
    data,
    dataVersion: nowVersion,
  };

  return saveJsonToLocalStorage(key, o);
}

/**
 * ???????????????
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeCurrentMetaData() {
  const key = storageKeyCollection.metaData;

  removeLocalStorage(key);
}

/**
 * ??????????????????????????????
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getAdministrativeDivisionFullData() {
  recordExecute('getAdministrativeDivisionFullData from local cache');

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
 * ??????????????????????????????
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setAdministrativeDivisionFullData(data) {
  recordExecute('setAdministrativeDivisionFullData to local cache');

  const key = storageKeyCollection.administrativeDivisionFullData;

  const l = isArray(data) ? data : [];

  const v = {
    list: l,
    flag: md5(l || []),
  };

  return saveJsonToLocalStorage(key, v);
}

/**
 * ??????????????????????????????
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeAdministrativeDivisionFullData() {
  recordExecute('removeAdministrativeDivisionFullData');

  const key = storageKeyCollection.administrativeDivisionFullData;

  removeLocalStorage(key);
}

/**
 * ????????????????????????
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getSelectedAddressData() {
  recordExecute('getSelectedAddressData from local cache');

  const key = storageKeyCollection.selectedAddressData;

  return getJsonFromLocalStorage(key) || null;
}

/**
 * ????????????????????????
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setSelectedAddressData(data) {
  recordExecute('setSelectedAddressData to local cache');

  const key = storageKeyCollection.selectedAddressData;

  return saveJsonToLocalStorage(key, data || '');
}

/**
 * ????????????????????????
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeSelectedAddressData() {
  recordExecute('removeSelectedAddressData');

  const key = storageKeyCollection.selectedAddressData;

  removeLocalStorage(key);
}

/**
 * ?????? launch option
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getLaunchOption() {
  recordExecute('getLaunchOption from local cache');

  const key = storageKeyCollection.launchOption;

  return getJsonFromLocalStorage(key) || null;
}

/**
 * ?????? launch option
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setLaunchOption(data) {
  recordExecute('setLaunchOption to local cache');

  const key = storageKeyCollection.launchOption;

  return saveJsonToLocalStorage(key, data || '');
}

/**
 * ?????? launch option
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeLaunchOption() {
  recordExecute('removeLaunchOption');

  const key = storageKeyCollection.launchOption;

  removeLocalStorage(key);
}

/**
 * ??????LocalStorage??????
 * @export
 * @param {*} key
 */
export function clearCustomData() {
  clearLocalStorage();
}
