import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  showSimpleSuccessMessage,
  showSimpleWarnMessage,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import { Button, InputItem, Line } from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../../customComponents';
import { viewStyle } from '../../../../customConfig';
import { HeadNavigationBox } from '../../../../utils';
import { submitApplicationUserFeedbackAction } from '../assist/action';

import { SubmitConfirm } from './submitConfirm';

const titleHeaderStyle = {
  fontSize: transformSize(40),
  fontWeight: 'bold',
  color: '#333',
  paddingLeft: transformSize(10),
  paddingTop: transformSize(38),
  paddingBottom: transformSize(38),
};

const inputBoxStyle = {
  color: '#333',
  backgroundColor: '#fff',
  borderRadius: transformSize(36),
  paddingLeft: transformSize(32),
  paddingRight: transformSize(32),
  paddingTop: transformSize(32),
  paddingBottom: transformSize(32),
};

const titleInputBoxStyle = {
  ...inputBoxStyle,
};

const descriptionInputBoxStyle = {
  ...inputBoxStyle,
  lineHeight: transformSize(44),
};

const buttonBoxStyle = {
  borderRadius: transformSize(24),
  overflow: 'hidden',
  marginLeft: transformSize(16),
  marginRight: transformSize(16),
};

const placeholderColor = '#979797';

const lineHeight = 52;

const currentPageTitle = '我要留言';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: currentPageTitle,
  navigationStyle: 'custom',
});

@connect(
  ({
    applicationUserFeedback,
    session,
    entrance,
    global,
    schedulingControl,
  }) => ({
    applicationUserFeedback,
    session,
    entrance,
    global,
    schedulingControl,
  }),
)
class SubmitApplicationUserFeedback extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  viewStyle = {
    ...viewStyle,
    backgroundColor: '#f6f6f6',
    paddingLeft: transformSize(24),
    paddingRight: transformSize(24),
    paddingTop: transformSize(24),
  };

  messagePageTitle = currentPageTitle;

  titleHeaderText = '我要反馈';

  titlePlaceholder = '请输入反馈标题';

  descriptionPlaceholder = '为利于反馈得到及时处理，请描述的尽可能详尽。';

  title = '';

  description = '';

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
    };
  }

  buildMessageData = () => {
    const result = {
      title: this.title,
      description: this.description,
    };

    return result;
  };

  submitMessage = () => {
    submitApplicationUserFeedbackAction({
      target: this,
      handleData: {
        ...this.buildMessageData(),
      },
      successCallback: ({ target }) => {
        showSimpleSuccessMessage('提交成功');

        target.redirectToPageListApplicationUserFeedback();
      },
    });
  };

  confirmSubmit = () => {
    if (checkStringIsNullOrWhiteSpace(this.title)) {
      showSimpleWarnMessage(this.titlePlaceholder);

      return;
    }

    if (checkStringIsNullOrWhiteSpace(this.description)) {
      showSimpleWarnMessage(this.descriptionPlaceholder);

      return;
    }

    SubmitConfirm.open();
  };

  triggerTitleChanged = (value) => {
    this.title = value;
  };

  triggerDescriptionChanged = (value) => {
    this.description = value;
  };

  buildHeadNavigation = () => {
    return (
      <HeadNavigationBox title={this.messagePageTitle || '缺少页面标题'} />
    );
  };

  renderFurther() {
    return (
      <View>
        <View style={titleHeaderStyle}>
          {this.titleHeaderText || '标题缺失'}
        </View>

        <View style={titleInputBoxStyle}>
          <InputItem
            fontSize={36}
            placeholder={this.titlePlaceholder || '请输入标题'}
            border={false}
            clearable={false}
            placeholderStyle={{
              color: placeholderColor,
              lineHeight: transformSize(lineHeight),
            }}
            valueStyle={{
              lineHeight: transformSize(lineHeight),
            }}
            afterChange={this.triggerTitleChanged}
          />
        </View>

        <Line transparent height={30} />

        <View style={descriptionInputBoxStyle}>
          <View
            style={{
              fontSize: transformSize(36),
              lineHeight: transformSize(lineHeight),
              color: placeholderColor,
            }}
          >
            正文：
          </View>

          <InputItem
            fontSize={36}
            placeholder={this.descriptionPlaceholder || '请输入简介描述'}
            border={false}
            clearable={false}
            placeholderStyle={{
              color: placeholderColor,
              lineHeight: transformSize(lineHeight),
            }}
            valueStyle={{
              lineHeight: transformSize(lineHeight),
            }}
            areaMode
            areaHeight={460}
            afterChange={this.triggerDescriptionChanged}
          />

          <Line transparent height={20} />
        </View>

        <Line transparent height={120} />

        <View style={buttonBoxStyle}>
          <Button
            text="提交"
            fontColor="#fff"
            backgroundColor="#0075ff"
            paddingTop={20}
            paddingBottom={20}
            fontSize={42}
            block
            circle
            size="middle"
            onClick={this.confirmSubmit}
          />
        </View>
      </View>
    );
  }

  renderInteractiveArea = () => {
    return (
      <>
        <SubmitConfirm
          headerStyle={{
            color: '#000',
            fontSize: transformSize(32),
          }}
          afterOk={this.submitMessage}
        />
      </>
    );
  };
}

export default SubmitApplicationUserFeedback;
