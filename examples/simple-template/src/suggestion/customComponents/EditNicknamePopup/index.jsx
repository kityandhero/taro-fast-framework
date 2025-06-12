import { PopupWrapperBase, switchControlAssist } from 'taro-fast-framework';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'be8673c0290844d3b42ed5903cd34268';

class EditNicknamePopup extends PopupWrapperBase {
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
}

export { EditNicknamePopup };
