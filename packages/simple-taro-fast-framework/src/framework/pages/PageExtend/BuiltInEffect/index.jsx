import { sortBy } from 'taro-fast-common/es/utils/tools';
import { connect } from 'taro-fast-framework/es/utils/dva';

import iconBasic from '../../../../assets/images/icon-list-basic.png';
import ChannelPageBase from '../../../../customComponents/ChannelPageBase';
import { pathCollection } from '../../../../customConfig/pathConfig';

const list = [
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
];

const o = {
  icon: iconBasic,
  title: '内置功能',
  list: sortBy(list, (one) => {
    return one.id;
  }),
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '内置功能',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
