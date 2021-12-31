import '../defineProperty.js';
import { _ as _objectSpread2 } from '../objectSpread2.js';
import { emptyLogo as emptyLogo$1 } from './mediaDefault.js';

var locationModeCollection = {
  unknown: 0,
  auto: 1,
  custom: 2
};
var requestMethod = {
  get: "GET",
  post: "POST",
  put: "PUT",
  delete: "DELETE",
  trace: "TRACE",
  connect: "CONNECT"
};
/**
 * 动画类型
 */

var animalType = {
  none: "none",
  fade: "fade",
  queue: "queue"
};
var zeroString = "0";
var zeroInt = 0;
/**
 * 鉴权失败码
 */

var authenticationFailCode = 2001;
/**
 * Api请求成功码
 */

var apiSuccessCode = 200;
/**
 * 1970-01-01 00:00
 */

var emptyDatetime = "1970-01-01 00:00";
/**
 * 用户默认图
 */

var defaultUserAvatar = "/user.png";
var defaultEmptyImage = "/noImageSmall.png";
var emptyLogo = emptyLogo$1;
var appInitDefault = {
  platformName: "平台名称",
  appName: "应用名称",
  appDescription: "应用描述",
  loginLogo: "",
  shareLogo: "",
  shareLogoName: "Logo",
  leftBarText: "左侧名称",
  companyName: "公司名称",
  copyright: "版权描述",
  apiPrefix: {
    corsTargetProduction: ""
  },
  showSelectLanguage: false,
  showLogoInLoginView: true,
  emptyLogo: emptyLogo,
  leftBarLogo: emptyLogo,
  apiSuccessCode: apiSuccessCode,
  authenticationFailCode: authenticationFailCode,
  loginPath: "/user/login",
  showLogInConsole: false,
  showRequestInfo: false,
  useVirtualRequest: false,
  showUseVirtualRequestMessage: false,
  apiVersion: "",
  imageUploadMaxSize: 2,
  audioUploadMaxSize: 4,
  videoUploadMaxSize: 4,
  fileUploadMaxSize: 2,
  useNprogress: true,
  tinymceApiKey: "",
  tinymceImagesUploadUrl: ""
};
/**
 * accessWaySpecialCollection
 */

var accessWaySpecialCollection = {
  super: {
    permission: "super"
  }
};
var formNameCollection = {
  createTime: {
    label: "创建时间",
    name: "createTime",
    helper: "数据的创建时间"
  },
  customOperate: {
    label: "操作",
    name: "operateName",
    helper: ""
  }
};
/**
 * 转换集合
 */

var convertCollection = {
  /**
   * 数字
   */
  number: "number",

  /**
   * 日期 date
   */
  datetime: "datetime",

  /**
   * 字符串
   */
  string: "string",

  /**
   * moment日期
   */
  moment: "moment",

  /**
   * 金额
   */
  money: "money",

  /**
   * 数组
   */
  array: "array"
};
/**
 * 格式化集合
 */

