import { CustomWrapper, View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import {
  // Line,
  Space,
} from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../../customComponents';
import {
  fieldDataWorkflowCase,
  flowCaseStatusCollection,
  viewStyle,
} from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { buildCreateApproveItem, HeadNavigationBox } from '../../../../utils';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '我发起的',
  navigationStyle: 'custom',
});

@connect(({ flowCase, session, entrance, global, schedulingControl }) => ({
  flowCase,
  session,
  entrance,
  global,
  schedulingControl,
}))
class PageListCreateApprove extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  enableLowerLoad = true;

  pagingLoadMode = true;

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
      loadApiPath: modelTypeCollection.flowCaseTypeCollection.pageList,
    };
  }

  doWorkWhenRepeatedShow = () => {
    this.reloadData({
      otherState: { metaListData: [] },
      delay: 800,
    });
  };

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="我发起的审批" />;
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
              const workflowCaseId = getValueByKey({
                data: item,
                key: fieldDataWorkflowCase.workflowCaseId.name,
                convert: convertCollection.string,
              });

              const status = getValueByKey({
                data: item,
                key: fieldDataWorkflowCase.status.name,
                convert: convertCollection.number,
              });

              return buildCreateApproveItem({
                key: `waitApprove_${workflowCaseId}`,
                data: item,
                onClick: () => {
                  if (status === flowCaseStatusCollection.created) {
                    this.goToFlowCaseForm(workflowCaseId);
                  } else {
                    this.goToApprove(workflowCaseId);
                  }
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

export default PageListCreateApprove;
