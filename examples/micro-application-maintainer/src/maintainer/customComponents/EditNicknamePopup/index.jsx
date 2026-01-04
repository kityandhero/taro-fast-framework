import { PopupWrapperBase, switchControlAssist } from 'taro-fast-framework';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '5b87e70518b145808ad5736c410e19ae';

class EditNicknamePopup extends PopupWrapperBase {
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
}

export { EditNicknamePopup };
