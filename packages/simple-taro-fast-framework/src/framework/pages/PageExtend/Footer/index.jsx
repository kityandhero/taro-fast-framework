import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { CenterBox } from 'taro-fast-component/es/customComponents';
import { apiDataConvertCore } from 'taro-fast-framework/es/utils/actionAssist';

import ContentPageBase from '../../../../customComponents/ContentPageBase';

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

  apiDataConvert = (props) => {
    return apiDataConvertCore({ props, modelName: 'entrance' });
  };

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
