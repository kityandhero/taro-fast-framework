/**
 * 格式化时间
 *
 * @export
 * @param {*} v
 * @returns
 */
export function isInvalid(v: any): boolean;
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
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isMoney(v: any): boolean;
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
export function isFunction(value: any): boolean;
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
export function isArray(value: any): boolean;
export function isObject(o: any): boolean;
/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function emptyExport(): {};
