import { connect } from 'easy-soft-dva';

import { WebPageBase } from 'taro-fast-framework';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '网页容器',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class WebPage extends WebPageBase {}

export default WebPage;
