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

  tabList = [];

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
    const { sectionId } = {
      ...{
        sectionId: '',
      },
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
      ...{
        sectionId: this.sectionId,
      },
    };
  };

  triggerSectionClick = (index, e, item) => {
    const { sectionId } = item;

    this.sectionId = sectionId;

    this.reloadData({ delay: 500 });
  };

  buildTab = () => {
    return (
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
    );
  };

  renderFurther() {
    const { metaListData } = this.state;

    return (
      <View className={classNames(classPrefix)}>
        {this.buildTab()}

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
