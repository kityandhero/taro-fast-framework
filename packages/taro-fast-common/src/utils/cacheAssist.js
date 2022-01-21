import nodeCache from 'node-cache';
import {
  recordError,
  stringIsNullOrWhiteSpace,
  getTaroGlobalData,
} from './tools';
import { isArray, isNumber, isString } from './typeCheck';

function checkKey(key) {
  if (stringIsNullOrWhiteSpace(key)) {
    throw new Error('cache key is null or empty');
  }

  if (!(isString(key) || isNumber(key))) {
    recordError(key);

    throw new Error(
      'cache key must be string or number,you can check it in console',
    );
  }
}

/**
 * 获取缓存池
 * @export
 */
export function getCachePool() {
  const taroGlobalData = getTaroGlobalData();

  if (taroGlobalData) {
    if ((taroGlobalData.localRunningCache || null) == null) {
      taroGlobalData.localRunningCache = new nodeCache();
    }

    return taroGlobalData.localRunningCache;
  }

  return null;
}

/**
 * Returns boolean indicating if the key is cached
 * @param {*} key
 * @returns
 */
export function hasCache({ key }) {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.has(key);
}

/**
 * Sets a key value pair. It is possible to define a ttl (in seconds). Returns true on success
 * @param {*} key
 * @param {*} value
 * @param {*} expiration
 */
export function setCache({ key, value, expiration = 0 }) {
  checkKey(key);

  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.set(key, value, expiration);
}

/**
 * Sets multiple key val pairs. It is possible to define a ttl (seconds). Returns true on success
 * @param {*} list
 * @returns
 */
export function setMultiCache(list) {
  if (!isArray(list)) {
    throw new Error('setMultiCache: list must be array');
  }

  if (list.length <= 0) {
    return true;
  }

  const listData = [];

  list.forEach((o) => {
    const { key, value, expiration } = {
      ...{ key: '', value: '', expiration: 0 },
      ...o,
    };

    if (!stringIsNullOrWhiteSpace(key)) {
      checkKey(key);

      listData.push({
        key,
        value,
        ttl: expiration,
      });
    }
  });

  if (listData.length <= 0) {
    return false;
  }

  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.mset(listData);
}

/**
 * a timestamp in ms representing the time at which the key will expire
 * @param {*} key
 * @returns
 */
export function getExpiration({ key }) {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.getTtl(key);
}

/**
 * Redefine the ttl of a key. Returns true if the key has been found and changed. Otherwise returns false. If the ttl-argument isn't passed the default-TTL will be used.
 * The key will be deleted when passing in a ttl < 0
 * @param {*} key
 * @param {*} expiration
 * @returns
 */
export function setExpiration({ key, expiration }) {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.ttl(key, expiration);
}

/**
 * Gets a saved value from the cache. Returns a undefined if not found or expired. If the value was found it returns the value
 * @param {*} key
 * @returns
 */
export function getCache({ key }) {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.get(key);
}

/**
 * Gets multiple saved values from the cache. Returns an empty object {} if not found or expired. If the value was found it returns an object with the key value pair.
 * @param {*} list
 * @returns
 */
export function getMultiCache(list) {
  if (!isArray(list)) {
    throw new Error('getMultiCache: list must be array');
  }

  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.mget(list);
}

/**
 * get the cached value and remove the key from the cache.
 * @param {*} key
 * @returns
 */
export function takeCache({ key }) {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.take(key);
}

/**
 * delete a key. Returns the number of deleted entries. A delete will never fail.
 * @param {*} key
 * @returns
 */
export function deleteCache({ key }) {
  checkKey(key);

  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.del(key);
}

/**
 * Delete multiple keys. Returns the number of deleted entries. A delete will never fail.
 * @param {*} list
 * @returns
 */
export function deleteMultiCache(list) {
  if (!isArray(list)) {
    throw new Error('deleteMultiCache: list must be array');
  }

  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.del(list);
}

/**
 * Flush all data.
 * @returns
 */
export function flushAllCache() {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.flushAll();
}

/**
 * Returns the statistics.
 * @returns
 */
export function statisticsCache() {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.getStats();
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function emptyExport() {
  return {};
}
