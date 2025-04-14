import { View } from '@tarojs/components';

import {
  buildLinearGradient,
  checkStringIsNullOrWhiteSpace,
  getValueByKey,
  logException,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { CenterBox, ColorText, FlexBox, Line } from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../customComponents';
import { HeadNavigationBox } from '../../../utils';
import { viewStyle } from '../../customConfig';

const titleBoxStyle = {
  fontSize: transformSize(40),
  color: '#333',
  paddingLeft: transformSize(10),
  paddingTop: transformSize(38),
  paddingBottom: transformSize(38),
};

const flagBoxStyle = {
  marginLeft: transformSize(10),
  borderRadius: transformSize(34),
  overflow: 'hidden',
  height: transformSize(70),
  width: transformSize(140),
};

const descriptionBoxStyle = {
  fontSize: transformSize(32),
  lineHeight: transformSize(52),
  backgroundColor: '#fff',
  paddingLeft: transformSize(28),
  paddingRight: transformSize(28),
  paddingTop: transformSize(28),
  paddingBottom: transformSize(28),
  color: '#aaaaaa',
  borderRadius: transformSize(24),
  overflow: 'hidden',
};

class BaseDetailMessage extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  viewStyle = {
    ...viewStyle,
    paddingLeft: transformSize(24),
    paddingRight: transformSize(24),
    paddingTop: transformSize(24),
  };

  enableAutoInitialLoadingIndicator = false;

  enableBackTop = true;

  messagePageTitle = '';

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
    };
  }

  supplementLoadRequestParams = (o) => {
    const id = getValueByKey({
      data: this.externalParameter,
      key: 'id',
      defaultValue: '',
    });

    const parameterName = this.getRequestParamsName();

    if (checkStringIsNullOrWhiteSpace(parameterName)) {
      logException(
        `getRequestParamsName need be return a meaningful string in ${this.componentName}`,
      );
    }

    o[parameterName] = id;

    return { ...o };
  };

  getRequestParamsName = () => {
    throw new Error('getRequestParamsName need overrode to implement');
  };

  buildHeadNavigation = () => {
    return (
      <HeadNavigationBox title={this.messagePageTitle || '缺少页面标题'} />
    );
  };

  renderMessageContent = () => {
    const { metaData } = this.state;

    const { description } = {
      description: '',
      ...metaData,
    };

    return (
      <>
        <FlexBox
          flexAuto="right"
          left={
            <View
              style={{
                ...flagBoxStyle,
                backgroundImage: buildLinearGradient({
                  direct: 45,
                  list: ['#8bbaa4', '#66986a'],
                }),
              }}
            >
              <CenterBox>
                <ColorText text="内容" fontSize={36} color="#fff" />
              </CenterBox>
            </View>
          }
          right={<View />}
        />

        <Line transparent height={36} />

        <View style={descriptionBoxStyle}>{description || '缺少简介'}</View>
      </>
    );
  };

  renderMessageRepay = () => {
    const { metaData } = this.state;

    const { replyContent, subsidiaryShortName, whetherReply } = {
      replyContent: '',
      subsidiaryShortName: '',
      whetherReply: whetherNumber.no,
      ...metaData,
    };

    if (toNumber(whetherReply) !== whetherNumber.yes) {
      return null;
    }

    return (
      <>
        <Line transparent height={36} />

        <FlexBox
          flexAuto="right"
          left={
            <View
              style={{
                ...flagBoxStyle,
                backgroundImage: buildLinearGradient({
                  direct: 45,
                  list: ['#7bb1d6', '#446fa7'],
                }),
              }}
            >
              <CenterBox>
                <ColorText text="回复" fontSize={36} color="#fff" />
              </CenterBox>
            </View>
          }
          right={<View />}
        />

        <Line transparent height={36} />

        <View style={descriptionBoxStyle}>{replyContent || '暂无回复'}</View>

        <Line transparent height={36} />

        <FlexBox
          flexAuto="left"
          left={<View />}
          rightStyle={{
            paddingRight: transformSize(10),
          }}
          right={
            <CenterBox>
              <ColorText
                color="#688f6b"
                fontSize={30}
                separator=""
                text={`【${subsidiaryShortName}】`}
              />
            </CenterBox>
          }
        />
      </>
    );
  };

  renderFurther() {
    const { metaData } = this.state;

    const { title } = {
      title: '',
      ...metaData,
    };

    return (
      <View>
        <View style={titleBoxStyle}>
          <CenterBox>{title || '标题缺失'}</CenterBox>
        </View>

        {this.renderMessageContent()}

        {this.renderMessageRepay()}
      </View>
    );
  }
}

export { BaseDetailMessage };
