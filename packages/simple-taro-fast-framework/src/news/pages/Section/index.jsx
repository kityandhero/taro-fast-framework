import classNames from 'classnames';
import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { formatDatetime, transformSize } from 'taro-fast-common/es/utils/tools';
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

import BasePageWrapper from '../BasePageWrapper';

import './index.less';

const { IconClock, IconEye } = Icon;

export const classPrefix = `simple-news-section`;

function getActiveSectionIndex({ sectionId, sectionList }) {
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

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'article/pageList',
        currentSectionId: '',
        currentSectionIndex: 0,
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

    this.setState({
      sectionId,
      currentSectionIndex: getActiveSectionIndex({
        sectionId,
        sectionList: this.getSectionList(),
      }),
    });
  };

  initLoadRequestParams = (o) => {
    const { sectionId } = this.state;

    return {
      ...o,
      ...{
        sectionId,
      },
    };
  };

  buildTabList = () => {
    const sectionList = this.getSectionList();

    const list = sectionList.map((item) => {
      const { sectionId, name } = item;

      return {
        sectionId,
        title: name,
      };
    });

    return list;
  };

  triggerSectionClick = (item) => {
    const { sectionId } = item;

    const currentSectionIndex = getActiveSectionIndex({
      sectionId,
      sectionList: this.getSectionList(),
    });

    console.log({
      currentSectionIndex,
    });

    this.reloadData({
      otherState: {
        sectionId,
        currentSectionIndex,
      },
    });
  };

  renderFurther() {
    const { currentSectionIndex, metaListData } = this.state;

    return (
      <View className={classNames(classPrefix)}>
        <View className={classNames(`${classPrefix}__tab-containor`)}>
          <Tabs
            current={currentSectionIndex}
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
              this.triggerSectionClick(item);
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
