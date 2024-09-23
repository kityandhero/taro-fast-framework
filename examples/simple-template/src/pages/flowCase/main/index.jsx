import { CustomWrapper, View } from '@tarojs/components';
import * as Taro from '@tarojs/taro';

import { connect } from 'easy-soft-dva';
import { navigateTo } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { Line, Space, Tabs } from 'taro-fast-component';

import { PageWrapper } from '../../../customComponents';
import { pathCollection, viewStyle } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import {
  buildCreateApproveItem,
  buildLatestApproveItem,
  buildWaitApproveItem,
} from '../assist/tools';

const createApproveFlag = '6dff5474f77a4dfba4034f4b56e4eb96';
const waitApproveFlag = 'c14bbdb2b6214288bdfe11a266a89b47';
const latestApproveFlag = 'eb15add13d584a459d00423c373613b5';

const tabCollection = [
  {
    key: createApproveFlag,
    title: '已发起',
  },
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
  let result = 0;

  switch (key) {
    case createApproveFlag: {
      result = 0;
      break;
    }
    case waitApproveFlag: {
      result = 1;
      break;
    }

    case latestApproveFlag: {
      result = 2;
      break;
    }

    default: {
      result = 0;
      break;
    }
  }

  return result;
}

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '审批',
  // navigationStyle: 'custom',
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
    paddingBottom: transformSize(20),
  };

  enableBackTop = true;

  initialTabIndex = 0;

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

    switch (this.initialTabIndex) {
      case 0: {
        api = modelTypeCollection.flowCaseTypeCollection.pageList;
        break;
      }
      case 1: {
        api = modelTypeCollection.flowCaseTypeCollection.pageListWaitApprove;
        break;
      }

      case 2: {
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

    this.initialTabIndex = getTabIndex(key);

    Taro.setNavigationBarTitle({
      title: title,
    });

    this.reloadData({
      delay: 500,
    });
  };

  goToApprove = (id) => {
    navigateTo(`${pathCollection.customer.approve.path}?id=${id}`);
  };

  buildTab = () => {
    return (
      <View
        style={{
          paddingLeft: transformSize(12),
          paddingRight: transformSize(12),
          backgroundColor: '#ffffff',
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
        <Line transparent height={16} />

        <View
          style={{
            paddingLeft: transformSize(20),
            paddingRight: transformSize(20),
          }}
        >
          <Space
            direction="vertical"
            fillWidth
            size={10}
            // split={<Line transparent height={16} />}
          >
            {metaListData.map((item) => {
              const { workflowCaseId } = item;

              if (this.initialTabIndex === 0) {
                return buildCreateApproveItem({
                  key: `waitApprove_${workflowCaseId}`,
                  data: item,
                  onClick: () => {
                    this.goToApprove(workflowCaseId);
                  },
                });
              }

              if (this.initialTabIndex === 1) {
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
    const { metaListData } = this.state;

    return (
      <View>
        {this.judgeInitialActivityIndicatorVisible() ? (
          <>{/* {this.buildInitialActivityIndicator({})} */}</>
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
    );
  }
}

export default FlowCase;
