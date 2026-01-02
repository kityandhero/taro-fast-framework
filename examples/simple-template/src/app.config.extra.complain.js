import { filePrefix } from './customConfig';

const LogoImage = `${filePrefix}746868813.jpeg`;

export const configComplain = {
  appId: 'pdedplikofg5q8',
  apiPrefix: {
    corsTargetDomain: 'http://suggest.oa.local.net',
  },
  // 是否在静默登录失败后跳转登录界面，需要强制登录的应用建议开启
  navigationToSignInWhenSignInSilentFail: true,
  footerImage: LogoImage,
};
