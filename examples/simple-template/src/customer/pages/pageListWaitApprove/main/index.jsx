import { CustomWrapper, View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import {
  // Line,
  Space,
} from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../../customComponents';
import { viewStyle } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { buildWaitApproveItem, HeadNavigationBox } from '../../../../utils';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '待审批',
  navigationStyle: 'custom',
});

@connect(({ flowCase, session, entrance, global, schedulingControl }) => ({
  flowCase,
  session,
  entrance,
  global,
  schedulingControl,
}))
class PageListWaitApprove extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  viewStyle = {
    ...viewStyle,
    backgroundColor: '#f6f6f6',
    paddingBottom: transformSize(20),
  };

  enableBackTop = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.flowCaseTypeCollection.pageListWaitApprove,
    };
  }

  doWorkWhenRepeatedShow = () => {
    this.reloadData({
      otherState: { metaListData: [] },
      delay: 800,
    });
  };

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="待处理审批" />;
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
          <Space direction="vertical" fillWidth size={10}>
            {metaListData.map((item) => {
              const { workflowCaseId } = item;

              return buildWaitApproveItem({
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

  renderFurther() {
    const { reloading, metaListData } = this.state;

    return (
      <View>
        {this.judgeInitialActivityIndicatorVisible() ? (
          <></>
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

export default PageListWaitApprove;
