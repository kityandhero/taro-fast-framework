import '../classCallCheck.js';
import '../defineProperty.js';
import { _ as _objectSpread2 } from '../objectSpread2.js';
import './mediaDefault.js';
import { accessWaySpecialCollection, locationModeCollection } from './constants.js';
import 'lodash';
import { isArray } from './typeCheck.js';
import { toNumber } from './typeConvert.js';
import '@tarojs/taro';
import './tips.js';
import { getJsonFromLocalStorage, saveJsonToLocalStorage, removeLocalStorage, getStringFromLocalStorage, saveStringToLocalStorage, showInfoMessage, clearLocalStorage } from './tools.js';
import 'qs';
import 'node-cache';
import { hasCache, getCache, setCache } from './cacheAssist.js';

var storageKeyCollection = {
  token: "token",
  accessWayCollection: "accessWayCollection",
  nearestLocalhostNotify: "nearestLocalhostNotify",
  authorityCollection: "authorityCollection",
  currentUrl: "currentUrl",
  openId: "openId",
  location: "location",
  map: "map",
  effectiveCode: "effectiveCode",
  sessionId: "sessionId",
  sessionIdRefreshing: "sessionIdRefreshing",
  nextCheckLoginUnixTime: "nextCheckLoginUnixTime",
  needSyncInfo: "needSyncInfo",
  lastLocation: "lastLocation",
  remoteCheck: "remoteCheck"
};
function getNearestLocalhostNotifyCache() {
  var key = storageKeyCollection.nearestLocalhostNotify;
  var d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  if ((d.nearestTime || null) == null) {
    return null;
  }

  return d || null;
}
function setNearestLocalhostNotifyCache() {
  var key = storageKeyCollection.nearestLocalhostNotify;
  var now = parseInt(new Date().getTime() / 1000, 10);
  var d = {
    nearestTime: now
  };
  return saveJsonToLocalStorage(key, d);
}
function removeNearestLocalhostNotifyCache() {
  var key = storageKeyCollection.nearestLocalhostNotify;
  removeLocalStorage(key);
}
function getAccessWayCollectionCache() {
  var result = {};
  var key = storageKeyCollection.accessWayCollection;
  var existCache = hasCache({
    key: key
  });

  if (existCache) {
    result = getCache({
      key: key
    });

    if (isArray(result)) {
      return result;
    }
  }

  var d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return _objectSpread2({}, accessWaySpecialCollection || {});
  }

  result = _objectSpread2(_objectSpread2({}, d || null), accessWaySpecialCollection || {});
  setCache({
    key: key,
    value: result
  });
  return result;
}
function setAccessWayCollectionCache(o) {
  var key = storageKeyCollection.accessWayCollection;
  saveJsonToLocalStorage(key, o || {});
}
/**
 * 获取useParamsData缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */

function getParamsDataCache(key) {
  var d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    removeParamsDataCache(key);
    return null;
  }

  if ((d.dataVersion || "") === "") {
    removeParamsDataCache(key);
    return null;
  }

  var now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

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

