import { pathCollection } from '../../../../customConfig/config';
import ChannelPageBase from '../../../../customComponents/ChannelPageBase';

import iconBasic from '../../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '模板页面',
  list: [
    {
      id: 'signIn',
      name: '登录页',
      path: pathCollection.template.signIn.path,
    },
    {
      id: 'gridBanner',
      name: '宫格导航',
      path: pathCollection.template.gridBanner.path,
    },
  ],
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '模板页面',
});

export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
