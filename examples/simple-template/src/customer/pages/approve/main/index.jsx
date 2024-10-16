import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  datetimeFormat,
  formatDatetime,
  getValueByKey,
  isArray,
  isEmptyArray,
  logException,
  showSimpleErrorMessage,
  showSimpleWarnMessage,
  showSuccessNotification,
  toDatetime,
  whetherNumber,
  zeroInt,
} from 'easy-soft-utility';

import {
  downloadFileAndOpen,
  emptyImage,
  navigateBack,
  transformSize,
} from 'taro-fast-common';
import {
  Avatar,
  Button,
  Card,
  ColorText,
  Empty,
  FixedBox,
  FlexBox,
  IconCalendar,
  IconTags,
  ImageBox,
  InputItem,
  Line,
  MultiLineText,
  Space,
  Steps,
  Tag,
  VerticalBox,
} from 'taro-fast-component';
import { DocumentPrintDesigner } from 'taro-fast-design-playground';

import { PageNeedSignInWrapper } from '../../../../customComponents';
import {
  emptySignet,
  fieldDataFlowFormDesign,
  fileTextBlueImage,
  flowCaseStatusCollection,
  simpleApply,
  simpleAttention,
  userGreyImage,
  viewStyle,
} from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { HeadNavigationBox } from '../../../../utils';
import {
  passAction,
  refuseAction,
  submitApprovalAction,
} from '../assist/action';
import { buildListApprove, buildListHistory } from '../assist/tools';
import { fieldData } from '../common/data';
import { SubmitModal } from '../submitModal';

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
  fontSize: transformSize(24),
  lineHeight: transformSize(34),
  paddingBottom: transformSize(10),
};

const formTitleStyle = {
  fontSize: transformSize(30),
  marginBottom: transformSize(10),
};

const formValueStyle = {
  marginBottom: transformSize(8),
  fontWeight: 'bold',
};

const approveTitleStyle = {
  fontSize: transformSize(28),
  fontWeight: 'bold',
};

const approveNoteStyle = {
  fontSize: transformSize(28),
};

const approveSignetStyle = {
  width: transformSize(200),
};

const approveTimeStyle = {
  paddingBottom: transformSize(10),
};

const attachmentBoxStyle = {
  paddingTop: transformSize(16),
  paddingBottom: transformSize(16),
};

const attachmentIconStyle = {
  width: transformSize(46),
};

const attachmentTitleStyle = {
  // paddingBottom: transformSize(10),
};

const historyBoxStyle = {
  paddingTop: transformSize(16),
  paddingBottom: transformSize(16),
};

const historyBoxItemStyle = {
  paddingTop: transformSize(8),
  paddingBottom: transformSize(8),
};

const historyTitleStyle = {
  fontSize: transformSize(32),
  // paddingBottom: transformSize(10),
};

