import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  showSimpleSuccessMessage,
  whetherNumber,
} from 'easy-soft-utility';

import { uploadImageDataApiAddress } from '../../../../services/subsidiaryComplaintMessage';
import { fieldDataSubsidiary } from '../../../fieldDataCollection';
import { BaseSubmitMessage } from '../../../pageBases';
import { submitComplaintMessageAction } from '../assist/action';

const currentPageTitle = '我要投诉';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: currentPageTitle,
  navigationStyle: 'custom',
});

@connect(
  ({
    subsidiaryComplaintMessage,
    session,
    entrance,
    global,
    schedulingControl,
  }) => ({
    subsidiaryComplaintMessage,
    session,
    entrance,
    global,
    schedulingControl,
  }),
)
class SubmitComplaint extends BaseSubmitMessage {
  messagePageTitle = currentPageTitle;

  selectComplaintCategorySwitch = true;

  titleHeaderText = '我要投诉';

  titlePlaceholder = '请输入投诉标题';

  descriptionPlaceholder =
    '为利于意见和建议得到及时处理，请明确填写相关问的时间，地点，事件过程。';

  uploadImageApiAddress = uploadImageDataApiAddress;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
    };
  }

  buildSubsidiaryListParams = () => {
    const o = {};

    o[fieldDataSubsidiary.complaintSwitch.name] = whetherNumber.yes;

    return o;
  };

  checkSwitch = (o) => {
    const complaintSwitch = getValueByKey({
      data: o,
      key: fieldDataSubsidiary.complaintSwitch.name,
      convert: convertCollection.number,
      defaultValue: whetherNumber.no,
    });

    return complaintSwitch === whetherNumber.yes;
  };

  submitMessage = () => {
    submitComplaintMessageAction({
      target: this,
      handleData: {
        ...this.buildMessageData(),
      },
      successCallback: ({ target }) => {
        showSimpleSuccessMessage('提交成功');

        target.redirectToSuggestionPageListComplaint();
      },
    });
  };
}

export default SubmitComplaint;
