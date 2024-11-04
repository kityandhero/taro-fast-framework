import { CustomWrapper, View } from '@tarojs/components';
import * as Taro from '@tarojs/taro';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import {
  // Line,
  Space,
  Tabs,
} from 'taro-fast-component';

import { PageWrapper } from '../../../customComponents';
import { viewStyle } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import {
  buildCreateApproveItem,
  buildLatestApproveItem,
  buildWaitApproveItem,
  HeadNavigationBox,
} from '../../../utils';

const createApproveFlag = '6dff5474f77a4dfba4034f4b56e4eb96';
const waitApproveFlag = 'c14bbdb2b6214288bdfe11a266a89b47';
const latestApproveFlag = 'eb15add13d584a459d00423c373613b5';

const createApproveTab = {
  key: createApproveFlag,
  title: '已发起',
};

const waitApproveTab = {
  key: waitApproveFlag,
  title: '待审批',
};

const latestApproveTab = {
  key: latestApproveFlag,
  title: '已审批',
};

const tabCollection = [
  // {
  //   key: createApproveFlag,
  //   title: '已发起',
  // },
  waitApproveTab,
  latestApproveTab,
];

function getTabIndex(key) {
  for (const [index, { key: itemKey }] of tabCollection.entries()) {
    if (itemKey === key) {
      return index;
    }
  }

  return 0;
}

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '事项审批',
  navigationStyle: 'custom',
});

@connect(({ flowCase, session, entrance, global, schedulingControl }) => ({
  flowCase,
  session,
  entrance,
  global,
  schedulingControl,
}))
class FlowCase extends PageWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  viewStyle = {
    ...viewStyle,
    backgroundColor: '#f6f6f6',
    paddingBottom: transformSize(20),
  };

  enableBackTop = true;

  tabKey = waitApproveTab.key;

  tabList = tabCollection;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.flowCaseTypeCollection.pageList,
    };
  }

  adjustLoadApiPath = () => {
    let api = '';

    switch (this.tabKey) {
      case createApproveTab.key: {
        api = modelTypeCollection.flowCaseTypeCollection.pageList;
        break;
      }
      case waitApproveTab.key: {
        api = modelTypeCollection.flowCaseTypeCollection.pageListWaitApprove;
        break;
      }

      case latestApproveTab.key: {
        api = modelTypeCollection.flowCaseTypeCollection.pageListLatestApprove;
        break;
      }

      default: {
        api = '';
        break;
      }
    }

    return api;
  };

  triggerTabClick = (index, event, item) => {
    const { key, title } = item;

    this.tabKey = key;

    Taro.setNavigationBarTitle({
      title: title,
    });

    this.reloadData({
      otherState: { metaListData: [] },
      delay: 500,
    });
  };

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="事项审批" />;
  };

  buildTab = () => {
    return (
      <View
        style={{
          // paddingLeft: transformSize(12),
          // paddingRight: transformSize(12),
          backgroundColor: '#ffffff',
        }}
      >
        <CustomWrapper>
          <Tabs
            current={getTabIndex(this.tabKey)}
            // scroll
            titleStyle={{
              fontSize: transformSize(30),
            }}
            titleActiveStyle={{
              color: '#0171fa',
              fontWight: '600',
            }}
            underlineActiveColor="#0171fa"
            underlineHorizontalHeight={4}
            underlineHorizontalMargin={120}
            headerBackgroundColor="#f6f6f6"
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
        {/* <Line transparent height={16} /> */}

        <View
          style={
            {
              // paddingLeft: transformSize(20),
              // paddingRight: transformSize(20),
            }
          }
        >
          <Space
            direction="vertical"
            fillWidth
            size={8}
            // split={<Line transparent height={16} />}
          >
            {metaListData.map((item) => {
              const { workflowCaseId } = item;

              if (this.tabKey === createApproveTab.key) {
                return buildCreateApproveItem({
                  key: `waitApprove_${workflowCaseId}`,
                  data: item,
                  onClick: () => {
                    this.goToApprove(workflowCaseId);
                  },
                });
              }

              if (this.tabKey === waitApproveTab.key) {
                return buildWaitApproveItem({
                  key: `waitApprove_${workflowCaseId}`,
                  data: item,
                  onClick: () => {
                    this.goToApprove(workflowCaseId);
                  },
                });
              }

              return buildLatestApproveItem({
                key: `waitApprove_${workflowCaseId}`,
                data: item,
                onClick: () => {
                  this.goToApprove(workflowCaseId);
                },
              });
            })}
          </Space>
        </View>
      </CustomWrapper>
    );
  };

  buildUpperBox = () => {
    return this.buildTab();
  };

  renderFurther() {
    const { reloading, metaListData } = this.state;

    return (
      <View>
        {this.judgeInitialActivityIndicatorVisible() ? (
          <>{/* {this.buildInitialActivityIndicator({})} */}</>
        ) : metaListData.length === 0 && !reloading ? (
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
    );
  }
}

export default FlowCase;
