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

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '内置功能',
});

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
