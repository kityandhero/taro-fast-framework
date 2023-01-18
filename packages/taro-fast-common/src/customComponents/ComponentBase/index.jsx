import { Component } from 'react';
import Taro from '@tarojs/taro';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  envCollection,
  getGuid,
  isEqual,
  isFunction,
  isNumber,
  isObject,
  logConfig,
  logData,
  logDebug,
  logError,
  logExecute,
  logInfo,
  logObject,
  logText,
  showErrorMessage,
  split,
  toNumber,
} from 'easy-soft-utility';

import { getModelNameList } from '../../utils/storageAssist';
import { getEnv } from '../../utils/tools';

function filterModel(props) {
  const result = { ...props };

  delete result.loading;

  Object.entries(result).forEach((o) => {
    const [k, v] = o;

    if (isObject(v)) {
      if (!!v.fromRemote) {
        delete result[k];
      }
    }
  });

  return result;
}

/**
 * Performs equality by iterating through keys on an object and returning false.
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(a, b) {
  return isEqual(a, b);
}

const defaultProps = {
  showRenderCount: false,
  hidden: false,
};

class ComponentBase extends Component {
  componentName = '';

  loadRemoteRequestAfterMount = false;

  firstShowHasTriggered = false;

  /**
   *显示render次数开关, 用于开发时候调试页面渲染性能
   */
  showRenderCountInConsole = false;

  renderCount = 0;

  /**
   * 用于组件内数据循环构建 key 时附加唯一前缀，有助于提升页面执行效率
   */
  keyPrefix = '';

  /**
   * 需要登录后才能访问
   */
  needSignIn = false;

  autoRedirectToSignIn = true;

  /**
   * 权限数据
   */
  componentAuthority = null;

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null,
      counter: 0,
    };

    this.keyPrefix = getGuid();
  }

  componentDidMount() {
    this.componentName = this.constructor.name;

    this.doDidMountTask();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { dispatchComplete } = {
      ...{ dispatchComplete: true },
      ...nextState,
    };

    if (!!!dispatchComplete) {
      return false;
    }

    this.adjustShowRenderCountInConsole(nextProps, nextState);

    const checkComponentUpdate = this.doOtherCheckComponentUpdate(
      nextProps,
      nextState,
    );

    if ((checkComponentUpdate || null) != null) {
      if (!!checkComponentUpdate) {
        this.doWorkBeforeUpdate(nextProps, nextState);

        return !!checkComponentUpdate;
      }
    }

    const nextPropsIgnoreModel = filterModel(nextProps);
    const currentPropsIgnoreModel = filterModel(this.props);

    const comparePropsResult = !shallowEqual(
      nextPropsIgnoreModel,
      currentPropsIgnoreModel,
    );

    const compareStateResult = !shallowEqual(nextState, this.state);

    const compareResult = comparePropsResult || compareStateResult;

    if (this.showRenderCountInConsole && compareResult) {
      logObject({
        message: 'shouldComponentUpdate:true',
        nextPropsIgnoreModel,
        currentPropsIgnoreModel,
        comparePropsResult,
        nextState,
        currentState: this.state,
        compareStateResult,
      });
    }

    if (compareResult) {
      this.doWorkBeforeUpdate(nextProps, nextState);
    }

    return compareResult;
  }

  componentDidCatchError(error, info) {
    this.doWhenCatchError(error, info);
  }

  // eslint-disable-next-line react/sort-comp
  getSnapshotBeforeUpdate(preProps, preState) {
    return this.doWorkWhenGetSnapshotBeforeUpdate(preProps, preState);
  }

  componentDidUpdate(preProps, preState, snapshot) {
    this.doWorkWhenDidUpdate(preProps, preState, snapshot);
  }

  componentWillUnmount() {
    this.doWorkBeforeUnmount();

    this.doWorkAfterUnmount();

    this.setState = () => {};
  }

  componentDidShow() {
    this.doShowTask();
  }

  componentDidHide() {
    this.doWorkWhenComponentHide();
  }

  increaseCounter(callback) {
    const { counter } = this.state;

    this.setState(
      {
        counter: isNumber(counter) ? toNumber(counter) : 0 + 1,
      },
      () => {
        if (isFunction(callback)) {
          callback();
        }
      },
    );
  }

  doDidMountTask = () => {
    const checkNeedSignInDidMountResult = this.checkNeedSignInDidMount();

    if (!checkNeedSignInDidMountResult) {
      this.doWorkWhenCheckNeedSignInDidMountFail();
    } else {
      const checkPermissionResult = this.checkPermission();

      if (!checkPermissionResult) {
        this.doWorkWhenCheckPermission();
      } else {
        this.doWorkBeforeAdjustDidMount();

        this.doWorkAdjustDidMount();

        this.doWorkAfterAdjustDidMount();

        this.doWorkAfterDidMount();

        if (this.loadRemoteRequestAfterMount) {
          this.doLoadRemoteRequest();
        }

        this.doOtherRemoteRequest();

        this.doOtherWorkAfterDidMount();
      }
    }
  };

  doShowTask = () => {
    if (!this.firstShowHasTriggered) {
      this.doWorkWhenFirstShow();

      this.firstShowHasTriggered = true;
    } else {
      this.doWorkWhenRepeatedShow();
    }

    this.doWorkWhenEveryShow();

    this.doWorkAfterShow();
  };

  checkNeedSignInDidMount = () => {
    return true;
  };

  checkPermission = () => {
    return true;
  };

  doWorkWhenCheckNeedSignInDidMountFail = () => {
    logExecute('doWorkWhenCheckNeedSignInDidMountFail');

    logConfig(
      'doWorkWhenCheckNeedSignInDidMountFail do nothing,if you need,you can override it: doWorkWhenCheckNeedSignInDidMountFail = () => {}',
    );
  };

  doWorkWhenCheckPermissionFail = () => {
    logExecute('doWorkWhenCheckPermissionFail');

    logConfig(
      'doWorkWhenCheckPermissionFail do nothing,if you need,you can override it: doWorkWhenCheckPermissionFail = () => {}',
    );
  };

  // eslint-disable-next-line no-unused-vars
  adjustShowRenderCountInConsole = (nextProps, nextState) => {};

  doWorkBeforeAdjustDidMount = () => {};

  doWorkAdjustDidMount = () => {};

  doWorkAfterAdjustDidMount = () => {};

  doWorkAfterDidMount = () => {};

  doLoadRemoteRequest = () => {};

  doOtherRemoteRequest = () => {};

  doOtherWorkAfterDidMount = () => {};

  // eslint-disable-next-line no-unused-vars
  doWorkBeforeUpdate = (nextProps, nextState) => {};

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {};

  doOtherCheckComponentUpdate = () => {
    return null;
  };

  // eslint-disable-next-line no-unused-vars
  doWorkWhenGetSnapshotBeforeUpdate = (preProps, preState) => {
    return null;
  };

  doWhenCatchError = (error, info) => {
    showErrorMessage({
      message: 'error occurred, please view in console.',
    });

    logError({
      error,
      info,
    });
  };

  doWorkBeforeUnmount = () => {};

  doWorkAfterUnmount = () => {};

  doWorkWhenFirstShow = () => {};

  doWorkWhenRepeatedShow = () => {};

  doWorkWhenEveryShow = () => {};

  doWorkAfterShow = () => {};

  doWorkWhenComponentHide = () => {};

  getEnv = () => {
    return getEnv();
  };

  handleEnv = async (
    {
      handleWeapp = null,
      handleAlipay = null,
      handleSWAN = null,
      handleWEB = null,
      handleOther = null,
      callback = null,
    } = {
      handleWeapp: null,
      handleAlipay: null,
      handleSWAN: null,
      handleWEB: null,
      handleOther: null,
      callback: null,
    },
  ) => {
    logExecute('handleEnv');

    let data = {};

    switch (getEnv()) {
      case envCollection.WEAPP: {
        if (isFunction(handleWeapp)) {
          data = (await handleWeapp()) || {};
        }

        break;
      }

      case envCollection.ALIPAY: {
        if (isFunction(handleAlipay)) {
          data = (await handleAlipay()) || {};
        }

        break;
      }

      case envCollection.SWAN: {
        if (isFunction(handleSWAN)) {
          data = (await handleSWAN()) || {};
        }

        break;
      }

      case envCollection.WEB: {
        if (isFunction(handleWEB)) {
          data = (await handleWEB()) || {};
        }

        break;
      }

      default: {
        if (isFunction(handleOther)) {
          data = (await handleOther()) || {};
        }

        break;
      }
    }

    if (isFunction(callback)) {
      await callback(data || {});
    }
  };

  getGlobal = () => {
    const text = 'please override getGlobal, and return a object';

    logData(text);

    throw new Error(text);
  };

  getGlobalWrapper = () => {
    const global = this.getGlobal();

    if ((global || null) == null) {
      logError('global not allow null, please check getGlobal');
    }

    return global;
  };

  getDispatch = () => {
    const text = 'please override getDispatch, and return a function';

    logError(text);

    throw new Error(text);
  };

  getDispatchWrapper = () => {
    const dispatch = this.getDispatch();

    if (!isFunction(dispatch)) {
      logError('dispatch not a function, please check getDispatch');
    }

    return dispatch;
  };

  dispatchApi = ({ type, payload, alias = 'data' }) => {
    const dispatch = this.getDispatchWrapper();

    logDebug(`modal access: ${type}`);

    if (!checkStringIsNullOrWhiteSpace(type)) {
      const l = split(type, '/');

      if (l.length === 2) {
        const modelName = l[0];

        const ml = getModelNameList();

        const modelNameList = split(ml, ',');

        if (!checkInCollection(modelNameList, modelName)) {
          logInfo(`current modelNameList: ${ml}`);

          logError(
            `${modelName} not in modelNameList, please check model config`,
          );
        }
      }
    }

    return dispatch({ type, payload, alias });
  };

  /**
   * 当登录失败时调用
   * @param {*} remoteData [object] 远程返回数据
   * @param {*} callback [function] 登录失败回调函数
   */
  // eslint-disable-next-line no-unused-vars
  doWhenAuthorizeFail = (remoteData, callback) => {
    if (isFunction(callback)) {
      callback(remoteData);
    }
  };

  ignoreTouchMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  /**
   * 登录失败时的回调定义
   * @param {*} remoteData [object] 远程返回数据
   */
  // eslint-disable-next-line no-unused-vars
  authorizeFailCallback = (remoteData) => {};

  showRenderCount() {
    if (this.showRenderCountInConsole) {
      this.renderCount += 1;

      this.constructor.name;

      const text = `${this.constructor.name},renderFrequency:${this.renderCount}`;

      logText(text);
    }
  }

  /**
   * 判断小程序的API, 回调, 参数, 组件等是否在当前版本可用
   * @param {*} schema
   */
  canIUse(schema) {
    return Taro.canIUse(schema);
  }

  renderFurther() {
    return null;
  }

  renderView() {
    return this.renderFurther();
  }

  render() {
    const { hidden } = this.props;

    if (hidden) {
      return null;
    }

    this.showRenderCount();

    return this.renderView();
  }
}

ComponentBase.defaultProps = {
  ...defaultProps,
};

export default ComponentBase;
