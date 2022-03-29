import { View } from '@tarojs/components';

import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

const classPrefix = `tfc-grid`;

const defaultProps = {
  /**
   * 跨度
   */
  span: 1,
  /**
   * 点击事件
   */
  onClick: null,
};

class Item extends BaseComponent {
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
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Item;
