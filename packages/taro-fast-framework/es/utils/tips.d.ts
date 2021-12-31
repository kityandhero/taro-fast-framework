/**
 * 提示与加载工具类
 */
export default class Tips {
    static isLoading: boolean;
    /**
     * 信息提示
     */
    static toast(title: any, duration?: number, closeCallback?: null): void;
    /**
     * 弹出加载提示
     */
    static loading(title?: string, force?: boolean): void;
    /**
     * 加载完毕
     */
    static loaded(): Promise<any>;
    /**
     * 弹出成功提示框
     */
    static success(title: any, duration?: number, closeCallback?: null): void;
    /**
     * 弹出警告提示框
     */
    static info(title: any, duration?: number, closeCallback?: null): void;
}
