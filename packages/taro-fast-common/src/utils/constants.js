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
  auto: 10,
  custom: 20,
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
  signInPath: '/user/login',
  useLocation: false,
  mapKey: '',
  defaultLatitude: '',
  defaultLongitude: '',
  showLogInConsole: false,
  showRequestInfo: false,
  useVirtualRequest: false,
  showUseVirtualRequestMessage: false,
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

  /**
   * 信息
   */
  info: 'info',
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

export const errorImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNCMjQwOTZEQTJEQzExRTk4MzIwOUNCREIxN0YzMjI1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNCMjQwOTZFQTJEQzExRTk4MzIwOUNCREIxN0YzMjI1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0IyNDA5NkJBMkRDMTFFOTgzMjA5Q0JEQjE3RjMyMjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0IyNDA5NkNBMkRDMTFFOTgzMjA5Q0JEQjE3RjMyMjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5QBArFAAABmUlEQVR42uzdQU7CQBSAYesVuII3gLUnAO+iZ2DbeKMu3Fa8AglX0A2r+khm2dpJM01a/P7kBVNmGMOXaMqGquu6B91vj94CwAIswAIswAIswIAFWIAFWIAFWIABC7AAC7AAC7AACzBgARZgARZgARZgwAIswAIswAIswIAFWIAFWIAFWIAFGLAAC7AAC7AACzBgARbgmTrENDHfaW4/7zP2bWLqmHPMNT3W6fpcZy6n2/cmrWCO3XDHP/Y9xVwG9l3S86XPXNSs4Zfcd+MdevZVMe3IvjatK3Xm4mYNf6LfMta89lx7jtmN7NuldaXO9D94QruJa7aZr78teCbgmar+yZl3CfyZsabtuXbKfP1TwTMBT+h94pqPDOSvtK7UmW6T3Ca5TRqal5gm5idNk3mrsompY84x1/RYp+tznbmYqXxBtI8qBViABViABViAAQuwAAuwAAuwAAMWYAEWYAEWYAEWYMACLMACLMACLMCABViABViABViAAQuwAAuwAAuwAAswYAEWYAEWYAEWYMACLMBaTr8CDADMpQtLRxvJYQAAAABJRU5ErkJggg==';

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
