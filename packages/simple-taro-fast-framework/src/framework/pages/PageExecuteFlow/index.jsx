import { connect } from 'easy-soft-dva';
import { sortBy } from 'easy-soft-utility';

import iconBasic from '../../../assets/images/icon-list-basic.png';
import { ChannelPageBase } from '../../../customComponents';
import { pathCollection } from '../../../customConfig';

const list = [
  {
    id: 'verifySession',
    name: '检测Session状态',
    path: pathCollection.framework.pageExecuteFlow.verifySession.path,
  },
];

const o = {
  icon: iconBasic,
  title: '页面执行流程',
  list: sortBy(list, (one) => {
    return one.id;
  }),
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '页面执行流程',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
