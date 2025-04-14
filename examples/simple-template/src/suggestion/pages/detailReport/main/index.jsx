import { connect } from 'easy-soft-dva';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldDataSubsidiaryReportMessage } from '../../../fieldDataCollection';
import { BaseDetailMessage } from '../../../pageBases';

const currentPageTitle = '我的举报-详情';

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
class DetailReport extends BaseDetailMessage {
  messagePageTitle = currentPageTitle;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.subsidiaryReportMessageTypeCollection.get,
    };
  }

  getRequestParamsName = () => {
    return fieldDataSubsidiaryReportMessage.subsidiaryReportMessageId.name;
  };
}

export default DetailReport;
