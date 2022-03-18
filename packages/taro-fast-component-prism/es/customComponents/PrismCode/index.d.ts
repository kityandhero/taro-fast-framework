export default PrismCode;
declare class PrismCode extends ComponentBase {
    constructor(props: any);
    ref: React.RefObject<any>;
    doWorkWhenDidUpdate: (preProps: any, preState: any, snapshot: any) => void;
    hightLight(): string;
    triggerClick: () => void;
    renderFurther(): JSX.Element;
}
declare namespace PrismCode {
    namespace defaultProps {
        const code: string;
        const plugins: never[];
        const language: string;
        const canCopy: boolean;
    }
}
import { ComponentBase } from "taro-fast-common/es/customComponents";
import React from "react";
