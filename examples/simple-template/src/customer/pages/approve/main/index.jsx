import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
  showSuccessMessage,
  showSuccessNotification,
  whetherNumber,
} from 'easy-soft-utility';

import { navigateBack, transformSize } from 'taro-fast-common';
import {
  Button,
  Card,
  FixedBox,
  FlexBox,
  InputItem,
  Line,
} from 'taro-fast-component';

import { fieldDataWorkflowCase } from '../../../../customConfig';
import { HeadNavigationBox } from '../../../../utils';
import { ConfirmSubmitFlowCaseActionSheet } from '../../../customComponents';
import { BaseFlowCaseDetail } from '../../../pageBases';
import {
  passAction,
  refuseAction,
  submitApprovalAction,
} from '../assist/action';

const stripTopValue = 24;
const stripHeightValue = 32;

const headerStyle = {
  color: '#181818',
  fontSize: transformSize(32),
  lineHeight: transformSize(46),
  fontWeight: 'bold',
  paddingLeft: transformSize(26),
  paddingRight: transformSize(26),
};

const bodyStyle = {
  paddingLeft: transformSize(26),
  paddingRight: transformSize(26),
  paddingBottom: transformSize(20),
};

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
class Approve extends BaseFlowCaseDetail {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
    };
  }

  submitApproval = () => {
    const { metaData } = this.state;

    const workflowCaseId = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.workflowCaseId.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    submitApprovalAction({
      target: this,
      handleData: {
        workflowCaseId,
      },
      successCallback: ({ target }) => {
        showSuccessNotification('提交审批成功');

        target.reloadData({});
      },
    });
  };

  confirmSubmit = () => {
    ConfirmSubmitFlowCaseActionSheet.open();
  };

  pass = () => {
    const { metaData } = this.state;

    if (checkStringIsNullOrWhiteSpace(this.note)) {
      showSimpleErrorMessage('请输入审批意见');

      return;
    }

    const workflowCaseId = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.workflowCaseId.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    passAction({
      target: this,
      handleData: {
        workflowCaseId,
        note: this.note,
      },
      successCallback: ({ target }) => {
        showSuccessMessage('审批完成');

        target.reloadData({});
      },
    });
  };

  refuse = () => {
    const { metaData } = this.state;

    if (checkStringIsNullOrWhiteSpace(this.note)) {
      showSimpleErrorMessage('请输入审批意见');

      return;
    }

    const workflowCaseId = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.workflowCaseId.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    refuseAction({
      target: this,
      handleData: {
        workflowCaseId,
        note: this.note,
      },
      successCallback: ({ target }) => {
        showSuccessMessage('审批完成');

        target.reloadData({});
      },
    });
  };

  triggerNoteChanged = (v) => {
    this.note = v;
  };

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="审批详情" />;
  };

  buildActionPlaceholderBox = () => {
    const { canEdit, canApprove } = this.state;

    if (canEdit === whetherNumber.no && canApprove === whetherNumber.no) {
      return null;
    }

    return <Line transparent height={350} />;
  };

  buildActionBox = () => {
    const { canEdit, canApprove } = this.state;

    if (canEdit === whetherNumber.no && canApprove === whetherNumber.no) {
      return (
        <>
          <Line transparent height={18} />

          <View
            style={{
              width: '100%',
            }}
          >
            <View
              style={{
                paddingLeft: transformSize(18),
                paddingRight: transformSize(18),
              }}
            >
              <Button
                text="返回"
                fontSize={30}
                backgroundColor="#fff"
                block
                size="middle"
                onClick={() => {
                  navigateBack();
                }}
              />
            </View>

            <Line transparent height={60} />
          </View>
        </>
      );
    }

    return (
      <View
        style={{
          width: '100%',
          backgroundColor: '#fff',
        }}
      >
        <FixedBox style={{ width: '100%' }} zIndex={100} bottom={0}>
          <Line color="#eee" height={2} />

          <Card
            header="审批意见"
            headerStyle={headerStyle}
            bodyStyle={{
              ...bodyStyle,
              paddingBottom: 0,
            }}
            space={false}
            border={false}
            bodyBorder={false}
            headerEllipsis={false}
            stripCenter={false}
            stripTop={stripTopValue}
            stripHeight={stripHeightValue}
            strip
            stripColor="#0075fe"
          >
            <View
              style={{
                backgroundColor: '#fcfbfc',
                borderRadius: transformSize(8),
                overflow: 'hidden',
              }}
            >
              <InputItem
                required
                layout="vertical"
                areaMode
                areaHeight={180}
                border={false}
                valueStyle={{
                  color: '#333',
                  fontSize: transformSize(30),
                  lineHeight: transformSize(46),
                }}
                placeholder="请输入审批意见"
                afterChange={this.triggerNoteChanged}
              />
            </View>
          </Card>

          <View
            style={{
              backgroundColor: '#fff',
              paddingTop: transformSize(16),
              paddingBottom: transformSize(16),
              paddingLeft: transformSize(26),
              paddingRight: transformSize(26),
            }}
          >
            <FlexBox
              flexAuto="left"
              left={
                <Button
                  weappButton
                  text="驳回"
                  backgroundColor="#fc5e3d"
                  fontColor="#fff"
                  fontSize={30}
                  paddingTop={14}
                  paddingBottom={14}
                  paddingLeft={32}
                  paddingRight={32}
                  size="middle"
                  hidden={!canApprove}
                  onClick={this.refuse}
                />
              }
              right={
                <View>
                  <FlexBox
                    flexAuto="left"
                    leftStyle={{
                      marginRight: transformSize(30),
                    }}
                    left={
                      <Button
                        weappButton
                        fill="none"
                        text="返回"
                        fontColor="#4599ea"
                        fontSize={30}
                        paddingTop={14}
                        paddingBottom={14}
                        paddingLeft={20}
                        paddingRight={20}
                        size="middle"
                        onClick={() => {
                          navigateBack();
                        }}
                      />
                    }
                    right={
                      canApprove ? (
                        <Button
                          weappButton
                          text="批准"
                          backgroundColor="#0075ff"
                          fontColor="#fff"
                          fontSize={30}
                          paddingTop={14}
                          paddingBottom={14}
                          paddingLeft={32}
                          paddingRight={32}
                          size="middle"
                          onClick={this.pass}
                        />
                      ) : (
                        <Button
                          weappButton
                          text="提交审批"
                          backgroundColor="#2da44e"
                          fontColor="#fff"
                          fontSize={30}
                          paddingTop={14}
                          paddingBottom={14}
                          paddingLeft={32}
                          paddingRight={32}
                          size="middle"
                          onClick={this.confirmSubmit}
                        />
                      )
                    }
                  />
                </View>
              }
            />
          </View>
        </FixedBox>
      </View>
    );
  };

  renderInteractiveArea = () => {
    return (
      <>
        {this.renderFilePreviewPopup()}

        <ConfirmSubmitFlowCaseActionSheet
          headerStyle={{
            color: '#999',
            fontWeight: 'bold',
          }}
          afterOk={this.submitApproval}
        />
      </>
    );
  };
}

export default Approve;
