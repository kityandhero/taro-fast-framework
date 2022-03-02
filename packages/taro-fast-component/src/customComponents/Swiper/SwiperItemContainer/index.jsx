import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../../BaseComponent';

import { classPrefix } from '../tools';

const defaultProps = {
  style: {},
  styleAnimation: {},
  indicator: 0,
  circular: false,
  data: null,
  direction: '',
  transform: 'slide',
  itemBuilder: null,
};

class SwiperItemContainer extends BaseComponent {
  buildItem = (data, index) => {
    const { itemBuilder } = this.props;

    if (isFunction(itemBuilder)) {
      return itemBuilder(data, index);
    }

    return null;
  };

  renderFurther() {
    const {
      key,
      id,
      itemIndex,
      transform,
      style: itemStyle,
      styleAnimation,
      data,
    } = this.props;

    if (data == null) {
      return null;
    }

    const { hidden, style: styleCustom } = {
      ...{
        hidden: false,
        style: {},
      },
      ...data,
    };

    if (hidden) {
      return null;
    }

    const item = this.buildItem(data, itemIndex);

    if (item == null) {
      return null;
    }

    return (
      <View
        key={key}
        id={id || null}
        className={classNames(`${classPrefix}__item-container`, {
          [`${classPrefix}__item-container--translate`]: transform === 'slide',
        })}
        style={{
          ...itemStyle,
          ...styleCustom,
          ...styleAnimation,
        }}
      >
        {item}
      </View>
    );
  }
}

SwiperItemContainer.defaultProps = {
  ...defaultProps,
};

export default SwiperItemContainer;
