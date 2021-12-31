/**
 * 预处理单项数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRemoteSingleData(d: any): {};
/**
 * 预处理集合数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRemoteListData(d: any, itemHandler: any): {};
/**
 * 预处理分页数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRemotePageListData(d: any, listItemHandler: any): {};
/**
 * 预处理数据请求
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRequestParams(params: any, customHandle: any): any;
/**
 * 常规数据出库辅助方法
 * @param {*} state
 * @param {*} action
 * @param {*} callback
 * @returns
 */
export function handleCommonDataAssist(state: any, action: any, callback?: any): any;
/**
 * handleListDataAssist
 * @param {*} state
 * @param {*} action
 * @param {*} pretreatment
 * @param {*} callback
 * @returns
 */
export function handleListDataAssist(state: any, action: any, pretreatment?: any, callback?: any): any;
export function handlePageListDataAssist(state: any, action: any, pretreatment?: null, callback?: null): any;
/**
 * begin request（remote request / local virtual requests）
 * @param {*} api [string]: request address
 * @param {*} params [object]: request params
 * @param {*} method [string]: ’GET‘ or ’POST‘, default is ’POST‘
 * @param {*} useVirtualRequest [bool]: whether to apply virtual requests
 * @param {*} showUseVirtualRequestMessage [bool]: whether display virtual request message prompt
 * @param {*} virtualSuccessResponse [object]: virtual request success response data
 * @param {*} virtualFailResponse [object]: virtual request fail response data
 * @param {*} virtualRequestResult [object]:mandatory set virtual request result, generally used to debug
 * @param {*} virtualNeedAuthorize [object]:set virtual request whether check token， only check mull or empty, generally used to debug
 * @returns
 */
export function request({ api, urlParams, params, method, useVirtualRequest, showUseVirtualRequestMessage, virtualSuccessResponse, virtualFailResponse, virtualRequestResult, virtualNeedAuthorize, }: any): Promise<any>;
/**
 * 获取配置的 api 版本号
 */
export function getApiVersion(): string;
/**
 * 构建跨域请求域前缀
 */
export function corsTargetWithApiVersion(): string;
/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty(): {};
