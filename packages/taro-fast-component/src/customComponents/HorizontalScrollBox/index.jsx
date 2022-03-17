import { View, ScrollView } from '@tarojs/components';

import {
  showErrorMessage,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import {
  isArray,
  isFunction,
  isNumber,
} from 'taro-fast-common/es/utils/typeCheck';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';

import BaseComponent from '../BaseComponent';

const defaultProps = {
  style: {},
  gap: 0,
  list: [],
  itemBuilder: null,
};

class HorizontalScrollBox extends BaseComponent {
  getStyle = () => {
    const { style } = this.props;

    return style || {};
  };

  buildItem = (item, index) => {
    const { itemBuilder } = this.props;

    let itemComponent = null;

    if (isFunction(itemBuilder)) {
      itemComponent = itemBuilder(item, index);
    } else {
      const text = 'itemBuilder must be a render function';

      showErrorMessage({
        message: text,
      });
    }

    const { style: itemStyle } = {
      ...{
        width: 'auto',
      },
      ...item,
    };

    return (
      <View
        key={`${this.keyPrefix}_${index}`}
        style={{
          ...{
            height: '100%',
          },
          ...itemStyle,
          ...{
            width: `0 0 auto`,
          },
        }}
      >
        {itemComponent}
      </View>
    );
  };

  renderFurther() {
    const { gap, list } = this.props;

    const style = this.getStyle();

    const flexStyle = {
      ...{
        display: 'flex',
        flexWrap: 'nowrap',
        height: '100%',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
      },
      ...(isNumber(gap) && toNumber(gap) > 0
        ? {
            gap: transformSize(gap),
          }
        : {}),
    };

    const listData = isArray(list) ? list : [];

    return (
      <View style={style}>
        <ScrollView
          style={{
            width: '100%',
            height: '100%',
            whiteSpace: 'nowrap',
          }}
          scrollX
          scrollY={false}
          scrollWithAnimation
          scrollAnchoring
          enhanced
          bounces
          showScrollbar={false}
          enableFlex
        >
          <View style={flexStyle}>
            {listData.map((item, index) => {
              return this.buildItem(item, index);
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

HorizontalScrollBox.defaultProps = {
  ...defaultProps,
};

export default HorizontalScrollBox;
