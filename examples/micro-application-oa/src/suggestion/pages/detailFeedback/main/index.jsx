import { connect } from 'easy-soft-dva';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldDataSubsidiaryFeedbackMessage } from '../../../fieldDataCollection';
import { BaseDetailMessage } from '../../../pageBases';

const currentPageTitle = '我的留言-详情';

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
class DetailFeedback extends BaseDetailMessage {
  messagePageTitle = currentPageTitle;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.subsidiaryFeedbackMessageTypeCollection.get,
    };
  }

  getRequestParamsName = () => {
    return fieldDataSubsidiaryFeedbackMessage.subsidiaryFeedbackMessageId.name;
  };
}

export default DetailFeedback;
