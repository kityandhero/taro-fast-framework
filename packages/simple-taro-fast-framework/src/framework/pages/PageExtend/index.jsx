import { pathCollection } from '../../../customConfig/constants';
import ChannelPageBase from '../../../customComponents/ChannelPageBase';

import iconBasic from '../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '内置视图',
  list: [
    {
      id: 'BuildInConfig',
      name: '内置配置',
      path: pathCollection.framework.pageExtend.buildInConfig.path,
    },
    {
      id: 'BuildInState',
      name: '内置状态',
      path: pathCollection.framework.pageExtend.buildInState.path,
    },
    {
      id: 'BuiltInEffect',
      name: '内置功能',
      path: pathCollection.framework.pageExtend.builtInEffect.path,
    },
    {
      id: 'Normal',
      name: '普通视图',
      path: pathCollection.framework.pageExtend.normal.path,
    },
    {
      id: 'Scroll',
      name: '滚动视图',
      path: pathCollection.framework.pageExtend.scroll.path,
    },
  ],
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '扩展页面基架',
});

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
