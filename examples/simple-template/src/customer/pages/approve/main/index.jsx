import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { Avatar, ColorText, FlexBox, Line, Tag } from 'taro-fast-component';

import { PageWrapper } from '../../../../customComponents';
import { userGreyImage } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../common/data';

const titleStyle = {
  color: '#181818',
  fontSize: transformSize(28),
  lineHeight: transformSize(38),
  fontWeight: 'bold',
  paddingTop: transformSize(10),
  paddingBottom: transformSize(10),
};

const descriptionStyle = {
  color: '#7e7e7e',
  fontSize: transformSize(26),
  lineHeight: transformSize(34),
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
class FlowCase extends PageWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  viewStyle = {
    backgroundColor: '#fcfbfc',
    paddingLeft: transformSize(20),
    paddingRight: transformSize(20),
    paddingBottom: transformSize(20),
  };

  initialTabIndex = 0;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.flowCaseTypeCollection.pageListWaitApprove,
    };
  }

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
      <View>
        <View style={titleStyle}>{title}</View>

        {checkStringIsNullOrWhiteSpace(description) ? null : (
          <View style={descriptionStyle}>{description}</View>
        )}

        <Line transparent height={10} />

        <FlexBox
          style={{ width: '100%' }}
          flexAuto="right"
          leftStyle={{
            marginRight: transformSize(12),
          }}
          left={<Avatar circle size={40} image={userAvatar || userGreyImage} />}
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
                    s
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
      </View>
    );
  };

  buildFormBox = () => {
    return <View></View>;
  };

  buildProcessBox = () => {
    return <View></View>;
  };

  buildAttachmentBox = () => {
    return <View></View>;
  };

  buildHistoryBox = () => {
    return <View></View>;
  };

  renderFurther() {
    const { metaData } = this.state;

    return (
      <View>
        {this.judgeInitialActivityIndicatorVisible() ? (
          <>{/* {this.buildInitialActivityIndicator({})} */}</>
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

            {this.buildFormBox()}

            {this.buildProcessBox()}

            {this.buildAttachmentBox()}

            {this.buildHistoryBox()}
          </>
        )}
      </View>
    );
  }
}

export default FlowCase;
