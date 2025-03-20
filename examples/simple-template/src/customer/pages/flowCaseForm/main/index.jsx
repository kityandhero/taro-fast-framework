import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  isObject,
  isString,
  showSuccessNotification,
  whetherNumber,
} from 'easy-soft-utility';

import { navigateBack, transformSize } from 'taro-fast-common';
import { Button, FixedBox, FlexBox, Line } from 'taro-fast-component';
import { FormBuilder } from 'taro-fast-design-playground';

import { PageNeedSignInWrapper } from '../../../../customComponents';
import {
  fieldDataWorkflowCase,
  fieldDataWorkflowCaseFormAttachment,
} from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { uploadFileDataApiAddress } from '../../../../services/flowCaseFormAttachment';
import { HeadNavigationBox } from '../../../../utils';
import { SubmitFlowCaseModal } from '../../../customComponents';
import { submitApprovalAction } from '../../approve/assist/action';
import { addAttachmentAction, removeAttachmentAction } from '../assist/action';

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
        type = 'rangeDate';
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

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.flowCaseTypeCollection.get,
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

    this.setState({
      workflowId,
      workflowCaseId,
      schemaList: analyzeSchema(designSchema),
      attachmentList: listAttachment,
      remarkList: [
        ...remarkSchemaList,
        '保存表单仅仅保存数据, 如需进行审批, 请在保存表单后点击提交审批。',
      ],
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
        showSuccessNotification('新增附件成功');

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
        showSuccessNotification('移除附件成功');

        target.setState({
          attachmentList: [...remoteListData],
        });
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

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="编辑表单" />;
  };

  buildActionBox = () => {
    const { canEdit } = this.state;

    if (canEdit === whetherNumber.no) {
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
                        onClick={this.uploadFile}
                      />
                    }
                    right={
                      <>
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
                        />

                        <Line
                          direction="vertical"
                          width={30}
                          height="30"
                          transparent
                        />

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
    const { metaData, schemaList, remarkList, attachmentList } = this.state;

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
            <FormBuilder
              schemaList={schemaList}
              attachmentList={attachmentList}
              remarkList={remarkList}
              onRemoveAttachment={this.removeAttachment}
            />

            <Line transparent height={120} />

            {/* <View style={{ overflowX: 'hidden' }}>
              <Space direction="vertical" fillWidth size={18}>
                {this.buildTitleBox()}

                {this.buildFormBox()}

                {this.buildAttachmentBox()}

                {useDocumentView === whetherNumber.no
                  ? this.buildProcessBox()
                  : null}

                {this.buildHistoryBox()}

                {this.buildActionPlaceholderBox()}
              </Space>
            </View> */}

            {this.buildActionBox()}
          </>
        )}
      </View>
    );
  }

  renderInteractiveArea = () => {
    return (
      <>
        {/* {this.renderFilePreviewPopup()} */}

        <SubmitFlowCaseModal afterOk={this.submitApproval} />
      </>
    );
  };
}

export default FlowCaseForm;
