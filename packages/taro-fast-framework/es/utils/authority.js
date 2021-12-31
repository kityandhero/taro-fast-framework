import '../classCallCheck.js';
import '../defineProperty.js';
import '../objectSpread2.js';
import './mediaDefault.js';
import './constants.js';
import 'lodash';
import { isObject, isArray, isString } from './typeCheck.js';
import './typeConvert.js';
import '@tarojs/taro';
import './tips.js';
import { stringIsNullOrWhiteSpace, recordObject, saveJsonToLocalStorage, getStringFromLocalStorage, getValueByKey, showErrorMessage, recordError } from './tools.js';
import 'qs';
import 'node-cache';
import { hasCache, getCache, setCache, flushAllCache } from './cacheAssist.js';
import { storageKeyCollection, getAccessWayCollectionCache } from './globalStorageAssist.js';

var authorityCollectionCache = "authorityCollectionCache";
var superPermissionCacheKey = "hasSuperPermission";

function getAllAuthorityCore() {
  var result = [];
  var existCache = hasCache({
    key: authorityCollectionCache
  });

  if (existCache) {
    result = getCache({
      key: authorityCollectionCache
    });

    if (isArray(result)) {
      return result;
    }
  }

  var authorityString = getStringFromLocalStorage(storageKeyCollection.authorityCollection);
  var authority;

  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === "string") {
    result.push(authority);
  } else {
    result = isArray(authority) ? authority : [];
  }

  setCache({
    key: authorityCollectionCache,
    value: result
  });
  return result;
}

function getSuperPermission() {
  var result = "";
  var accessWayCollection = getAccessWayCollectionCache();

  if (!isObject(accessWayCollection)) {
    return result;
  }

  var superPermission = getValueByKey({
    data: accessWayCollection,
    key: "super"
  });

  if (isObject(superPermission)) {
    var superAuth = getValueByKey({
      data: superPermission,
      key: "permission"
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

function checkIsSuper() {
  var existCache = hasCache({
    key: superPermissionCacheKey
  });

  if (existCache) {
    var result = getCache({
      key: superPermissionCacheKey
    });

    if (result !== undefined) {
      return !!result;
    }
  }

  var superPermission = getSuperPermission();

  if (!stringIsNullOrWhiteSpace(superPermission)) {
    var list = getAllAuthority();
    var isSuper = (list || []).find(function (o) {
      return o === superPermission;
    }) || "";

    if (isSuper === superPermission) {
      setCache({
        key: superPermissionCacheKey,
        value: true
      });
      return true;
    }
  }

  setCache({
    key: superPermissionCacheKey,
    value: false
  });
  return false;
}

function checkHasAuthorities(authCollection) {
  var result = false;

  if (isArray(authCollection)) {
    authCollection.forEach(function (auth) {
      result = checkHasAuthorityCore(auth);

      if (result) {
        return true;
      }
    });

    for (var auth in authCollection) {
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

  var text = "无效的待验证权限";
  showErrorMessage({
    message: text
  });
  recordError({
    authCollection: authCollection
  });
  return result;
}

function checkHasAuthorityCore(auth) {
  if (checkIsSuper()) {
    return true;
  }

  if (isObject(auth)) {
    console.log({
      auth: auth,
      attachedTargetName: (this || null) != null ? (this.constructor || null) != null ? this.constructor.name : "" : ""
    });
  }

  var result = "0";
  var existCache = hasCache({
    key: auth
  });

  if (existCache) {
    result = getCache({
      key: auth
    });

    if (result !== undefined) {
      return result !== "0";
    }
  }

  var list = getAllAuthority();
  var accessWayCollection = getAccessWayCollectionCache();
  var v = (list || []).find(function (o) {
    return o === auth;
  });

  if ((v !== null && v !== void 0 ? v : null) == null) {
    recordObject({
      checkAuthority: auth,
      listAuthority: list,
      accessWayCollection: accessWayCollection
    });
  }

  result = !!(v !== undefined) ? "1" : "0";
  setCache({
    key: auth,
    value: result
  });
  return result !== "0";
}

function checkHasAuthority(auth) {
  if (isObject(auth)) {
    console.log({
      auth: auth,
      attachedTargetName: (this || null) != null ? (this.constructor || null) != null ? this.constructor.name : "" : ""
    });
  }

  if (isArray(auth)) {
    return checkHasAuthorities(auth);
  }

  if (isString(auth)) {
    return checkHasAuthorityCore(auth);
  }

  recordObject({
    auth: auth
  });
  throw new Error("auth need string or string array, please check in console.");
}
/**
 * 缓存用户权限数据体
 * @param {*} authority
 */

function setAuthority(authority) {
  var authorityCollection = typeof authority === "string" ? [authority] : authority;
  saveJsonToLocalStorage(storageKeyCollection.authorityCollection, authorityCollection);
  flushAllCache();
}

export { checkHasAuthority, checkIsSuper, setAuthority };
