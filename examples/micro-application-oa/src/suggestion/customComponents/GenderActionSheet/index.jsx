import {
  ActionSheetWrapperBase,
  switchControlAssist,
} from 'taro-fast-framework';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'a68e161086fe4950b5e279d1cf14497a';

class GenderActionSheet extends ActionSheetWrapperBase {
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

  buildTitle = () => '选择性别';
}

export { GenderActionSheet };
