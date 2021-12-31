import '../classCallCheck.js';
import '../defineProperty.js';
import { _ as _objectSpread2 } from '../objectSpread2.js';
import './mediaDefault.js';
import './constants.js';
import 'lodash';
import { isArray, isString, isNumber } from './typeCheck.js';
import './typeConvert.js';
import '@tarojs/taro';
import './tips.js';
import { stringIsNullOrWhiteSpace, recordError } from './tools.js';
import 'qs';
import nodeCache from 'node-cache';

function checkKey(key) {
  if (stringIsNullOrWhiteSpace(key)) {
    throw new Error("cache key is null or empty");
  }

  if (!(isString(key) || isNumber(key))) {
    recordError(key);
    throw new Error("cache key must be string or number,you can check it in console");
  }
}
/**
 * 获取缓存池
 * @export
 */


function getCachePool() {
  if ((window.localRunningCache || null) == null) {
    window.localRunningCache = new nodeCache();
  }

  return window.localRunningCache;
}
/**
 * Returns boolean indicating if the key is cached
 * @param {*} key
 * @returns
 */

function hasCache(_ref) {
  var key = _ref.key;
  var cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error("cache pool not exist");
  }

  return cachePool.has(key);
}
/**
 * Sets a key value pair. It is possible to define a ttl (in seconds). Returns true on success
 * @param {*} key
 * @param {*} value
 * @param {*} expiration
 */

function setCache(_ref2) {
  var key = _ref2.key,
      value = _ref2.value,
      _ref2$expiration = _ref2.expiration,
      expiration = _ref2$expiration === void 0 ? 0 : _ref2$expiration;
  checkKey(key);
  var cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error("cache pool not exist");
  }

  return cachePool.set(key, value, expiration);
}
/**
 * Sets multiple key val pairs. It is possible to define a ttl (seconds). Returns true on success
 * @param {*} list
 * @returns
 */

function setMultiCache(list) {
  if (!isArray(list)) {
    throw new Error("setMultiCache: list must be array");
  }

  if (list.length <= 0) {
    return true;
  }

  var listData = [];
  list.forEach(function (o) {
    var _key$value$expiration = _objectSpread2(_objectSpread2({}, {
      key: "",
      value: "",
      expiration: 0
    }), o),
        key = _key$value$expiration.key,
        value = _key$value$expiration.value,
        expiration = _key$value$expiration.expiration;

    if (!stringIsNullOrWhiteSpace(key)) {
      checkKey(key);
      listData.push({
        key: key,
        value: value,
        ttl: expiration
      });
    }
  });

  if (listData.length <= 0) {
    return false;
  }

  var cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error("cache pool not exist");
  }

  return cachePool.mset(listData);
}
/**
 * a timestamp in ms representing the time at which the key will expire
 * @param {*} key
 * @returns
 */

function getExpiration(_ref3) {
  var key = _ref3.key;
  var cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error("cache pool not exist");
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

function setExpiration(_ref4) {
  var key = _ref4.key,
      expiration = _ref4.expiration;
  var cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error("cache pool not exist");
  }

  return cachePool.ttl(key, expiration);
}
/**
 * Gets a saved value from the cache. Returns a undefined if not found or expired. If the value was found it returns the value
 * @param {*} key
 * @returns
 */

function getCache(_ref5) {
  var key = _ref5.key;
  var cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error("cache pool not exist");
  }

  return cachePool.get(key);
}
/**
 * Gets multiple saved values from the cache. Returns an empty object {} if not found or expired. If the value was found it returns an object with the key value pair.
 * @param {*} list
 * @returns
 */

function getMultiCache(list) {
  if (!isArray(list)) {
    throw new Error("getMultiCache: list must be array");
  }

  var cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error("cache pool not exist");
  }

  return cachePool.mget(list);
}
/**
 * get the cached value and remove the key from the cache.
 * @param {*} key
 * @returns
 */

function takeCache(_ref6) {
  var key = _ref6.key;
  var cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error("cache pool not exist");
  }

  return cachePool.take(key);
}
/**
 * delete a key. Returns the number of deleted entries. A delete will never fail.
 * @param {*} key
 * @returns
 */

function deleteCache(_ref7) {
  var key = _ref7.key;
  checkKey(key);
  var cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error("cache pool not exist");
  }

  return cachePool.del(key);
}
/**
 * Delete multiple keys. Returns the number of deleted entries. A delete will never fail.
 * @param {*} list
 * @returns
 */

function deleteMultiCache(list) {
  if (!isArray(list)) {
    throw new Error("deleteMultiCache: list must be array");
  }

  var cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error("cache pool not exist");
  }

  return cachePool.del(list);
}
/**
 * Flush all data.
 * @returns
 */

function flushAllCache() {
  var cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error("cache pool not exist");
  }

  return cachePool.flushAll();
}
/**
 * Returns the statistics.
 * @returns
 */

function statisticsCache() {
  var cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error("cache pool not exist");
  }

  return cachePool.getStats();
}
/**
 * 占位函数
 *
 * @export
 * @returns
 */

function emptyExport() {
  return {};
}

export { deleteCache, deleteMultiCache, emptyExport, flushAllCache, getCache, getCachePool, getExpiration, getMultiCache, hasCache, setCache, setExpiration, setMultiCache, statisticsCache, takeCache };
