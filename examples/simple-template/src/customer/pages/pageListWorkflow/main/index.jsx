import { CustomWrapper, View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { Space } from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../../customComponents';
import { fieldDataWorkflowCase, viewStyle } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { buildWorkflowItem, HeadNavigationBox } from '../../../../utils';
import { ConfirmCreateFlowCaseActionSheet } from '../../../customComponents';
import { createFlowCaseAction } from '../assist/action';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '可发起的流程',
  navigationStyle: 'custom',
});

@connect(({ workflow, session, entrance, global, schedulingControl }) => ({
  workflow,
  session,
  entrance,
  global,
  schedulingControl,
}))
class PageListWorkflow extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  currentWorkflowId = '';

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
      loadApiPath: modelTypeCollection.workflowTypeCollection.pageListUsable,
    };
  }

  doWorkWhenRepeatedShow = () => {
    this.reloadData({
      otherState: { metaListData: [] },
      delay: 800,
    });
  };

  createFlowCase = () => {
    const that = this;

    createFlowCaseAction({
      target: that,
      handleData: { workflowId: that.currentWorkflowId ?? '' },
      successCallback: ({ target, remoteData }) => {
        const workflowCaseId = getValueByKey({
          data: remoteData,
          key: fieldDataWorkflowCase.workflowCaseId.name,
          convert: convertCollection.string,
          defaultValue: '',
        });
        target.goToFlowCaseForm(workflowCaseId);
      },
    });
  };

  confirmCreate = (v) => {
    this.currentWorkflowId = v;

    ConfirmCreateFlowCaseActionSheet.open();
  };

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="可发起的流程" />;
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
              const { workflowId } = item;

              return buildWorkflowItem({
                key: `workflow_${workflowId}`,
                data: item,
                onClick: () => {
                  this.confirmCreate(workflowId);
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

  renderInteractiveArea = () => {
    return (
      <>
        <ConfirmCreateFlowCaseActionSheet
          headerStyle={{
            color: '#999',
            fontWeight: 'bold',
          }}
          afterOk={this.createFlowCase}
        />
      </>
    );
  };
}

export default PageListWorkflow;
