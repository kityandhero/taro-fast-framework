import { connect } from 'easy-soft-dva';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldDataSubsidiaryComplaintMessage } from '../../../fieldDataCollection';
import { BaseDetailMessage } from '../../../pageBases';

const currentPageTitle = '我的投诉-详情';

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
class DetailComplaint extends BaseDetailMessage {
  messagePageTitle = currentPageTitle;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.subsidiaryComplaintMessageTypeCollection.get,
    };
  }

  getRequestParamsName = () => {
    return fieldDataSubsidiaryComplaintMessage.subsidiaryComplaintMessageId
      .name;
  };
}

export default DetailComplaint;
