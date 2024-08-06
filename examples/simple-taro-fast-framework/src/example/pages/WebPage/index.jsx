import { connect } from 'easy-soft-dva';

import { WebPageBase } from 'taro-fast-framework';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends WebPageBase {}
