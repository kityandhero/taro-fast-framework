/**
 * getApiDataCore
 * @param {*} param0
 * @returns
 */
export function getApiDataCore({ props, modelName }: any): any;
/**
 * 处理 actionCore 的异步请求结果
 * @param {*} param0
 * @returns
 */
export function handleItem({ target, dataId, compareDataIdHandler, handler }: any): void;
/**
 * remote assess core
 */
export function actionCore({ api, params, getApiData, target, handleData, successCallback, successMessage, successMessageBuilder, showProcessing, textProcessing, }: {
    api: any;
    params: any;
    getApiData?: null | undefined;
    target: any;
    handleData: any;
    successCallback: any;
    successMessage?: string | undefined;
    successMessageBuilder?: null | undefined;
    showProcessing?: boolean | undefined;
    textProcessing?: string | undefined;
}): Promise<void>;
/**
 * confirmActionCore
 * @param {*} param0
 */
export function confirmActionCore({ title, content, okText, okType, cancelText, target, handleData, successCallback, okAction, successMessage, successMessageBuilder, showProcessing, }: any): Promise<void>;
/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty(): {};
