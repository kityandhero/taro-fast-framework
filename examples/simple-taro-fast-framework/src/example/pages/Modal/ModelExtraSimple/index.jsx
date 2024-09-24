import { ModalBase, switchControlAssist } from 'taro-fast-framework';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '5bae0c0e743f4ed48ab305d3d1b0466d';

class ModelExtraSimple extends ModalBase {
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

  buildTitle = () => '这里是ModelExtra标题';

  buildContent = () => {
    return '这里是ModelExtra内容区域';
  };
}

export { ModelExtraSimple };
