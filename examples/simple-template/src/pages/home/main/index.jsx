import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { emptyLogo } from 'taro-fast-common';
import { CenterBox, ImageBox } from 'taro-fast-component';

import { PageWrapper } from '../../../customComponents/general';
import { pathCollection } from '../../../customConfig';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '首页',
});

@connect(({ entrance, session, global, schedulingControl }) => ({
  entrance,
  session,
  global,
  schedulingControl,
}))
class PageMain extends PageWrapper {
  onShareAppMessage() {
    const o = {
      path: pathCollection.root.home.path,
    };

    return o;
  }

  renderFurther() {
    return (
      <View className="page page-index">
        <CenterBox>
          <View className="logo">
            <ImageBox src={emptyLogo} />
          </View>
        </CenterBox>

        <View className="page-title">Home Page</View>
      </View>
    );
  }
}

export default PageMain;
