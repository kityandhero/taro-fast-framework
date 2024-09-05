import { Component } from 'react';
import Taro from '@tarojs/taro';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  environmentCollection,
  getGuid,
  getModelNameList,
  isEqual,
  isFunction,
  isNumber,
  isObject,
  logCallResult as logCallResultCore,
  logCallTrace as logCallTraceCore,
  logCallTrack as logCallTrackCore,
  logConfig,
  logData,
  logDebug,
  logError,
  logException,
  logExecute,
  logInfo,
  logObject,
  logText,
  mergeArrowText,
  showErrorMessage,
  split,
  toNumber,
} from 'easy-soft-utility';

import { getEnvironment } from '../../utils/environmentAssist';

function filterModel(properties) {
  const result = { ...properties };

  delete result.loading;

  for (const o of Object.entries(result)) {
    const [k, v] = o;

    if (isObject(v) && !!v.fromRemote) {
      delete result[k];
    }
  }

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

const primaryCallName = 'common::AbstractComponent';

class AbstractComponent extends Component {
  /**
   * 在控制台显示组建内调用序列, 仅为进行开发辅助
   */
  showCallProcess = false;

  /**
   *当前组件名称
   */
  componentName = '';

  /**
   * 挂载完成后立即发出远程请求
   */
  loadRemoteRequestAfterMount = false;

  /**
   * 第一次显示已经被触发
   */
  firstShowHasTriggered = false;

  /**
   *显示render次数开关, 用于开发时候调试页面渲染性能
   */
  showRenderCountInConsole = false;

  /**
   * 渲染总次数
   */
  renderCount = 0;

  /**
   * 用于组件内数据循环构建 key 时附加唯一前缀，有助于提升页面执行效率
   */
  keyPrefix = '';

  /**
   * 需要登录后才能访问
   */
  needSignIn = false;

  /**
   * 是否自动跳转登录页
   */
  autoRedirectToSignIn = true;

  /**
   * 权限数据
   */
  componentAuthority = null;

  constructor(properties) {
    super(properties);

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

  shouldComponentUpdate(nextProperties, nextState) {
    const { dispatchComplete } = {
      dispatchComplete: true,
      ...nextState,
    };

    if (!dispatchComplete) {
      return false;
    }

    this.adjustShowRenderCountInConsole(nextProperties, nextState);

    const checkComponentUpdate = this.doOtherCheckComponentUpdate(
      nextProperties,
      nextState,
    );

    if ((checkComponentUpdate || null) != undefined && !!checkComponentUpdate) {
      this.doWorkBeforeUpdate(nextProperties, nextState);

      return !!checkComponentUpdate;
    }

    const nextPropertiesIgnoreModel = filterModel(nextProperties);
    const currentPropertiesIgnoreModel = filterModel(this.props);

    const comparePropertiesResult = !shallowEqual(
      nextPropertiesIgnoreModel,
      currentPropertiesIgnoreModel,
    );

    const compareStateResult = !shallowEqual(nextState, this.state);

    const compareResult = comparePropertiesResult || compareStateResult;

    if (this.showRenderCountInConsole && compareResult) {
      logObject({
        message: 'shouldComponentUpdate:true',
        nextPropsIgnoreModel: nextPropertiesIgnoreModel,
        currentPropsIgnoreModel: currentPropertiesIgnoreModel,
        comparePropsResult: comparePropertiesResult,
        nextState,
        currentState: this.state,
        compareStateResult,
      });
    }

    if (compareResult) {
      this.doWorkBeforeUpdate(nextProperties, nextState);
    }

    return compareResult;
  }

  componentDidCatchError(error, info) {
    this.doWhenCatchError(error, info);
  }

  // eslint-disable-next-line react/sort-comp
  getSnapshotBeforeUpdate(preProperties, preState) {
    return this.doWorkWhenGetSnapshotBeforeUpdate(preProperties, preState);
  }

  componentDidUpdate(preProperties, preState, snapshot) {
    this.doWorkWhenDidUpdate(preProperties, preState, snapshot);
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

    if (checkNeedSignInDidMountResult) {
      const checkPermissionResult = this.checkPermission();

      if (checkPermissionResult) {
        this.doWorkBeforeAdjustDidMount();

        this.doWorkAdjustDidMount();

        this.doWorkAfterAdjustDidMount();

        this.doWorkAfterDidMount();

        if (this.loadRemoteRequestAfterMount) {
          this.doLoadRemoteRequest();
        }

        this.doOtherRemoteRequest();

        this.doOtherWorkAfterDidMount();
      } else {
        this.doWorkWhenCheckPermission();
      }
    } else {
      this.doWorkWhenCheckNeedSignInDidMountFail();
    }
  };

  doShowTask = () => {
    if (this.firstShowHasTriggered) {
      this.doWorkWhenRepeatedShow();
    } else {
      this.doWorkWhenFirstShow();

      this.firstShowHasTriggered = true;
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
  adjustShowRenderCountInConsole = (nextProperties, nextState) => {};

  doWorkBeforeAdjustDidMount = () => {};

  doWorkAdjustDidMount = () => {};

  doWorkAfterAdjustDidMount = () => {};

  doWorkAfterDidMount = () => {};

  doLoadRemoteRequest = () => {};

  doOtherRemoteRequest = () => {};

  doOtherWorkAfterDidMount = () => {};

  // eslint-disable-next-line no-unused-vars
  doWorkBeforeUpdate = (nextProperties, nextState) => {};

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProperties, preState, snapshot) => {};

  doOtherCheckComponentUpdate = () => {
    return null;
  };

  // eslint-disable-next-line no-unused-vars
  doWorkWhenGetSnapshotBeforeUpdate = (preProperties, preState) => {
    return null;
  };

  doWhenCatchError = (error, info) => {
    showErrorMessage({
      text: 'error occurred, please view in console.',
    });

    logException({ message: error.message, data: info });
  };

  doWorkBeforeUnmount = () => {};

  doWorkAfterUnmount = () => {};

  doWorkWhenFirstShow = () => {};

  doWorkWhenRepeatedShow = () => {};

  doWorkWhenEveryShow = () => {};

  doWorkAfterShow = () => {};

  doWorkWhenComponentHide = () => {};

  getEnvironment = () => {
    return getEnvironment();
  };

  handleEnv = async ({
    handleWeapp = null,
    handleAlipay = null,
    handleSWAN = null,
    handleWEB = null,
    handleOther = null,
    callback = null,
  }) => {
    logExecute('handleEnv');

    let data = {};

    switch (getEnvironment()) {
      case environmentCollection.WEAPP: {
        if (isFunction(handleWeapp)) {
          data = (await handleWeapp()) || {};
        }

        break;
      }

      case environmentCollection.ALIPAY: {
        if (isFunction(handleAlipay)) {
          data = (await handleAlipay()) || {};
        }

        break;
      }

      case environmentCollection.SWAN: {
        if (isFunction(handleSWAN)) {
          data = (await handleSWAN()) || {};
        }

        break;
      }

      case environmentCollection.WEB: {
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

    if ((global || null) == undefined) {
      logException('global not allow null, please check getGlobal');
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
      logException('dispatch not a function, please check getDispatch');
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

          logException(
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

  ignoreTouchMove = (error) => {
    error.stopPropagation();
    error.preventDefault();
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

  promptCallProcessSwitch = () => {};

  /**
   * log call track
   * @param {*} message
   */
  logCallTrack(data, ...messages) {
    if (!this.showCallProcess) {
      this.promptCallProcessSwitch();

      return;
    }

    logCallTrackCore(data, mergeArrowText(this.componentName, ...messages));
  }

  /**
   * log call trace
   * @param {*} message
   */
  logCallTrace(data, ...messages) {
    if (!this.showCallProcess) {
      this.promptCallProcessSwitch();

      return;
    }

    logCallTraceCore(data, mergeArrowText(this.componentName, ...messages));
  }

  /**
   * log call result
   * @param {*} message
   */
  logCallResult(data, ...messages) {
    if (!this.showCallProcess) {
      this.promptCallProcessSwitch();

      return;
    }

    logCallResultCore(data, mergeArrowText(this.componentName, ...messages));
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

    this.logCallTrack({}, primaryCallName, 'render');

    this.showRenderCount();

    this.logCallTrace({}, primaryCallName, 'render', 'trigger', 'renderView');

    return this.renderView();
  }
}

AbstractComponent.defaultProps = {
  ...defaultProps,
};

export { AbstractComponent };
