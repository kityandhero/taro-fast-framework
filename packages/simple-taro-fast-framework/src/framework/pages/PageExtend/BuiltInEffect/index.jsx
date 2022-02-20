import { pathCollection } from '../../../../customConfig/constants';
import ChannelPageBase from '../../../../customComponents/ChannelPageBase';

import iconBasic from '../../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '普通视图',
  list: [
    {
      id: 'buildEmptyPlaceholder',
      name: '',
      path: pathCollection.framework.pageExtend.builtInEffect
        .buildEmptyPlaceholder.path,
    },
  ],
};

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
