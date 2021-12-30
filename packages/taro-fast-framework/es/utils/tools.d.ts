export function getAppInitConfigData(): {
    platformName: string;
    appName: string;
    appDescription: string;
    loginLogo: string;
    shareLogo: string;
    shareLogoName: string;
    leftBarText: string;
    companyName: string;
    copyright: string;
    apiPrefix: {
        corsTargetProduction: string;
    };
    showSelectLanguage: boolean;
    showLogoInLoginView: boolean;
    emptyLogo: string;
    leftBarLogo: string;
    apiSuccessCode: number;
    authenticationFailCode: number;
    loginPath: string;
    showLogInConsole: boolean;
    showRequestInfo: boolean;
    useVirtualRequest: boolean;
    showUseVirtualRequestMessage: boolean;
    apiVersion: string;
    imageUploadMaxSize: number;
    audioUploadMaxSize: number;
    videoUploadMaxSize: number;
    fileUploadMaxSize: number;
    useNprogress: boolean;
    tinymceApiKey: string;
    tinymceImagesUploadUrl: string;
};
export function defaultBaseState(): {
    dataLoading: boolean;
    processing: boolean;
    reloading: boolean;
    searching: boolean;
    refreshing: boolean;
    paging: boolean;
    firstLoadSuccess: boolean;
    loadSuccess: boolean;
    urlParams: null;
    externalData: null;
};
export function defaultCoreState(): {
    dataLoading: boolean;
    processing: boolean;
    reloading: boolean;
    searching: boolean;
    refreshing: boolean;
    paging: boolean;
    firstLoadSuccess: boolean;
    loadSuccess: boolean;
    urlParams: null;
    externalData: null;
};
export function defaultCommonState(): {
    loadApiPath: string;
    pageName: string;
    metaData: null;
    metaExtra: null;
    metaListData: never[];
    metaOriginalData: null;
    dataLoading: boolean;
    processing: boolean;
    reloading: boolean;
    searching: boolean;
    refreshing: boolean;
    paging: boolean;
    firstLoadSuccess: boolean;
    loadSuccess: boolean;
    urlParams: null;
    externalData: null;
};
export function defaultListState(): {
    dateRangeFieldName: string;
    tableScroll: {
        x: number;
    };
    formValues: {};
    pageNo: number;
    pageSize: number;
    startTimeAlias: string;
    endTimeAlias: string;
    startTime: string;
    endTime: string;
    showSelect: boolean;
    selectedDataTableDataRows: never[];
    loadApiPath: string;
    pageName: string;
    metaData: null;
    metaExtra: null;
    metaListData: never[];
    metaOriginalData: null;
    dataLoading: boolean;
    processing: boolean;
    reloading: boolean;
    searching: boolean;
    refreshing: boolean;
    paging: boolean;
    firstLoadSuccess: boolean;
    loadSuccess: boolean;
    urlParams: null;
    externalData: null;
};
export function defaultPageListState(): {
    paramsKey: string;
    loadApiPath: string;
    dateRangeFieldName: string;
    tableScroll: {
        x: number;
    };
    formValues: {};
    pageNo: number;
    pageSize: number;
    startTime: string;
    endTime: string;
    showSelect: boolean;
    selectedDataTableDataRows: never[];
    pageName: string;
    metaData: null;
    metaExtra: null;
    metaListData: never[];
    metaOriginalData: null;
    dataLoading: boolean;
    processing: boolean;
    reloading: boolean;
    searching: boolean;
    refreshing: boolean;
    paging: boolean;
    firstLoadSuccess: boolean;
    loadSuccess: boolean;
    urlParams: null;
    externalData: null;
};
export function defaultFormState(): {
    errorFieldName: string;
    submitApiPath: string;
    loadApiPath: string;
    pageName: string;
    metaData: null;
    metaExtra: null;
    metaListData: never[];
    metaOriginalData: null;
    dataLoading: boolean;
    processing: boolean;
    reloading: boolean;
    searching: boolean;
    refreshing: boolean;
    paging: boolean;
    firstLoadSuccess: boolean;
    loadSuccess: boolean;
    urlParams: null;
    externalData: null;
};
export function getValue(obj: any): string;
/**
 * 复制到剪贴板
 * @param {*} text
 * @param {*} showText
 */
