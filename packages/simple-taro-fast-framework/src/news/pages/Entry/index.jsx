import { connect } from 'react-redux';

import BasePageWrapper from '../BasePageWrapper';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '预加载',
});

@connect(({ entrance, session, global, schedulingControl }) => ({
  entrance,
  session,
  global,
  schedulingControl,
}))
export default class Index extends BasePageWrapper {
  loadRemoteRequestAfterMount = false;

  doWorkWhenCheckTicketValidityOnPrepareLoadRemoteRequest = () => {
    this.handleFromMerchant();
  };

  doWorkWhenCheckTicketValidityOnRepeatedShow = () => {
    this.handleFromMerchant();
  };

  renderFurther() {
    return <>预加载</>;
  }
}
