import { ModalWrapperBase, switchControlAssist } from 'taro-fast-framework';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '04dc9e358e3e4c76a8c39335d820d4cb';

class ConfirmCreateFlowCaseModal extends ModalWrapperBase {
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

  buildTitle = () => '创建审批';

  buildContent = () => {
    return '即将创建审批，确定吗？';
  };
}

export { ConfirmCreateFlowCaseModal };
