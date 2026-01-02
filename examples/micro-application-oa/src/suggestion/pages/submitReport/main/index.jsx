import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  showSimpleSuccessMessage,
  whetherNumber,
} from 'easy-soft-utility';

import { uploadImageDataApiAddress } from '../../../../services/subsidiaryReportMessage';
import { fieldDataSubsidiary } from '../../../fieldDataCollection';
import { BaseSubmitMessage } from '../../../pageBases';
import { submitReportMessageAction } from '../assist/action';

const currentPageTitle = '我要举报';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: currentPageTitle,
  navigationStyle: 'custom',
});

@connect(
  ({
    subsidiaryReportMessage,
    session,
    entrance,
    global,
    schedulingControl,
  }) => ({
    subsidiaryReportMessage,
    session,
    entrance,
    global,
    schedulingControl,
  }),
)
class SubmitReport extends BaseSubmitMessage {
  messagePageTitle = currentPageTitle;

  selectReportCategorySwitch = true;

  titleHeaderText = '我要举报';

  titlePlaceholder = '请输入举报标题';

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

    o[fieldDataSubsidiary.reportSwitch.name] = whetherNumber.yes;

    return o;
  };

  checkSwitch = (o) => {
    const reportSwitch = getValueByKey({
      data: o,
      key: fieldDataSubsidiary.reportSwitch.name,
      convert: convertCollection.number,
      defaultValue: whetherNumber.no,
    });

    return reportSwitch === whetherNumber.yes;
  };

  submitMessage = () => {
    submitReportMessageAction({
      target: this,
      handleData: {
        ...this.buildMessageData(),
      },
      successCallback: ({ target }) => {
        showSimpleSuccessMessage('提交成功');

        target.redirectToSuggestionPageListReport();
      },
    });
  };
}

export default SubmitReport;