var formatCollection = {
  /**
   * 金额 ￥ 0.00
   */
  money: "money",

  /**
   * 格式化日期 YYYY-MM-DD hh:mm:ss
   */
  datetime: "datetime",

  /**
   * 中文金额
   */
  chineseMoney: "chineseMoney",

  /**
   * 百分比
   */
  percentage: "percentage"
};
var menuType = {
  divider: "divider",
  menu: "menu"
};
var imageContentPreviewMode = {
  html: 1,
  listItem: 2,
  imageList: 3
};
var datetimeFormat = {
  yearMonthDayHourMinuteSecond: "YYYY-MM-DD HH:mm:ss",
  yearMonthDayHourMinute: "YYYY-MM-DD HH:mm",
  yearMonthDay: "YYYY-MM-DD",
  yearMonth: "YYYY-MM",
  year: "YYYY",
  monthDayHourMinuteSecond: "YYYY-MM-DD HH:mm:ss",
  monthDayHourMinute: "MM-DD HH:mm",
  monthDay: "MM-DD",
  hourMinute: "HH:mm",
  hourMinuteSecond: "HH:mm:ss"
};
var selectModeCollection = {
  /**
   * 侧拉面板
   * value : 0
   */
  drawer: 0,

  /**
   * 弹出框
   * value : 1
   */
  modal: 1
};
var columnFacadeMode = {
  /**
   * 省略文本
   * value : ellipsis
   */
  ellipsis: "ellipsis",

  /**
   * 图片展示
   * value : image
   */
  image: "image",

  /**
   * 日期
   * value : datetime
   */
  datetime: "datetime",

  /**
   * Badge展示
   * value : badge
   */
  badge: "badge",

  /**
   * 货币，例如￥0.05
   * value : money
   */
  money: "money",

  /**
   * dropdown
   * value : dropdown component
   */
  dropdown: "dropdown"
};
var columnPlaceholder = {
  placeholder: true,
  title: "其他",
  dataIndex: null,
  align: "center",
  render: function render() {
    return "--";
  }
};
var contentConfig = {
  wrapperType: {
    page: "page",
    model: "model",
    drawer: "drawer"
  }
};
var pageHeaderRenderType = {
  descriptionGrid: "descriptionGrid",
  paragraph: "paragraph ",
  action: "action "
};
var listViewConfig = {
  dataContainerExtraActionBuildType: {
    generalButton: "generalButton",
    button: "button",
    dropdown: "dropdown",
    dropdownButton: "dropdownButton",
    dropdownEllipsis: "dropdownEllipsis",
    iconInfo: "iconInfo",

    /**
     * 指定渲染自定义组件，组件由配置传入
     */
    component: "component"
  },
  viewMode: {
    /**
     * 适用Table组件构建展示
     */
    table: 0,

    /**
     * 使用List组件构建展示
     */
    list: 1,

    /**
     * 构建Card集合展示
     */
    cardCollectionView: 2
  },
  tableSize: {
    middle: "middle",
    small: "small",
    large: "large"
  },
  expandAnimalType: {
    none: animalType.none,
    fade: animalType.fade,
    queue: animalType.queue
  }
};
/**
 * 排序动作
 */

var sortOperate = {
  moveUp: "moveUp",
  moveDown: "moveDown"
};
/**
 * 扩展区构建模式
 */

var extraBuildType = {
  /**
   * 内置的刷新按钮，根据请求配置触发重新加载，一般用于详情类展示或表单初始加载
   */
  refresh: "refresh",

  /**
   * 内置的保存按钮，表单上下文中将根据提交配置触发提交操作，非表单环境不要使用
   */
  save: "save",

  /**
   * 根据配置项渲染按钮，事件触发需要自定义指定
   */
  generalButton: "generalButton",

  /**
   * 带图标文字，图标为空或者文字为空情况下渲染方式有差异
   */
  iconInfo: "iconInfo",

  /**
   * 彩色文字
   */
  colorText: "colorText",

  /**
   * 自定义选择框
   */
  flexSelect: "flexSelect",

  /**
   * 根据配置项渲染按钮，事件触发需要自定义指定,配置项与generalButton相仿，配置模式有所不同，最终效果类似
   */
  button: "button",

  /**
   * 带扩展操作的按钮
   */
  dropdownButton: "dropdownButton",

  /**
   * 带扩展操作的省略按钮，省略占位符本身不具有操作
   */
  dropdownEllipsis: "dropdownEllipsis",

  /**
   * dropdown
   */
  dropdown: "dropdown",

  /**
   * 指定渲染自定义组件，组件由配置传入
   */
  component: "component"
};
var drawerConfig = {
  /**
   * 扩展区构建模式
   */
  extraBuildType: extraBuildType,
  bottomBarBuildType: {
    close: "close",
    refresh: "refresh",
    save: "save",
    generalButton: "generalButton",
    iconInfo: "iconInfo",
    button: "button",
    dropdownButton: "dropdownButton",
    dropdownEllipsis: "dropdownEllipsis",
    dropdown: "dropdown",

    /**
     * 指定渲染自定义组件，组件由配置传入
     */
    component: "component"
  }
};
/**
 * card配置集合
 */

