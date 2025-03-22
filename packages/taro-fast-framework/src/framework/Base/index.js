import {
  checkStringIsNullOrWhiteSpace,
  isEqual,
  isFunction,
  isUndefined,
  logDebug,
  logException,
  logObject,
  pretreatmentRequestParameters,
  showErrorMessage,
  toNumber,
  toString,
} from 'easy-soft-utility';

import {
  emptyLogic,
  hideNavigationBarLoading,
  showNavigationBarLoading,
  stopPullDownRefresh,
} from 'taro-fast-common';

import { checkWhetherAuthorizeFail } from '../../utils/common';
import { Infrastructure } from '../Infrastructure';

const primaryCallName = 'framework::Base';

class Base extends Infrastructure {
  /**
   * 执行初始化远程请求
   */
  doLoadRemoteRequest = () => {
    this.logFunctionCallTrack({}, primaryCallName, 'doLoadRemoteRequest');

    const { spin } = this;

    const that = this;

    if (that.pagingLoadMode) {
      that.logFunctionCallTrace(
        {
          delay: that.loadRemoteRequestDelay,
        },
        primaryCallName,
        'doLoadRemoteRequest',
        'loadNextPage',
      );

      that.loadNextPage({
        delay: that.loadRemoteRequestDelay,
        callback: () => {
          if (
            that.useFadeSpinWrapper &&
            that.hideFadeSpinWrapperAfterLoadRemoteRequest &&
            spin
          ) {
            this.setState({ spin: false });
          }
        },
      });
    } else {
      that.logFunctionCallTrace(
        {
          delay: that.loadRemoteRequestDelay,
        },
        primaryCallName,
        'doLoadRemoteRequest',
        'initLoad',
      );

      that.initLoad({
        delay: that.loadRemoteRequestDelay,
        callback: () => {
          if (
            that.useFadeSpinWrapper &&
            that.hideFadeSpinWrapperAfterLoadRemoteRequest &&
            spin
          ) {
            this.setState({ spin: false });
          }
        },
      });
    }
  };

  beforeFirstLoadRequest = (submitData) => {
    this.logEmptyCallTrack(
      submitData,
      primaryCallName,
      'beforeFirstLoadRequest',
      emptyLogic,
    );
  };

  beforeReLoadRequest = (submitData) => {
    this.logEmptyCallTrack(
      submitData,
      primaryCallName,
      'beforeReLoadRequest',
      emptyLogic,
    );
  };

  beforeRequest = (submitData) => {
    this.logEmptyCallTrack(
      submitData,
      primaryCallName,
      'beforeRequest',
      emptyLogic,
    );
  };

  afterGetFirstRequestResult = (submitData, responseData) => {
    this.logEmptyCallTrack(
      {
        submitData,
        responseData,
      },
      primaryCallName,
      'afterGetFirstRequestResult',
      emptyLogic,
    );
  };

  afterGetRequestResult = (submitData, responseData) => {
    this.logEmptyCallTrack(
      {
        submitData,
        responseData,
      },
      primaryCallName,
      'afterGetRequestResult',
      emptyLogic,
    );
  };

  afterGetReLoadRequestResult = (submitData, responseData) => {
    this.logEmptyCallTrack(
      {
        submitData,
        responseData,
      },
      primaryCallName,
      'afterGetReLoadRequestResult',
      emptyLogic,
    );
  };

  getRequestingData() {
    this.logFunctionCallTrack({}, primaryCallName, 'getRequestingData');

    return this.lastRequestingData;
  }

  setRequestingData(parameters, callback) {
    this.logFunctionCallTrack(parameters, primaryCallName, 'setRequestingData');

    const d =
      parameters == null
        ? { type: '', payload: {} }
        : { type: '', payload: {}, ...parameters };

    this.lastRequestingData = d;

    if (isFunction(callback)) {
      this.logFunctionCallTrace(
        {},
        primaryCallName,
        'setRequestingData',
        'callback',
      );

      callback();
    } else {
      this.logEmptyCallTrace(
        {},
        primaryCallName,
        'setRequestingData',
        emptyLogic,
      );
    }
  }

  clearRequestingData() {
    this.logFunctionCallTrack({}, primaryCallName, 'clearRequestingData');

    this.logFunctionCallTrace(
      {},
      primaryCallName,
      'clearRequestingData',
      'setRequestingData',
    );

    this.setRequestingData({ type: '', payload: {} });
  }

  initLoadRequestParams = (o) => {
    this.logEmptyCallTrack(
      o,
      primaryCallName,
      'initLoadRequestParams',
      emptyLogic,
    );

    return o || {};
  };

