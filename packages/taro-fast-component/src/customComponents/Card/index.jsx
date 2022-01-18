import classNames from 'classnames';
import { View, ScrollView } from '@tarojs/components';

import { inCollection } from 'taro-fast-common/es/utils/tools';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import FlexBox from '../FlexBox';
import VerticalBox from '../VerticalBox';

import './index.less';

const classPrefix = `tfc-card`;

const modeCollection = ['through', 'card'];

const defaultProps = {
  mode: 'through',
  style: {},
  header: null,
  headerStyle: {},
  bodyStyle: {},
  footer: null,
  footerStyle: {},
  space: true,
  extra: null,
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

class Card extends ComponentBase {
  renderFurther() {
    const {
      style,
      header,
      headerStyle,
      bodyStyle,
      footer,
      footerStyle,
      extra,
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

    return (
      <View
        className={classNames(classPrefix, `${classPrefix}-${mode}`)}
        style={style}
      >
        {header ? (
          <FlexBox
            left={
              <View className={`${classPrefix}-header`} style={headerStyle}>
                {header}
              </View>
            }
            right={extra ? <VerticalBox>{extra}</VerticalBox> : null}
            rightStyle={extra ? { padding: '0 20rpx 0 0' } : null}
          />
        ) : null}

        <View
          className={classNames(`${classPrefix}-body`, {
            [`${classPrefix}-body-space`]: !!space,
          })}
          style={bodyStyle}
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
            style={footerStyle}
          >
            {footer}
          </View>
        ) : null}
      </View>
    );
  }
}

Card.defaultProps = {
  ...defaultProps,
};

export default Card;
