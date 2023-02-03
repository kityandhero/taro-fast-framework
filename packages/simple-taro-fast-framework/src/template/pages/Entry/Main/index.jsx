import { connect } from 'easy-soft-dva';

import iconBasic from '../../../../assets/images/icon-list-basic.png';
import { ChannelPageBase } from '../../../../customComponents';
import { pathCollection } from '../../../../customConfig';

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
      id: 'register',
      name: '微信注册页',
      path: pathCollection.template.register.path,
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
    {
      id: 'loading',
      name: 'SVG',
      path: pathCollection.template.loading.path,
    },
  ],
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '模板页面',
});

@connect(({ entrance, schedulingControl }) => ({
  entrance,
  schedulingControl,
}))
export default class Index extends ChannelPageBase {
  initMetaDataForce = true;

  buildData = () => {
    return o;
  };
}
