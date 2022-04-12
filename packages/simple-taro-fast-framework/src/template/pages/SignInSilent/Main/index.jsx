import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { CenterBox } from 'taro-fast-component/es/customComponents';
import { getApiDataCore } from 'taro-fast-framework/es/utils/actionAssist';
import { getVerifySignInResult } from 'taro-fast-framework/es/utils/tools';

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

  getApiData = (props) => {
    return getApiDataCore({ props, modelName: 'entrance' });
  };

  checkSignInSuccess = () => {
    const verifySignInResult = getVerifySignInResult();
    const v = this.getSignInResult();

    return v === verifySignInResult.success;
  };

  renderFurther() {
    const signInSuccess = this.checkSignInSuccess();

    return (
      <View
        style={{
          width: '100%',
          height: transformSize(400),
        }}
      >
        <CenterBox>登录结果: {signInSuccess ? '成功' : '失败'} </CenterBox>
      </View>
    );
  }
}
