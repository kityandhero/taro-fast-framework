/**
 * 是否使用模拟访问
 *
 * @export
 * @returns
 */
export function transferToVirtualAccess(): boolean;
/**
 * 封装模拟的错误返回
 */
export function apiVirtualFailData({ remoteResponse, code, message: messageText, needAuthorize, }: {
    remoteResponse: any;
    code: any;
    message: any;
    needAuthorize?: boolean | undefined;
}): any;
/**
 * 封装模拟的正确返回
 */
export function apiVirtualSuccessData({ remoteResponse, needAuthorize, }: {
    remoteResponse: any;
    needAuthorize?: boolean | undefined;
}): any;
/**
 * 封装正确的虚拟访问
 */
export function apiVirtualSuccessAccess({ remoteResponse, needAuthorize, }: {
    remoteResponse: any;
    needAuthorize?: boolean | undefined;
}): Promise<{}>;
/**
 * 封装失败的虚拟访问
 */
export function apiVirtualFailAccess({ remoteResponse, needAuthorize, }: {
    remoteResponse: any;
    needAuthorize?: boolean | undefined;
}): Promise<{}>;
/**
 * 封装模拟访问
 */
export function apiVirtualAccess({ dataBuild }: {
    dataBuild: any;
}): Promise<{}>;
/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty(): {};