function setParamsDataCache(key, o) {
  var now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);
  var d = {
    useParamsData: o || null,
    dataVersion: now
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

function removeParamsDataCache(key) {
  removeLocalStorage(key);
}
/**
 * 获取Token键名
 *
 * @export
 * @param {*} fn
 * @returns
 */

function getTokenKeyName() {
  return storageKeyCollection.token;
}
function getTokenObject() {
  var tokenSetObject = {};
  tokenSetObject["".concat(getTokenKeyName())] = getToken() || "";
  return tokenSetObject;
}
/**
 * Get Token
 *
 * @export
 * @param {*} fn
 * @returns
 */

function getToken() {
  var key = storageKeyCollection.token;
  return getStringFromLocalStorage(key);
}
/**
 * Set Token
 *
 * @export
 * @param {*} fn
 * @returns
 */

function setToken(v) {
  var key = storageKeyCollection.token;
  return saveStringToLocalStorage(key, v);
}
/**
 * 移除Token
 *
 * @export
 * @param {*} fn
 * @returns
 */

function removeToken() {
  var key = storageKeyCollection.token;
  return removeLocalStorage(key);
}
/**
 * 获取CurrentUrl
 *
 * @export
 * @param {*} fn
 * @returns
 */

function getCurrentUrl() {
  var key = storageKeyCollection.currentUrl;
  return getJsonFromLocalStorage(key);
}
/**
 * 设置CurrentUrl
 *
 * @export
 * @param {*} fn
 * @returns
 */

function setCurrentUrl(url) {
  var key = storageKeyCollection.currentUrl;
  var isTab = (url || "").startsWith("/pages/");
  var data = {
    url: url || "",
    isTab: isTab
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

function removeCurrentUrl() {
  var key = storageKeyCollection.currentUrl;
  removeLocalStorage(key);
}
/**
 * 获取OpenId
 *
 * @export
 * @param {*} fn
 * @returns
 */

function getOpenId() {
  var key = storageKeyCollection.openId;
  return getStringFromLocalStorage(key);
}
/**
 * 设置OpenId
 *
 * @export
 * @param {*} fn
 * @returns
 */

function setOpenId(openId) {
  var key = storageKeyCollection.openId;
  return saveStringToLocalStorage(key, openId || "");
}
/**
 * 移除OpenId
 *
 * @export
 * @param {*} fn
 * @returns
 */

function removeOpenId() {
  var key = storageKeyCollection.openId;
  removeLocalStorage(key);
}
/**
 * 获取EffectiveCode
 *
 * @export
 * @param {*} fn
 * @returns
 */

function getEffectiveCode() {
  var key = storageKeyCollection.effectiveCode;
  return getStringFromLocalStorage(key);
}
/**
 * 设置EffectiveCode
 *
 * @export
 * @param {*} fn
 * @returns
 */

function setEffectiveCode(effectiveCode) {
  var key = storageKeyCollection.effectiveCode;
  saveStringToLocalStorage(key, effectiveCode || "");
}
/**
 * 移除EffectiveCode
 *
 * @export
 * @param {*} fn
 * @returns
 */

function removeEffectiveCode() {
  var key = storageKeyCollection.effectiveCode;
  removeLocalStorage(key);
}
/**
 * 获取SessionId
 *
 * @export
 * @param {*} fn
 * @returns
 */

function getSessionId() {
  var key = storageKeyCollection.sessionId;
  return getStringFromLocalStorage(key);
}
/**
 * 设置SessionId
 *
 * @export
 * @param {*} fn
 * @returns
 */

function setSessionId(sessionId) {
  var key = storageKeyCollection.sessionId;
  saveStringToLocalStorage(key, sessionId || "");
}
/**
 * 移除SessionId
 *
 * @export
 * @param {*} fn
 * @returns
 */

function removeSessionId() {
  var key = storageKeyCollection.sessionId;
  removeLocalStorage(key);
}
/**
 * 获取SessionIdRefreshing
 *
 * @export
 * @param {*} fn
 * @returns
 */

function getSessionIdRefreshing() {
  var key = storageKeyCollection.sessionIdRefreshing;
  var v = getStringFromLocalStorage(key);
  return v === "true";
}
/**
 * 设置SessionIdRefreshing
 *
 * @export
 * @param {*} fn
 * @returns
 */

function setSessionIdRefreshing(sessionIdRefreshing) {
  var key = storageKeyCollection.sessionIdRefreshing;
  saveStringToLocalStorage(key, sessionIdRefreshing || false ? "true" : "false");
}
/**
 * 移除SessionIdRefreshing
 *
 * @export
 * @param {*} fn
 * @returns
 */

function removeSessionIdRefreshing() {
  var key = storageKeyCollection.sessionIdRefreshing;
  removeLocalStorage(key);
}
/**
 * 获取nextCheckLoginUnixTime
 *
 * @export
 * @param {*} fn
 * @returns
 */

function getNextCheckLoginUnixTime() {
  var key = storageKeyCollection.nextCheckLoginUnixTime;
  return toNumber(getStringFromLocalStorage(key));
}
/**
 * 设置NextCheckLoginUnixTime
 *
 * @export
 * @param {*} fn
 * @returns
 */

function setNextCheckLoginUnixTime(nextCheckLoginUnixTime) {
  var key = storageKeyCollection.nextCheckLoginUnixTime;
  saveStringToLocalStorage(key, nextCheckLoginUnixTime || "");
}
/**
 * 移除NextCheckLoginUnixTime
 *
 * @export
 * @param {*} fn
 * @returns
 */

function removeNextCheckLoginUnixTime() {
  var key = storageKeyCollection.nextCheckLoginUnixTime;
  removeLocalStorage(key);
}
/**
 * 获取LocationMode
 *
 * @export
 * @param {*} fn
 * @returns
 */

function getLocationMode() {
  var key = storageKeyCollection.locationMode;
  var s = getStringFromLocalStorage(key);
  var v = parseInt(s, 10);
  return v === locationModeCollection.auto || v === locationModeCollection.custom ? v : locationModeCollection.unknown;
}
/**
 * 设置LocationMode
 *
 * @export
 * @param {*} fn
 * @returns
 */

function setLocationMode(locationMode) {
  var key = storageKeyCollection.locationMode;

  if (locationMode === locationModeCollection.custom) {
    removeMap();
  }

  var v = parseInt(locationMode || 0 ? locationMode : locationModeCollection.unknown, 10);
  saveStringToLocalStorage(key, v === locationModeCollection.auto || v === locationModeCollection.custom ? v : locationModeCollection.unknown);
}
/**
 * 获取map
 *
 * @export
 * @param {*} fn
 * @returns
 */

function getMap() {
  var key = storageKeyCollection.map;
  var data = getJsonFromLocalStorage(key);

  if ((data || null) == null) {
    return null;
  }

  var locationMode = getLocationMode();

  if (locationMode === locationModeCollection.auto) {
    var dataVersion = data.dataVersion;

    if ((dataVersion || null) == null) {
      return null;
    } // 地理位置信息有效期30分钟


    var now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

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

function setMap(map) {
  var key = storageKeyCollection.map; // 地理位置信息有效期30分钟

  var nowVersion = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);
  map.dataVersion = nowVersion;
  return saveJsonToLocalStorage(key, map || "");
}
/**
 * 移除map
 *
 * @export
 * @param {*} fn
 * @returns
 */

function removeMap() {
  var key = storageKeyCollection.map;
  removeLocalStorage(key);
}
/**
 * 获取经纬度信息
 *
 * @export
 * @param {*} fn
 * @returns
 */

function getLocation() {
  var key = storageKeyCollection.location;
  var l = getJsonFromLocalStorage(key);

  if ((l || null) == null) {
    return null;
  }

  var locationMode = getLocationMode();

  if (locationMode === locationModeCollection.auto) {
    var dataVersion = l.dataVersion;

    if ((dataVersion || null) == null) {
      return null;
    } // 地理位置信息有效期30分钟


    var now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

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

function setLocation(location) {
  var key = storageKeyCollection.location; // 地理位置信息有效期30分钟

  var nowVersion = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);
  location.dataVersion = nowVersion;
  return saveJsonToLocalStorage(key, location || "");
}
/**
 * 移除经纬度信息
 *
 * @export
 * @param {*} fn
 * @returns
 */

function removeLocation() {
  var key = storageKeyCollection.location;
  removeLocalStorage(key);
}
/**
 * 获取是否需要同步用户信息
 *
 * @export
 * @param {*} fn
 * @returns
 */

function getNeedSyncInfo() {
  var key = storageKeyCollection.needSyncInfo;
  var need = (getStringFromLocalStorage(key) || "") === "0";
  return need;
}
/**
 * 设置是否需要同步用户信息
 *
 * @export
 * @param {*} fn
 * @returns
 */

function setNeedSyncInfo(need) {
  var key = storageKeyCollection.needSyncInfo;
  saveStringToLocalStorage(key, "".concat((need || false) == false ? 0 : 1));
}
/**
 * 获取用户最后位置信息
 *
 * @export
 * @param {*} fn
 * @returns
 */

function getLastLocation() {
  var key = storageKeyCollection.lastLocation;
  var data = getJsonFromLocalStorage(key);

  if (data != null) {
    var location = data.location;

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

function setLastLocation(data) {
  if ((data || null) == null) {
    var text = "无法存数无效位置数据";
    showInfoMessage({
      message: text
    });
    return;
  }

  var key = storageKeyCollection.lastLocation;
  var lastLocation = {
    location: data,
    version: 0
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

function getRemoteCheckCache() {
  var key = storageKeyCollection.remoteCheck;
  var d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  if ((d.dataVersion || null) === null) {
    return null;
  }

  var now = parseInt(new Date().getTime() / 1000 / 10, 10);

  if (d.dataVersion !== now) {
    return null;
  }

  return d.data || null;
}
/**
 * 设置remoteCheck缓存,10秒钟过期
 *
 * @export
 * @param {o} metaData数据
 * @returns
 */

function setRemoteCheckCache(o) {
  var key = storageKeyCollection.remoteCheck;
  var now = parseInt(new Date().getTime() / 1000 / 10, 10);
  var d = {
    data: o || null,
    dataVersion: now
  };
  return saveJsonToLocalStorage(key, d);
}
/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */

function clearCustomData() {
  clearLocalStorage();
}

export { clearCustomData, getAccessWayCollectionCache, getCurrentUrl, getEffectiveCode, getLastLocation, getLocation, getLocationMode, getMap, getNearestLocalhostNotifyCache, getNeedSyncInfo, getNextCheckLoginUnixTime, getOpenId, getParamsDataCache, getRemoteCheckCache, getSessionId, getSessionIdRefreshing, getToken, getTokenKeyName, getTokenObject, removeCurrentUrl, removeEffectiveCode, removeLocation, removeMap, removeNearestLocalhostNotifyCache, removeNextCheckLoginUnixTime, removeOpenId, removeParamsDataCache, removeSessionId, removeSessionIdRefreshing, removeToken, setAccessWayCollectionCache, setCurrentUrl, setEffectiveCode, setLastLocation, setLocation, setLocationMode, setMap, setNearestLocalhostNotifyCache, setNeedSyncInfo, setNextCheckLoginUnixTime, setOpenId, setParamsDataCache, setRemoteCheckCache, setSessionId, setSessionIdRefreshing, setToken, storageKeyCollection };
