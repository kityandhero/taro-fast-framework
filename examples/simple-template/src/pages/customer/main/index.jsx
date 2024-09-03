import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { PageWrapper } from '../../../customComponents';

import './index.less';

export const classPrefix = `root-customer`;

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '用户中心',
  navigationStyle: 'custom',
});

@connect(({ customer, session, entrance, global, schedulingControl }) => ({
  customer,
  session,
  entrance,
  global,
  schedulingControl,
}))
class PageMain extends PageWrapper {
  viewStyle = {
    backgroundColor: '#f5f5f5',
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: '',
      customer: null,
    };
  }

  renderFurther() {
    return (
      <>
        <View className="page-title">Customer Page</View>
      </>
    );
  }
}

export default PageMain;