  supplementLoadRequestParams = (o) => {
    this.logEmptyCallTrack(
      o,
      primaryCallName,
      'supplementLoadRequestParams',
      emptyLogic,
    );

    return o || {};
  };

  // eslint-disable-next-line no-unused-vars
  checkLoadRequestParams = (o) => {
    this.logEmptyCallTrack(
      o,
      primaryCallName,
      'checkLoadRequestParams',
      'true',
    );

    return true;
  };

  adjustLoadApiPath = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'adjustLoadApiPath',
      emptyLogic,
    );

    return '';
  };

  initLoad = ({
    otherState = {},
    params: parameters = {},
    delay = 0,
    callback = null,
  }) => {
    const that = this;

    that.logFunctionCallTrack(
      {
        otherState,
        params: parameters,
        delay,
      },
      primaryCallName,
      'initLoad',
    );

    const {
      loadApiPath,
      firstLoadSuccess,
      reloading: reloadingBefore,
    } = that.state;

    try {
      if ((loadApiPath || '') === '') {
        logDebug('state dispatchComplete will set to true');

        that.setState({
          spin: false,
          dataLoading: false,
          loadSuccess: false,
          reloading: false,
          searching: false,
          refreshing: false,
          paging: false,
          dispatchComplete: true,
        });

        return;
      }

      const willSaveState = {
        dataLoading: true,
        loadSuccess: false,
        ...otherState,
      };

      that.setState(
        {
          ...willSaveState,
        },
        () => {
          logDebug('state dispatchComplete will set to false');

          that.setState({ dispatchComplete: false });

          that.logFunctionCallTrace(
            {},
            primaryCallName,
            'initLoad',
            'initLoadRequestParams',
          );

          let submitData = {
            ...that.initLoadRequestParams(),
          };

          that.logFunctionCallTrace(
            submitData || {},
            primaryCallName,
            'initLoad',
            'pretreatmentRequestParameters',
          );

          submitData = pretreatmentRequestParameters(submitData || {});

          that.logFunctionCallTrace(
            submitData || {},
            primaryCallName,
            'initLoad',
            'supplementLoadRequestParams',
          );

          submitData = that.supplementLoadRequestParams(submitData || {});

          that.logFunctionCallTrace(
            submitData || {},
            primaryCallName,
            'initLoad',
            'checkLoadRequestParams',
          );

          const checkResult = that.checkLoadRequestParams(submitData || {});

          if (checkResult) {
            if (!firstLoadSuccess) {
              that.logFunctionCallTrace(
                submitData || {},
                primaryCallName,
                'initLoad',
                'beforeFirstLoadRequest',
              );

              that.beforeFirstLoadRequest(submitData || {});
            }

            if (reloadingBefore) {
              that.logFunctionCallTrace(
                submitData || {},
                primaryCallName,
                'initLoad',
                'beforeReLoadRequest',
              );

              that.beforeReLoadRequest(submitData || {});
            }

            that.logFunctionCallTrace(
              submitData || {},
              primaryCallName,
              'initLoad',
              'beforeRequest',
            );

            that.beforeRequest(submitData || {});

            that.logFunctionCallTrace(
              {
                requestData: { ...submitData, ...parameters },
                delay,
              },
              primaryCallName,
              'initLoad',
              'initLoadCore',
            );

            that.initLoadCore({
              requestData: { ...submitData, ...parameters },
              delay,
              callback,
            });
          } else {
            logDebug('state dispatchComplete will set to true');

            that.setState({
              spin: false,
              dataLoading: false,
              loadSuccess: false,
              reloading: false,
              searching: false,
              refreshing: false,
              paging: false,
              dispatchComplete: true,
            });
          }
        },
      );
    } catch (error) {
      that.logFunctionCallTrace(
        {
          error,
          loadApiPath,
        },
        primaryCallName,
        'initLoad',
        'catch',
        'error',
      );

      throw error;
    }
  };

  initLoadCore = ({ requestData, delay = 0, callback }) => {
    const that = this;

    that.logFunctionCallTrack(
      {
        requestData,
        delay,
      },
      primaryCallName,
      'initLoadCore',
    );

    const delayTime = toNumber(delay);

    if (delayTime <= 0) {
      that.logFunctionCallTrace(
        {
          requestData,
        },
        primaryCallName,
        'initLoadCore',
        'loadFromApi',
      );

      that.loadFromApi({
        requestData,
        callback,
      });
    } else {
      setTimeout(() => {
        that.logFunctionCallTrace(
          {
            requestData,
          },
          primaryCallName,
          'initLoadCore',
          'loadFromApi',
        );

        that.loadFromApi({
          requestData,
          callback,
        });
      }, delayTime);
    }
  };

  loadFromApi = ({ requestData, callback }) => {
    const that = this;

    that.logFunctionCallTrack(
      {
        requestData,
      },
      primaryCallName,
      'loadFromApi',
    );

    let loadApiPath = '';

    try {
      that.logFunctionCallTrace(
        {},
        primaryCallName,
        'loadFromApi',
        'getRequestingData',
      );

      const requestingDataPre = this.getRequestingData();

      that.logFunctionCallTrace(
        {},
        primaryCallName,
        'loadFromApi',
        'adjustLoadApiPath',
      );

      const loadApiCustomPath = this.adjustLoadApiPath();

      const loadApiPathCustom = checkStringIsNullOrWhiteSpace(loadApiCustomPath)
        ? {}
        : {
            loadApiPath: loadApiCustomPath,
          };

      const { loadApiPath: loadApiPathValue, firstLoadSuccess } = {
        ...this.state,
        ...loadApiPathCustom,
      };

      loadApiPath = loadApiPathValue || '';

      // 处理频繁的相同请求
      if (
        !isEqual(requestingDataPre, {
          type: loadApiPath,
          payload: requestData,
        })
      ) {
        that.logFunctionCallTrace(
          {
            type: loadApiPath,
            payload: requestData,
          },
          primaryCallName,
          'loadFromApi',
          'setRequestingData',
        );

        this.setRequestingData({ type: loadApiPath, payload: requestData });

        if (this.enableNavigationBarLoading) {
          showNavigationBarLoading();
        }

        that.logFunctionCallTrace(
          {
            type: loadApiPath,
            payload: requestData,
          },
          primaryCallName,
          'loadFromApi',
          'dispatchApi',
        );

        this.dispatchApi({
          type: loadApiPath,
          payload: requestData,
        })
          .then((metaOriginalData) => {
            hideNavigationBarLoading();
            stopPullDownRefresh();

            logDebug('state dispatchComplete will set to true');

            let willSaveToState = {
              spin: false,
              dataLoading: false,
              loadSuccess: false,
              reloading: false,
              searching: false,
              refreshing: false,
              paging: false,
              dispatchComplete: true,
            };

            if (isUndefined(metaOriginalData)) {
              that.setState(willSaveToState);

              return;
            }

            that.lastLoadParams = requestData;

            const { dataSuccess, code: remoteCode } = metaOriginalData;

            willSaveToState = {
              ...willSaveToState,
              loadSuccess: dataSuccess,
            };

            if (dataSuccess) {
              const {
                list: metaListDataRemote,
                data: metaData,
                extra: metaExtra,
              } = {
                list: [],
                data: null,
                extra: null,
                ...metaOriginalData,
              };

              const { metaListData: metaListDataPrevious } = that.state;

              const metaListData = that.pagingLoadMode
                ? that.useListDataAttachMode
                  ? that.clearListDataBeforeAttach
                    ? [...metaListDataRemote]
                    : [...metaListDataPrevious, ...metaListDataRemote]
                  : [...metaListDataRemote]
                : [...metaListDataRemote];

              willSaveToState = {
                metaData: metaData || null,
                metaExtra: metaExtra || null,
                metaListData: metaListData || [],
                metaOriginalData,
                ...willSaveToState,
              };

              try {
                that.logFunctionCallTrace(
                  {
                    metaData: metaData || null,
                    metaListData: metaListData || [],
                    metaExtra: metaExtra || null,
                    metaOriginalData: metaOriginalData || null,
                  },
                  primaryCallName,
                  'loadFromApi',
                  'dispatchApi',
                  'then',
                  'triggerAfterLoadSuccess',
                );

                that.triggerAfterLoadSuccess({
                  metaData: metaData || null,
                  metaListData: metaListData || [],
                  metaExtra: metaExtra || null,
                  metaOriginalData: metaOriginalData || null,
                });
              } catch (error) {
                that.logFunctionCallTrace(
                  {
                    error,
                  },
                  primaryCallName,
                  'loadFromApi',
                  'dispatchApi',
                  'then',
                  'catch',
                  'error',
                );

                logException(
                  error,
                  `error on loadFromApi in ${this.componentName}(${primaryCallName})`,
                );

                const text = `${toString(error)},place view in the console`;

                showErrorMessage({
                  text: text,
                });
              }

              const { reloading: reloadingComplete } = that.state;

              if (reloadingComplete) {
                that.logFunctionCallTrace(
                  {},
                  primaryCallName,
                  'loadFromApi',
                  'dispatchApi',
                  'then',
                  'afterReloadSuccess',
                );

                that.afterReloadSuccess();

                that.logFunctionCallTrace(
                  {
                    requestData,
                    metaOriginalData,
                  },
                  primaryCallName,
                  'loadFromApi',
                  'dispatchApi',
                  'then',
                  'afterGetReLoadRequestResult',
                );

                that.afterGetReLoadRequestResult(requestData, metaOriginalData);
              }

              if (!firstLoadSuccess) {
                willSaveToState = {
                  ...willSaveToState,

                  firstLoadSuccess: true,
                };
              }

              if (!firstLoadSuccess) {
                that.logFunctionCallTrace(
                  {},
                  primaryCallName,
                  'loadFromApi',
                  'dispatchApi',
                  'then',
                  'afterFirstLoadSuccess',
                );

                that.afterFirstLoadSuccess();

                that.logFunctionCallTrace(
                  {
                    requestData,
                    metaOriginalData,
                  },
                  primaryCallName,
                  'loadFromApi',
                  'dispatchApi',
                  'then',
                  'afterGetFirstRequestResult',
                );

                that.afterGetFirstRequestResult(requestData, metaOriginalData);
              }

              that.logFunctionCallTrace(
                {
                  requestData,
                  metaOriginalData,
                },
                primaryCallName,
                'loadFromApi',
                'dispatchApi',
                'then',
                'afterGetRequestResult',
              );

              that.afterGetRequestResult(requestData, metaOriginalData);

              if (typeof callback === 'function') {
                that.logFunctionCallTrace(
                  {
                    requestData,
                    metaOriginalData,
                  },
                  primaryCallName,
                  'loadFromApi',
                  'dispatchApi',
                  'then',
                  'callback',
                );

                // eslint-disable-next-line promise/no-callback-in-promise
                callback();
              } else {
                that.logEmptyCallTrace(
                  {
                    requestData,
                    metaOriginalData,
                  },
                  primaryCallName,
                  'loadFromApi',
                  'dispatchApi',
                  'then',
                  'callback',
                  emptyLogic,
                );
              }
            } else {
              if (checkWhetherAuthorizeFail(remoteCode)) {
                that.logFunctionCallTrace(
                  metaOriginalData,
                  primaryCallName,
                  'loadFromApi',
                  'dispatchApi',
                  'then',
                  'doWhenAuthorizeFail',
                );

                that.doWhenAuthorizeFail(
                  metaOriginalData,
                  that.authorizeFailCallback,
                );
              }
            }

            that.logFunctionCallTrace(
              {},
              primaryCallName,
              'loadFromApi',
              'dispatchApi',
              'then',
              'clearRequestingData',
            );

            that.clearRequestingData();

            that.setState(willSaveToState);

            return metaOriginalData;
          })
          .catch((error) => {
            stopPullDownRefresh();
            hideNavigationBarLoading();

            that.logFunctionCallTrace(
              { error },
              primaryCallName,
              'loadFromApi',
              'dispatchApi',
              'catch',
              'error',
            );

            logException(
              error,
              `error on loadFromApi in ${this.componentName}(${primaryCallName})`,
            );

            logDebug('state dispatchComplete will set to true');

            that.setState({
              spin: false,
              dataLoading: false,
              loadSuccess: false,
              reloading: false,
              searching: false,
              refreshing: false,
              paging: false,
              dispatchComplete: true,
            });
          });
      }
    } catch (error) {
      stopPullDownRefresh();
      hideNavigationBarLoading();

      logObject({ loadApiPath, requestData });

      that.logFunctionCallTrace(
        { error },
        primaryCallName,
        'loadFromApi',
        'catch',
      );

      logDebug('state dispatchComplete will set to true');

      this.setState({
        spin: false,
        dataLoading: false,
        loadSuccess: false,
        reloading: false,
        searching: false,
        refreshing: false,
        paging: false,
        dispatchComplete: true,
      });

      throw error;
    }
  };

  afterFirstLoadSuccess = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'afterFirstLoadSuccess',
      emptyLogic,
    );
  };

  doOtherAfterLoadSuccess = ({
    metaData = null,
    metaListData = [],
    metaExtra = null,
    metaOriginalData = null,
  }) => {
    this.logEmptyCallTrack(
      {
        metaData,
        metaListData,
        metaExtra,
        metaOriginalData,
      },
      primaryCallName,
      'doOtherAfterLoadSuccess',
      emptyLogic,
    );
  };

  afterReloadSuccess = () => {
    this.logEmptyCallTrack(
      {},
      primaryCallName,
      'afterReloadSuccess',
      emptyLogic,
    );
  };

  loadNextPage = ({ otherState = {}, delay = 0, callback = null }) => {
    this.logFunctionCallTrack(
      {
        otherState,
        delay,
      },
      primaryCallName,
      'loadNextPage',
    );

    const parameters = this.pagingLoadMode
      ? {
          pageNo: (this.pageNo || 0) + 1,
          pageSize: this.pageSize || 10,
        }
      : {};

    this.logFunctionCallTrace(
      {
        otherState,
        params: parameters,
        delay,
      },
      primaryCallName,
      'loadNextPage',
      'initLoad',
    );

    this.initLoad({ otherState, params: parameters, delay, callback });
  };

  reloadData = ({ otherState, callback = null, delay = 0 }) => {
    this.logFunctionCallTrack(
      {
        otherState,
        delay,
      },
      primaryCallName,
      'reloadData',
    );

    const s = { ...otherState, reloading: true };

    if (this.pagingLoadMode) {
      this.pageNo = 0;
      this.clearListDataBeforeAttach = true;

      this.logFunctionCallTrace(
        {
          otherState: s,
          delay: delay || 0,
        },
        primaryCallName,
        'reloadData',
        'loadNextPage',
      );

      this.loadNextPage({
        otherState: s,
        delay: delay || 0,
        callback: callback || null,
      });
    } else {
      this.logFunctionCallTrace(
        {
          otherState: s,
          delay: delay || 0,
        },
        primaryCallName,
        'reloadData',
        'initLoad',
      );

      this.initLoad({
        otherState: s,
        delay: delay || 0,
        callback: callback || null,
      });
    }
  };

  remoteRequest = ({ type, payload }) => {
    const that = this;

    that.logFunctionCallTrack(
      {
        type,
        payload,
      },
      primaryCallName,
      'remoteRequest',
    );

    that.logFunctionCallTrace(
      {
        type,
        payload,
      },
      primaryCallName,
      'remoteRequest',
      'dispatchApi',
    );

    return that
      .dispatchApi({
        type,
        payload,
      })
      .then((metaOriginalData) => {
        const { dataSuccess, code: remoteCode } = metaOriginalData;

        if (dataSuccess) {
          const { list, data, extra } = metaOriginalData;

          return {
            list: list || [],
            data: data || {},
            extra: extra || {},
            original: metaOriginalData,
          };
        } else {
          throw new Error(remoteCode);
        }
      })
      .catch((error) => {
        that.logFunctionCallTrace(
          { error },
          primaryCallName,
          'remoteRequest',
          'dispatchApi',
          'catch',
          'error',
        );

        logException(
          error,
          `error on remoteRequest in ${this.componentName}(${primaryCallName})`,
        );
      });
  };

  judgeNeedNextLoad = () => {
    this.logFunctionCallTrack({}, primaryCallName, 'judgeNeedNextLoad');

    if (!this.pagingLoadMode) {
      return false;
    }

    if ((this.total || 0) <= 0) {
      return false;
    }

    return (this.pageNo || 0) * (this.pageSize || 0) < (this.total || 0);
  };

  /**
   * 该方法如无必要，不要进行覆盖
   * @param {*} param0
   */
  triggerAfterLoadSuccess({
    metaData = null,
    metaListData = [],
    metaExtra = null,
    metaOriginalData = null,
  }) {
    this.logFunctionCallTrack(
      {
        metaData,
        metaListData,
        metaExtra,
        metaOriginalData,
      },
      primaryCallName,
      'triggerAfterLoadSuccess',
    );

    if (this.pagingLoadMode) {
      this.clearListDataBeforeAttach = false;

      const { pageNo, pageSize, total } = {
        pageNo,
        pageSize,
        total: 0,
        ...metaExtra,
      };

      this.pageNo = pageNo || 1;
      this.pageSize = pageSize || 10;
      this.total = total || 0;
    }

    this.logFunctionCallTrace(
      {
        metaData,
        metaListData,
        metaExtra,
        metaOriginalData,
      },
      primaryCallName,
      'triggerAfterLoadSuccess',
      'doOtherAfterLoadSuccess',
    );

    this.doOtherAfterLoadSuccess({
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    });
  }
}

export { Base };