export function copyToClipboard({ text, successCallback }: any): void;
/**
 *替换指定字符串
 *
 * @export
 * @param {*} text
 * @param {*} replaceText
 * @param {*} beforeKeepNumber
 * @param {*} afterKeepNumber
 * @returns
 */
export function replaceTargetText(text: any, replaceText: any, beforeKeepNumber: any, afterKeepNumber: any): string;
export function checkDevelopment(): boolean;
/**
 * corsTarget
 * 跨域域名配置
 * @export
 * @param {*} v
 * @returns
 */
export function corsTarget(): string;
export function showError(text: any): void;
export function showRuntimeError({ message: messageText, showStack }: {
    message: any;
    showStack?: boolean | undefined;
}): void;
export function showSuccessMessage({ duration, message: messageText, onClose, }: {
    duration?: number | undefined;
    message: any;
    onClose?: (() => void) | undefined;
}): void;
export function showErrorMessage({ duration, message: messageText, onClose, }: {
    duration?: number | undefined;
    message: any;
    onClose?: (() => void) | undefined;
}): void;
export function showWarnMessage({ duration, message: messageText, onClose, }: {
    duration?: number | undefined;
    message: any;
    onClose?: (() => void) | undefined;
}): void;
/**
 * 显示警告信息框
 */
export function showWarningMessage({ duration, message: messageText, onClose, }: {
    duration?: number | undefined;
    message: any;
    onClose?: (() => void) | undefined;
}): void;
/**
 * 显示消息信息
 */
export function showInfoMessage({ duration, message: messageText, onClose, }: {
    duration?: number | undefined;
    message: any;
    onClose?: (() => void) | undefined;
}): void;
export function showLoadingMessage({ duration, message: messageText, onClose, }: {
    duration?: number | undefined;
    message: any;
    onClose?: (() => void) | undefined;
}): void;
export function showOpenMessage({ duration, message: messageText, onClose, }: {
    duration?: number | undefined;
    message: any;
    onClose?: (() => void) | undefined;
}): void;
export function showMessage({ type, duration, message: messageText, onClose, }: {
    type: any;
    duration?: number | undefined;
    message: any;
    onClose?: (() => void) | undefined;
}): void;
/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordLog(record: any, showMode: any, level?: string): void;
/**
 * 记录错误信息
 */
export function recordError(record: any): void;
/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordText(record: any, level?: string): void;
/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordObject(record: any, level?: string): void;
/**
 * 获取Guid
 *
 * @export
 * @param {*} v
 * @returns
 */
export function getGuid(): string;
/**
 * 检测目标是否在数组址之中
 */
export function inCollection(collection: any, value: any): boolean;
/**
 * 格式化时间
 *
 * @export
 * @param {*} v
 * @returns
 */
export function isInvalid(v: any): boolean;
export function toDatetime(v: any): any;
/**
 * 判断是否是时间字符串
 *
 * @export
 * @param {*} v
 * @returns
 */
export function isDatetime(v: any): boolean;
/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isNumber(v: any): boolean;
/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */
export function toNumber(v: any): number;
/**
 * 去除重复数据并排序（升序）
 */
export function sortedUnique(array: any): any[];
/**
 *
 *@param  val 值 len保留小数位数
 *
 */
export function roundToTarget(v: any, len: any): number;
/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isMoney(v: any): boolean;
/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */
export function toMoney(v: any): number;
/**
 * 通过 key 获取对应得值
 */
export function getValueByKey({ data, key, defaultValue, convert, convertBuilder, format, formatBuilder, }: {
    data: any;
    key: any;
    defaultValue?: null | undefined;
    convert?: null | undefined;
    convertBuilder?: null | undefined;
    format?: null | undefined;
    formatBuilder?: null | undefined;
}): any;
/**
 * convertTarget
 * @param {*} param0
 * @returns
 */
export function convertTarget({ target, convert }: any): any;
export function formatDatetime({ data: date, fmt }: {
    data: any;
    fmt: any;
}): any;
export function formatTarget({ target, format, option }: {
    target: any;
    format: any;
    option?: {} | undefined;
}): any;
/**
 * 通过 path 获取对应得值
 */
export function getPathValue(o: any, path: any, defaultValue?: null): any;
/**
 * 格式化货币
 *
 * @export
 * @param {*} str
 * @returns
 */
