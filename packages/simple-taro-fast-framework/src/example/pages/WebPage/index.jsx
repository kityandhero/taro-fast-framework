import { WebPageBase } from 'taro-fast-framework/es/framework';
import { connect } from 'taro-fast-framework/es/utils/dva';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends WebPageBase {}