const historyValueStyle = {
  fontSize: transformSize(32),
  // width: transformSize(46),
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
class Approve extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  viewStyle = {
    ...viewStyle,
  };

  enableAutoInitialLoadingIndicator = false;

  enableBackTop = true;

  note = '';

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.flowCaseTypeCollection.get,
      workflowFormDesign: {},
      listFormStorage: [],
      formItemList: [],
      listApprove: [],
      listHistory: [],
      listAttachment: [],
      canEdit: whetherNumber.no,
      canApprove: whetherNumber.no,
      existAttachment: whetherNumber.no,
      approveComplete: whetherNumber.no,
      useDocumentView: whetherNumber.no,
    };
  }

  supplementLoadRequestParams = (o) => {
    const id = getValueByKey({
      data: this.externalParameter,
      key: 'id',
      defaultValue: '',
    });

    o[fieldData.workflowCaseId.name] = id;

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
      key: fieldData.workflowCaseId.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    const canEdit = getValueByKey({
      data: metaData,
      key: fieldData.canEdit.name,
      defaultValue: whetherNumber.no,
      convert: convertCollection.number,
    });

    const canApprove = getValueByKey({
      data: metaData,
      key: fieldData.canApprove.name,
      defaultValue: whetherNumber.no,
      convert: convertCollection.number,
    });

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      defaultValue: zeroInt,
      convert: convertCollection.number,
    });

    const { workflowFormDesign } = {
      workflowFormDesign: {},
      ...metaData,
    };

    const approveComplete = checkInCollection(
      [
        flowCaseStatusCollection.forcedEnd,
        flowCaseStatusCollection.success,
        flowCaseStatusCollection.refuse,
      ],
      status,
    )
      ? whetherNumber.yes
      : whetherNumber.no;

    const listFormStorage = getValueByKey({
      data: metaData,
      key: fieldData.listFormStorage.name,
      convert: convertCollection.array,
    }).map((o) => {
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

    const nextApproveWorkflowNode = getValueByKey({
      data: metaData,
      key: fieldData.nextApproveWorkflowNode.name,
      defaultValue: {},
    });

    const listChainApprove = getValueByKey({
      data: metaData,
      key: fieldData.listChainApprove.name,
      convert: convertCollection.array,
      defaultValue: [],
    });

    const listProcessHistory = getValueByKey({
      data: metaData,
      key: fieldData.listProcessHistory.name,
      convert: convertCollection.array,
      defaultValue: [],
    });

    const listAttachment = getValueByKey({
      data: metaData,
      key: fieldData.listAttachment.name,
      convert: convertCollection.array,
      defaultValue: [],
    });

    const existAttachment = listAttachment.length > 0;

    const formItemList = [
      {
        title: '编号',
        value: workflowCaseId,
        displayValue: workflowCaseId,
      },
      ...listFormStorage,
    ];

    const listApprove = buildListApprove({
      listChainApprove,
      listProcessHistory,
      nextApproveWorkflowNode,
    });

    const listHistory = buildListHistory({
      listProcessHistory,
    });

    this.setState({
      canEdit,
      canApprove,
      workflowFormDesign: workflowFormDesign || {},
      listFormStorage: [...listFormStorage],
      formItemList: [...formItemList],
      listApprove: [...listApprove],
      listHistory: [...listHistory],
      listAttachment: [...listAttachment],
      // listProcessHistory: [...listProcessHistory],
      existAttachment,
      approveComplete,
    });
  };

  analysisDocumentConfig = () => {
    const { metaData, workflowFormDesign } = this.state;

    const applicantSignSwitch = getValueByKey({
      data: metaData,
      key: fieldData.applicantSignSwitch.name,
      convert: convertCollection.number,
    });

    const applicantStatementTitle = getValueByKey({
      data: metaData,
      key: fieldData.applicantStatementTitle.name,
      convert: convertCollection.string,
    });

    const applicantStatementContent = getValueByKey({
      data: metaData,
      key: fieldData.applicantStatementContent.name,
      convert: convertCollection.string,
    });

    const applicantUserSignet = getValueByKey({
      data: metaData,
      key: fieldData.applicantUserSignet.name,
      convert: convertCollection.string,
    });

    const attentionSignSwitch = getValueByKey({
      data: metaData,
      key: fieldData.attentionSignSwitch.name,
      convert: convertCollection.number,
    });

    const attentionStatementTitle = getValueByKey({
      data: metaData,
      key: fieldData.attentionStatementTitle.name,
      convert: convertCollection.string,
    });

    const attentionStatementContent = getValueByKey({
      data: metaData,
      key: fieldData.attentionStatementContent.name,
      convert: convertCollection.string,
    });

    const attentionUserSignet = getValueByKey({
      data: metaData,
      key: fieldData.attentionUserSignet.name,
      convert: convertCollection.string,
    });

    const remarkSchemaList = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.remarkSchemaList.name,
      convert: convertCollection.array,
    });

    const documentSchema = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.documentSchema.name,
      defaultValue: {},
    });

    const { general, items: itemsSource } = {
      general: {},
      items: [],
      ...documentSchema,
    };

    const dataSchema = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.dataSchema.name,
      defaultValue: '[]',
    });

    let listDataSchema = [];

    try {
      listDataSchema = JSON.parse(dataSchema);
    } catch (error) {
      logException(error);
    }

    let items = [];

    if (
      isArray(itemsSource) &&
      !isEmptyArray(itemsSource) &&
      isArray(listDataSchema)
    ) {
      for (const o of listDataSchema) {
        const { name } = { name: '', ...o };

        if (checkStringIsNullOrWhiteSpace(name)) {
          continue;
        }

        let config = {};

        for (const one of itemsSource) {
          const { name: nameOne } = { name: '', ...one };

          if (nameOne === name) {
            config = one;

            break;
          }
        }

        items.push({ ...config, ...o });
      }
    } else {
      items = listDataSchema;
    }

    const listApply = [
      {
        ...simpleApply,
        title: applicantStatementTitle,
        note: applicantStatementContent,
        ...(checkStringIsNullOrWhiteSpace(applicantUserSignet)
          ? {
              signet: emptySignet,
            }
          : {
              signet: applicantUserSignet,
            }),
        time: getValueByKey({
          data: metaData,
          key: fieldData.applicantTime.name,
          convert: convertCollection.string,
        }),
      },
    ];

    const listAttention = [
      {
        ...simpleAttention,
        title: attentionStatementTitle,
        note: attentionStatementContent,
        ...(checkStringIsNullOrWhiteSpace(attentionUserSignet)
          ? {
              signet: emptySignet,
            }
          : {
              signet: attentionUserSignet,
            }),
        time: getValueByKey({
          data: metaData,
          key: fieldData.attentionTime.name,
          convert: convertCollection.string,
        }),
      },
    ];

    return {
      general: general || {},
      items,
      remarkSchemaList,
      showApply: applicantSignSwitch === whetherNumber.yes,
      listApply,
      showAttention: attentionSignSwitch === whetherNumber.yes,
      listAttention,
    };
  };

  submitApproval = () => {
    const { metaData } = this.state;

    const workflowCaseId = getValueByKey({
      data: metaData,
      key: fieldData.workflowCaseId.name,
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

  judgeDisplayHistory = () => {
    const { canApprove, approveComplete } = this.state;

    return (
      canApprove === whetherNumber.yes || approveComplete === whetherNumber.yes
    );
  };

  confirmSubmit = () => {
    SubmitModal.open();
  };

  pass = () => {
    const { metaData } = this.state;

    if (checkStringIsNullOrWhiteSpace(this.note)) {
      showSimpleErrorMessage('请输入审批意见');

      return;
    }

    const workflowCaseId = getValueByKey({
      data: metaData,
      key: fieldData.workflowCaseId.name,
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
        showSuccessNotification('审批完成');

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
      key: fieldData.workflowCaseId.name,
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
        showSuccessNotification('审批完成');

        target.reloadData({});
      },
    });
  };

  triggerNoteChanged = (v) => {
    this.note = v;
  };

  startDownload = ({ attachment }) => {
    const that = this;

    if (checkStringIsNullOrWhiteSpace(attachment)) {
      showSimpleWarnMessage('附件链接无效');

      return;
    }

    that.notifyMessage({
      message: '即将为您下载',
      type: 'info',
    });

    downloadFileAndOpen({
      url: attachment,
      successCallback: () => {
        that.notifyMessage({
          message: '下载成功',
          type: 'success',
        });
      },
    });
  };

  buildHeadNavigation = () => {
    return <HeadNavigationBox title="审批详情" />;
  };

  buildTitleBox = () => {
    const { metaData } = this.state;

    const title = getValueByKey({
      data: metaData,
      key: fieldData.title.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    const description = getValueByKey({
      data: metaData,
      key: fieldData.description.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    const userAvatar = getValueByKey({
      data: metaData,
      key: fieldData.userAvatar.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    const userRealName = getValueByKey({
      data: metaData,
      key: fieldData.userRealName.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    const statusNote = getValueByKey({
      data: metaData,
      key: fieldData.statusNote.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    const lastSubmitApprovalTime = getValueByKey({
      data: metaData,
      key: fieldData.lastSubmitApprovalTime.name,
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
            marginRight: transformSize(12),
          }}
          left={<Avatar circle size={34} image={userAvatar || userGreyImage} />}
          right={
            <FlexBox
              flexAuto="left"
              left={
                <View>
                  <ColorText
                    color="#7d7d7d"
                    fontSize={26}
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

  buildFormBox = () => {
    const {
      useDocumentView,
      metaData,
      listFormStorage,
      formItemList,
      listApprove,
      listChainApprove,
    } = this.state;

    const workflowCaseId = getValueByKey({
      data: metaData,
      key: fieldData.workflowCaseId.name,
      convert: convertCollection.string,
    });

    const qRCodeImage = getValueByKey({
      data: metaData,
      key: fieldData.qRCodeImage.name,
      convert: convertCollection.string,
    });

    const {
      general,
      items,
      showApply,
      listApply,
      showAttention,
      listAttention,
      remarkSchemaList,
    } = this.analysisDocumentConfig();

    return (
      <Card bodyStyle={bodyStyle} border={false} bodyBorder={false}>
        {useDocumentView === whetherNumber.no ? (
          <Space direction="vertical" size={26} fillWidth>
            {formItemList.map((o, index) => {
              const { title, displayValue } = o;

              return (
                <FlexBox
                  key={`form_item_${index}`}
                  style={{ width: '100%' }}
                  flexAuto="right"
                  leftStyle={{
                    marginRight: transformSize(22),
                  }}
                  left={
                    <VerticalBox align="top" alignJustify="center">
                      <View style={formTitleStyle}>{title}: </View>
                    </VerticalBox>
                  }
                  right={
                    <View style={{ width: '100%' }}>
                      <MultiLineText
                        style={formValueStyle}
                        fontSize={30}
                        lineHeight={40}
                        text={displayValue}
                      />

                      <Line color="#eee" height={2} />
                    </View>
                  }
                />
              );
            })}
          </Space>
        ) : (
          <DocumentPrintDesigner
            title={getValueByKey({
              data: metaData,
              key: fieldData.workflowName.name,
            })}
            schema={{
              general,
              items,
            }}
            borderColor="#999"
            values={listFormStorage}
            showApply={showApply}
            applyList={listApply}
            showAttention={showAttention}
            attentionList={listAttention}
            approveList={isArray(listApprove) ? listApprove : []}
            allApproveProcessList={listChainApprove}
            signetStyle={{
              top: transformSize(-2),
            }}
            remarkTitle="备注"
            remarkName="remark"
            remarkList={remarkSchemaList}
            showQRCode
            qRCodeImage={qRCodeImage}
            qRCodeHeight={60}
            showSerialNumber
            serialNumberTitle="审批流水号: "
            serialNumberContent={workflowCaseId}
          />
        )}
      </Card>
    );
  };

  buildProcessBox = () => {
    const { listApprove } = this.state;

    if (!this.judgeDisplayHistory()) {
      return null;
    }

    return (
      <Card
        header="进度"
        headerStyle={headerStyle}
        bodyStyle={{ ...bodyStyle }}
        space={false}
        border={false}
        headerEllipsis={false}
        stripCenter={false}
        stripTop={stripTopValue}
        stripHeight={stripHeightValue}
        strip
        stripColor="#0075fe"
        extra={<IconCalendar size={36} color="#888" />}
      >
        <Steps
          direction="vertical"
          current={1}
          titleFontSize={28}
          descriptionFontSize={26}
          indicatorMarginRight={12}
          iconSize={20}
          style={{
            paddingTop: transformSize(16),
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 0,
          }}
          itemStyle={{
            paddingBottom: transformSize(12),
          }}
          list={listApprove}
          titleBuilder={(o) => {
            const { title } = o;

            return <View style={approveTitleStyle}>{title}:</View>;
          }}
          descriptionBuilder={(o) => {
            const { note, signet, time, status } = o;

            if (checkInCollection(['wait', 'process'], status)) {
              return null;
            }

            return (
              <>
                <Line transparent height={10} />

                <View style={approveNoteStyle}>{note}</View>

                <Line transparent height={16} />

                <FlexBox
                  flexAuto="left"
                  left={<View></View>}
                  right={
                    <View>
                      <FlexBox
                        style={{ width: '100%' }}
                        flexAuto="right"
                        leftStyle={{
                          marginRight: transformSize(12),
                        }}
                        left={
                          <View style={approveSignetStyle}>
                            <ImageBox aspectRatio={0.353} src={signet} />
                          </View>
                        }
                        right={
                          <VerticalBox align="bottom" alignJustify="center">
                            <View style={approveTimeStyle}>
                              <ColorText
                                color="#7d7d7d"
                                fontSize={26}
                                text={time}
                              />
                            </View>
                          </VerticalBox>
                        }
                      />
                    </View>
                  }
                />

                <Line transparent height={10} />

                <Line color="#eee" height={2} />
              </>
            );
          }}
        />
      </Card>
    );
  };

  buildAttachmentBox = () => {
    const { existAttachment, listAttachment } = this.state;

    return (
      <Card
        header="附件"
        headerStyle={headerStyle}
        bodyStyle={{ ...bodyStyle }}
        space={false}
        border={false}
        headerEllipsis={false}
        stripCenter={false}
        stripTop={stripTopValue}
        stripHeight={stripHeightValue}
        strip
        stripColor="#0075fe"
        extra={<IconTags size={36} color="#888" />}
        // bodyStyle
      >
        {existAttachment ? (
          <View>
            <Space
              direction="vertical"
              fillWidth
              size={0}
              split={<Line height={2} />}
            >
              {listAttachment.map((o, index) => {
                const { alias, existPdf, url, urlPdf } = {
                  alias: '',
                  existPdf: whetherNumber.no,
                  url: '',
                  urlPdf: '',
                  ...o,
                };

                return (
                  <View
                    key={`attachment_${index}`}
                    style={attachmentBoxStyle}
                    onClick={() => {
                      if (existPdf === whetherNumber.yes) {
                        this.startDownload({ attachment: urlPdf });
                      } else {
                        this.startDownload({ attachment: url });
                      }
                    }}
                  >
                    <FlexBox
                      flexAuto="right"
                      leftStyle={{
                        marginRight: transformSize(10),
                      }}
                      left={
                        <VerticalBox>
                          <View style={attachmentIconStyle}>
                            <ImageBox src={fileTextBlueImage} />
                          </View>
                        </VerticalBox>
                      }
                      right={
                        <View style={attachmentTitleStyle}>
                          <MultiLineText
                            style={{
                              color: '#8290a1',
                            }}
                            fontSize={26}
                            lineHeight={36}
                            text={alias}
                          />
                        </View>
                      }
                    />
                  </View>
                );
              })}
            </Space>
          </View>
        ) : (
          <Empty
            icon=""
            image={emptyImage}
            imageAspectRatio={0.7156}
            description="无附件"
          />
        )}
      </Card>
    );
  };

  buildHistoryBox = () => {
    const { listHistory } = this.state;

    if (!this.judgeDisplayHistory()) {
      return null;
    }

    return (
      <Card
        header="审批记录"
        headerStyle={headerStyle}
        bodyStyle={{ ...bodyStyle }}
        space={false}
        border={false}
        headerEllipsis={false}
        stripCenter={false}
        stripTop={stripTopValue}
        stripHeight={stripHeightValue}
        strip
        stripColor="#0075fe"
        extra={<IconCalendar size={36} color="#888" />}
      >
        {listHistory.length > 0 ? (
          <View>
            <Space
              direction="vertical"
              fillWidth
              size={0}
              split={<Line height={2} />}
            >
              {listHistory.map((o, index) => {
                const { title, name, time, action } = o;

                return (
                  <View key={`history_${index}`} style={historyBoxStyle}>
                    <FlexBox
                      flexAuto="left"
                      style={historyBoxItemStyle}
                      leftStyle={{
                        marginRight: transformSize(10),
                      }}
                      left={
                        <VerticalBox>
                          <View style={historyTitleStyle}>步骤：</View>
                        </VerticalBox>
                      }
                      right={
                        <VerticalBox>
                          <View style={historyValueStyle}>{title}</View>
                        </VerticalBox>
                      }
                    />

                    <FlexBox
                      flexAuto="left"
                      style={historyBoxItemStyle}
                      leftStyle={{
                        marginRight: transformSize(10),
                      }}
                      left={
                        <VerticalBox>
                          <View style={historyTitleStyle}>名称：</View>
                        </VerticalBox>
                      }
                      right={
                        <VerticalBox>
                          <View style={historyValueStyle}>{name}</View>
                        </VerticalBox>
                      }
                    />

                    <FlexBox
                      flexAuto="left"
                      style={historyBoxItemStyle}
                      leftStyle={{
                        marginRight: transformSize(10),
                      }}
                      left={
                        <VerticalBox>
                          <View style={historyTitleStyle}>时间：</View>
                        </VerticalBox>
                      }
                      right={
                        <VerticalBox>
                          <View style={historyValueStyle}>
                            {formatDatetime({
                              data: time,
                              format: 'YYYY年MM月DD日 HH:mm:ss',
                            })}
                          </View>
                        </VerticalBox>
                      }
                    />

                    <FlexBox
                      flexAuto="left"
                      style={historyBoxItemStyle}
                      leftStyle={{
                        marginRight: transformSize(10),
                      }}
                      left={
                        <VerticalBox>
                          <View style={historyTitleStyle}>审核：</View>
                        </VerticalBox>
                      }
                      right={
                        <VerticalBox>
                          <View style={historyValueStyle}>{action}</View>
                        </VerticalBox>
                      }
                    />
                  </View>
                );
              })}
            </Space>
          </View>
        ) : (
          <Empty
            icon=""
            image={emptyImage}
            imageAspectRatio={0.7156}
            description="无记录"
          />
        )}

        {/* <Steps
          direction="vertical"
          current={1}
          titleFontSize={28}
          descriptionFontSize={26}
          indicatorMarginRight={12}
          iconSize={20}
          style={{
            paddingTop: transformSize(16),
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 0,
          }}
          itemStyle={{
            paddingBottom: transformSize(12),
          }}
          list={listApprove}
          titleBuilder={(o) => {
            const { title } = o;

            return <View style={approveTitleStyle}>{title}:</View>;
          }}
          descriptionBuilder={(o) => {
            const { note, signet, time, status } = o;

            if (checkInCollection(['wait', 'process'], status)) {
              return null;
            }

            return (
              <>
                <Line transparent height={10} />

                <View style={approveNoteStyle}>{note}</View>

                <Line transparent height={16} />

                <FlexBox
                  flexAuto="left"
                  left={<View></View>}
                  right={
                    <View>
                      <FlexBox
                        style={{ width: '100%' }}
                        flexAuto="right"
                        leftStyle={{
                          marginRight: transformSize(12),
                        }}
                        left={
                          <View style={approveSignetStyle}>
                            <ImageBox aspectRatio={0.353} src={signet} />
                          </View>
                        }
                        right={
                          <VerticalBox align="bottom" alignJustify="center">
                            <View style={approveTimeStyle}>
                              <ColorText
                                color="#7d7d7d"
                                fontSize={26}
                                text={time}
                              />
                            </View>
                          </VerticalBox>
                        }
                      />
                    </View>
                  }
                />

                <Line transparent height={10} />

                <Line color="#eee" height={2} />
              </>
            );
          }}
        /> */}
      </Card>
    );
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
                fontSize={24}
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
                  fontSize={24}
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
                        fontSize={24}
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
                          fontSize={24}
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
                          fontSize={24}
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
        <SubmitModal afterOk={this.submitApproval} />
      </>
    );
  };

  renderFurther() {
    const { useDocumentView, metaData } = this.state;

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
          </View>
        ) : (
          <>
            <View style={{ overflowX: 'hidden' }}>
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
            </View>

            {this.buildActionBox()}
          </>
        )}
      </View>
    );
  }
}

export default Approve;
