import { connect } from 'react-redux';

import { WebPageBase } from 'taro-fast-framework/es/framework';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends WebPageBase {}
