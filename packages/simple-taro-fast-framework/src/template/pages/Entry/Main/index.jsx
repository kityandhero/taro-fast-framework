import { connect } from 'react-redux';

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
      id: 'signInSilent',
      name: '静默登录',
      path: pathCollection.template.signInSilent.path,
    },
    {
      id: 'register',
      name: '微信注册页',
      path: pathCollection.template.register.path,
    },
    {
      id: 'getCustomer',
      name: '获取登录用户信息',
      path: pathCollection.template.getCustomer.path,
    },
    {
      id: 'gridBanner',
      name: '宫格导航',
      path: pathCollection.template.gridBanner.path,
    },
    {
      id: 'weather',
      name: '获取天气',
      path: pathCollection.template.weather.path,
    },
  ],
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '模板页面',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ChannelPageBase {
  buildData = () => {
    return o;
  };
}
