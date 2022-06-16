import {
  stringIsNullOrWhiteSpace,
  recordObject,
  recordText,
  showErrorMessage,
  recordError,
  showNavigationBarLoading,
  hideNavigationBarLoading,
  stopPullDownRefresh,
  recordDebug,
  recordInfo,
} from 'taro-fast-common/es/utils/tools';
import {
  isUndefined,
  isFunction,
  isEqual,
} from 'taro-fast-common/es/utils/typeCheck';
import { toString, toNumber } from 'taro-fast-common/es/utils/typeConvert';

import { checkWhetherAuthorizeFail } from '../../utils/tools';
import { apiDataConvertCore } from '../../utils/actionAssist';
import { pretreatmentRequestParams } from '../../utils/requestAssistor';

import Infrastructure from '../Infrastructure';

class Base extends Infrastructure {
  apiDataConvert = (props) => {
    recordInfo(
      'info build-in apiDataConvert modelName is schedulingControl, if you need custom logic,you need override it: apiDataConvert = (props) => { return apiDataConvertCore({ props, modelName: "modelName" }) }',
    );

    return apiDataConvertCore({ props, modelName: 'schedulingControl' });
  };

  /**
   * 执行初始化远程请求
   */
  doLoadRemoteRequest = () => {
    recordDebug('exec doLoadRemoteRequest');

    const { spin } = this;

    const that = this;

    if (that.pagingLoadMode) {
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

  // eslint-disable-next-line no-unused-vars
  beforeFirstLoadRequest = (submitData) => {};

  // eslint-disable-next-line no-unused-vars
  beforeReLoadRequest = (submitData) => {};

  // eslint-disable-next-line no-unused-vars
  beforeRequest = (submitData) => {};

  // eslint-disable-next-line no-unused-vars
  afterGetFirstRequestResult = (submitData, responseData) => {};

  // eslint-disable-next-line no-unused-vars
  afterGetRequestResult = (submitData, responseData) => {};

  // eslint-disable-next-line no-unused-vars
  afterGetReLoadRequestResult = (submitData, responseData) => {};

  getRequestingData() {
    return this.lastRequestingData;
  }

  setRequestingData(params, callback) {
    const d =
      params == null
        ? { type: '', payload: {} }
        : { ...{ type: '', payload: {} }, ...params };

    this.lastRequestingData = d;

    if (isFunction(callback)) {
      callback();
    }
  }

  clearRequestingData() {
    this.setRequestingData({ type: '', payload: {} });
  }

  initLoadRequestParams = (o) => o || {};

  supplementLoadRequestParams = (o) => o || {};

  // eslint-disable-next-line no-unused-vars
  checkLoadRequestParams = (o) => {
    return true;
  };

  adjustLoadApiPath = () => {
    return '';
  };

  initLoad = ({ otherState = {}, params = {}, delay = 0, callback = null }) => {
    const {
      loadApiPath,
      firstLoadSuccess,
      reloading: reloadingBefore,
    } = this.state;

    try {
      if ((loadApiPath || '') === '') {
        // const text = 'loadApiPath需要配置';

        // showRuntimeError({
        //   message: text,
        // });

        // recordObject(this);

        this.setState({
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
        ...{
          dataLoading: true,
          loadSuccess: false,
        },
        ...(otherState || {}),
      };

      this.setState(willSaveState, () => {
        this.setState(
          {
            dispatchComplete: false,
          },
          () => {
            let submitData = {
              ...(this.initLoadRequestParams() || {}),
            };

            submitData = pretreatmentRequestParams(submitData || {});

            submitData = this.supplementLoadRequestParams(submitData || {});

            const checkResult = this.checkLoadRequestParams(submitData || {});

            if (checkResult) {
              if (!firstLoadSuccess) {
                this.beforeFirstLoadRequest(submitData || {});
              }

              if (reloadingBefore) {
                this.beforeReLoadRequest(submitData || {});
              }

              this.beforeRequest(submitData || {});

              this.initLoadCore({
                requestData: { ...(submitData || {}), ...params },
                delay,
                callback,
              });
            } else {
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
            }
          },
        );
      });
    } catch (error) {
      recordText({ loadApiPath });

      throw error;
    }
  };

  initLoadCore = ({ requestData, delay = 0, callback }) => {
    const delayTime = toNumber(delay);

    if (delayTime <= 0) {
      this.loadFromApi({
        requestData,
        callback,
      });
    } else {
      const that = this;

      setTimeout(() => {
        that.loadFromApi({
          requestData,
          callback,
        });
      }, delayTime);
    }
  };

  loadFromApi = ({ requestData, callback }) => {
    let loadApiPath = '';

    try {
      const requestingDataPre = this.getRequestingData();

      const loadApiCustomPath = this.adjustLoadApiPath();

      const loadApiPathCustom = stringIsNullOrWhiteSpace(loadApiCustomPath)
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
        this.setRequestingData({ type: loadApiPath, payload: requestData });

        if (this.enableNavigationBarLoading) {
          showNavigationBarLoading();
        }

        const that = this;

        this.dispatchApi({
          type: loadApiPath,
          payload: requestData,
        })
          .then(() => {
            hideNavigationBarLoading();
            stopPullDownRefresh();

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

            const metaOriginalData = that.apiDataConvert(that.props);

            if (isUndefined(metaOriginalData)) {
              that.setState(willSaveToState);

              return;
            }

            that.lastLoadParams = requestData;

            const { dataSuccess, code: remoteCode } = metaOriginalData;

            willSaveToState = {
              ...willSaveToState,
              ...{
                loadSuccess: dataSuccess,
              },
            };

            if (dataSuccess) {
              const {
                list: metaListDataRemote,
                data: metaData,
                extra: metaExtra,
              } = {
                ...{
                  list: [],
                  data: null,
                  extra: null,
                },
                ...metaOriginalData,
              };

              const { metaListData: metaListDataPrev } = that.state;

              const metaListData = !that.pagingLoadMode
                ? [...metaListDataRemote]
                : !that.useListDataAttachMode
                ? [...metaListDataRemote]
                : that.clearListDataBeforeAttach
                ? [...metaListDataRemote]
                : [...metaListDataPrev, ...metaListDataRemote];

              willSaveToState = {
                ...{
                  metaData: metaData || null,
                  metaExtra: metaExtra || null,
                  metaListData: metaListData || [],
                  metaOriginalData,
                },
                ...willSaveToState,
              };

              try {
                that.triggerAfterLoadSuccess({
                  metaData: metaData || null,
                  metaListData: metaListData || [],
                  metaExtra: metaExtra || null,
                  metaOriginalData: metaOriginalData || null,
                });
              } catch (e) {
                recordError(e);

                const text = `${toString(e)},place view in the console`;

                showErrorMessage({
                  message: text,
                });
              }

              const { reloading: reloadingComplete } = that.state;

              if (reloadingComplete) {
                that.afterReloadSuccess();
                that.afterGetReLoadRequestResult(requestData, metaOriginalData);
              }

              if (!firstLoadSuccess) {
                willSaveToState = {
                  ...willSaveToState,
                  ...{
                    firstLoadSuccess: true,
                  },
                };
              }

              if (!firstLoadSuccess) {
                that.afterFirstLoadSuccess();
                that.afterGetFirstRequestResult(requestData, metaOriginalData);
              }

              that.afterGetRequestResult(requestData, metaOriginalData);

              if (typeof callback === 'function') {
                callback();
              }
            } else {
              if (checkWhetherAuthorizeFail(remoteCode)) {
                that.doWhenAuthorizeFail(
                  metaOriginalData,
                  that.authorizeFailCallback,
                );
              }
            }

            that.clearRequestingData();

            that.setState(willSaveToState);
          })
          .catch((error) => {
            stopPullDownRefresh();
            hideNavigationBarLoading();

            recordError(error);

            that.setState({
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

      recordObject({ loadApiPath, requestData });

      this.setState({
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

  afterFirstLoadSuccess = () => {};

  afterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {};

  afterReloadSuccess = () => {};

  loadNextPage = ({ otherState = {}, delay = 0, callback = null }) => {
    const params = this.pagingLoadMode
      ? {
          pageNo: (this.pageNo || 0) + 1,
          pageSize: this.pageSize || 10,
        }
      : {};

    this.initLoad({ otherState, params, delay, callback });
  };

  reloadData = ({ otherState, callback = null, delay = 0 }) => {
    const s = { ...(otherState || {}), ...{ reloading: true } };

    if (this.pagingLoadMode) {
      this.pageNo = 0;
      this.clearListDataBeforeAttach = true;

      this.loadNextPage({
        otherState: s,
        delay: delay || 0,
        callback: callback || null,
      });
    } else {
      this.initLoad({
        otherState: s,
        delay: delay || 0,
        callback: callback || null,
      });
    }
  };

  remoteRequest = ({ type, payload, modelName = '', key = 'data' }) => {
    return this.dispatchApi({
      type,
      payload,
    }).then(() => {
      const metaOriginalData = stringIsNullOrWhiteSpace(modelName)
        ? this.apiDataConvert(this.props)
        : apiDataConvertCore({
            props: this.props,
            modelName: modelName,
            key: key || '',
          });

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
    });
  };

  judgeNeedNextLoad = () => {
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
    if (this.pagingLoadMode) {
      this.clearListDataBeforeAttach = false;

      const { pageNo, pageSize, total } = {
        ...{ pageNo, pageSize, total: 0 },
        ...metaExtra,
      };

      this.pageNo = pageNo || 1;
      this.pageSize = pageSize || 10;
      this.total = total || 0;
    }

    this.afterLoadSuccess({
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    });
  }
}

export default Base;
