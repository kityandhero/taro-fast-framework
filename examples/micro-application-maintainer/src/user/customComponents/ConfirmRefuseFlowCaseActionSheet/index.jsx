import {
  ActionSheetConfirmWrapperBase,
  switchControlAssist,
} from 'taro-fast-framework';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '0f832c221e81440b8781ef58fc6d48be';

class ConfirmRefuseFlowCaseActionSheet extends ActionSheetConfirmWrapperBase {
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

  buildTitle = () => '即将拒绝审批，确定吗？';
}

export { ConfirmRefuseFlowCaseActionSheet };
