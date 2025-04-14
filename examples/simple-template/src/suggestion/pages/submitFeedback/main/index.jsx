import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  showSimpleSuccessMessage,
  whetherNumber,
} from 'easy-soft-utility';

import { fieldDataSubsidiary } from '../../../fieldDataCollection';
import { BaseSubmitMessage } from '../../../pageBases';
import { submitFeedbackMessageAction } from '../assist/action';

const currentPageTitle = '我要留言';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: currentPageTitle,
  navigationStyle: 'custom',
});

@connect(
  ({
    subsidiaryFeedbackMessage,
    session,
    entrance,
    global,
    schedulingControl,
  }) => ({
    subsidiaryFeedbackMessage,
    session,
    entrance,
    global,
    schedulingControl,
  }),
)
class SubmitFeedback extends BaseSubmitMessage {
  messagePageTitle = currentPageTitle;

  selectFeedbackCategorySwitch = true;

  titleHeaderText = '我要留言';

  titlePlaceholder = '请输入留言标题';

  descriptionPlaceholder =
    '为利于意见和建议得到及时处理，请明确填写相关问的时间，地点，事件过程。';

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
    };
  }

  buildSubsidiaryListParams = () => {
    const o = {};

    o[fieldDataSubsidiary.feedbackSwitch.name] = whetherNumber.yes;

    return o;
  };

  checkSwitch = (o) => {
    const feedbackSwitch = getValueByKey({
      data: o,
      key: fieldDataSubsidiary.feedbackSwitch.name,
      convert: convertCollection.number,
      defaultValue: whetherNumber.no,
    });

    return feedbackSwitch === whetherNumber.yes;
  };

  submitMessage = () => {
    submitFeedbackMessageAction({
      target: this,
      handleData: {
        ...this.buildMessageData(),
      },
      successCallback: ({ target }) => {
        showSimpleSuccessMessage('提交成功');

        target.redirectToSuggestionPageListFeedback();
      },
    });
  };
}

export default SubmitFeedback;
