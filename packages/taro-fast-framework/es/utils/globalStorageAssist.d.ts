export function getNearestLocalhostNotifyCache(): any;
export function setNearestLocalhostNotifyCache(): void;
export function removeNearestLocalhostNotifyCache(): void;
export function getAccessWayCollectionCache(): {};
export function setAccessWayCollectionCache(o: any): void;
/**
 * 获取useParamsData缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getParamsDataCache(key: any): any;
/**
 * 设置useParamsData缓存
 *
 * @export
 * @param {o} useParamsData数据
 * @returns
 */
export function setParamsDataCache(key: any, o: any): void;
/**
 * 移除信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeParamsDataCache(key: any): void;
/**
 * 获取Token键名
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getTokenKeyName(): string;
export function getTokenObject(): {};
/**
 * Get Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getToken(): any;
/**
 * Set Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setToken(v: any): void;
/**
 * 移除Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeToken(): void;
/**
 * 获取CurrentUrl
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getCurrentUrl(): any;
/**
 * 设置CurrentUrl
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setCurrentUrl(url: any): void;
/**
 * 移除CurrentUrl
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeCurrentUrl(): void;
/**
 * 获取OpenId
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getOpenId(): any;
/**
 * 设置OpenId
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setOpenId(openId: any): void;
/**
 * 移除OpenId
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeOpenId(): void;
/**
 * 获取EffectiveCode
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getEffectiveCode(): any;
/**
 * 设置EffectiveCode
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setEffectiveCode(effectiveCode: any): void;
/**
 * 移除EffectiveCode
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeEffectiveCode(): void;
/**
 * 获取SessionId
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getSessionId(): any;
/**
 * 设置SessionId
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setSessionId(sessionId: any): void;
/**
 * 移除SessionId
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeSessionId(): void;
/**
 * 获取SessionIdRefreshing
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getSessionIdRefreshing(): boolean;
/**
 * 设置SessionIdRefreshing
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setSessionIdRefreshing(sessionIdRefreshing: any): void;
/**
 * 移除SessionIdRefreshing
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeSessionIdRefreshing(): void;
/**
 * 获取nextCheckLoginUnixTime
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getNextCheckLoginUnixTime(): number;
/**
 * 设置NextCheckLoginUnixTime
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setNextCheckLoginUnixTime(nextCheckLoginUnixTime: any): void;
/**
 * 移除NextCheckLoginUnixTime
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeNextCheckLoginUnixTime(): void;
/**
 * 获取LocationMode
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getLocationMode(): number;
/**
 * 设置LocationMode
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setLocationMode(locationMode: any): void;
/**
 * 获取map
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getMap(): any;
/**
 * 设置map
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setMap(map: any): void;
/**
 * 移除map
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeMap(): void;
/**
 * 获取经纬度信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getLocation(): any;
/**
 * 设置经纬度信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setLocation(location: any): void;
/**
 * 移除经纬度信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeLocation(): void;
/**
 * 获取是否需要同步用户信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getNeedSyncInfo(): boolean;
/**
 * 设置是否需要同步用户信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setNeedSyncInfo(need: any): void;
/**
 * 获取用户最后位置信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getLastLocation(): any;
/**
 * 设置用户最后位置信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setLastLocation(data: any): void;
/**
 * 获取remoteCheck缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getRemoteCheckCache(): any;
/**
 * 设置remoteCheck缓存,10秒钟过期
 *
 * @export
 * @param {o} metaData数据
 * @returns
 */
export function setRemoteCheckCache(o: any): void;
/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */
export function clearCustomData(): void;
export namespace storageKeyCollection {
    const token: string;
    const accessWayCollection: string;
    const nearestLocalhostNotify: string;
    const authorityCollection: string;
    const currentUrl: string;
    const openId: string;
    const location: string;
    const map: string;
    const effectiveCode: string;
    const sessionId: string;
    const sessionIdRefreshing: string;
    const nextCheckLoginUnixTime: string;
    const needSyncInfo: string;
    const lastLocation: string;
    const remoteCheck: string;
}
