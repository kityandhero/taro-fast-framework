import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isArray, isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../../BaseComponent';

const classPrefix = `tfc-swiper`;

const defaultProps = {
  className: '',
  style: {},
  list: [],
  direction: '',
};

class SwiperIndicator extends BaseComponent {
  buildIndicator = (item, index) => {
    const { indicator, indicatorBuilder } = this.props;

    const active = index === indicator;

    if (isFunction(indicatorBuilder)) {
      return indicatorBuilder(item, index, active, this.keyPrefix);
    }

    return (
      <View
        key={`swiper_indicator_${this.keyPrefix}_${index}`}
        className={
          (classNames(`${classPrefix}__indicator__item`),
          {
            [`${classPrefix}__indicator__item--active`]: active,
          })
        }
      />
    );
  };

  renderFurther() {
    const { className, style, direction, list } = this.props;

    const listData = isArray(list) ? list : [];
    const listCount = listData.length;

    return (
      <View
        className={classNames(
          {
            [`${classPrefix}__indicator`]: listCount > 0,
            [`${classPrefix}__indicator--vertical`]:
              listCount > 0 && direction === 'vertical',
          },
          className,
        )}
        style={style}
      >
        {listData.map((o, index) => {
          return this.buildIndicator(o, index);
        })}
      </View>
    );
  }
}

SwiperIndicator.defaultProps = {
  ...defaultProps,
};

export default SwiperIndicator;
