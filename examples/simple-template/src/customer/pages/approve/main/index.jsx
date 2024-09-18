import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  logConsole,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import {
  Avatar,
  Card,
  ColorText,
  FlexBox,
  Line,
  Space,
  Tag,
} from 'taro-fast-component';

import { PageWrapper } from '../../../../customComponents';
import { userGreyImage } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../common/data';

const stripTopValue = 22;
const stripHeightValue = 26;

const headerStyle = {
  color: '#181818',
  fontSize: transformSize(30),
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
    backgroundColor: '#fcfbfc',
  };

  enableAutoInitialLoadingIndicator = false;

  enableBackTop = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.flowCaseTypeCollection.get,
      formItemList: [],
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

    const listFormStorage = getValueByKey({
      data: metaData,
      key: fieldData.listFormStorage.name,
      convert: convertCollection.array,
    }).map((o) => {
      const { nameNote: title, value } = o;

      return { title, value };
    });

    const formItemList = [
      {
        title: '编号',
        value: workflowCaseId,
      },
      ...listFormStorage,
    ];

    logConsole(formItemList);

    this.setState({
      formItemList: [...formItemList],
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
                    fontSize={24}
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
    return (
      <Card
        header="进度"
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

  buildAttachmentBox = () => {
    return (
      <Card
        header="附件"
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
          <>
            {this.buildTitleBox()}

            <Line transparent height={20} />

            {this.buildFormBox()}

            <Line transparent height={20} />

            {this.buildProcessBox()}

            <Line transparent height={20} />

            {this.buildAttachmentBox()}

            <Line transparent height={20} />

            {this.buildHistoryBox()}
          </>
        )}
      </View>
    );
  }
}

export default Approve;
