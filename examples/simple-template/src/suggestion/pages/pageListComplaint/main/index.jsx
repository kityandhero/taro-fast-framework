import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldDataSubsidiaryComplaintMessage } from '../../../fieldDataCollection';
import { BasePageListMessage } from '../../../pageBases';

const currentPageTitle = '我的投诉';

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
class PageListComplaint extends BasePageListMessage {
  messagePageTitle = currentPageTitle;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.subsidiaryComplaintMessageTypeCollection.pageList,
    };
  }

  getItemId = (data) => {
    return getValueByKey({
      data,
      key: fieldDataSubsidiaryComplaintMessage.subsidiaryComplaintMessageId
        .name,
      defaultValue: '',
    });
  };

  goToDetailMessage = (id) => {
    this.goToSuggestionDetailComplaint(id);
  };
}

export default PageListComplaint;
