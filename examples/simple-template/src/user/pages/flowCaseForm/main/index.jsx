/* eslint-disable no-unused-vars */
import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  datetimeFormat,
  formatDatetime,
  getValueByKey,
  isArray,
  isEmptyArray,
  isFunction,
  isObject,
  isString,
  showSimpleSuccessMessage,
  showSimpleSuccessNotification,
  toDatetime,
  whetherNumber,
} from 'easy-soft-utility';

import { navigateBack, transformSize } from 'taro-fast-common';
import {
  Avatar,
  Button,
  Card,
  ColorText,
  FixedBox,
  FlexBox,
  Line,
  Tag,
  Watermark,
} from 'taro-fast-component';
import {
  DocumentPrintDesigner,
  FormBuilder,
} from 'taro-fast-design-playground';

import { PageNeedSignInWrapper } from '../../../../customComponents';
import {
  fieldDataFlow,
  fieldDataWorkflowCase,
  fieldDataWorkflowCaseFormAttachment,
  userGreyImage,
} from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { uploadFileDataApiAddress } from '../../../../services/flowCaseFormAttachment';
import { HeadNavigationBox } from '../../../../utils';
import {
  ConfirmSubmitFlowCaseActionSheet,
  SelectNextNodeApproverPopup,
} from '../../../customComponents';
import { analysisDocumentConfig, buildListApprove } from '../../../utils';
import { submitApprovalAction } from '../../approve/assist/action';
import {
  addAttachmentAction,
  removeAttachmentAction,
  submitFormAction,
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

const descriptionStyle = {
  color: '#7e7e7e',
  fontSize: transformSize(30),
  lineHeight: transformSize(42),
  paddingBottom: transformSize(10),
};

function analyzeSchema(o) {
  let schemaData = {};
  const list = [];

  if (isString(o)) {
    schemaData = JSON.parse(o);
  } else if (isObject(o)) {
    schemaData = o;
  } else {
    schemaData = {};
  }

  const { schema } = {
    schema: {},
    ...schemaData,
  };

  const { properties } = {
    properties: {},
    ...schema,
  };

  for (const [key, value] of Object.entries(properties)) {
    const {
      title,
      name,
      enum: enumList,
      'x-component': componentName,
      'x-component-props': componentProperties,
      required,
    } = {
      title: '',
      name: key,
      enum: [],
      required: false,
      'x-component': '',
      'x-component-props': {},
      ...value,
    };

    let type = '';
    let extraProperties = {};

    switch (componentName) {
      case 'Input': {
        type = 'string';
        break;
      }

      case 'Input.TextArea': {
        type = 'multiString';
        break;
      }

      case 'NumberPicker': {
        type = 'number';
        break;
      }

      case 'DatePicker.RangePicker': {
        type = 'datetimeRange';
        break;
      }

      case 'DatePicker': {
        type = 'datetime';
        break;
      }

      case 'TimePicker.RangePicker': {
        type = 'timeRange';
        break;
      }

      case 'TimePicker': {
        type = 'time';
        break;
      }

      case 'Select': {
        const { mode } = {
          mode: '',
          ...componentProperties,
        };

        type = mode === 'multiple' ? 'multiSelect' : 'singleSelect';
        break;
      }

      case 'Checkbox.Group': {
        type = 'multiSelect';
        break;
      }

      default: {
        type = '';
        break;
      }
    }

    if (isArray(enumList) && !isEmptyArray(enumList)) {
      const l = enumList.map((item) => {
        const { label, value: v } = {
          label: '',
          value: '',
          ...item,
        };

        return { label, value: v };
      });

      list.push({
        required,
        title,
        type,
        name,
        enumList: l,
        extraProperties,
      });
    } else {
      list.push({
        required,
        title,
        type,
        name,
        enumList: [],
        extraProperties,
      });
    }
  }

  return list;
}

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '审批表单',
  navigationStyle: 'custom',
});

