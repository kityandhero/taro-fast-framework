import classNames from 'classnames';
import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { datetimeFormat, formatDatetime } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import {
  ColorText,
  Ellipsis,
  FlexBox,
  IconClock,
  IconEye,
  ImageBox,
  Space,
  Tabs,
} from 'taro-fast-component';

import noCardImage from '../../../../assets/images/noCardImage.jpg';
import { BasePageWrapper } from '../../BasePageWrapper';

import './index.less';

export const classPrefix = `simple-news-section`;

function getInitialSectionIndex({ sectionId, sectionList }) {
  let currentIndex = 0;

  for (const [index, item] of sectionList.entries()) {
    const { sectionId: itemSectionId } = item;

    if (itemSectionId === sectionId) {
      currentIndex = index;
    }
  }

  return currentIndex;
}

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '新闻应用--栏目页',
});

@connect(({ article, entrance, session, global, schedulingControl }) => ({
  article,
  entrance,
  session,
  global,
  schedulingControl,
}))
export default class Index extends BasePageWrapper {
  scrollViewMode = true;

  enablePullDownRefresh = true;

  enableLowerLoad = true;

  lowerLoadingPosition = 'outer';

  pagingLoadMode = true;

  enableBackTop = true;

  sectionId = '';

  sectionList = [];

  initialSectionIndex = 0;

  tabList = [];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      loadApiPath: 'article/pageList',
    };
  }

  doWorkBeforeAdjustDidMount = () => {
    const { sectionId } = {
      sectionId: '',
      ...this.externalParameter,
    };

    this.sectionList = this.getSectionList();
    this.sectionId = sectionId || '';
    this.initialSectionIndex = getInitialSectionIndex({
      sectionId: this.sectionId,
      sectionList: this.sectionList,
    });

    this.tabList = this.sectionList.map((item) => {
      const { sectionId: itemSectionId, name } = item;

      return {
        sectionId: itemSectionId,
        title: name,
      };
    });
  };

  initLoadRequestParams = (o) => {
    return {
      ...o,
      sectionId: this.sectionId,
    };
  };

  triggerSectionClick = (index, event, item) => {
    const { sectionId } = item;

    this.sectionId = sectionId;

    this.reloadData({ delay: 500 });
  };

  buildTab = () => {
    return (
      <Tabs
        current={this.initialSectionIndex}
        scroll
        titleActiveStyle={{
          color: '#2467db',
        }}
        underlineColor="#2467db"
        underlineHorizontalHeight={4}
        underlineHorizontalMargin={20}
        tabList={this.tabList}
        onClick={this.triggerSectionClick}
      />
    );
  };

  buildListView = () => {
    const { metaListData } = this.state;
    return (
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
                  <ImageBox src={image || noCardImage} aspectRatio={0.74} />
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
    );
  };

  buildUpperBox = () => {
    return this.buildTab();
  };

  renderFurther() {
    const { metaListData } = this.state;

    return (
      <View className={classNames(classPrefix)}>
        <View className={classNames(`${classPrefix}__list-containor`)}>
          {this.judgeInitialActivityIndicatorVisible()
            ? this.buildInitialActivityIndicator({})
            : metaListData.length === 0
              ? this.buildEmptyPlaceholder({
                  description: '还没有数据哦',
                })
              : this.buildListView()}
        </View>
      </View>
    );
  }
}
