import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  findIndex,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import { isArray, isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import TabbarItem from './tabbarItem';

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
  color: '',
  // 是否固定在底部
  fixed: false,
  // fixed定位固定在底部时，是否生成一个等高元素防止塌陷
  placeholder: true,
  backgroundColor: '#fff',
  borderColor: '#dadbde',
  badgeColor: '',
  items: [],
  badges: [],
  onClick: null,
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

class Tabbar extends BaseComponent {
  constructor(props) {
    super(props);

    const { activeColor, color, badgeColor, items, badges } = props;

    this.state = {
      ...this.state,
      ...{
        placeholderHeight: 50,
        itemsAdjust: mergeItems(items, badges, {
          activeColor,
          color,
          badgeColor,
        }),
      },
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { activeColor, color, badgeColor, items, badges } = nextProps;

    return {
      itemsAdjust: mergeItems(items, badges, {
        activeColor,
        color,
        badgeColor,
      }),
    };
  }

  handleTouchMove = (e) => {
    this.ignoreTouchMove(e);
  };

  triggerClick = (o) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(o);
    }
  };

  renderFurther() {
    const {
      style: styleSource,
      value,
      safeAreaInsetBottom,
      border,
      zIndex,
      fixed,
      placeholder,
      backgroundColor,
      borderColor,
    } = this.props;
    const { placeholderHeight, itemsAdjust } = this.state;

    const style = {
      ...{
        '--border-color': borderColor,
        '--bar-background-color': backgroundColor,
      },
      ...(zIndex > 0 ? { zIndex: `${zIndex}` } : {}),
      ...styleSource,
    };

    return (
      <View
        className={classNames(classPrefix, {
          [`${classPrefix}--fixed`]: fixed,
        })}
        style={style}
      >
        <View
          className={classNames(`${classPrefix}__content`, {
            [`${classPrefix}--border`]: border,
            [`${classPrefix}--safe-area`]: fixed && safeAreaInsetBottom,
          })}
          catchMove
          onTouchMove={this.handleTouchMove}
        >
          <View className={classNames(`${classPrefix}__content__item-wrapper`)}>
            {(isArray(itemsAdjust) ? itemsAdjust : []).map((item, index) => {
              const itemAdjust = { ...TabbarItem.defaultProps, ...item };

              const {
                name,
                icon,
                activeIcon,
                image,
                activeImage,
                badgeContent,
                badgeColor,
                dot,
                text,
                color,
                activeColor,
                hidden,
              } = itemAdjust;

              return (
                <TabbarItem
                  key={`tabbar_${index}`}
                  active={value === name}
                  icon={icon}
                  activeIcon={activeIcon}
                  image={image}
                  activeImage={activeImage}
                  badgeContent={badgeContent}
                  badgeColor={badgeColor}
                  dot={dot}
                  text={text}
                  color={color}
                  activeColor={activeColor}
                  hidden={hidden}
                  onClick={() => {
                    this.triggerClick(itemAdjust);
                  }}
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

Tabbar.defaultProps = {
  ...defaultProps,
};

export default Tabbar;
