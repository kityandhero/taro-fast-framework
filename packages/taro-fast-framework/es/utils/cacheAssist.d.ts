/**
 * 获取缓存池
 * @export
 */
export function getCachePool(): any;
/**
 * Returns boolean indicating if the key is cached
 * @param {*} key
 * @returns
 */
export function hasCache({ key }: any): any;
/**
 * Sets a key value pair. It is possible to define a ttl (in seconds). Returns true on success
 * @param {*} key
 * @param {*} value
 * @param {*} expiration
 */
export function setCache({ key, value, expiration }: any): any;
/**
 * Sets multiple key val pairs. It is possible to define a ttl (seconds). Returns true on success
 * @param {*} list
 * @returns
 */
export function setMultiCache(list: any): any;
/**
 * a timestamp in ms representing the time at which the key will expire
 * @param {*} key
 * @returns
 */
export function getExpiration({ key }: any): any;
/**
 * Redefine the ttl of a key. Returns true if the key has been found and changed. Otherwise returns false. If the ttl-argument isn't passed the default-TTL will be used.
 * The key will be deleted when passing in a ttl < 0
 * @param {*} key
 * @param {*} expiration
 * @returns
 */
export function setExpiration({ key, expiration }: any): any;
/**
 * Gets a saved value from the cache. Returns a undefined if not found or expired. If the value was found it returns the value
 * @param {*} key
 * @returns
 */
export function getCache({ key }: any): any;
/**
 * Gets multiple saved values from the cache. Returns an empty object {} if not found or expired. If the value was found it returns an object with the key value pair.
 * @param {*} list
 * @returns
 */
export function getMultiCache(list: any): any;
/**
 * get the cached value and remove the key from the cache.
 * @param {*} key
 * @returns
 */
export function takeCache({ key }: any): any;
/**
 * delete a key. Returns the number of deleted entries. A delete will never fail.
 * @param {*} key
 * @returns
 */
export function deleteCache({ key }: any): any;
/**
 * Delete multiple keys. Returns the number of deleted entries. A delete will never fail.
 * @param {*} list
 * @returns
 */
export function deleteMultiCache(list: any): any;
/**
 * Flush all data.
 * @returns
 */
export function flushAllCache(): any;
/**
 * Returns the statistics.
 * @returns
 */
export function statisticsCache(): any;
/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function emptyExport(): {};
