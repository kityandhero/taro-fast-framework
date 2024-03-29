import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isFunction } from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';
import { classPrefix } from '../tools';

const defaultProps = {
  style: {},
  list: [],
  direction: '',
  indicator: 0,
  indicatorBuilder: null,
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
        className={classNames(`${classPrefix}__indicator__item`, {
          [`${classPrefix}__indicator__item--active`]: active,
        })}
      />
    );
  };

  renderFurther() {
    const { style, direction, list } = this.props;

    const listCount = list.length;

    return (
      <View
        className={classNames({
          [`${classPrefix}__indicator`]: listCount > 0,
          [`${classPrefix}__indicator--vertical`]:
            listCount > 0 && direction === 'vertical',
        })}
        style={style}
      >
        {list.map((o, index) => {
          return this.buildIndicator(o, index);
        })}
      </View>
    );
  }
}

SwiperIndicator.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { SwiperIndicator };
