import {
  getJsonFromLocalStorage,
  getStringFromLocalStorage,
  logTrace,
  removeLocalStorage,
  saveJsonToLocalStorage,
  saveStringToLocalStorage,
  showSimpleInfoMessage,
} from 'easy-soft-utility';

import { locationModeCollection } from 'taro-fast-common';

import { buildPromptModuleInfoText } from './definition';

/**
 * Module Name.
 */
const moduleName = 'locationAssist';

const storageKeyCollection = {
  location: 'location',
  locationMode: 'locationMode',
  map: 'map',
  lastLocation: 'lastLocation',
};

/**
 * 获取经纬度信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getLocation() {
  logTrace({}, buildPromptModuleInfoText(moduleName, 'getLocation'));

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
    const now = Number.parseInt(Date.now() / 1000 / 60 / 30, 10);

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
  logTrace({ location }, buildPromptModuleInfoText(moduleName, 'setLocation'));

  const key = storageKeyCollection.location;

  // 地理位置信息有效期30分钟
  const nowVersion = Number.parseInt(Date.now() / 1000 / 60 / 30, 10);

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
  logTrace({}, buildPromptModuleInfoText(moduleName, 'removeLocation'));

  const key = storageKeyCollection.location;

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
  logTrace({}, buildPromptModuleInfoText(moduleName, 'getLocationMode'));

  const key = storageKeyCollection.locationMode;

  const s = getStringFromLocalStorage(key);

  const v = Number.parseInt(s, 10);

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
  logTrace(
    { locationMode },
    buildPromptModuleInfoText(moduleName, 'setLocationMode'),
  );

  const key = storageKeyCollection.locationMode;

  if (locationMode === locationModeCollection.custom) {
    removeMap();
  }

  const v = Number.parseInt(
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
  logTrace({}, buildPromptModuleInfoText(moduleName, 'getMap'));

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
    const now = Number.parseInt(Date.now() / 1000 / 60 / 30, 10);

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
  logTrace({ map }, buildPromptModuleInfoText(moduleName, 'setMap'));

  const key = storageKeyCollection.map;

  // 地理位置信息有效期30分钟
  const nowVersion = Number.parseInt(Date.now() / 1000 / 60 / 30, 10);

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
  logTrace({}, buildPromptModuleInfoText(moduleName, 'removeMap'));

  const key = storageKeyCollection.map;

  removeLocalStorage(key);
}

/**
 * 获取用户最后位置信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getLastLocation() {
  logTrace({}, buildPromptModuleInfoText(moduleName, 'getLastLocation'));

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
  logTrace(
    arguments[0],
    buildPromptModuleInfoText(moduleName, 'setLastLocation'),
  );

  if ((data || null) == null) {
    const text = '无法存数无效位置数据';

    showSimpleInfoMessage(text);

    return;
  }

  const key = storageKeyCollection.lastLocation;

  const lastLocation = {
    location: data,
    version: 0,
  };

  saveJsonToLocalStorage(key, lastLocation || {});
}
