import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldDataSubsidiaryFeedbackMessage } from '../../../fieldDataCollection';
import { BasePageListMessage } from '../../../pageBases';

const currentPageTitle = '我的留言';

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
class PageListFeedback extends BasePageListMessage {
  messagePageTitle = currentPageTitle;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.subsidiaryFeedbackMessageTypeCollection.pageList,
    };
  }

  getItemId = (data) => {
    return getValueByKey({
      data,
      key: fieldDataSubsidiaryFeedbackMessage.subsidiaryFeedbackMessageId.name,
      defaultValue: '',
    });
  };

  goToDetailMessage = (id) => {
    this.goToSuggestionDetailFeedback(id);
  };
}

export default PageListFeedback;
