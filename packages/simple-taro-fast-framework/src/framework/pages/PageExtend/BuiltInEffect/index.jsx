import { pathCollection } from '../../../../customConfig/config';
import ChannelPageBase from '../../../../customComponents/ChannelPageBase';

import iconBasic from '../../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '内置功能',
  list: [
    {
      id: 'buildEmptyPlaceholder',
      name: '',
      path: pathCollection.framework.pageExtend.builtInEffect
        .buildEmptyPlaceholder.path,
    },
    {
      id: 'buildInitialActivityIndicator',
      name: '',
      path: pathCollection.framework.pageExtend.builtInEffect
        .buildInitialActivityIndicator.path,
    },
  ],
};

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
