import {
  ActionSheetConfirmWrapperBase,
  switchControlAssist,
} from 'taro-fast-framework';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'e3377238a879463d973f41356ba512b5';

class SubmitConfirm extends ActionSheetConfirmWrapperBase {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  static close() {
    switchControlAssist.close(visibleFlag);
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
