import classNames from 'classnames';
import { CustomWrapper, View } from '@tarojs/components';
import * as Taro from '@tarojs/taro';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { Line, Space, Tabs } from 'taro-fast-component';

import { PageWrapper } from '../../../customComponents';
import { modelTypeCollection } from '../../../modelBuilders';
import { buildLatestApproveItem, buildWaitApproveItem } from '../assist/tools';

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
  // showCallTrack = true;

  // showCallTrace = true;

  viewStyle = {
    backgroundColor: '#fcfbfc',
    paddingLeft: transformSize(20),
    paddingRight: transformSize(20),
    paddingBottom: transformSize(20),
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
    return this.initialTabIndex === 0
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
        <Line transparent height={16} />

        <Space
          direction="vertical"
          fillWidth
          size={26}
          split={<Line transparent height={16} />}
        >
          {metaListData.map((item) => {
            const { workflowCaseId } = item;

            if (this.initialTabIndex === 0) {
              return buildWaitApproveItem({
                key: `waitApprove_${workflowCaseId}`,
                data: item,
              });
            }

            return buildLatestApproveItem({
              key: `waitApprove_${workflowCaseId}`,
              data: item,
            });
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
      </View>
    );
  }
}

export default FlowCase;