var cardConfig = _objectSpread2(_objectSpread2({}, contentConfig), {}, {
  renderType: {
    normal: "normal",
    help: "help"
  },

  /**
   * 动画支持
   */
  animalType: {
    none: animalType.none,
    fade: animalType.fade,
    queue: animalType.queue
  },

  /**
   * 扩展区构建模式
   */
  extraBuildType: _objectSpread2({}, extraBuildType),
  contentItemType: {
    /**
     * Col占位符,自由指定占用大小
     */
    placeholder: "placeholder",

    /**
     * 纯文本渲染项目
     */
    text: "text",

    /**
     * 输入框，仅用于单页详情或表单上下文环境
     */
    input: "input",

    /**
     * 密码框，仅用于单页详情或表单上下文环境
     */
    password: "password",

    /**
     * 数字框，仅用于单页详情或表单上下文环境
     */
    inputNumber: "inputNumber",

    /**
     * 文本域，仅用于单页详情或表单上下文环境
     */
    textarea: "textarea",

    /**
     * switch开关
     */
    switch: "switch",

    /**
     * 一般选择框
     */
    select: "select",

    /**
     * ”是/否“ 选择框
     */
    whetherSelect: "whetherSelect",

    /**
     * 自定义选择框
     */
    customSelect: "customSelect",

    /**
     * 自定义选择框
     */
    flexSelect: "flexSelect",

    /**
     * 一般单选框
     */
    radio: "radio",

    /**
     * ”是/否“ 单选框
     */
    whetherRadio: "whetherRadio",

    /**
     * 自定义单选框
     */
    customRadio: "customRadio",

    /**
     * 纯展示文本域，仅用于单页详情或表单上下文环境
     */
    onlyShowTextarea: "onlyShowTextarea",

    /**
     * 只读输入框，仅用于单页详情或表单上下文环境
     */
    onlyShowInput: "onlyShowInput",

    /**
     * 只读日期框，仅用于单页详情或表单上下文环境
     */
    onlyShowInputDatetime: "onlyShowInputDatetime",

    /**
     * 文字信息展示，仅用于单页详情或表单上下文环境
     */
    onlyShowText: "onlyShowText",

    /**
     * 图片上传
     */
    imageUpload: "imageUpload",

    /**
     * 图片展示
     */
    imageShow: "imageShow",

    /**
     * 图片集展示
     */
    imageListShow: "imageListShow",

    /**
     * 文件串行化上传
     */
    fileBase64Upload: "fileBase64Upload",

    /**
     * 视频上传
     */
    videoUpload: "videoUpload",

    /**
     * 文件上传
     */
    fileUpload: "fileUpload",

    /**
     * 音频上传
     */
    audioUpload: "audioUpload",

    /**
     * 内部自定义组件，仅用于单页详情或表单上下文环境显示单项内容区域
     */
    innerComponent: "innerComponent",

    /**
     * 保存按钮，表单上下文中将根据提交配置触发提交操作，非表单环境不要使用，与extraBuildType处的save具有相似功能
     */
    save: "save",

    /**
     * 渲染按钮
     */
    button: "button",

    /**
     * 操作集合
     */
    actionList: "actionList",

    /**
     * 组件
     */
    component: "component",

    /**
     * 渲染当前时间，仅用于单页详情或表单上下文环境显示单项内容区域
     */
    nowTime: "nowTime",

    /**
     * 日期选择项，仅用于单页详情或表单上下文环境显示单项内容区域
     */
    datePicker: "datePicker",

    /**
     * 时间选择项，仅用于单页详情或表单上下文环境显示单项内容区域
     */
    timePicker: "timePicker",

    /**
     * json可视化展示
     */
    jsonView: "jsonView",

    /**
     * flex类型文字
     */
    flexText: "flexText",

    /**
     * flex类型文字
     */
    onlyShowTextByFlexText: "onlyShowTextByFlexText",

    /**
     * 分隔符
     */
    divider: "divider",

    /**
     * Html
     */
    html: "html",

    /**
     * CustomGrid
     */
    customGrid: "customGrid",

    /**
     * tree
     */
    tree: "tree",

    /**
     * tinymce
     */
    tinymce: "tinymce"
  }
});
var searchCardConfig = {
  contentItemType: {
    /**
     * 输入框
     */
    input: "input",

    /**
     * 数字框
     */
    inputNumber: "inputNumber",

    /**
     * 自定义选择框
     */
    customSelect: "customSelect",

    /**
     * 自定义选择框
     */
    flexSelect: "flexSelect",

    /**
     * 自定义单选框
     */
    customRadio: "customRadio",

    /**
     * 只读输入框
     */
    onlyShowInput: "onlyShowInput",

    /**
     * 内部自定义组件
     */
    innerComponent: "innerComponent",

    /**
     * 自定义组件
     */
    component: "component",

    /**
     * 日期选择框
     */
    datePicker: "datePicker",

    /**
     * 日期范围选择框
     */
    customRangePicker: "customRangePicker",

    /**
     * 分隔符
     */
    divider: "divider"
  }
};
/**
 * 字符串类型 ‘0’/'1'
 */

