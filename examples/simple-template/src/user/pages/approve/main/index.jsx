import React from 'react';
import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
  showSimpleSuccessMessage,
  showSimpleSuccessNotification,
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
import {
  ConfirmPassFlowCaseActionSheet,
  ConfirmRefuseFlowCaseActionSheet,
  ConfirmSubmitFlowCaseActionSheet,
  SelectGeneralDiscoursePopup,
  SelectNextNodeApproverPopup,
} from '../../../customComponents';
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

const targetActionSheetCollection = {
  unknown: 0,
  submitApproval: 100,
  pass: 200,
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
  targetActionSheet = targetActionSheetCollection.unknown;

  inputGeneralDiscourseRef = React.createRef();

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      defaultGeneralDiscourse: '',
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
        showSimpleSuccessNotification('提交审批成功');

        target.reloadData({});
      },
    });
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

    const nextWorkflowNodeApproverUserIdCollection =
      checkStringIsNullOrWhiteSpace(this.nextWorkflowNodeApproverUserId ?? '')
        ? []
        : [this.nextWorkflowNodeApproverUserId];

    passAction({
      target: this,
      handleData: {
        workflowCaseId,
        note: this.note,
        nextWorkflowNodeApproverUserIdCollection:
          nextWorkflowNodeApproverUserIdCollection.join(','),
      },
      successCallback: ({ target }) => {
        showSimpleSuccessMessage('审批完成');

        target.goToHomeTab();
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
        showSimpleSuccessMessage('审批完成');

        target.goToUserTab();
      },
    });
  };

  triggerNoteChanged = (v) => {
    this.note = v;
  };

  // eslint-disable-next-line no-unused-vars
  triggerNextNodeApproverChange = (v, option) => {
    this.nextWorkflowNodeApproverUserId = v;
  };

  showSelectGeneralDiscoursePopup = () => {
    SelectGeneralDiscoursePopup.open();
  };

  afterSelectGeneralDiscoursePopupOk = (v) => {
    this.inputGeneralDiscourseRef.current.setValue(v);
  };

  showSelectNextNodeApproverPopup = () => {
    SelectNextNodeApproverPopup.open();
  };

  afterSelectNextNodeApproverPopupOk = () => {
    if (this.targetActionSheet == targetActionSheetCollection.submitApproval) {
      this.showConfirmSubmitFlowCaseActionSheet();

      return;
    }

    if (this.targetActionSheet == targetActionSheetCollection.pass) {
      this.showConfirmPassFlowCaseActionSheet();

      return;
    }

    showSimpleErrorMessage('未知的交互逻辑');
  };

  showConfirmSubmitFlowCaseActionSheet = () => {
    ConfirmSubmitFlowCaseActionSheet.open();
  };

  showConfirmPassFlowCaseActionSheet = () => {
    ConfirmPassFlowCaseActionSheet.open();
  };

  showConfirmRefuseFlowCaseActionSheet = () => {
    ConfirmRefuseFlowCaseActionSheet.open();
  };

  prepareSubmitApproval = () => {
    this.targetActionSheet = targetActionSheetCollection.submitApproval;

    this.showSelectNextNodeApproverPopup();
  };

  preparePass = () => {
    if (checkStringIsNullOrWhiteSpace(this.note)) {
      showSimpleErrorMessage('请输入审批意见');

      return;
    }

    const { metaData } = this.state;

    this.targetActionSheet = targetActionSheetCollection.pass;

    const nextApproveWorkflowNodeWhetherFinalApprovalNode = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.nextApproveWorkflowNodeWhetherFinalApprovalNode
        .name,
      defaultValue: whetherNumber.no,
      convert: convertCollection.number,
    });

    if (nextApproveWorkflowNodeWhetherFinalApprovalNode === whetherNumber.yes) {
      this.showConfirmPassFlowCaseActionSheet();
    } else {
      this.showSelectNextNodeApproverPopup();
    }
  };

  prepareRefuse = () => {
    if (checkStringIsNullOrWhiteSpace(this.note)) {
      showSimpleErrorMessage('请输入审批意见');

      return;
    }

    this.showConfirmRefuseFlowCaseActionSheet();
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
    const { canEdit, canApprove, defaultGeneralDiscourse } = this.state;

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
            extra={
              <View
                style={{
                  fontSize: transformSize(30),
                  color: '#71bcea',
                }}
                onClick={this.showSelectGeneralDiscoursePopup}
              >
                快捷常用语
              </View>
            }
          >
            <View
              style={{
                backgroundColor: '#fcfbfc',
                borderRadius: transformSize(8),
                overflow: 'hidden',
              }}
            >
              <InputItem
                ref={this.inputGeneralDiscourseRef}
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
                value={defaultGeneralDiscourse}
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
                  onClick={this.prepareRefuse}
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
                          text="批准"
                          backgroundColor="#0075ff"
                          fontColor="#fff"
                          fontSize={30}
                          paddingTop={14}
                          paddingBottom={14}
                          paddingLeft={32}
                          paddingRight={32}
                          size="middle"
                          onClick={this.preparePass}
                        />
                      ) : (
                        <Button
                          text="提交审批"
                          backgroundColor="#2da44e"
                          fontColor="#fff"
                          fontSize={30}
                          paddingTop={14}
                          paddingBottom={14}
                          paddingLeft={32}
                          paddingRight={32}
                          size="middle"
                          onClick={this.prepareSubmitApproval}
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
    const { metaData } = this.state;

    const workflowCaseId = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.workflowCaseId.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    return (
      <>
        {this.renderFilePreviewPopup()}

        <SelectNextNodeApproverPopup
          header="选择下一审批人"
          externalData={{ workflowCaseId }}
          afterChange={this.triggerNextNodeApproverChange}
          afterOk={this.afterSelectNextNodeApproverPopupOk}
        />

        <SelectGeneralDiscoursePopup
          header="选择常用语"
          afterOk={this.afterSelectGeneralDiscoursePopupOk}
        />

        <ConfirmSubmitFlowCaseActionSheet
          headerStyle={{
            color: '#000',
            // fontWeight: 'bold',
            fontSize: transformSize(32),
          }}
          afterOk={this.submitApproval}
        />

        <ConfirmPassFlowCaseActionSheet
          headerStyle={{
            color: '#000',
            // fontWeight: 'bold',
            fontSize: transformSize(32),
          }}
          afterOk={this.pass}
        />

        <ConfirmRefuseFlowCaseActionSheet
          headerStyle={{
            color: '#000',
            // fontWeight: 'bold',
            fontSize: transformSize(32),
          }}
          afterOk={this.refuse}
        />
      </>
    );
  };
}

export default Approve;
