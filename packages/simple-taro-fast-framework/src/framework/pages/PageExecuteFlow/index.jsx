import { sortBy } from 'taro-fast-common/es/utils/tools';

import { pathCollection } from '../../../customConfig/config';
import ChannelPageBase from '../../../customComponents/ChannelPageBase';

import iconBasic from '../../../assets/images/icon-list-basic.png';

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

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
