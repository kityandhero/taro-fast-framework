import { emptyLogo as emptyLogoSource } from './mediaDefault';

export const pxToRemRoot = {
  weapp: 32,
  h5: 48,
};

/**
 * 基础state
 */
export const underlyingState = {
  loadApiPath: '',
  firstLoadSuccess: false,
  loadSuccess: false,
  dataLoading: false,
  reloading: false,
  searching: false,
  refreshing: false,
  paging: false,
  processing: false,
  dispatchComplete: true,
  metaData: null,
  metaExtra: null,
  metaListData: [],
  metaOriginalData: null,
  urlParams: null,
  externalData: null,
};

export const underlyingExtensionState = {
  dataLoading: true,
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
  auto: 1,
  custom: 2,
};

export const requestMethod = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
  trace: 'TRACE',
  connect: 'CONNECT',
};

export const zeroString = '0';

export const zeroInt = 0;

/**
 * 鉴权失败码
 */
export const authenticationFailCode = 2001;

/**
 * Api请求成功码
 */
export const apiSuccessCode = 200;

/**
 * 1970-01-01 00:00
 */
export const emptyDatetime = '1970-01-01 00:00';

/**
 * 用户默认图
 */
export const defaultUserAvatar = '/user.png';

export const defaultEmptyImage = '/noImageSmall.png';

export const emptyLogo = emptyLogoSource;

export const appInitDefault = {
  platformName: '平台名称',
  appName: '应用名称',
  appDescription: '应用描述',
  loginLogo: '',
  shareLogo: '',
  shareLogoName: 'Logo',
  leftBarText: '左侧名称',
  companyName: '公司名称',
  copyright: '版权描述',
  apiPrefix: {
    corsTargetProduction: '',
  },
  showSelectLanguage: false,
  showLogoInLoginView: true,
  emptyLogo,
  leftBarLogo: emptyLogo,
  apiSuccessCode,
  authenticationFailCode,
  loginPath: '/user/login',
  useLocation: false,
  mapKey: '',
  defaultLatitude: '',
  defaultLongitude: '',
  showLogInConsole: false,
  showRequestInfo: false,
  useVirtualRequest: false,
  showUseVirtualRequestMessage: false,
  apiVersion: '',
  imageUploadMaxSize: 2,
  audioUploadMaxSize: 4,
  videoUploadMaxSize: 4,
  fileUploadMaxSize: 2,
  withoutPermissionRedirectPath: '',
};

/**
 * accessWaySpecialCollection
 */
export const accessWaySpecialCollection = {
  super: {
    permission: 'super',
  },
};

/**
 * 转换集合
 */
export const convertCollection = {
  /**
   * 数字
   */
  number: 'number',

  /**
   * 日期 date
   */
  datetime: 'datetime',

  /**
   * 字符串
   */
  string: 'string',

  /**
   * moment日期
   */
  moment: 'moment',

  /**
   * 金额
   */
  money: 'money',

  /**
   * 数组
   */
  array: 'array',
};

/**
 * 格式化集合
 */
export const formatCollection = {
  /**
   * 金额 ￥ 0.00
   */
  money: 'money',

  /**
   * 格式化日期 YYYY-MM-DD hh:mm:ss
   */
  datetime: 'datetime',

  /**
   * 中文金额
   */
  chineseMoney: 'chineseMoney',

  /**
   * 百分比
   */
  percentage: 'percentage',
};

export const datetimeFormat = {
  yearMonthDayHourMinuteSecond: 'YYYY-MM-DD HH:mm:ss',
  yearMonthDayHourMinute: 'YYYY-MM-DD HH:mm',
  yearMonthDay: 'YYYY-MM-DD',
  yearMonth: 'YYYY-MM',
  year: 'YYYY',
  monthDayHourMinuteSecond: 'YYYY-MM-DD HH:mm:ss',
  monthDayHourMinute: 'MM-DD HH:mm',
  monthDay: 'MM-DD',
  hourMinute: 'HH:mm',
  hourMinuteSecond: 'HH:mm:ss',
  month: 'MM',
  day: 'DD',
  hour: 'HH',
  minute: 'mm',
  second: 'ss',
};

/**
 * 排序动作
 */
export const sortOperate = {
  moveUp: 'moveUp',
  moveDown: 'moveDown',
};

/**
 * 字符串类型 ‘0’/'1'
 */
export const whetherString = {
  no: '0',
  yes: '1',
};

/**
 * 字符串类型 0/1
 */
export const whetherNumber = {
  no: 0,
  yes: 1,
};

/**
 * 日志类型
 */
export const logLevel = {
  /**
   * 调试
   */
  debug: 'debug',

  /**
   * 警告
   */
  warn: 'warn',

  /**
   * 错误
   */
  error: 'error',
};

export const logShowMode = {
  /**
   * 未知
   */
  unknown: 'unknown',

  /**
   * 文本
   */
  text: 'text',

  /**
   * 对象
   */
  object: 'object',
};

export const notificationTypeCollection = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
  warn: 'warn',
  open: 'open',
};

export const messageTypeCollection = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
  warn: 'warn',
  open: 'open',
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

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
