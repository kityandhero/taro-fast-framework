import { connect } from 'easy-soft-dva';

import iconBasic from '../../../../assets/images/icon-list-basic.png';
import { ChannelPageBase } from '../../../../customComponents';
import { pathCollection } from '../../../../customConfig';

const o = {
  icon: iconBasic,
  title: '模板页面',
  list: [
    {
      id: 'override',
      name: '重载函数',
      path: pathCollection.templateRemote.override.path,
    },
    {
      id: 'signInSilent',
      name: '静默登录',
      path: pathCollection.templateRemote.signInSilent.path,
    },
    {
      id: 'exchangePhone',
      name: '兑换手机号码',
      path: pathCollection.templateRemote.exchangePhone.path,
    },
    {
      id: 'getCustomer',
      name: '获取登录用户信息',
      path: pathCollection.templateRemote.getCustomer.path,
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
  initMetaDataForce = true;

  buildData = () => {
    return o;
  };
}
