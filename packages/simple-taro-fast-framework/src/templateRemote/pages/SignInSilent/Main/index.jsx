import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { Space } from 'taro-fast-component';
import { getVerifySignInResult, removeSession } from 'taro-fast-framework';

import CodePageBox from '../../../../customComponents/CodePageBox';
import SimpleBox from '../../../../customComponents/SimpleBox';
import BasePageWrapper from '../../BasePageWrapper';

const configList = [
  {
    label: 'verifySession',
    value: '开启 session 检测校验',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'verifyTicket',
    value: '开启登录校验',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'verifyTicketValidity',
    value: '开启登录凭据期限检测校验',
    ellipsis: false,
    canCopy: true,
  },
];

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '模板页--静默登录',
});

@connect(({ customer, entrance, session, global, schedulingControl }) => ({
  customer,
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

    //移除现有缓存, 仅为当前页面环境测试使用, 常规使用时无需此步骤
    removeSession();
  }

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
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="请求结果"
          mockChildren={false}
          useInnerBox
          innerBoxCenterMode
          innerBoxPadding
        >
          <View>登录结果: {signInSuccessText}</View>
        </SimpleBox>

        <CodePageBox
          list={configList}
          config={{
            verifySession: true,
            getSignInResultText: `() => {
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
            }`,
          }}
        />
      </Space>
    );
  }
}