@connect(
  ({
    flowCase,
    flowCaseFormAttachment,
    session,
    entrance,
    global,
    schedulingControl,
  }) => ({
    flowCase,
    flowCaseFormAttachment,
    session,
    entrance,
    global,
    schedulingControl,
  }),
)
class FlowCaseForm extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  currentFormData = {};

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.flowCaseTypeCollection.get,
      workflowId: '',
      workflowCaseId: '',
      listFormStorageForDocument: [],
      schemaList: [],
      initialValueList: [],
      attachmentList: [],
      remarkList: [],
      workflowAvailableOnMobileSwitch: whetherNumber.no,
      listChainApprove: [],
      listApprove: [],
    };
  }

  supplementLoadRequestParams = (o) => {
    const id = getValueByKey({
      data: this.externalParameter,
      key: 'id',
      defaultValue: '',
    });

    o[fieldDataWorkflowCase.workflowCaseId.name] = id;

    return { ...o };
  };

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const workflowCaseId = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.workflowCaseId.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    const workflowId = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.workflowId.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    const workflow = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.workflow.name,
      defaultValue: {},
    });

    const workflowAvailableOnMobileSwitch = getValueByKey({
      data: workflow,
      key: fieldDataFlow.availableOnMobileSwitch.name,
      defaultValue: whetherNumber.no,
      convert: convertCollection.number,
    });

    const canEdit = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.canEdit.name,
      defaultValue: whetherNumber.no,
      convert: convertCollection.number,
    });

    const listFormStorage = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.listFormStorage.name,
      convert: convertCollection.array,
      defaultValue: [],
    });

    const listFormStorageForDocument = listFormStorage.map((o) => {
      const { nameNote: title, name, value, displayValue, valueType } = o;

      let displayValueAdjust = displayValue;

      if (valueType === 500) {
        try {
          const vList = JSON.parse(displayValue);

          if (isArray(vList) && vList.length === 2) {
            const vListAdjust = vList.map((one) => {
              try {
                return formatDatetime({
                  data: toDatetime(one),
                  format: datetimeFormat.yearMonthDayHourMinute,
                });
              } catch {
                return one;
              }
            });

            displayValueAdjust = vListAdjust.join(' ~ ');
          } else {
            displayValueAdjust = displayValue;
          }
        } catch {
          displayValueAdjust = displayValue;
        }
      }

      return {
        title,
        name,
        value,
        displayValue: displayValueAdjust,
      };
    });

    const initialValueList = listFormStorage.map((o) => {
      const { name, value, displayValue } = o;

      return {
        name,
        value,
        displayValue,
      };
    });

    const listAttachment = getValueByKey({
      data: metaData,

      key: fieldDataWorkflowCase.listAttachment.name,
      convert: convertCollection.array,
      defaultValue: [],
    });

    const { workflowFormDesign } = {
      workflowFormDesign: {},
      ...metaData,
    };

    const { designSchema, remarkSchemaList } = {
      designSchema: '',
      remarkSchemaList: [],
      ...workflowFormDesign,
    };

    const nextApproveWorkflowNode = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.nextApproveWorkflowNode.name,
      defaultValue: {},
    });

    const approveBatchNumber = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.approveBatchNumber.name,
      defaultValue: '',
      convert: convertCollection.number,
    });

    const listChainApprove = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.listChainApprove.name,
      convert: convertCollection.array,
      defaultValue: [],
    });

    const listApprove = buildListApprove({
      approveBatchNumber,
      listChainApprove,
      listProcessHistory,
      nextApproveWorkflowNode,
    });

    const listProcessHistory = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.listProcessHistory.name,
      convert: convertCollection.array,
      defaultValue: [],
    });

    this.setState({
      workflowFormDesign,
      workflowId,
      workflowCaseId,
      canEdit,
      listFormStorageForDocument,
      schemaList: analyzeSchema(designSchema),
      initialValueList: initialValueList,
      attachmentList: listAttachment,
      remarkList: [
        ...remarkSchemaList,
        '保存表单仅仅保存数据, 如需进行审批, 请在保存表单后点击提交审批。',
      ],
      workflowAvailableOnMobileSwitch,
      listChainApprove: [...listChainApprove],
      listApprove: [...listApprove],
    });
  };

  addAttachment = ({ workflowId, flowCaseId, uploadHistoryId }) => {
    addAttachmentAction({
      target: this,
      handleData: {
        workflowId,
        flowCaseId,
        uploadHistoryId,
      },
      successCallback: ({ target, remoteListData }) => {
        showSimpleSuccessNotification('新增附件成功');

        target.setState({
          attachmentList: [...remoteListData],
        });
      },
    });
  };

  removeAttachment = (o) => {
    const workflowCaseFormAttachmentId = getValueByKey({
      data: o,
      key: fieldDataWorkflowCaseFormAttachment.workflowCaseFormAttachmentId
        .name,
      convert: convertCollection.string,
      defaultValue: '',
    });

    removeAttachmentAction({
      target: this,
      handleData: {
        workflowCaseFormAttachmentId,
      },
      successCallback: ({ target, remoteListData }) => {
        showSimpleSuccessNotification('移除附件成功');

        target.setState({
          attachmentList: [...remoteListData],
        });
      },
    });
  };

  submitForm = ({ successCallback }) => {
    const { metaData } = this.state;

    const workflowCaseId = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.workflowCaseId.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    submitFormAction({
      target: this,
      handleData: {
        workflowCaseId,
        ...this.currentFormData,
      },
      successCallback: () => {
        showSimpleSuccessMessage('保存表单成功');

        if (isFunction(successCallback)) {
          successCallback();
        }
      },
    });
  };

  submitApproval = () => {
    const { metaData } = this.state;

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

    submitApprovalAction({
      target: this,
      handleData: {
        workflowCaseId,
        nextWorkflowNodeApproverUserIdCollection:
          nextWorkflowNodeApproverUserIdCollection.join(','),
      },
      successCallback: ({ target }) => {
        showSimpleSuccessMessage('提交审批成功');

        this.redirectToApprove(workflowCaseId);
      },
    });
  };

  uploadFile = () => {
    const that = this;

    const { workflowId, workflowCaseId } = this.state;

    that.selectSingleFileAndUpload({
      uploadUrl: uploadFileDataApiAddress,
      successCallback: ({ data }) => {
        const { uploadHistoryId } = {
          uploadHistoryId: '',
          ...data,
        };

        that.addAttachment({
          workflowId,
          flowCaseId: workflowCaseId,
          uploadHistoryId,
        });
      },
    });
  };

  triggerNextNodeApproverChange = (v, option) => {
    this.nextWorkflowNodeApproverUserId = v;
  };

  onFormChange = (o) => {
    this.currentFormData = o;
  };

  showSelectNextNodeApproverPopup = () => {
    SelectNextNodeApproverPopup.open();
  };

  showConfirmSubmitFlowCaseActionSheet = () => {
    ConfirmSubmitFlowCaseActionSheet.open();
  };

  prepareSubmitApproval = () => {
    const { workflowAvailableOnMobileSwitch } = this.state;

    const that = this;

    if (workflowAvailableOnMobileSwitch === whetherNumber.yes) {
      that.submitForm({
        successCallback: () => {
          that.showSelectNextNodeApproverPopup();
        },
      });
    } else {
      that.showSelectNextNodeApproverPopup();
    }
  };

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="编辑表单" />;
  };

  buildTitleBox = () => {
    const { metaData } = this.state;

    const title = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.title.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    const description = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.description.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    const userAvatar = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.userAvatar.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    const userRealName = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.userRealName.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    const statusNote = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.statusNote.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    const lastSubmitApprovalTime = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.lastSubmitApprovalTime.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    return (
      <Card
        header={title}
        headerStyle={headerStyle}
        bodyStyle={{ ...bodyStyle }}
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
        {checkStringIsNullOrWhiteSpace(description) ? null : (
          <>
            <View style={descriptionStyle}>详情: {description}</View>

            <Line transparent height={10} />
          </>
        )}

        <FlexBox
          style={{ width: '100%' }}
          flexAuto="right"
          leftStyle={{
            marginRight: transformSize(14),
          }}
          left={<Avatar circle size={36} image={userAvatar || userGreyImage} />}
          right={
            <FlexBox
              flexAuto="left"
              left={
                <View>
                  <ColorText
                    color="#7d7d7d"
                    fontSize={30}
                    textPrefixStyle={{
                      fontWeight: 'bold',
                    }}
                    textPrefix={userRealName}
                    separator=""
                    separatorStyle={{
                      marginRight: transformSize(14),
                    }}
                    text={lastSubmitApprovalTime}
                  />
                </View>
              }
              right={
                <Tag color="#71bcea" fill="outline">
                  {statusNote}
                </Tag>
              }
            />
          }
        />
      </Card>
    );
  };

  buildActionBox = () => {
    const { workflowAvailableOnMobileSwitch, canEdit } = this.state;

    return (
      <View
        style={{
          width: '100%',
          backgroundColor: '#fff',
        }}
      >
        <FixedBox style={{ width: '100%' }} zIndex={100} bottom={0}>
          <Line color="#eee" height={2} />

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
                <View>
                  <FlexBox
                    flexAuto="left"
                    leftStyle={{
                      marginRight: transformSize(30),
                    }}
                    left={
                      workflowAvailableOnMobileSwitch === whetherNumber.yes ? (
                        <Button
                          text="上传附件"
                          // backgroundColor="#fc5e3d"
                          // fontColor="#fff"
                          fontSize={30}
                          paddingTop={14}
                          paddingBottom={14}
                          paddingLeft={24}
                          paddingRight={24}
                          size="middle"
                          disabled={canEdit !== whetherNumber.yes}
                          onClick={this.uploadFile}
                        />
                      ) : null
                    }
                    right={
                      <>
                        {workflowAvailableOnMobileSwitch ===
                        whetherNumber.yes ? (
                          <Button
                            text="保存表单"
                            backgroundColor="#0075ff"
                            fontColor="#fff"
                            fontSize={30}
                            paddingTop={14}
                            paddingBottom={14}
                            paddingLeft={24}
                            paddingRight={24}
                            size="middle"
                            disabled={
                              canEdit !== whetherNumber.yes ||
                              workflowAvailableOnMobileSwitch !==
                                whetherNumber.yes
                            }
                            onClick={this.submitForm}
                          />
                        ) : null}

                        {workflowAvailableOnMobileSwitch ===
                        whetherNumber.yes ? (
                          <Line
                            direction="vertical"
                            width={30}
                            height="30"
                            transparent
                          />
                        ) : null}

                        <Button
                          text="提交审批"
                          backgroundColor="#2da44e"
                          fontColor="#fff"
                          fontSize={30}
                          paddingTop={14}
                          paddingBottom={14}
                          paddingLeft={24}
                          paddingRight={24}
                          size="middle"
                          disabled={canEdit !== whetherNumber.yes}
                          onClick={this.prepareSubmitApproval}
                        />
                      </>
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

  renderFurther() {
    const {
      workflowAvailableOnMobileSwitch,
      canEdit,
      metaData,
      workflowFormDesign,
      listFormStorageForDocument,
      initialValueList,
      schemaList,
      remarkList,
      attachmentList,
      listApprove,
      listChainApprove,
    } = this.state;

    const {
      general,
      items,
      showApply,
      listApply,
      showAttention,
      listAttention,
      remarkSchemaList,
    } = analysisDocumentConfig({
      flowCase: metaData,
      workflowFormDesign,
    });

    const workflowCaseId = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.workflowCaseId.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    const qRCodeImage = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.qRCodeImage.name,
      convert: convertCollection.string,
    });

    return (
      <View>
        {this.judgeInitialActivityIndicatorVisible() ? (
          <>{this.buildInitialActivityIndicator({})}</>
        ) : metaData == null ? (
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

            <Line transparent height={220} />

            <View
              style={{
                marginLeft: transformSize(60),
                marginRight: transformSize(60),
              }}
            >
              <Button
                text="返回工作台"
                backgroundColor="#0075ff"
                fontColor="#fff"
                fontSize={32}
                block
                circle
                size="middle"
                onClick={() => {
                  this.goToHomeTab();
                }}
              />
            </View>
          </View>
        ) : (
          <>
            {this.buildTitleBox()}

            <Line color="#eeeeee" height={20} />

            {canEdit !== whetherNumber.yes ||
            workflowAvailableOnMobileSwitch !== whetherNumber.yes ? (
              <View
                style={{
                  marginLeft: transformSize(14),
                  marginRight: transformSize(14),
                }}
              >
                <Watermark content="驻矿托OA">
                  <DocumentPrintDesigner
                    title={getValueByKey({
                      data: metaData,
                      key: fieldDataWorkflowCase.workflowTitle.name,
                    })}
                    schema={{
                      general,
                      items,
                    }}
                    borderColor="#999"
                    values={listFormStorageForDocument}
                    showApply={showApply}
                    applyList={listApply}
                    showAttention={showAttention}
                    attentionList={listAttention}
                    approveList={isArray(listApprove) ? listApprove : []}
                    allApproveProcessList={listChainApprove}
                    signetStyle={{
                      top: transformSize(-4),
                    }}
                    remarkTitle="备注"
                    remarkName="remark"
                    remarkList={remarkSchemaList}
                    showQRCode
                    qRCodeImage={qRCodeImage}
                    qRCodeHeight={64}
                    showSerialNumber
                    serialNumberTitle="审批流水号: "
                    serialNumberContent={workflowCaseId}
                  />
                </Watermark>
              </View>
            ) : (
              <FormBuilder
                initialValueList={initialValueList}
                schemaList={schemaList}
                attachmentList={attachmentList}
                remarkList={remarkList}
                onRemoveAttachment={this.removeAttachment}
                afterFormChange={(o) => {
                  this.onFormChange(o);
                }}
              />
            )}

            <Line transparent height={120} />

            {this.buildActionBox()}
          </>
        )}
      </View>
    );
  }

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
        <SelectNextNodeApproverPopup
          header="选择下一审批人"
          externalData={{ workflowCaseId }}
          afterNextNodeApproverChange={this.triggerNextNodeApproverChange}
          afterOk={this.showConfirmSubmitFlowCaseActionSheet}
        />

        <ConfirmSubmitFlowCaseActionSheet
          headerStyle={{
            color: '#000',
            // fontWeight: 'bold',
            fontSize: transformSize(32),
          }}
          afterOk={this.submitApproval}
        />
      </>
    );
  };
}

export default FlowCaseForm;
