import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  findIndex,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import { isArray } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import Item from './item';

import './index.less';

const classPrefix = `tfc-tabbar`;

const defaultProps = {
  hidden: false,
  style: {},
  // 当前匹配项的name
  value: null,
  // 是否为iPhoneX留出底部安全距离
  safeAreaInsetBottom: true,
  // 是否显示上方边框
  border: true,
  // 元素层级z-index
  zIndex: 12000,
  // 选中标签的颜色
  activeColor: 'red',
  // 未选中标签的颜色
  inactiveColor: '',
  // 是否固定在底部
  fixed: false,
  // fixed定位固定在底部时，是否生成一个等高元素防止塌陷
  placeholder: true,
  backgroundColor: '#fff',
  borderColor: '#dadbde',
  badgeColor: '',
  items: [],
  badges: [],
};

function mergeItems(items, badges, props) {
  const itemList = isArray(items) ? items : [];

  return itemList.map((o) => {
    const { name } = o;

    if (!stringIsNullOrWhiteSpace(o)) {
      const badgeIndex = findIndex(badges, (one) => one.name === name);

      if (badgeIndex >= 0) {
        return { ...props, ...o, ...badges[badgeIndex] };
      }
    }

    return { ...props, ...o };
  });
}

class Tag extends BaseComponent {
  constructor(props) {
    super(props);

    const { activeColor, inactiveColor, badgeColor, items, badges } = props;

    this.state = {
      ...this.state,
      ...{
        placeholderHeight: 50,
        itemsAdjust: mergeItems(items, badges, {
          activeColor,
          inactiveColor,
          badgeColor,
        }),
      },
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { activeColor, inactiveColor, badgeColor, items, badges } = nextProps;

    return {
      itemsAdjust: mergeItems(items, badges, {
        activeColor,
        inactiveColor,
        badgeColor,
      }),
    };
  }

  handleTouchMove = (e) => {
    this.ignoreTouchMove(e);
  };

  renderFurther() {
    const {
      style: styleSource,
      value,
      safeAreaInsetBottom,
      hidden,
      border,
      zIndex,
      fixed,
      placeholder,
      backgroundColor,
      borderColor,
    } = this.props;
    const { placeholderHeight, itemsAdjust } = this.state;

    if (hidden) {
      return null;
    }

    const style = {
      ...{
        '--border-color': borderColor,
        '--bar-background-color': backgroundColor,
      },

      ...(zIndex > 0 ? { '--z-index': `${zIndex}` } : {}),
      ...styleSource,
    };

    return (
      <View className={classNames(classPrefix)} style={style}>
        <View
          className={classNames(`${classPrefix}__content`, {
            [`${classPrefix}--fixed`]: fixed,
            [`${classPrefix}--border`]: border,
            [`${classPrefix}--safe-area`]: safeAreaInsetBottom,
          })}
          catchMove
          onTouchMove={this.handleTouchMove}
        >
          <View className={classNames(`${classPrefix}__content__item-wrapper`)}>
            {(isArray(itemsAdjust) ? itemsAdjust : []).map((item, index) => {
              const {
                name,
                activeIcon,
                inactiveIcon,
                badgeContent,
                badgeColor,
                dot,
                text,
                color,
                activeColor,
                inactiveColor,
              } = { ...Tag.defaultProps, ...item };

              return (
                <Item
                  key={`tabbar_${index}`}
                  active={value === name}
                  activeIcon={activeIcon}
                  inactiveIcon={inactiveIcon}
                  badgeContent={badgeContent}
                  badgeColor={badgeColor}
                  dot={dot}
                  text={text}
                  color={color}
                  activeColor={activeColor}
                  inactiveColor={inactiveColor}
                />
              );
            })}
          </View>
        </View>

        {placeholder ? (
          <View
            className={classNames(`${classPrefix}__placeholder`)}
            style={{
              height: `${placeholderHeight}px`,
            }}
          />
        ) : null}
      </View>
    );
  }
}

Tag.defaultProps = {
  ...defaultProps,
};

export default Tag;
