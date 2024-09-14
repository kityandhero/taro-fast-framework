import * as classNames from 'classnames';
import { CustomWrapper, View } from '@tarojs/components';
import * as Taro from '@tarojs/taro';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  datetimeFormat,
  formatDatetime,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import {
  ColorText,
  Ellipsis,
  FlexBox,
  IconClock,
  ImageBox,
  Line,
  Space,
  Tabs,
} from 'taro-fast-component';

import { PageWrapper } from '../../../customComponents';
import { defaultListImage } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';

import './index.less';

export const classPrefix = `root-customer`;

const waitApproveFlag = 'c14bbdb2b6214288bdfe11a266a89b47';
const latestApproveFlag = 'eb15add13d584a459d00423c373613b5';

const tabCollection = [
  {
    key: waitApproveFlag,
    title: '待审批',
  },
  {
    key: latestApproveFlag,
    title: '已审批',
  },
];

function getTabIndex(key) {
  return key === waitApproveFlag ? 0 : 1;
}

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '用户中心',
  // navigationStyle: 'custom',
});

@connect(({ customer, session, entrance, global, schedulingControl }) => ({
  customer,
  session,
  entrance,
  global,
  schedulingControl,
}))
class FlowCase extends PageWrapper {
  showCallTrack = true;

  // showCallTrace = true;

  viewStyle = {
    backgroundColor: '#f5f5f5',
  };

  initialTabIndex = 0;

  tabList = tabCollection;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.flowCaseTypeCollection.pageListWaitApprove,
      customer: null,
    };
  }

  adjustLoadApiPath = () => {
    return this.initialTabIndex == waitApproveFlag
      ? modelTypeCollection.flowCaseTypeCollection.pageListWaitApprove
      : modelTypeCollection.flowCaseTypeCollection.pageListLatestApprove;
  };

  triggerTabClick = (index, event, item) => {
    const { key, title } = item;

    this.initialTabIndex = getTabIndex(key);

    Taro.setNavigationBarTitle({
      title: title,
    });

    this.reloadData({
      delay: 500,
    });
  };

  buildTab = () => {
    return (
      <View
        style={{
          paddingLeft: transformSize(12),
          paddingRight: transformSize(12),
        }}
      >
        <CustomWrapper>
          <Tabs
            current={this.initialTabIndex}
            scroll
            titleActiveStyle={{
              color: '#0171fa',
              fontWight: '600',
            }}
            underlineActiveColor="#0171fa"
            underlineHorizontalHeight={4}
            underlineHorizontalMargin={20}
            tabList={this.tabList}
            onClick={this.triggerTabClick}
          />
        </CustomWrapper>
      </View>
    );
  };

  buildListView = () => {
    const { metaListData } = this.state;

    return (
      <CustomWrapper>
        <Space direction="vertical" fillWidth size={26} split={<Line />}>
          {metaListData.map((item) => {
            const {
              articleId,
              title,
              author,
              image,
              // redirect,
              // renderType,
              createTime,
            } = item;

            return (
              <FlexBox
                key={`article_${articleId}`}
                flexAuto="left"
                left={
                  <FlexBox
                    style={{ width: '100%', height: '100%' }}
                    flexAuto="top"
                    verticalHeight={300}
                    top={
                      checkStringIsNullOrWhiteSpace(image) ? (
                        <View
                          style={{
                            fontSize: transformSize(30),
                            lineHeight: transformSize(40),
                            color: '#333',
                          }}
                          onClick={() => {
                            // goToArticle({
                            //   articleId,
                            //   title,
                            //   redirect,
                            //   renderType,
                            // });
                          }}
                        >
                          {title}
                        </View>
                      ) : (
                        <Ellipsis
                          line={3}
                          style={{
                            height: transformSize(120),
                            fontSize: transformSize(30),
                            lineHeight: transformSize(40),
                            color: '#333',
                          }}
                          onClick={() => {
                            // goToArticle({
                            //   articleId,
                            //   title,
                            //   redirect,
                            //   renderType,
                            // });
                          }}
                        >
                          {title}
                        </Ellipsis>
                      )
                    }
                    bottom={
                      <>
                        <FlexBox
                          style={{
                            marginTop: transformSize(20),
                          }}
                          flexAuto="right"
                          leftStyle={{
                            width: transformSize(140),
                            marginRight: transformSize(20),
                          }}
                          left={
                            <ColorText
                              color="#afb4b5"
                              fontSize={24}
                              text={author}
                              onClick={() => {
                                // goToArticle({
                                //   articleId,
                                //   title,
                                //   redirect,
                                //   renderType,
                                // });
                              }}
                            />
                          }
                          right={
                            <ColorText
                              color="#afb4b5"
                              fontSize={24}
                              icon={<IconClock size={24} color="#afb4b5" />}
                              text={formatDatetime({
                                data: createTime,
                                fmt: datetimeFormat.yearMonthDay,
                              })}
                              onClick={() => {
                                // goToArticle({
                                //   articleId,
                                //   title,
                                //   redirect,
                                //   renderType,
                                // });
                              }}
                            />
                          }
                        />
                      </>
                    }
                  />
                }
                rightStyle={{
                  paddingLeft: transformSize(26),
                }}
                right={
                  checkStringIsNullOrWhiteSpace(image) ? null : (
                    <View
                      style={{ width: transformSize(220) }}
                      onClick={() => {
                        // goToArticle({ articleId, title, redirect, renderType });
                      }}
                    >
                      <ImageBox
                        src={image || defaultListImage}
                        aspectRatio={0.74}
                      />
                    </View>
                  )
                }
              />
            );
          })}
        </Space>
      </CustomWrapper>
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
          {this.judgeInitialActivityIndicatorVisible() ? (
            this.buildInitialActivityIndicator({})
          ) : metaListData.length === 0 ? (
            <View
              style={{
                paddingTop: transformSize(100),
              }}
            >
              {this.buildEmptyPlaceholder({
                imageWidth: 200,
                description: '还没有数据哦',
                descriptionStyle: {
                  marginTop: transformSize(60),
                },
              })}
            </View>
          ) : (
            this.buildListView()
          )}
        </View>
      </View>
    );
  }
}

export default FlowCase;
