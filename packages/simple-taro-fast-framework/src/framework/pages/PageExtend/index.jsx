import { connect } from 'easy-soft-dva';
import { sortBy } from 'easy-soft-utility';

import iconBasic from '../../../assets/images/icon-list-basic.png';
import ChannelPageBase from '../../../customComponents/ChannelPageBase';
import { pathCollection } from '../../../customConfig/pathConfig';

const list = [
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
    id: 'CapsulePrompt',
    name: '使用胶囊提示',
    path: pathCollection.framework.pageExtend.capsulePrompt.path,
  },
  {
    id: 'FullAdministrativeDivisionSelector',
    name: '选择地区',
    path: pathCollection.framework.pageExtend.fullAdministrativeDivisionSelector
      .path,
  },
  {
    id: 'Footer',
    name: '底部信息',
    path: pathCollection.framework.pageExtend.footer.path,
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
];

const o = {
  icon: iconBasic,
  title: '扩展页面基架',
  list: sortBy(list, (one) => {
    return one.id;
  }),
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '扩展页面基架',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
