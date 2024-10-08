import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { CenterBox, IconClose } from 'taro-fast-component';

import { ContentPageBase } from '../../../../customComponents';

export const classPrefix = `template-grid-banner`;

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '胶囊操作提示',
  // navigationStyle: 'custom',
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
  enableCapsulePrompt = true;

  // capsulePromptWithCustomHeadNavigation = true;

  buildCapsulePrompt = () => {
    return (
      <View
        style={{
          width: transformSize(290),
          fontSize: transformSize(24),
          lineHeight: transformSize(40),
        }}
      >
        点击这里, 添加到我的程序, 下拉微信首页就能看到
        <IconClose
          style={{
            display: 'inline-block',
            marginLeft: transformSize(10),
          }}
          color="#999"
          size={28}
          onClick={() => {
            this.closeCapsulePrompt();
          }}
        />
      </View>
    );
  };

  closeCapsulePrompt = () => {
    this.setState({
      capsulePromptVisible: false,
    });
  };

  renderFurther() {
    return (
      <View
        style={{
          backgroundColor: '#999',
          height: transformSize(800),
        }}
      >
        <CenterBox>内容区域</CenterBox>
      </View>
    );
  }
}
