import { connect } from 'easy-soft-dva';

import iconBasic from '../../../assets/images/icon-list-basic.png';
import { ChannelPageBase } from '../../../customComponents';
import { pathCollection } from '../../../customConfig';

const o = {
  icon: iconBasic,
  title: '开发框架',
  list: [
    {
      id: 'PageExtend',
      name: '扩展页面基架',
      path: pathCollection.framework.pageExtend.path,
    },
    {
      id: 'PageExecuteFlow',
      name: '页面执行流程',
      path: pathCollection.framework.pageExecuteFlow.path,
    },
  ],
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '开发框架',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
