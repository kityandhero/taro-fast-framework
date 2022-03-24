import classNames from 'classnames';
import { View, ScrollView } from '@tarojs/components';

import {
  handleInlayColor,
  inCollection,
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { isString } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import FlexBox from '../FlexBox';
import VerticalBox from '../VerticalBox';
import Ellipsis from '../Ellipsis';

import './index.less';

const classPrefix = `tfc-card`;

const modeCollection = ['through', 'card'];

const defaultProps = {
  mode: 'through',
  shadow: true,
  shadowColor: 'grey',
  border: true,
  cardBorderRadiusMode: true,
  cardBorderRadiusSize: 16,
  style: {},
  header: null,
  headerStyle: {},
  headerEllipsis: true,
  bodyBorder: true,
  bodyStyle: {},
  footer: null,
  footerBorder: true,
  footerStyle: {},
  space: true,
  strip: false,
  stripLeft: 0,
  stripWidth: 8,
  stripHeight: 36,
  stripBorderRadius: 6,
  stripColor: '#ccc',
  extra: null,
  extraStyle: {},
  /**
   * 是否使用滚动视图
   * @default true
   */
  scroll: false,
  /**
   * 是否垂直滚动
   * @default true
   */
  scrollY: true,
  /**
   * 是否水平滚动
   * @default false
   */
  scrollX: false,
  /**
   * 设置竖向滚动条位置
   */
  scrollTop: null,
  /**
   * 设置横向滚动条位置
   */
  scrollLeft: null,
  /**
   * 距顶部/左边多远时，触发 scrolltolower 事件
   */
  upperThreshold: null,
  /**
   * 距底部/右边多远时，触发 scrolltolower 事件
   */
  lowerThreshold: null,
  /**
   * 在设置滚动条位置时使用动画过渡
   * @default false
   */
  scrollWithAnimation: false,
  /**
   * 滚动时触发的事件
   */
  onScroll: null,
  /**
   * 滚动到顶部/左边，会触发 onScrollToUpper 事件
   */
  onScrollToUpper: null,
  /**
   * 滚动到底部/右边，会触发 onScrollToLower 事件
   */
  onScrollToLower: null,
};

class Card extends BaseComponent {
  buildStyle = () => {
    const {
      style,
      strip,
      stripLeft,
      stripWidth,
      stripHeight,
      stripBorderRadius,
      stripColor,
    } = this.props;

    return {
      ...style,
      ...(strip
        ? {
            '--strip-left': transformSize(stripLeft),
            '--strip-width': transformSize(stripWidth),
            '--strip-height': transformSize(stripHeight),
            '--strip-border-radius': transformSize(stripBorderRadius),
            '--strip-color': stripColor,
          }
        : {}),
    };
  };

  renderFurther() {
    const {
      shadow,
      shadowColor,
      border,
      cardBorderRadiusMode,
      cardBorderRadiusSize,
      header,
      headerStyle,
      headerEllipsis,
      bodyBorder,
      bodyStyle,
      footer,
      footerBorder,
      footerStyle,
      strip,
      extra,
      extraStyle,
      mode: modeSource,
      space,
      children,
      scroll,
      scrollY,
      scrollX,
      scrollTop,
      scrollLeft,
      upperThreshold,
      lowerThreshold,
      scrollWithAnimation,
      onScroll,
      onScrollToUpper,
      onScrollToLower,
    } = this.props;

    const mode = inCollection(modeCollection, modeSource)
      ? modeSource
      : 'through';

    const style = this.buildStyle();

    return (
      <View
        className={classNames(classPrefix, `${classPrefix}-${mode}`)}
        style={{
          ...style,
          ...(!border ? { border: '0' } : {}),
          ...(shadow && !stringIsNullOrWhiteSpace(shadowColor)
            ? {
                boxShadow: `var(--tfc-color-shadow-size) var(--tfc-color-${handleInlayColor(
                  shadowColor,
                )}-shadow)`,
              }
            : {}),
          ...(mode === 'card'
            ? cardBorderRadiusMode
              ? {
                  '--border-radius': transformSize(cardBorderRadiusSize),
                }
              : { '--border-radius': transformSize(0) }
            : {}),
        }}
      >
        {header ? (
          <FlexBox
            left={
              <View className={`${classPrefix}-header`} style={headerStyle}>
                {headerEllipsis ? <Ellipsis> {header}</Ellipsis> : header}

                {strip ? (
                  <View className={`${classPrefix}-header__strip`} />
                ) : null}
              </View>
            }
            right={extra ? <VerticalBox>{extra}</VerticalBox> : null}
            rightStyle={
              extra
                ? {
                    ...{ padding: `0 ${transformSize(18)} 0 0` },
                    ...(isString(extra) ? { fontSize: transformSize(28) } : {}),
                    ...extraStyle,
                  }
                : null
            }
          />
        ) : null}

        <View
          className={classNames(`${classPrefix}-body`, {
            [`${classPrefix}-body-space`]: !!space,
          })}
          style={{
            ...bodyStyle,
            ...(!bodyBorder ? { border: '0' } : {}),
          }}
        >
          {scroll ? (
            <ScrollView
              scrollY={scrollY}
              scrollX={scrollX}
              scrollTop={scrollTop}
              scrollLeft={scrollLeft}
              upperThreshold={upperThreshold}
              lowerThreshold={lowerThreshold}
              scrollWithAnimation={scrollWithAnimation}
              onScroll={onScroll}
              onScrollToLower={onScrollToLower}
              onScrollToUpper={onScrollToUpper}
              className={`${classPrefix}-body-inner`}
            >
              {children}
            </ScrollView>
          ) : (
            <View className={`${classPrefix}-body-inner`}>{children}</View>
          )}
        </View>

        {footer ? (
          <View
            className={classNames(`${classPrefix}-footer`)}
            style={{
              ...footerStyle,
              ...(!footerBorder ? { border: '0' } : {}),
            }}
          >
            {footer}
          </View>
        ) : null}
      </View>
    );
  }
}

Card.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Card;
