import classNames from 'classnames';
import { View } from '@tarojs/components';

import { transformSize, formatMoney } from 'taro-fast-common/es/utils/tools';
import { isMoney } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import './index.less';

const classPrefix = `tfc-price`;

const defaultProps = {
  price: 0,
  bodyStyle: {},
  itemStyle: {},
  prefix: '',
  prefixStyle: {},
  integerPartStyle: {},
  pointStyle: {},
  decimalPartStyle: {},
  strikethrough: false,
};

class Price extends BaseComponent {
  renderFurther() {
    const {
      price,
      prefix,
      bodyStyle: bodyStyleSource,
      itemStyle: itemStyleSource,
      prefixStyle,
      integerPartStyle,
      pointStyle,
      decimalPartStyle,
      strikethrough,
    } = this.props;

    if (!isMoney(price)) {
      return '';
    }

    const money = formatMoney({
      data: price || 0,
      places: 2,
      symbol: '',
      thousand: '',
      decimal: '',
    });

    const list = money.split('.');

    const integer = list[0];
    const decimal = list[1];

    const bodyStyle = {
      ...bodyStyleSource,
      ...{
        display: 'inline-block',
      },
    };

    const itemStyle = {
      ...{
        fontSize: transformSize(28),
      },
      ...itemStyleSource,
      ...{
        verticalAlign: 'bottom',
      },
    };

    return (
      <View className={classNames(classPrefix)} style={bodyStyle}>
        <View
          className={classNames({
            [`${classPrefix}__strikethrough`]: strikethrough,
          })}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            lineHeight: 1,
          }}
        >
          <View style={{ ...itemStyle, ...(prefixStyle || {}) }}>{prefix}</View>
          <View style={{ ...itemStyle, ...(integerPartStyle || {}) }}>
            {integer}
          </View>
          <View style={{ ...itemStyle, ...(pointStyle || {}) }}>.</View>
          <View style={{ ...itemStyle, ...(decimalPartStyle || {}) }}>
            {decimal}
          </View>
        </View>
      </View>
    );
  }
}

Price.defaultProps = {
  ...defaultProps,
};

export default Price;
