import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../../BaseComponent';

const classPrefix = `tfc-swiper`;

const defaultProps = {
  className: '',
  style: {},
  data: null,
  direction: '',
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
    const { key, className, style, data } = this.props;

    if (data == null) {
      return null;
    }

    const { hidden } = { ...{ hidden: false }, ...data };

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
        className={classNames(`${classPrefix}__item`, className)}
        style={style}
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
