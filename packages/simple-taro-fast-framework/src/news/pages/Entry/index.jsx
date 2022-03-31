import { connect } from 'react-redux';

import BasePageWrapper from '../BasePageWrapper';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '预加载',
});

@connect(({ entrance, session, global }) => ({
  entrance,
  session,
  global,
}))
export default class Index extends BasePageWrapper {
  renderFurther() {
    return <>预加载</>;
  }
}
