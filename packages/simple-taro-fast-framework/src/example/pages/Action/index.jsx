import { pathCollection } from '../../../customConfig/constants';
import ChannelPageBase from '../../../customComponents/ChannelPageBase';

import iconBasic from '../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '操作反馈',
  list: [
    {
      id: 'ActionSheet',
      name: '动作面板',
      path: pathCollection.example.actionSheet.path,
    },
    {
      id: 'FloatAction',
      name: '浮动按钮',
      path: pathCollection.example.floatAction.path,
    },
    {
      id: 'Modal',
      name: '弹窗',
      path: pathCollection.example.modal.path,
    },
  ],
};

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
