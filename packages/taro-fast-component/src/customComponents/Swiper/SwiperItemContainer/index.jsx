import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../../BaseComponent';

import { classPrefix, checkTransform } from '../tools';

const defaultProps = {
  style: {},
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

  getStyleTranslate = () => {
    const {
      sliderIndex,
      sliderCount,
      circular,
      transformDistance,
      //  indicator
    } = this.props;

    if (!circular) {
      return {};
    }

    const sliderHalfCount = Math.floor(sliderCount / 2);

    const multiple =
      sliderIndex < sliderHalfCount
        ? sliderIndex
        : -1 * (sliderCount - sliderIndex);

    console.log({
      multiple,
      transformDistance,
    });

    return {
      transform: `translateX(${multiple * transformDistance}px)`,
    };
  };

  renderFurther() {
    const {
      key,
      id,
      sliderIndex,
      transform: transformSource,
      style: itemStyle,
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

    const item = this.buildItem(data, sliderIndex);

    if (item == null) {
      return null;
    }

    const transform = checkTransform(transformSource);

    const styleTranslate = this.getStyleTranslate();

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
          ...styleTranslate,
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
