import { checkWhetherDevelopmentEnvironment } from 'easy-soft-utility';

import { filePrefix } from './customConfig';

const LogoImage = `${filePrefix}746868813.jpeg`;

export const config = {
  appId: 'pddwo4uuzpdekg',
  showLogInConsole: checkWhetherDevelopmentEnvironment(),
  // showLogInConsole: true,
  // showRequestInfo: checkWhetherDevelopmentEnvironment(),
  // showUseVirtualRequestMessage: true,
  apiPrefix: {
    corsTargetDomain: 'https://app.api.oa.32306.net',
  },
  apiSuccessCode: 200,
  authenticationFailCode: 2001,
  // 是否在静默登录失败后跳转登录界面，需要强制登录的应用建议开启
  navigationToSignInWhenSignInSilentFail: true,
  signInPath: '/customer/pages/signIn/main/index',
  apiVersion: 'beta',
  footerImage: LogoImage,
  footerText: '',
  footerDescription: '',
  defaultMetaData: {
    rankList: [],
    sectionList: [],
  },
};
