import {
  ActionSheetConfirmWrapperBase,
  switchControlAssist,
} from 'taro-fast-framework';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '34737fc0d24c42628ecf515785cfe7d4';

class SubmitConfirm extends ActionSheetConfirmWrapperBase {
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

  buildTitle = () => '即将提交信息，确定吗？';
}

export { SubmitConfirm };
