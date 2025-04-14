import { View } from '@tarojs/components';

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
  showSimpleWarnMessage,
  toDatetime,
  whetherNumber,
  zeroInt,
} from 'easy-soft-utility';

import {
  downloadFileAndOpen,
  emptyImage,
  transformSize,
} from 'taro-fast-common';
import {
  Avatar,
  Button,
  Card,
  ColorText,
  Empty,
  FlexBox,
  IconCalendar,
  IconTags,
  ImageBox,
  Line,
  MultiLineText,
  Space,
  Steps,
  Tag,
  VerticalBox,
} from 'taro-fast-component';
import { DocumentPrintDesigner } from 'taro-fast-design-playground';

import { PageNeedSignInWrapper } from '../../../customComponents';
import {
  emptySignet,
  fieldDataFlowFormDesign,
  fieldDataWorkflowCase,
  fileTextBlueImage,
  flowApproveMobileViewModeCollection,
  flowCaseStatusCollection,
  simpleApply,
  simpleAttention,
  userGreyImage,
  viewStyle,
} from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { FilePreviewPopup } from '../../customComponents';
import { buildListApprove, buildListHistory } from '../../utils';

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

const formTitleStyle = {
  fontSize: transformSize(30),
  marginBottom: transformSize(10),
};

const formValueStyle = {
  marginBottom: transformSize(8),
  fontWeight: 'bold',
};

const approveTitleStyle = {
  fontSize: transformSize(32),
  fontWeight: 'bold',
};

const approveNoteStyle = {
  fontSize: transformSize(30),
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

class BaseFlowCaseDetail extends PageNeedSignInWrapper {
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
      previewContent: '',
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

    const approveBatchNumber = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.approveBatchNumber.name,
      defaultValue: '',
      convert: convertCollection.number,
    });

    const canEdit = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.canEdit.name,
      defaultValue: whetherNumber.no,
      convert: convertCollection.number,
    });

    const canApprove = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.canApprove.name,
      defaultValue: whetherNumber.no,
      convert: convertCollection.number,
    });

    const approverMobileApproveViewMode = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.approverMobileApproveViewMode.name,
      defaultValue: flowApproveMobileViewModeCollection.form,
      convert: convertCollection.number,
    });

    const status = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.status.name,
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
      key: fieldDataWorkflowCase.listFormStorage.name,
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
      key: fieldDataWorkflowCase.nextApproveWorkflowNode.name,
      defaultValue: {},
    });

    const listChainApprove = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.listChainApprove.name,
      convert: convertCollection.array,
      defaultValue: [],
    });

    const listProcessHistory = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.listProcessHistory.name,
      convert: convertCollection.array,
      defaultValue: [],
    });

    const listAttachment = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.listAttachment.name,
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
      approveBatchNumber,
      listChainApprove,
      listProcessHistory,
      nextApproveWorkflowNode,
    });

    const listHistory = buildListHistory({
      approveBatchNumber,
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
      useDocumentView:
        approverMobileApproveViewMode ===
        flowApproveMobileViewModeCollection.document
          ? whetherNumber.yes
          : whetherNumber.no,
    });
  };

  analysisDocumentConfig = () => {
    const { metaData, workflowFormDesign } = this.state;

    const applicantSignSwitch = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.applicantSignSwitch.name,
      convert: convertCollection.number,
    });

    const applicantStatementTitle = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.applicantStatementTitle.name,
      convert: convertCollection.string,
    });

    const applicantStatementContent = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.applicantStatementContent.name,
      convert: convertCollection.string,
    });

    const applicantUserSignet = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.applicantUserSignet.name,
      convert: convertCollection.string,
    });

    const attentionSignSwitch = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.attentionSignSwitch.name,
      convert: convertCollection.number,
    });

    const attentionStatementTitle = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.attentionStatementTitle.name,
      convert: convertCollection.string,
    });

    const attentionStatementContent = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.attentionStatementContent.name,
      convert: convertCollection.string,
    });

    const attentionUserSignet = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.attentionUserSignet.name,
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
      logException(
        error,
        'error on analysisDocumentConfig in BaseFlowCaseDetail',
      );
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
          key: fieldDataWorkflowCase.applicantTime.name,
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
          key: fieldDataWorkflowCase.attentionTime.name,
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

  judgeDisplayHistory = () => {
    const { canApprove, approveComplete } = this.state;

    return (
      canApprove === whetherNumber.yes || approveComplete === whetherNumber.yes
    );
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
      successCallback: ({
        directlyOpen,
        // eslint-disable-next-line no-unused-vars
        filePath,
        // eslint-disable-next-line no-unused-vars
        extensionName,
        // eslint-disable-next-line no-unused-vars
        other,
      }) => {
        that.notifyMessage({
          message: '下载成功',
          type: 'success',
        });

        if (!directlyOpen) {
          const { hasContent = false, content = '' } = {
            hasContent: false,
            content: '',
            ...other,
          };

          if (hasContent && !checkStringIsNullOrWhiteSpace(content)) {
            that.showFilePreviewPopup(content);
          }
        }
      },
    });
  };

  showFilePreviewPopup = (o) => {
    this.setState({ previewContent: o }, () => {
      FilePreviewPopup.open();
    });
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
      key: fieldDataWorkflowCase.workflowCaseId.name,
      convert: convertCollection.string,
    });

    const qRCodeImage = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowCase.qRCodeImage.name,
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
              key: fieldDataWorkflowCase.workflowName.name,
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
                                fontSize={30}
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
                  <View key={`attachment_${index}`} style={attachmentBoxStyle}>
                    <FlexBox
                      flexAuto="left"
                      left={
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
                                  color: '#333',
                                }}
                                fontSize={30}
                                lineHeight={36}
                                text={alias}
                              />
                            </View>
                          }
                        />
                      }
                      right={
                        <View
                          style={{
                            marginLeft: transformSize(10),
                          }}
                          onClick={() => {
                            if (existPdf === whetherNumber.yes) {
                              this.startDownload({ attachment: urlPdf });
                            } else {
                              this.startDownload({ attachment: url });
                            }
                          }}
                        >
                          查看
                        </View>
                      }
                    />
                  </View>
                );
              })}
            </Space>

            <View>
              <ColorText
                textPrefix="注"
                textPrefixStyle={{
                  color: '#a5a5a5',
                }}
                separator=":"
                separatorStyle={{
                  color: '#a5a5a5',
                  marginRight: transformSize(14),
                }}
                text="点查看进行预览，若文件较大，需要耗费时间下载."
                textStyle={{
                  color: '#a5a5a5',
                }}
              />
            </View>
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

  renderFilePreviewPopup = () => {
    const { previewContent } = this.state;

    return (
      <>
        <FilePreviewPopup
          header="文件预览"
          mode="through"
          position="bottom"
          showClose
          closeWhenOverlayClick
          arcTop
        >
          <View
            style={{
              height: transformSize(640),
              overflowY: 'auto',
            }}
          >
            {previewContent}
          </View>
        </FilePreviewPopup>
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

export { BaseFlowCaseDetail };
