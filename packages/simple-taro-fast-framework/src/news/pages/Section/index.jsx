import classNames from 'classnames';
import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import {
  formatDatetime,
  transformSize,
  stringIsNullOrWhiteSpace,
  showNavigationBarLoading,
  hideNavigationBarLoading,
  stopPullDownRefresh,
  recordError,
  showErrorMessage,
  recordObject,
} from 'taro-fast-common/es/utils/tools';
import { isEqual, isUndefined } from 'taro-fast-common/es/utils/typeCheck';
import { datetimeFormat } from 'taro-fast-common/es/utils/constants';
import {
  Space,
  ImageBox,
  FlexBox,
  Tabs,
  Ellipsis,
  ColorText,
  Icon,
} from 'taro-fast-component/es/customComponents';
import { checkWhetherAuthorizeFall } from 'taro-fast-framework/es/utils/tools';

import BasePageWrapper from '../BasePageWrapper';

import './index.less';

const { IconClock, IconEye } = Icon;

export const classPrefix = `simple-news-section`;

function getInitialSectionIndex({ sectionId, sectionList }) {
  let currentIndex = 0;

  sectionList.forEach((item, index) => {
    const { sectionId: itemSectionId } = item;

    if (itemSectionId === sectionId) {
      currentIndex = index;
    }
  });

  return currentIndex;
}

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '新闻应用--栏目页',
});

@connect(({ article, global }) => ({
  article,
  global,
}))
export default class Index extends BasePageWrapper {
  enablePullDownRefresh = true;

  enableLowerLoad = true;

  lowerLoadingPosition = 'fixed';

  pagingLoadMode = true;

  enableBackTop = true;

  sectionId = '';

  sectionList = [];

  initialSectionIndex = 0;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'article/pageList',
      },
    };
  }

  getApiData = (props) => {
    const {
      article: { data },
    } = props;

    return data;
  };

  doWorkBeforeAdjustDidMount = () => {
    const urlParams = this.getUrlParams();

    const { sectionId } = urlParams;

    this.sectionList = this.getSectionList();
    this.sectionId = sectionId;
    this.initialSectionIndex = getInitialSectionIndex({
      sectionId: this.sectionId,
      sectionList: this.sectionList,
    });
  };

  initLoadRequestParams = (o) => {
    return {
      ...o,
      ...{
        sectionId: this.sectionId,
      },
    };
  };

  loadFromApi = ({ requestData, callback }) => {
    let loadApiPath = '';

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

        dispatch({
          type: loadApiPath,
          payload: requestData,
        })
          .then(() => {
            hideNavigationBarLoading();
            stopPullDownRefresh();

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

              const { metaListData: metaListDataPrev } = this.state;

              const metaListData = !this.pagingLoadMode
                ? [...metaListDataRemote]
                : !this.useListDataAttachMode
                ? [...metaListDataRemote]
                : this.clearListDataBeforeAttach
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
                this.triggerAfterLoadSuccess({
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
            } else {
              if (checkWhetherAuthorizeFall(remoteCode)) {
                this.doWhenAuthorizeFail(
                  metaOriginalData,
                  this.authorizeFailCallback,
                );
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

            if (!firstLoadSuccess) {
              this.afterFirstLoadSuccess();

              this.afterGetFirstRequestResult(requestData, metaOriginalData);
            }

            this.afterGetRequestResult(requestData, metaOriginalData);

            if (typeof callback === 'function') {
              callback();
            }

            this.clearRequestingData();

            this.setState(willSaveToState);
          })
          .catch((res) => {
            stopPullDownRefresh();
            hideNavigationBarLoading();

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

  buildTabList = () => {
    const list = this.sectionList.map((item) => {
      const { sectionId, name } = item;

      return {
        sectionId,
        title: name,
      };
    });

    return list;
  };

  triggerSectionClick = (index, e, item) => {
    const { sectionId } = item;

    this.sectionId = sectionId;

    this.reloadData({
      delay: 1000,
    });
  };

  renderFurther() {
    const { metaListData } = this.state;

    return (
      <View className={classNames(classPrefix)}>
        <View className={classNames(`${classPrefix}__tab-containor`)}>
          <Tabs
            showRenderCount
            current={this.initialSectionIndex}
            scroll
            titleActiveStyle={{
              color: '#2467db',
            }}
            height={transformSize(80)}
            underlineColor="#2467db"
            underlineHeight={4}
            underlineHorizontalMargin={20}
            tabList={this.buildTabList()}
            onClick={(index, e, item) => {
              this.triggerSectionClick(index, e, item);
            }}
          />
        </View>

        <View className={classNames(`${classPrefix}__list-containor`)}>
          {this.judgeInitialActivityIndicatorVisible() ? (
            this.buildInitialActivityIndicator({})
          ) : metaListData.length === 0 ? (
            this.buildEmptyPlaceholder({
              description: '还没有数据哦',
            })
          ) : (
            <Space direction="vertical" fillWidth>
              {metaListData.map((item) => {
                const {
                  articleId,
                  title,
                  description,
                  image,
                  accessCount,
                  createTime,
                } = item;

                return (
                  <FlexBox
                    key={`article_${articleId}`}
                    flexAuto="right"
                    left={
                      <View style={{ width: transformSize(260) }}>
                        <ImageBox src={image} aspectRatio={0.74} />
                      </View>
                    }
                    rightStyle={{
                      paddingLeft: transformSize(28),
                    }}
                    right={
                      <FlexBox
                        style={{ width: '100%', height: '100%' }}
                        flexAuto="top"
                        verticalHeight={300}
                        top={
                          <Ellipsis
                            line={2}
                            style={{
                              height: transformSize(100),
                              fontSize: transformSize(32),
                              fontWeight: '700',
                              lineHeight: transformSize(50),
                              color: '#333',
                            }}
                          >
                            {title}
                          </Ellipsis>
                        }
                        bottom={
                          <>
                            <Ellipsis
                              line={1}
                              style={{
                                color: '#afb4b5',
                                marginBottom: transformSize(14),
                              }}
                            >
                              {description}
                            </Ellipsis>

                            <FlexBox
                              flexAuto="right"
                              leftStyle={{
                                width: transformSize(220),
                              }}
                              left={
                                <ColorText
                                  color="#afb4b5"
                                  fontSize={24}
                                  icon={<IconClock size={24} color="#afb4b5" />}
                                  text={formatDatetime({
                                    data: createTime,
                                    fmt: datetimeFormat.yearMonthDay,
                                  })}
                                />
                              }
                              right={
                                <ColorText
                                  color="#afb4b5"
                                  fontSize={24}
                                  icon={<IconEye size={24} color="#afb4b5" />}
                                  text={accessCount}
                                />
                              }
                            />
                          </>
                        }
                      />
                    }
                  />
                );
              })}
            </Space>
          )}
        </View>
      </View>
    );
  }
}
