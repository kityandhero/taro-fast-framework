import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { CenterBox } from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../customComponents/general';
import { pathCollection, viewStyle } from '../../../customConfig';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '工作台',
  // navigationStyle: 'custom',
});

@connect(({ workbench, entrance, session, global, schedulingControl }) => ({
  workbench,
  entrance,
  session,
  global,
  schedulingControl,
}))
class Home extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  viewStyle = {
    ...viewStyle,
    // backgroundColor: '#fff',
    paddingLeft: transformSize(12),
    paddingRight: transformSize(12),
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
    };
  }

  onShareAppMessage() {
    const o = {
      path: pathCollection.root.home.path,
    };

    return o;
  }

  renderFurther() {
    return (
      <View className="page page-index">
        <CenterBox>首页</CenterBox>
      </View>
    );
  }
}

export default Home;