export function formatDecimal(numberSource: any, placesSource?: number, thousandSource?: string, decimalSource?: string): string;
/**
 * 格式化货币
 *
 * @export
 * @param {*} str
 * @returns
 */
export function formatMoney({ number: numberSource, places: placesSource, symbol: symbolSource, thousand: thousandSource, decimal: decimalSource, }: any): string;
export function toPercentage(val: any): string;
/**
 * 检查字符串string是否以给定的target字符串结尾
 */
export function endsWith(source: any, target: any, position: any): boolean;
/**
 * 如果字符串末尾匹配目标字符串，则从源字符串末尾移除匹配项
 */
export function removeEndMatch(source: any, target: any): any;
/**
 * 从源字符串移除最后一个匹配项
 */
export function removeLastMatch(source: any, target: any): any;
/**
 * 转换金额为人民币大写
 *
 * @export
 * @param {*} target 转换的目标
 * @returns
 */
export function formatMoneyToChinese({ target }: any): string;
export function seededRandom({ seed, min, max }: {
    seed: any;
    min: any;
    max: any;
}): any;
/**
 * 通过种子等配置返回随机颜色值
 *
 * @export
 * @param {*} seed
 * @returns
 */
export function getRandomColor({ seed, hue, luminosity, count, format, alpha, }: any): string;
/**
 * 获取浏览器信息
 *
 * @export
 * @returns
 */
export function getBrowserInfo(): {
    versions: {
        trident: boolean;
        presto: boolean;
        webKit: boolean;
        gecko: boolean;
        mobile: boolean;
        ios: boolean;
        android: boolean;
        iPhone: boolean;
        iPad: boolean;
        webApp: boolean;
    };
    language: any;
};
/**
 * 封装表单项配置
 *
 * @export
 * @param {*} v
 * @param {*} justice
 * @param {*} defaultValue
 * @param {*} originalOption
 * @param {*} convertCallback
 */
export function refitFieldDecoratorOption(v: any, justice: any, defaultValue: any, originalOption: any, convertCallback: any): any;
/**
 * 封装公共数据
 *
 * @export 数据集合
 * @param {*} listData 源数据集合
 * @param {*} empty 要添加的首个数据
 * @param {*} otherListData 要添加的其他数据集合
 * @returns 封装后的数据集合
 */
export function refitCommonData(listData: any, empty: any, otherListData: any): any[];
/**
 * 计算表达式的值
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function evil(fn: any): any;
/**
 * 搜索集合中的匹配项
 *
 * @export
 * @param {*} itemKey
 * @param {*} itemValue
 * @param {*} sourceData
 * @returns
 */
export function searchFromList(itemKey: any, itemValue: any, sourceData: any): null;
/**
 * 构建描述文本
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */
export function buildFieldDescription(v: any, op: any, other: any): string;
/**
 * 获取SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getStringFromSessionStorage(key: any): any;
/**
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getStringFromLocalStorage(key: any): any;
/**
 * 获取SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getJsonFromSessionStorage(key: any): any;
/**
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getJsonFromLocalStorage(key: any): any;
/**
 * 存储SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveStringToSessionStorage(key: any, value: any): void;
/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveStringToLocalStorage(key: any, value: any): void;
/**
 * 存储SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveJsonToSessionStorage(key: any, json: any): void;
/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveJsonToLocalStorage(key: any, json: any): void;
/**
 * 移除SessionStorage数据
 * @export
 * @param {*} key
 */
export function removeSessionStorage(key: any): void;
/**
 * 移除LocalStorage数据
 * @export
 * @param {*} key
 */
export function removeLocalStorage(key: any): void;
/**
 * 清空SessionStorage数据
 * @export
 * @param {*} key
 */
export function clearSessionStorage(): void;
/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */
export function clearLocalStorage(): void;
/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state，
 * @export
 */
export function getDerivedStateFromPropsForUrlParamsCore(nextProps: any): {
    urlParams: any;
} | null;
/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,如果值重复，则返回null，
 * @export
 */
