import {
  flushAllCache,
  getCache,
  hasCache,
  setCache,
} from 'taro-fast-common/es/utils/cacheAssist';
import {
  getStringFromLocalStorage,
  getValueByKey,
  recordError,
  recordObject,
  saveJsonToLocalStorage,
  showErrorMessage,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import {
  isArray,
  isObject,
  isString,
} from 'taro-fast-common/es/utils/typeCheck';

import {
  getAccessWayCollectionCache,
  storageKeyCollection,
} from './globalStorageAssist';

const authorityCollectionCache = 'authorityCollectionCache';
const superPermissionCacheKey = 'hasSuperPermission';

function getAllAuthorityCore() {
  let result = [];

  const existCache = hasCache({ key: authorityCollectionCache });

  if (existCache) {
    result = getCache({ key: authorityCollectionCache });

    if (isArray(result)) {
      return result;
    }
  }

  const authorityString = getStringFromLocalStorage(
    storageKeyCollection.authorityCollection,
  );

  let authority;

  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    result.push(authority);
  } else {
    result = isArray(authority) ? authority : [];
  }

  setCache({
    key: authorityCollectionCache,
    value: result,
  });

  return result;
}

function getSuperPermission() {
  let result = '';

  const accessWayCollection = getAccessWayCollectionCache();

  if (!isObject(accessWayCollection)) {
    return result;
  }

  const superPermission = getValueByKey({
    data: accessWayCollection,
    key: 'super',
  });

  if (isObject(superPermission)) {
    const superAuth = getValueByKey({
      data: superPermission,
      key: 'permission',
    });

    if (isString(superAuth)) {
      result = superAuth;
    }
  }

  return result;
}

function getAllAuthority() {
  return getAllAuthorityCore();
}

export function checkIsSuper() {
  const existCache = hasCache({ key: superPermissionCacheKey });

  if (existCache) {
    const result = getCache({ key: superPermissionCacheKey });

    if (result !== undefined) {
      return !!result;
    }
  }

  const superPermission = getSuperPermission();

  if (!stringIsNullOrWhiteSpace(superPermission)) {
    const list = getAllAuthority();
    const isSuper = (list || []).find((o) => o === superPermission) || '';

    if (isSuper === superPermission) {
      setCache({
        key: superPermissionCacheKey,
        value: true,
      });

      return true;
    }
  }

  setCache({
    key: superPermissionCacheKey,
    value: false,
  });

  return false;
}

function checkHasAuthorities(authCollection) {
  let result = false;

  if (isArray(authCollection)) {
    authCollection.forEach((auth) => {
      result = checkHasAuthorityCore(auth);

      if (result) {
        return true;
      }
    });

    for (const auth in authCollection) {
      result = checkHasAuthorityCore(auth);

      if (result) {
        break;
      }
    }

    return result;
  }

  if (isString(authCollection)) {
    result = checkHasAuthorityCore(authCollection);

    return result;
  }

  const text = '无效的待验证权限';

  showErrorMessage({
    message: text,
  });

  recordError({ authCollection });

  return result;
}

function checkHasAuthorityCore(auth) {
  if (checkIsSuper()) {
    return true;
  }

  if (isObject(auth)) {
    recordObject({
      auth,
      attachedTargetName:
        (this || null) != null
          ? (this.constructor || null) != null
            ? this.constructor.name
            : ''
          : '',
    });
  }

  let result = '0';

  const existCache = hasCache({ key: auth });

  if (existCache) {
    result = getCache({ key: auth });

    if (result !== undefined) {
      return result !== '0';
    }
  }

  const list = getAllAuthority();

  const accessWayCollection = getAccessWayCollectionCache();

  const v = (list || []).find((o) => o === auth);

  if ((v ?? null) == null) {
    recordObject({
      checkAuthority: auth,
      listAuthority: list,
      accessWayCollection,
    });
  }

  result = !!(v !== undefined) ? '1' : '0';

  setCache({
    key: auth,
    value: result,
  });

  return result !== '0';
}

export function checkHasAuthority(auth) {
  if (isObject(auth)) {
    recordObject({
      auth,
      attachedTargetName:
        (this || null) != null
          ? (this.constructor || null) != null
            ? this.constructor.name
            : ''
          : '',
    });
  }

  if (isArray(auth)) {
    return checkHasAuthorities(auth);
  }

  if (isString(auth)) {
    return checkHasAuthorityCore(auth);
  }

  recordObject({
    auth,
  });

  throw new Error('auth need string or string array, please check in console.');
}

/**
 * 缓存用户权限数据体
 * @param {*} authority
 */
export function setAuthority(authority) {
  const authorityCollection =
    typeof authority === 'string' ? [authority] : authority;

  saveJsonToLocalStorage(
    storageKeyCollection.authorityCollection,
    authorityCollection,
  );

  flushAllCache();
}
