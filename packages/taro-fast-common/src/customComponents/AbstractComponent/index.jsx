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
  logDebug,
  logException,
  logInfo,
  logObject,
  logText,
  mergeArrowText,
  showErrorMessage,
  split,
  toNumber,
} from 'easy-soft-utility';

import { callProcessType, emptyLogic } from '../../utils/constants';
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
  showCallTrack = false;

  /**
   * 在控制台显示组建内触发序列, 仅为进行开发辅助
   */
  showCallTrace = false;

  /**
   * 在控制台显示组建内结果序列, 仅为进行开发辅助
   */
  showCallResult = false;

  callProcessCollection = [callProcessType.functionLogic];

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

    this.logFunctionCallTrack({}, primaryCallName, 'componentDidMount');

    this.logFunctionCallTrace(
      {},
      primaryCallName,
      'componentDidMount',
      'doDidMountTask',
    );

    this.doDidMountTask();
  }

  shouldComponentUpdate(nextProperties, nextState) {
    this.logFunctionCallTrack({}, primaryCallName, 'shouldComponentUpdate');

    const { dispatchComplete } = {
      dispatchComplete: true,
      ...nextState,
    };

    if (!dispatchComplete) {
      return false;
    }

    this.logFunctionCallTrace(
      {
        nextProperties,
        nextState,
      },
      primaryCallName,
      'shouldComponentUpdate',
      'adjustShowRenderCountInConsole',
    );

    this.adjustShowRenderCountInConsole(nextProperties, nextState);

    this.logFunctionCallTrace(
      {},
      primaryCallName,
      'shouldComponentUpdate',
      'doOtherCheckComponentUpdate',
    );

    this.logFunctionCallTrace(
      {
        nextProperties,
        nextState,
      },
      primaryCallName,
      'shouldComponentUpdate',
      'doOtherCheckComponentUpdate',
    );

    const checkComponentUpdate = this.doOtherCheckComponentUpdate(
      nextProperties,
      nextState,
    );

    if ((checkComponentUpdate || null) != undefined && !!checkComponentUpdate) {
      this.logFunctionCallTrace(
        {
          nextProperties,
          nextState,
        },
        primaryCallName,
        'shouldComponentUpdate',
        'doWorkBeforeUpdate',
      );

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
      this.logFunctionCallTrace(
        {
          nextProperties,
          nextState,
        },
        primaryCallName,
        'shouldComponentUpdate',
        'doWorkBeforeUpdate',
      );

      this.doWorkBeforeUpdate(nextProperties, nextState);
    }

    return compareResult;
  }

  componentDidCatchError(error, info) {
    this.logFunctionCallTrack(
      {
        error,
        info,
      },
      primaryCallName,
      'componentDidCatchError',
    );

    this.logFunctionCallTrace(
      {
        error,
        info,
      },
      primaryCallName,
      'componentDidCatchError',
      'doWhenCatchError',
    );

    this.doWhenCatchError(error, info);
  }

  // eslint-disable-next-line react/sort-comp
  getSnapshotBeforeUpdate(preProperties, preState) {
    this.logFunctionCallTrack(
      {
        preProperties,
        preState,
      },
      primaryCallName,
      'getSnapshotBeforeUpdate',
    );

    this.logFunctionCallTrace(
      {
        preProperties,
        preState,
      },
      primaryCallName,
      'getSnapshotBeforeUpdate',
      'doWorkWhenGetSnapshotBeforeUpdate',
    );

    return this.doWorkWhenGetSnapshotBeforeUpdate(preProperties, preState);
  }

  componentDidUpdate(preProperties, preState, snapshot) {
    this.logFunctionCallTrack(
      {
        preProperties,
        preState,
        snapshot,
      },
      primaryCallName,
      'componentDidUpdate',
    );

    this.logFunctionCallTrace(
      {
        preProperties,
        preState,
        snapshot,
      },
      primaryCallName,
      'componentDidUpdate',
      'doWorkWhenDidUpdate',
    );

    this.doWorkWhenDidUpdate(preProperties, preState, snapshot);
  }

  componentWillUnmount() {
    this.logFunctionCallTrack({}, primaryCallName, 'componentWillUnmount');

    this.logFunctionCallTrace(
      {},
      primaryCallName,
      'componentWillUnmount',
      'doWorkBeforeUnmount',
    );

    this.doWorkBeforeUnmount();

    this.logFunctionCallTrace(
      {},
      primaryCallName,
      'componentWillUnmount',
      'doWorkAfterUnmount',
    );

    this.doWorkAfterUnmount();

    this.setState = () => {};
  }

  componentDidShow() {
    this.logFunctionCallTrack({}, primaryCallName, 'componentDidShow');

    this.logFunctionCallTrace(
      {},
      primaryCallName,
      'componentDidShow',
      'doShowTask',
    );

    this.doShowTask();
  }

  componentDidHide() {
    this.logFunctionCallTrack({}, primaryCallName, 'componentDidHide');

    this.logFunctionCallTrace(
      {},
      primaryCallName,
      'componentDidHide',
      'doWorkWhenComponentHide',
    );

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
    this.logFunctionCallTrack({}, primaryCallName, 'doDidMountTask');

    this.logFunctionCallTrace(
      {},
      primaryCallName,
      'doDidMountTask',
      'checkNeedSignInDidMount',
    );

    const checkNeedSignInDidMountResult = this.checkNeedSignInDidMount();

    if (checkNeedSignInDidMountResult) {
      this.logFunctionCallTrace(
        {},
        primaryCallName,
        'doDidMountTask',
        'checkPermission',
      );

      const checkPermissionResult = this.checkPermission();

      if (checkPermissionResult) {
        this.logFunctionCallTrace(
          {},
          primaryCallName,
          'doDidMountTask',
          'doWorkBeforeAdjustDidMount',
        );

        this.doWorkBeforeAdjustDidMount();

        this.logFunctionCallTrace(
          {},
          primaryCallName,
          'doDidMountTask',
          'doWorkAdjustDidMount',
        );

        this.doWorkAdjustDidMount();

        this.logFunctionCallTrace(
          {},
          primaryCallName,
          'doDidMountTask',
          'doWorkAfterAdjustDidMount',
        );

        this.doWorkAfterAdjustDidMount();

        this.logFunctionCallTrace(
          {},
          primaryCallName,
          'doDidMountTask',
          'doWorkAfterDidMount',
        );

        this.doWorkAfterDidMount();

        if (this.loadRemoteRequestAfterMount) {
          this.logFunctionCallTrace(
            {},
            primaryCallName,
            'doDidMountTask',
            'doLoadRemoteRequest',
          );

          this.doLoadRemoteRequest();
        }

        this.logFunctionCallTrace(
          {},
          primaryCallName,
          'doDidMountTask',
          'doOtherRemoteRequest',
        );

        this.doOtherRemoteRequest();

        this.logFunctionCallTrace(
          {},
          primaryCallName,
          'doDidMountTask',
          'doOtherWorkAfterDidMount',
        );

        this.doOtherWorkAfterDidMount();
      } else {
        this.logFunctionCallTrace(
          {},
          primaryCallName,
          'doDidMountTask',
          'doWorkWhenCheckPermission',
        );

        this.doWorkWhenCheckPermission();
      }
    } else {
      this.logFunctionCallTrace(
        {},
        primaryCallName,
        'doDidMountTask',
        'doWorkWhenCheckNeedSignInDidMountFail',
      );

      this.doWorkWhenCheckNeedSignInDidMountFail();
    }
  };

  doShowTask = () => {
    this.logFunctionCallTrack({}, primaryCallName, 'doShowTask');

    if (this.firstShowHasTriggered) {
      this.logFunctionCallTrace(
        {},
        primaryCallName,
        'doShowTask',
        'doWorkWhenRepeatedShow',
      );

      this.doWorkWhenRepeatedShow();
    } else {
      this.logFunctionCallTrace(
        {},
        primaryCallName,
        'doShowTask',
        'doWorkWhenFirstShow',
      );

      this.doWorkWhenFirstShow();

      this.firstShowHasTriggered = true;
    }

    this.logFunctionCallTrace(
      {},
      primaryCallName,
      'doShowTask',
      'doWorkWhenEveryShow',
    );

    this.doWorkWhenEveryShow();

    this.logFunctionCallTrace(
      {},
      primaryCallName,
      'doShowTask',
      'doWorkAfterShow',
    );

    this.doWorkAfterShow();
  };

  checkNeedSignInDidMount = () => {
    this.logFunctionCallTrack({}, primaryCallName, 'doShowTask', 'true');

    return true;
  };

  checkPermission = () => {
    this.logFunctionCallTrack({}, primaryCallName, 'checkPermission', 'true');

    return true;
  };

  doWorkWhenCheckNeedSignInDidMountFail = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'doWorkWhenCheckNeedSignInDidMountFail',
      emptyLogic,
    );

    logConfig(
      'doWorkWhenCheckNeedSignInDidMountFail do nothing,if you need,you can override it: doWorkWhenCheckNeedSignInDidMountFail = () => {}',
    );
  };

  doWorkWhenCheckPermissionFail = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'doWorkWhenCheckPermissionFail',
      emptyLogic,
    );

    logConfig(
      'doWorkWhenCheckPermissionFail do nothing,if you need,you can override it: doWorkWhenCheckPermissionFail = () => {}',
    );
  };

  adjustShowRenderCountInConsole = (nextProperties, nextState) => {
    this.logEmptyCallTrack(
      {
        nextProperties,
        nextState,
      },
      primaryCallName,
      'adjustShowRenderCountInConsole',
      emptyLogic,
    );
  };

  doWorkBeforeAdjustDidMount = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'doWorkBeforeAdjustDidMount',
      emptyLogic,
    );
  };

  doWorkAdjustDidMount = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'doWorkAdjustDidMount',
      emptyLogic,
    );
  };

  doWorkAfterAdjustDidMount = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'doWorkAfterAdjustDidMount',
      emptyLogic,
    );
  };

  doWorkAfterDidMount = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'doWorkAfterDidMount',
      emptyLogic,
    );
  };

  doLoadRemoteRequest = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'doLoadRemoteRequest',
      emptyLogic,
    );
  };

  doOtherRemoteRequest = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'doOtherRemoteRequest',
      emptyLogic,
    );
  };

  doOtherWorkAfterDidMount = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'doOtherWorkAfterDidMount',
      emptyLogic,
    );
  };

  doWorkBeforeUpdate = (nextProperties, nextState) => {
    this.logEmptyCallTrack(
      {
        nextProperties,
        nextState,
      },
      primaryCallName,
      'doWorkBeforeUpdate',
      emptyLogic,
    );
  };

  doWorkWhenDidUpdate = (preProperties, preState, snapshot) => {
    this.logEmptyCallTrack(
      {
        preProperties,
        preState,
        snapshot,
      },
      primaryCallName,
      'doWorkWhenDidUpdate',
      emptyLogic,
    );
  };

  doOtherCheckComponentUpdate = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'doOtherCheckComponentUpdate',
      emptyLogic,
    );

    return null;
  };

  doWorkWhenGetSnapshotBeforeUpdate = (preProperties, preState) => {
    this.logEmptyCallTrack(
      {
        preProperties,
        preState,
      },
      primaryCallName,
      'doWorkWhenGetSnapshotBeforeUpdate',
      emptyLogic,
    );

    return null;
  };

  doWhenCatchError = (error, info) => {
    this.logFunctionCallTrack(
      {
        error,
        info,
      },
      primaryCallName,
      'doWhenCatchError',
    );

    showErrorMessage({
      text: 'error occurred, please view in console.',
    });

    logException({ message: error.message, data: info });
  };

  doWorkBeforeUnmount = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'doWorkBeforeUnmount',
      emptyLogic,
    );
  };

  doWorkAfterUnmount = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'doWorkAfterUnmount',
      emptyLogic,
    );
  };

  doWorkWhenFirstShow = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'doWorkWhenFirstShow',
      emptyLogic,
    );
  };

  doWorkWhenRepeatedShow = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'doWorkWhenRepeatedShow',
      emptyLogic,
    );
  };

  doWorkWhenEveryShow = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'doWorkWhenEveryShow',
      emptyLogic,
    );
  };

  doWorkAfterShow = () => {
    this.logEmptyCallTrack({}, primaryCallName, 'doWorkAfterShow', emptyLogic);
  };

  doWorkWhenComponentHide = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'doWorkWhenComponentHide',
      emptyLogic,
    );
  };

  getEnvironment = () => {
    this.logFunctionCallTrack({}, primaryCallName, 'getEnvironment');

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
    this.logFunctionCallTrack({}, primaryCallName, 'handleEnv');

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
    this.logFunctionCallTrack({}, primaryCallName, 'getGlobal');

    const info = 'please override getGlobal, and return a object';

    this.logFunctionCallTrace(
      {
        error: info,
      },
      primaryCallName,
      'getGlobal',
      'error',
    );

    throw new Error(info);
  };

  getGlobalWrapper = () => {
    this.logFunctionCallTrack({}, primaryCallName, 'getGlobalWrapper');

    const global = this.getGlobal();

    if ((global || null) == undefined) {
      const info = 'global not allow null, please check getGlobal';

      this.logFunctionCallTrace(
        {
          error: info,
        },
        primaryCallName,
        'getGlobalWrapper',
        'error',
      );

      logException(info);
    }

    return global;
  };

  getDispatch = () => {
    this.logFunctionCallTrack({}, primaryCallName, 'getDispatch');

    const info = 'please override getDispatch, and return a function';

    this.logFunctionCallTrace(
      {
        error: info,
      },
      primaryCallName,
      'getGlobalWrapper',
      'error',
    );

    logException(info);

    throw new Error(info);
  };

  getDispatchWrapper = () => {
    this.logFunctionCallTrack({}, primaryCallName, 'getDispatchWrapper');

    const dispatch = this.getDispatch();

    if (!isFunction(dispatch)) {
      const info = 'dispatch not a function, please check getDispatch';

      this.logFunctionCallTrace(
        {
          error: info,
        },
        primaryCallName,
        'getDispatchWrapper',
        'error',
      );

      logException(info);
    }

    return dispatch;
  };

  dispatchApi = ({ type, payload, alias = 'data' }) => {
    this.logFunctionCallTrack({}, primaryCallName, 'dispatchApi');

    this.logFunctionCallTrace(
      {},
      primaryCallName,
      'dispatchApi',
      'getDispatchWrapper',
    );

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

          const info = `${modelName} not in modelNameList, please check model config`;

          this.logFunctionCallTrace(
            {
              error: info,
            },
            primaryCallName,
            'dispatchApi',
            'error',
          );

          logException(info);
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
    this.logFunctionCallTrack({}, primaryCallName, 'doWhenAuthorizeFail');

    if (isFunction(callback)) {
      this.logFunctionCallTrace(
        remoteData,
        primaryCallName,
        'doWhenAuthorizeFail',
        'callback',
      );

      callback(remoteData);
    } else {
      this.logFunctionCallTrace(
        {},
        primaryCallName,
        'doWhenAuthorizeFail',
        'callback',
        emptyLogic,
      );
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
  authorizeFailCallback = (remoteData) => {
    this.logFunctionCallTrack(
      remoteData,
      primaryCallName,
      'authorizeFailCallback',
      emptyLogic,
    );
  };

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
  logCallTrack(type, data, ...messages) {
    if (!this.showCallTrack) {
      this.promptCallProcessSwitch();

      return;
    }

    if (!checkInCollection(this.callProcessCollection, type)) {
      return;
    }

    logCallTrackCore(data, mergeArrowText(this.constructor.name, ...messages));
  }

  /**
   * log call track
   * @param {*} message
   */
  logFunctionCallTrack(data, ...messages) {
    this.logCallTrack(
      callProcessType.functionLogic,
      data,
      mergeArrowText(...messages),
    );
  }

  /**
   * log call track
   * @param {*} message
   */
  logEmptyCallTrack(data, ...messages) {
    this.logCallTrack(
      callProcessType.emptyLogic,
      data,
      mergeArrowText(...messages),
    );
  }

  /**
   * log call track
   * @param {*} message
   */
  logRenderCallTrack(data, ...messages) {
    this.logCallTrack(
      callProcessType.renderLogic,
      data,
      mergeArrowText(...messages),
    );
  }

  /**
   * log call trace
   * @param {*} message
   */
  logCallTrace(type, data, ...messages) {
    if (!this.showCallTrace) {
      this.promptCallProcessSwitch();

      return;
    }

    if (!checkInCollection(this.callProcessCollection, type)) {
      return;
    }

    logCallTraceCore(data, mergeArrowText(this.constructor.name, ...messages));
  }

  /**
   * log call track
   * @param {*} message
   */
  logFunctionCallTrace(data, ...messages) {
    this.logCallTrace(
      callProcessType.functionLogic,
      data,
      mergeArrowText(...messages),
    );
  }

  /**
   * log call track
   * @param {*} message
   */
  logEmptyCallTrace(data, ...messages) {
    this.logCallTrace(
      callProcessType.emptyLogic,
      data,
      mergeArrowText(...messages),
    );
  }

  /**
   * log call track
   * @param {*} message
   */
  logRenderCallTrace(data, ...messages) {
    this.logCallTrace(
      callProcessType.renderLogic,
      data,
      mergeArrowText(...messages),
    );
  }

  /**
   * log call result
   * @param {*} message
   */
  logCallResult(data, ...messages) {
    if (!this.showCallResult) {
      this.promptCallProcessSwitch();

      return;
    }

    logCallResultCore(data, mergeArrowText(this.constructor.name, ...messages));
  }

  /**
   * 判断小程序的API, 回调, 参数, 组件等是否在当前版本可用
   * @param {*} schema
   */
  canIUse(schema) {
    return Taro.canIUse(schema);
  }

  renderInteractiveArea = () => {
    return null;
  };

  renderFurther() {
    this.logRenderCallTrack({}, primaryCallName, 'renderFurther', emptyLogic);

    return null;
  }

  renderView() {
    this.logRenderCallTrack({}, primaryCallName, 'renderView');

    this.logRenderCallTrace(
      {},
      primaryCallName,
      'render',
      'renderView',
      'renderFurther',
    );

    return this.renderFurther();
  }

  render() {
    const { hidden } = this.props;

    if (hidden) {
      return null;
    }

    this.logRenderCallTrack({}, primaryCallName, 'render');

    this.showRenderCount();

    this.logRenderCallTrace({}, primaryCallName, 'render', 'renderView');

    return (
      <>
        {this.renderView()}

        {this.renderInteractiveArea()}
      </>
    );
  }
}

AbstractComponent.defaultProps = {
  ...defaultProps,
};

export { AbstractComponent };
