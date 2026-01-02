import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldDataSubsidiaryReportMessage } from '../../../fieldDataCollection';
import { BasePageListMessage } from '../../../pageBases';

const currentPageTitle = '我的举报';

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
class PageListReport extends BasePageListMessage {
  messagePageTitle = currentPageTitle;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.subsidiaryReportMessageTypeCollection.pageList,
    };
  }

  getItemId = (data) => {
    return getValueByKey({
      data,
      key: fieldDataSubsidiaryReportMessage.subsidiaryReportMessageId.name,
      defaultValue: '',
    });
  };

  goToDetailMessage = (id) => {
    this.goToSuggestionDetailReport(id);
  };
}

export default PageListReport;
