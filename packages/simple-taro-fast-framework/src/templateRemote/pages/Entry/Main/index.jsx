import { connect } from 'react-redux';

import { pathCollection } from '../../../../customConfig/config';
import ChannelPageBase from '../../../../customComponents/ChannelPageBase';

import iconBasic from '../../../../assets/images/icon-list-basic.png';

const o = {
  icon: iconBasic,
  title: '模板页面',
  list: [
    {
      id: 'signInSilent',
      name: '静默登录',
      path: pathCollection.templateRemote.signInSilent.path,
    },
  ],
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '远程模板页面',
});

@connect(({ entrance, schedulingControl }) => ({
  entrance,
  schedulingControl,
}))
export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
