import {
  stringIsNullOrWhiteSpace,
  recordObject,
  showRuntimeError,
} from "../../utils/tools";
import { pretreatmentRequestParams } from "../../utils/requestAssistor";
import { isUndefined, isFunction } from "../../utils/typeCheck";
import { toString, toNumber } from "../../utils/typeConvert";

import Infrastructure from "../Infrastructure";

class Base extends Infrastructure {
  lastRequestingData = { type: "", payload: {} };

  // 该方法必须重载覆盖
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getApiData = (props) => {
    const text = "getApiData 方法需要重载实现";

    showRuntimeError({
      message: text,
    });

    return {
      metaOriginalData: {
        dataSuccess: false,
      },
    };
  };

  doLoadRemoteRequest = () => {
    this.initLoad({});
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeFirstLoadRequest = (submitData) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeReLoadRequest = (submitData) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeRequest = (submitData) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterGetFirstRequestResult = (submitData, responseData) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterGetRequestResult = (submitData, responseData) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterGetReLoadRequestResult = (submitData, responseData) => {};

  getRequestingData() {
    return this.lastRequestingData;
  }

  setRequestingData(params, callback) {
    const d =
      params == null
        ? { type: "", payload: {} }
        : { ...{ type: "", payload: {} }, ...params };

    this.lastRequestingData = d;

    if (isFunction(callback)) {
      callback();
    }
  }

  clearRequestingData() {
    this.setRequestingData({ type: "", payload: {} });
  }

  initLoadRequestParams = (o) => o || {};

  supplementLoadRequestParams = (o) => o || {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkLoadRequestParams = (o) => {
    return true;
  };

  adjustLoadApiPath = () => {
    return "";
  };

  initLoad = ({ otherState = {}, delay = 0, callback = null }) => {
    const {
      loadApiPath,
      firstLoadSuccess,
      reloading: reloadingBefore,
    } = this.state;

    try {
      if ((loadApiPath || "") === "") {
        const text = "loadApiPath需要配置";

        showRuntimeError({
          message: text,
        });

        recordObject(this);

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
            let submitData = this.initLoadRequestParams() || {};

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
                requestData: submitData || {},
                delay,
                callback,
              });
            } else {
              this.setState({
                dataLoading: false,
                loadSuccess: false,
                reloading: false,
                searching: false,
                refreshing: false,
                paging: false,
                dispatchComplete: true,
              });
            }
          }
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
    let loadApiPath = "";

    try {
      const { dispatch } = this.props;

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

      loadApiPath = loadApiPathValue || "";

      // 处理频繁的相同请求
      if (
        !isEqual(requestingDataPre, {
          type: loadApiPath,
          payload: requestData,
        })
      ) {
        this.setRequestingData({ type: loadApiPath, payload: requestData });

        dispatch({
          type: loadApiPath,
          payload: requestData,
        })
          .then(() => {
            let willSaveToState = {
              dataLoading: false,
              loadSuccess: false,
              reloading: false,
              searching: false,
              refreshing: false,
              paging: false,
              dispatchComplete: true,
            };

            const metaOriginalData = this.getApiData(this.props);

            if (isUndefined(metaOriginalData)) {
              this.setState(willSaveToState);

              return;
            }

            this.lastLoadParams = requestData;

            const { dataSuccess } = metaOriginalData;

            willSaveToState = {
              ...willSaveToState,
              ...{
                loadSuccess: dataSuccess,
              },
            };

            if (dataSuccess) {
              const {
                list: metaListData,
                data: metaData,
                extra: metaExtra,
              } = metaOriginalData;

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
                this.afterLoadSuccess({
                  metaData: metaData || null,
                  metaListData: metaListData || [],
                  metaExtra: metaExtra || null,
                  metaOriginalData: metaOriginalData || null,
                });
              } catch (e) {
                console.log(e);

                const text = `${toString(e)},place view in the console`;

                showErrorMessage({
                  message: text,
                });
              }
            }

            const { reloading: reloadingComplete } = this.state;

            if (reloadingComplete) {
              this.afterReloadSuccess();
              this.afterGetReLoadRequestResult(requestData, metaOriginalData);
            }

            if (!firstLoadSuccess) {
              willSaveToState = {
                ...willSaveToState,
                ...{
                  firstLoadSuccess: true,
                },
              };
            }

            this.setState(willSaveToState);

            if (!firstLoadSuccess) {
              this.afterFirstLoadSuccess();

              this.afterGetFirstRequestResult(requestData, metaOriginalData);
            }

            this.afterGetRequestResult(requestData, metaOriginalData);

            if (typeof callback === "function") {
              callback();
            }

            this.clearRequestingData();
          })
          .catch((res) => {
            recordObject(res);

            this.setState({
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaOriginalData = null,
  }) => {};

  afterReloadSuccess = () => {};
}

export default Base;
