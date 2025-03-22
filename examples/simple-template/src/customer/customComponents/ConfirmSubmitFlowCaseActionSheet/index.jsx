import {
  ActionSheetConfirmWrapperBase,
  switchControlAssist,
} from 'taro-fast-framework';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '3235affd41f84a118e552f32ef746350';

class ConfirmSubmitFlowCaseActionSheet extends ActionSheetConfirmWrapperBase {
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

  buildTitle = () => '即将提交审批，确定吗？';
}

export { ConfirmSubmitFlowCaseActionSheet };
