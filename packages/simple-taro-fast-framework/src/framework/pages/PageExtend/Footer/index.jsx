import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { CenterBox } from 'taro-fast-component';

import { ContentPageBase } from '../../../../customComponents';

export const classPrefix = `template-grid-banner`;

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '底部信息/版权',
});

@connect(({ entrance, session, global, schedulingControl }) => ({
  entrance,
  session,
  global,
  schedulingControl,
}))
@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  scrollViewMode = true;

  enableFooter = true;

  renderFurther() {
    return (
      <View
        style={{
          width: '100%',
          // height: '100vh',
        }}
      >
        <CenterBox>内容区域</CenterBox>
      </View>
    );
  }
}