export function getDerivedStateFromPropsForUrlParams(nextProps: any, prevState: any, defaultUrlParams?: {
    id: string;
}, parseUrlParamsForSetState?: null): any;
/**
 * 获取本地数据
 * @export
 * @param {value} 对比源
 * @param {other} 对比对象
 * 执行深比较来确定两者的值是否相等。
 * 这个方法支持比较 arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, 以及 typed arrays. Object 对象值比较自身的属性，不包括继承的和可枚举的属性。 不支持函数和DOM节点比较。
 */
export function isEqual(value: any, other: any): boolean;
export function isEqualBySerialize(value: any, other: any): boolean;
export function cloneWithoutMethod(value: any): any;
export function isFunction(value: any): boolean;
export function isArray(value: any): boolean;
export function isObject(o: any): boolean;
export function difference(array: any, values: any): any[];
/**
 * 筛选需要的集合
 * @param {collection} 可筛选的对象，例如数组
 * @param {predicateFunction} 每次迭代调用的筛选函数
 */
export function filter(collection: any, predicateFunction: any): string[];
/**
 * 创建一个元素数组。 以 iteratee 处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。 iteratees 调用1个参数： (value)。
 * @param {collection}  (Array|Object), 用来迭代的集合。
 * @param {predicateFunction} 这个函数决定排序
 */
export function sortBy(collection: any, predicateFunction: any): any[];
/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index），而不是元素本身。
 * @param {array} (Array): 要搜索的数组。
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */
export function findIndex(array: any, predicateFunction: any, fromIndex?: number): number;
/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index），而不是元素本身,返回匹配元素，否则返回 undefined。。
 * @param {array} (Array): 要搜索的数组。
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */
export function find(array: any, predicateFunction: any, fromIndex?: number): any;
export function checkExist(array: any, predicateFunction: any, fromIndex?: number): boolean;
export function reverse(array: any): any;
export function trim(source: any): string;
export function replace(source: any, pattern: any, replacement: any): string;
export function toString(value: any): string;
export function isBoolean(value: any): boolean;
/**
 * check value is undefined
 */
export function isUndefined(value: any): boolean;
/**
 * check value is null
 */
export function isNull(value: any): boolean;
/**
 * check value is date
 */
export function isDate(value: any): boolean;
/**
 * check value is string
 */
export function isString(value: any): boolean;
/**
 * 移除数组中predicate（断言）返回为真值的所有元素，并返回移除元素组成的数组。predicate（断言） 会传入3个参数： (value, index, array)。
 * @param {*} array
 * @param {*} predicate (Array|Function|Object|string): 每次迭代调用的函数
 */
export function removeFromArray(array: any, predicate: any): any[];
export function stringIsNullOrWhiteSpace(value: any): boolean;
/**
 * base64解码
 */
export function decodeBase64(target: any): any;
/**
 * base64编码
 */
export function encodeBase64(target: any): string;
export function fixedZero(val: any): any;
/**
 * 构建描述文本
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */
export function buildFieldHelper(v: any, prefix?: string): string;
export function checkLocalhost(): boolean;
export function getNearestLocalhostNotifyCache(): any;
export function setNearestLocalhostNotifyCache(): void;
export function removeNearestLocalhostNotifyCache(): void;
/**
 * 尝试发送最近一次本地调用通知（一般用于开发阶段，提示调用的接口域）
 */
export function trySendNearestLocalhostNotify({ text }: {
    text: any;
}): void;
/**
 * 文本缩略
 */
export function ellipsis(value: any, length: any): string;
export function notifySuccess(text: any): void;
/**
 * 发送页面通知
 */
export function notify({ type, message: messageValue, closeCallback, }: {
    type?: string | undefined;
    message: any;
    closeCallback?: null | undefined;
}): void;
export function checkFromConfig({ label, name, helper }: {
    label: any;
    name: any;
    helper: any;
}): {
    label: string;
    name: string;
    helper: string;
};
/**
 * 依照某个键的值进行排序，请确保键的值为数字型
 */
export function sortCollectionByKey({ operate, item, list, sortKey, sortMin, }: {
    operate: any;
    item: any;
    list: any;
    sortKey: any;
    sortMin?: number | undefined;
}): any;
export function queryStringify(data: any): any;
export function queryStringParse(data: any): any;
/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function emptyExport(): {};
export const requestAnimFrame: (((callback: FrameRequestCallback) => number) & typeof requestAnimationFrame) | (() => void);
