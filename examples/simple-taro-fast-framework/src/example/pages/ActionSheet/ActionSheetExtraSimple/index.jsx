import { ActionSheetBase, switchControlAssist } from 'taro-fast-framework';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '8a9dcfa4493f44249c4eb2c1a524014e';

class ActionSheetExtraSimple extends ActionSheetBase {
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

  buildTitle = () => '这里是ActionSheetExtra标题';
}

export { ActionSheetExtraSimple };
