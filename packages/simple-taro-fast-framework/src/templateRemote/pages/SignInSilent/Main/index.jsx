import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { CenterBox } from 'taro-fast-component/es/customComponents';
import { getApiDataCore } from 'taro-fast-framework/es/utils/actionAssist';
import { getVerifySignInResult } from 'taro-fast-framework/es/utils/tools';
import { removeSession } from 'taro-fast-framework/es/utils/globalStorageAssist';

import BasePageWrapper from '../../BasePageWrapper';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '模板页--静默登录',
});

@connect(({ entrance, session, global, schedulingControl }) => ({
  entrance,
  session,
  global,
  schedulingControl,
}))
export default class Index extends BasePageWrapper {
  verifySession = true;

  verifyTicket = true;

  verifyTicketValidity = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{},
    };

    //移除现有缓存, 仅为当前夜间环境测试使用, 常规使用时无需此步骤
    removeSession();
  }

  getApiData = (props) => {
    return getApiDataCore({ props, modelName: 'entrance' });
  };

  getSignInResultText = () => {
    const verifySignInResult = getVerifySignInResult();
    const v = this.getSignInResult();

    if (v === verifySignInResult.success) {
      return '成功';
    }

    if (v === verifySignInResult.fail) {
      return '用户尚未注册';
    }

    if (v === verifySignInResult.unknown) {
      return '登陆中, 请稍后';
    }
  };

  renderFurther() {
    const signInSuccessText = this.getSignInResultText();

    return (
      <View
        style={{
          width: '100%',
          height: transformSize(400),
        }}
      >
        <CenterBox>
          <View>登录结果: {signInSuccessText}</View>
        </CenterBox>
      </View>
    );
  }
}
