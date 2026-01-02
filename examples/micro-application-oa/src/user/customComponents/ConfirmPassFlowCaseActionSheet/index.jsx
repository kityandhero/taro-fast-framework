import {
  ActionSheetConfirmWrapperBase,
  switchControlAssist,
} from 'taro-fast-framework';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '60a351cfdc87442a886fd8125825aaa2';

class ConfirmPassFlowCaseActionSheet extends ActionSheetConfirmWrapperBase {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  /**
   * 构造函数
   * @param {Object} properties 属性值集合。
   */
  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
    };
  }

  buildTitle = () => '即将同意审批，确定吗？';
}

export { ConfirmPassFlowCaseActionSheet };
