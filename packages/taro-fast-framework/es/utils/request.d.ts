export class Request {
    /**
     *
     * @static request请求 基于 Taro.request
     * @param {Options} opts
     */
    static request(opts: Options): Promise<any>;
    /**
     *
     * @static 开始Post请求
     * @returns
     * @memberof PostJson
     */
    static PostJson(url: any, data: any, header?: {}): Promise<any> | undefined;
}
export default Request;
