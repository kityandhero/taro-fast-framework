import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../../BaseComponent';

const classPrefix = `tfc-swiper`;

const defaultProps = {
  style: {},
  data: null,
  direction: '',
  itemBuilder: null,
};

class SwiperItem extends BaseComponent {
  buildItem = (data) => {
    const { itemBuilder } = this.props;

    if (isFunction(itemBuilder)) {
      return itemBuilder(data);
    }

    return null;
  };

  renderFurther() {
    const { key, style: itemStyle, data } = this.props;

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

    const item = this.buildItem(data);

    if (item == null) {
      return null;
    }

    return (
      <View
        key={key}
        className={classNames(`${classPrefix}__item`)}
        style={{ ...itemStyle, ...styleCustom }}
      >
        {item}
      </View>
    );
  }
}

SwiperItem.defaultProps = {
  ...defaultProps,
};

export default SwiperItem;
