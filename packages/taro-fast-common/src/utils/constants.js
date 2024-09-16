import { requestMode } from 'easy-soft-utility';

import { emptyLogo } from './mediaDefault';

/**
 * Empty logic.
 * @constant {string}
 * @default 'empty-logic'
 */
export const emptyLogic = 'empty-logic';

export const pxToRemRoot = {
  weapp: 32,
  h5: 24,
};

export const verifyTicketValidityResult = {
  unknown: -1,
  fail: 0,
  success: 1,
};

export const verifySignInResult = {
  unknown: -1,
  fail: 0,
  success: 1,
};

export const locateResult = {
  unknown: 0,
  yes: 1,
  no: 2,
};

export const locationModeCollection = {
  unknown: 0,
  auto: 10,
  custom: 20,
};

/**
 * 鉴权失败码
 */
export const authenticationFailCode = 2001;

/**
 * Api请求成功码
 */
export const apiSuccessCode = 200;

/**
 * 应用默认配置
 */
export const appInitDefault = {
  webRootFontSize: '142%',
  appId: '',
  platformName: '平台名称',
  appName: '应用名称',
  appDescription: '应用描述',
  loginLogo: '',
  shareLogo: '',
  shareLogoName: 'Logo',
  leftBarText: '左侧名称',
  companyName: '公司名称',
  footerImage: '',
  footerText: '',
  footerDescription: '版权描述',
  apiPrefix: {
    corsTargetProduction: '',
  },
  showSelectLanguage: false,
  showLogoInLoginView: true,
  emptyLogo,
  leftBarLogo: emptyLogo,
  apiSuccessCode,
  authenticationFailCode,
  navigationToSignInWhenSignInSilentFail: false,
  signInPath: '/user/login',
  useLocation: false,
  simulationLocation: false,
  simulationLocationData: {},
  refreshSessionAliasName: 'refreshSessionApiData',
  checkTicketValidityAliasName: 'checkTicketValidityApiData',
  signInSilentAliasName: 'signInSilentApiData',
  metaDataAliasName: 'metaDataApiData',
  metaDataApi: '',
  mapKey: '',
  defaultLatitude: '',
  defaultLongitude: '',
  showLogInConsole: false,
  showRequestInfo: false,
  defaultRequestMode: requestMode.real,
  promptSimulation: false,
  apiVersion: '',
  tokenAnonymous: 'anonymous',
  initialLocationMode: locationModeCollection.custom,
  imageUploadMaxSize: 2,
  audioUploadMaxSize: 4,
  videoUploadMaxSize: 4,
  fileUploadMaxSize: 2,
  withoutPermissionRedirectPath: '',
  signInSuccessFlag: verifySignInResult.success,
  signInFailFlag: verifySignInResult.fail,
  signInUnknownFlag: verifySignInResult.unknown,
  defaultMetaData: {},
  weatherApi: 'https://wis.qq.com/weather/common',
};

export const colorStatus = {
  primary: 'var(--tfc-color-primary)',
  success: 'var(--tfc-color-success)',
  warning: 'var(--tfc-color-warning)',
  danger: 'var(--tfc-color-danger)',
  info: 'var(--tfc-color-info)',
};

export const colorEffect = {
  border: 'var(--tfc-border-color)',
};

export const colorPure = {
  weak: 'var(--tfc-color-weak)',
  light: 'var(--tfc-color-light)',
  red: 'var(--tfc-color-red)',
  redLight: 'var(--tfc-color-red-light)',
  orange: 'var(--tfc-color-orange)',
  orangeLight: 'var(--tfc-color-orange-light)',
  yellow: 'var(--tfc-color-yellow)',
  yellowLight: 'var(--tfc-color-yellow-light)',
  olive: 'var(--tfc-color-olive)',
  oliveLight: 'var(--tfc-color-olive-light)',
  green: 'var(--tfc-color-green)',
  greenLight: 'var(--tfc-color-green-light)',
  cyan: 'var(--tfc-color-cyan)',
  cyanLight: 'var(--tfc-color-cyan-light)',
  blue: 'var(--tfc-color-blue)',
  blueLight: 'var(--tfc-color-blue-light)',
  purple: 'var(--tfc-color-purple)',
  purpleLight: 'var(--tfc-color-purple-light)',
  mauve: 'var(--tfc-color-mauve)',
  mauveLight: 'var(--tfc-color-mauve-light)',
  pink: 'var(--tfc-color-pink)',
  pinkLight: 'var(--tfc-color-pink-light)',
  brown: 'var(--tfc-color-brown)',
  brownLight: 'var(--tfc-color-brown-light)',
  grey: 'var(--tfc-color-grey)',
  greyLight: 'var(--tfc-color-grey-light)',
  black: 'var(--tfc-color-black)',
  darkGray: 'var(--tfc-color-dark-gray)',
  gray: 'var(--tfc-color-gray)',
  ghostWhite: 'var(--tfc-color-ghost-white)',
  white: 'var(--tfc-color-white)',
};

export const colorGradual = {
  red: 'var(--tfc-color-gradual-red)',
  orange: 'var(--tfc-color-gradual-orange)',
  green: 'var(--tfc-color-gradual-green)',
  purple: 'var(--tfc-color-gradual-purple)',
  pink: 'var(--tfc-color-gradual-pink)',
  blue: 'var(--tfc-color-gradual-blue)',
  lightYellow: 'var(--tfc-color-gradual-light-yellow)',
};

export const colorShadow = {
  red: 'var(--tfc-color-red-shadow)',
  orange: 'var(--tfc-color-orange-shadow)',
  yellow: 'var(--tfc-color-yellow-shadow)',
  olive: 'var(--tfc-color-olive-shadow)',
  green: 'var(--tfc-color-green-shadow)',
  cyan: 'var(--tfc-color-cyan-shadow)',
  blue: 'var(--tfc-color-blue-shadow)',
  purple: 'var(--tfc-color-purple-shadow)',
  mauve: 'var(--tfc-color-mauve-shadow)',
  pink: 'var(--tfc-color-pink-shadow)',
  brown: 'var(--tfc-color-brown-shadow)',
  grey: 'var(--tfc-color-grey-shadow)',
  black: 'var(--tfc-color-black-shadow)',
};

export const callProcessType = {
  functionLogic: 10,
  emptyLogic: 20,
  renderLogic: 30,
};

export const formNameCollection = {
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '数据的创建时间',
  },
  customOperate: {
    label: '操作',
    name: 'operateName',
    helper: '',
  },
};