var whetherString = {
  no: "0",
  yes: "1"
};
/**
 * 字符串类型 0/1
 */

var whetherNumber = {
  no: 0,
  yes: 1
};
/**
 * 文本类型不限【-10000】
 */

var unlimitedWithStringFlag = {
  key: "-10000",
  name: "不限",
  flag: "-10000"
};
/**
 * 数字类型不限【-10000】
 */

var unlimitedWithNumberFlag = {
  key: -10000,
  name: "不限",
  flag: -10000
};
/**
 * 日志类型
 */

var logLevel = {
  /**
   * 调试
   */
  debug: "debug",

  /**
   * 警告
   */
  warn: "warn",

  /**
   * 错误
   */
  error: "error"
};
var logShowMode = {
  /**
   * 未知
   */
  unknown: "unknown",

  /**
   * 文本
   */
  text: "text",

  /**
   * 对象
   */
  object: "object"
};
var dataTypeCollection = {
  /**
   * 未知类型
   */
  unknown: {
    flag: 0,
    name: "未知类型"
  },

  /**
   * Json单体
   */
  jsonObject: {
    flag: 100,
    name: "Json单体"
  },

  /**
   * Json列表
   */
  jsonObjectList: {
    flag: 200,
    name: "Json列表"
  },

  /**
   * 一般值
   */
  commonValue: {
    flag: 300,
    name: "一般值"
  },

  /**
   * Html
   */
  html: {
    flag: 400,
    name: "Html"
  }
};
var notificationTypeCollection = {
  success: "success",
  error: "error",
  info: "info",
  warning: "warning",
  warn: "warn",
  open: "open"
};
var messageTypeCollection = {
  success: "success",
  error: "error",
  info: "info",
  warning: "warning",
  warn: "warn",
  loading: "loading",
  open: "open"
};
var tabBarCollection = {
  /**
   * 扩展区构建模式
   */
  extraBuildType: extraBuildType
};
/**
 *设备模拟集合
 */

var mobileTypeCollection = {
  /**
   * 模拟轮廓
   */
  roughSketch: {
    label: "模拟轮廓",
    name: "roughSketch",
    helper: ""
  },

  /**
   * Iphone X
   */
  iphoneX: {
    label: "Iphone X",
    name: "iphoneX",
    helper: ""
  },

  /**
   * Iphone 8 Plus
   */
  iphone8plus: {
    label: "Iphone 8 Plus",
    name: "iphone8plus",
    helper: ""
  },

  /**
   * Iphone 8
   */
  iphone8: {
    label: "Iphone 8",
    name: "iphone8",
    helper: ""
  },

  /**
   * IPhone 5S
   */
  iPhone5S: {
    label: "IPhone 5S",
    name: "iPhone5S",
    helper: ""
  },

  /**
   * Galaxy Note 8
   */
  galaxyNote8: {
    label: "GalaxyNote8",
    name: "galaxyNote8",
    helper: ""
  }
};
/**
 * 占位函数
 *
 * @export
 * @returns
 */

function empty() {
  return {};
}

export { accessWaySpecialCollection, animalType, apiSuccessCode, appInitDefault, authenticationFailCode, cardConfig, columnFacadeMode, columnPlaceholder, contentConfig, convertCollection, dataTypeCollection, datetimeFormat, defaultEmptyImage, defaultUserAvatar, drawerConfig, empty, emptyDatetime, emptyLogo, extraBuildType, formNameCollection, formatCollection, imageContentPreviewMode, listViewConfig, locationModeCollection, logLevel, logShowMode, menuType, messageTypeCollection, mobileTypeCollection, notificationTypeCollection, pageHeaderRenderType, requestMethod, searchCardConfig, selectModeCollection, sortOperate, tabBarCollection, unlimitedWithNumberFlag, unlimitedWithStringFlag, whetherNumber, whetherString, zeroInt, zeroString };
