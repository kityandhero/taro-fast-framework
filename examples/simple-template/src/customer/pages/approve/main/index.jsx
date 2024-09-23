import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  logConsole,
  whetherNumber,
  zeroInt,
} from 'easy-soft-utility';

import { emptyImage, transformSize } from 'taro-fast-common';
import {
  Avatar,
  Card,
  ColorText,
  Empty,
  FlexBox,
  IconCalendar,
  IconTags,
  ImageBox,
  Line,
  Space,
  Steps,
  Tag,
  VerticalBox,
} from 'taro-fast-component';

import { PageWrapper } from '../../../../customComponents';
import {
  flowCaseStatusCollection,
  userGreyImage,
  viewStyle,
} from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { buildListApprove } from '../assist/tools';
import { fieldData } from '../common/data';

const stripTopValue = 22;
const stripHeightValue = 26;

const headerStyle = {
  color: '#181818',
  fontSize: transformSize(32),
  lineHeight: transformSize(38),
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

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '用户中心',
  // navigationStyle: 'custom',
});

@connect(({ flowCase, session, entrance, global, schedulingControl }) => ({
  flowCase,
  session,
  entrance,
  global,
  schedulingControl,
}))
class Approve extends PageWrapper {
  // showCallTrack = true;

  showCallTrace = true;

  viewStyle = {
    ...viewStyle,
  };

  enableAutoInitialLoadingIndicator = false;

  enableBackTop = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.flowCaseTypeCollection.get,
      formItemList: [],
      listApprove: [],
      canApprove: whetherNumber.no,
      existAttachment: whetherNumber.no,
      approveComplete: whetherNumber.no,
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
      const { nameNote: title, value } = o;

      return { title, value };
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
      },
      ...listFormStorage,
    ];

    const listApprove = buildListApprove({
      listChainApprove,
      listProcessHistory,
      nextApproveWorkflowNode,
    });

    logConsole({ listApprove });

    this.setState({
      canApprove,
      formItemList: [...formItemList],
      listApprove: [...listApprove],
      listAttachment: [...listAttachment],
      existAttachment,
      approveComplete,
    });
  };

  handleLogic = () => {
    const urlParameters = this.externalParameter;

    const { scene } = {
      scene: '',
      ...urlParameters,
    };

    const that = this;

    if (checkStringIsNullOrWhiteSpace(scene)) {
      that.handleParams(urlParameters);
    } else {
      that.exchangeShareData({
        scene,
        urlParams: urlParameters,
        callback: (p) => {
          that.handleParams(p);
        },
      });
    }
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
    const { formItemList } = this.state;

    return (
      <Card bodyStyle={bodyStyle} border={false} bodyBorder={false}>
        <Space direction="vertical" size={26} fillWidth>
          {formItemList.map((o, index) => {
            const { title, value } = o;

            return (
              <FlexBox
                key={`form_item_${index}`}
                style={{ width: '100%' }}
                flexAuto="right"
                leftStyle={{
                  marginRight: transformSize(22),
                }}
                left={
                  <View style={{ width: '100%' }}>
                    <View style={formTitleStyle}>{title}: </View>
                  </View>
                }
                right={
                  <View style={{ width: '100%' }}>
                    <View style={formValueStyle}>{value}</View>

                    <Line color="#eee" height={2} />
                  </View>
                }
              />
            );
          })}
        </Space>
      </Card>
    );
  };

  buildProcessBox = () => {
    const { canApprove, approveComplete, listApprove } = this.state;

    if (
      canApprove !== whetherNumber.yes &&
      approveComplete !== whetherNumber.yes
    ) {
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
    const { existAttachment } = this.state;

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
          <View>11</View>
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
    return (
      <Card
        header="审批记录"
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
      ></Card>
    );
  };

  renderFurther() {
    const { metaData } = this.state;

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
          <Space direction="vertical" fillWidth size={18}>
            {this.buildTitleBox()}

            {this.buildFormBox()}

            {this.buildProcessBox()}

            {this.buildAttachmentBox()}

            {this.buildHistoryBox()}
          </Space>
        )}
      </View>
    );
  }
}

export default Approve;
