import {
  getJsonFromLocalStorage,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from 'easy-soft-utility';

const storageKeyCollection = {
  weather: 'weather',
};

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
  const now = Number.parseInt(Date.now() / 1000 / 60 / 30, 10);

  if (dataVersion !== now) {
    return null;
  }

  const { data } = {
    data: null,
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
  const nowVersion = Number.parseInt(Date.now() / 1000 / 60 / 30, 10);

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
