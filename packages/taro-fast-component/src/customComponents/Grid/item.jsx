import { View } from '@tarojs/components';

import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

const classPrefix = `tfc-grid`;

const defaultProps = {
  /**
   * 跨度
   */
  span: 1,
  /**
   * 点击事件
   */
  onClick: 0,
};

class Item extends ComponentBase {
  triggerClick = (e) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(e);
    }
  };

  renderFurther() {
    const { span } = this.props;

    const itemStyle = {
      '--item-span': `${span}`,
    };

    return (
      <View
        className={`${classPrefix}-item`}
        style={itemStyle}
        onClick={this.triggerClick}
      >
        {this.props.children}
      </View>
    );
  }
}

Item.defaultProps = {
  ...defaultProps,
};

export default Item;
