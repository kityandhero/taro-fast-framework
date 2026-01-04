import {
  ActionSheetWrapperBase,
  switchControlAssist,
} from 'taro-fast-framework';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '97f69ca22a6c44179c32af8e55168565';

class SignOutActionSheet extends ActionSheetWrapperBase {
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

  buildTitle = () => '即将退出登陆';
}

export { SignOutActionSheet };
