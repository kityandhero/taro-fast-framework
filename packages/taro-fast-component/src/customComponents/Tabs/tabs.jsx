import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  checkInCollection,
  getGuid,
  isArray,
  isFunction,
  logException,
} from 'easy-soft-utility';

import { getRect, transformSize } from 'taro-fast-common';

import Badge from '../Badge';
import BaseComponent from '../BaseComponent';
import ColorText from '../ColorText';
import FlexBox from '../FlexBox';
import ScrollBox from '../ScrollBox';

import TabPanel from './panel';

import './index.less';

const MIN_DISTANCE = 100;
const MAX_INTERVAL = 10;

const classPrefix = `tfc-tabs`;

const directionCollection = ['horizontal', 'vertical'];

const defaultProps = {
  style: {},
  itemStyle: {},
  itemActiveStyle: {},
  titleStyle: {},
  titleActiveStyle: {},
  headerBackgroundColor: '#fff',
  underline: true,
  underlineHorizontalPosition: 'bottom',
  underlineHorizontalHeight: 2,
  underlineHorizontalMargin: 0,
  underlineVerticalPosition: 'right',
  underlineVerticalWidth: 2,
  underlineVerticalMargin: 16,
  underlineColor: '#f0f0f0',
  underlineBorderRadius: 0,
  underlineActiveColor: '#6190e8',
  showPanel: false,
  bodyStyle: {},
  panelStyle: {},
  singlePanel: true,
  panel: null,
  /**
   * Tab 方向，请跟 AtTabPane 保持一致
   * @default 'horizontal'
   */
  direction: 'horizontal',
  /**
   * Tab 高度，当 tabDirection='vertical' 时，需要设置；
   * 当 tabDirection='horizontal' 时，会自动根据内容撑开，请勿设置
   */
  horizontalTabHeight: 82,
  horizontalMultiPanelHeight: 200,
  verticalTabWidth: 120,
  verticalScrollHeight: 100,
  /**
   * 当前选中的标签索引值，从 0 计数，开发者需要通过 onClick 事件来改变 current，从而切换 tab
   * @default 0
   */
  current: 0,
  /**
   * 是否滚动，当标签太多时，建议使用。否则会出现部分标签被隐藏
   * @default false
   */
  scroll: false,
  /**
   * 是否开启切换动画
   * @default true
   */
  animated: true,
  /**
   * 是否支持手势滑动切换内容页，当 tabDirection='vertical' 时，无论是否设置，都不支持手势滑动切换内容页
   * @default true
   */
  swipeable: true,
  /**
   * tab 列表
   */
  tabList: [],
  /**
   * 点击或滑动时触发事件
   */
  onClick: null,
};

class Tabs extends BaseComponent {
  bodyId = '';

  verticalHeaderId = '';

  /**
   * 触摸时的原点
   */
  touchDot = 0;

  /**
   * 定时器
   */
  timer = null;

  timerAdjust = null;

  /**
   * 滑动时间间隔
   */
  interval = 0;

  /**
   * 是否已经在滑动
   */
  isMoving = false;

  constructor(props) {
    super(props);

    const { current } = props;

    this.state = {
      ...this.state,
      ...{
        currentFlag: current,
        currentStage: current,
        scrollLeft: 0,
        scrollTop: 0,
      },
    };

    this.touchDot = 0;

    this.timer = null;

    this.timerAdjust = null;

    this.interval = 0;

    this.isMoving = false;

    this.bodyId = getGuid();

    this.verticalHeaderId = getGuid();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { current: currentNext } = nextProps;
    const { currentFlag: currentPrev } = prevState;

    if (currentNext !== currentPrev) {
      return {
        ...{
          currentFlag: currentNext,
          currentStage: currentNext,
          horizontalPanelWidth: 0,
          verticalMultiPanelHeight: 0,
        },
      };
    }

    return {};
  }

  doWorkAfterDidMount = () => {
    this.adjustSize();
  };

  // eslint-disable-next-line no-unused-vars
  doWorkWhenGetSnapshotBeforeUpdate = (preProps, preState) => {
    this.adjustSize();

    return null;
  };

  doWorkBeforeUnmount = () => {
    clearTimeout(this.timerAdjust);
  };

  adjustSize = () => {
    const { scroll } = this.props;

    const direction = this.getDirection();

    const that = this;

    if (direction === 'horizontal') {
      that.timerAdjust = setTimeout(() => {
        getRect(`#${that.bodyId}`)
          .then((rect) => {
            if ((rect || null) != null) {
              const { width } = rect;

              that.setState({
                horizontalPanelWidth: width,
              });
            }

            return rect;
          })
          .catch((error) => {
            logException(error);
          });
      }, 200);
    }

    if (!scroll && direction === 'vertical') {
      that.timerAdjust = setTimeout(() => {
        getRect(`#${that.verticalHeaderId}`)
          .then((rect) => {
            if ((rect || null) != null) {
              const { height } = rect;

              that.setState({
                verticalMultiPanelHeight: height,
              });
            }

            return rect;
          })
          .catch((error) => {
            logException(error);
          });
      }, 200);
    }
  };

  getDirection = () => {
    const { direction: directionSource } = this.props;

    const direction = checkInCollection(directionCollection, directionSource)
      ? directionSource
      : 'horizontal';

    return direction;
  };

  handleClick = (index, event, item) => {
    const { onClick } = this.props;

    const currentStage = index;

    const stateWillChange = {
      ...{
        currentStage,
      },
    };

    this.setState(stateWillChange);

    if (isFunction(onClick)) {
      onClick(index, event, item);
    }
  };

  handleTouchStart = (e) => {
    const { swipeable } = this.props;
    const direction = this.getDirection();

    if (!swipeable || direction === 'vertical') {
      return;
    }

    this.touchDot = e.touches[0].pageX;

    this.timer = setInterval(() => {
      this.interval++;
    }, 100);
  };

  handleTouchMove = (e) => {
    const { swipeable, tabList } = this.props;
    const { currentStage } = this.state;

    const direction = this.getDirection();

    if (!swipeable || direction === 'vertical') {
      return;
    }

    const touchMove = e.touches[0].pageX;
    const moveDistance = touchMove - this.touchDot;
    const maxIndex = tabList.length;

    if (!this.isMoving && this.interval < MAX_INTERVAL && this.touchDot > 20) {
      // 向左滑动
      if (currentStage + 1 < maxIndex && moveDistance <= -MIN_DISTANCE) {
        this.isMoving = true;
        this.handleClick(currentStage + 1, e);

        // 向右滑动
      } else if (currentStage - 1 >= 0 && moveDistance >= MIN_DISTANCE) {
        this.isMoving = true;
        this.handleClick(currentStage - 1, e);
      }
    }
  };

  handleTouchEnd = () => {
    const { swipeable } = this.props;
    const direction = this.getDirection();

    if (!swipeable || direction === 'vertical') return;

    clearInterval(this.timer);
    this.interval = 0;
    this.isMoving = false;
  };

  buildTabItem = ({
    underline,
    item,
    index,
    currentIndex,
    titleStyle,
    titleActiveStyle,
  }) => {
    const { itemStyle, itemActiveStyle } = this.props;

    const itemClassName = classNames({
      [`${classPrefix}__item`]: true,
      [`${classPrefix}__item--active`]: currentIndex === index,
    });

    const {
      title,
      style: styleItem,
      useBadge,
      badgeColor,
      badgeDotSize,
      badgeContent,
      badgeStyle,
      icon: iconItem,
      badgeFontSize,
    } = {
      ...{
        badgeDotSize: 16,
        badgeStyle: {
          marginTop: transformSize(-4),
        },
        badgeFontSize: 18,
      },
      ...item,
    };

    const direction = this.getDirection();

    const titleCoreComponent = (
      <ColorText
        textStyle={{
          ...titleStyle,
          ...(currentIndex === index ? titleActiveStyle : {}),
        }}
        icon={iconItem}
        text={title}
      />
    );

    const titleComponent = useBadge ? (
      <Badge
        content={badgeContent}
        color={badgeColor}
        dotSize={badgeDotSize}
        style={badgeStyle}
        fontSize={badgeFontSize}
        wrapHeight="100%"
        wrapCenter
      >
        {titleCoreComponent}
      </Badge>
    ) : (
      titleCoreComponent
    );

    return (
      <View
        className={itemClassName}
        key={`${this.keyPrefix}-item-${index}`}
        style={{
          ...itemStyle,
          ...(currentIndex === index ? itemActiveStyle : {}),
          ...styleItem,
          ...{
            display: 'flex',
          },
        }}
        onClick={(e) => {
          this.handleClick(index, e, item);
        }}
      >
        {titleComponent}

        {underline ? (
          <View
            className={classNames(`${classPrefix}__item-underline`, {
              [`${classPrefix}__item-underline--horizontal`]:
                direction === 'horizontal',
              [`${classPrefix}__item-underline--vertical`]:
                direction === 'vertical',
            })}
          />
        ) : null}
      </View>
    );
  };

  buildTabItemList = ({
    underline,
    tabList,
    currentIndex,
    titleStyle,
    titleActiveStyle,
  }) => {
    return tabList.map((item, index) => {
      return this.buildTabItem({
        underline,
        item,
        index,
        currentIndex,
        titleStyle,
        titleActiveStyle,
      });
    });
  };

  buildTabHeader = () => {
    const {
      titleStyle,
      titleActiveStyle,
      horizontalTabHeight,
      verticalTabWidth,
      verticalScrollHeight,
      tabList,
      scroll,
      underline,
    } = this.props;
    const { currentStage } = this.state;

    const direction = this.getDirection();

    if (direction === 'horizontal') {
      return scroll ? (
        <ScrollBox
          current={currentStage}
          leftScrollOffset={1}
          height={transformSize(
            horizontalTabHeight < defaultProps.horizontalTabHeight
              ? defaultProps.horizontalTabHeight
              : horizontalTabHeight,
          )}
          direction="horizontal"
          gap={0}
          list={tabList}
          itemBuilder={(item, index) => {
            return this.buildTabItem({
              underline,
              item,
              index,
              currentIndex: currentStage,
              titleStyle,
              titleActiveStyle,
            });
          }}
        />
      ) : (
        <View
          className={classNames(`${classPrefix}__header-horizontal`)}
          style={{
            ...{
              height: transformSize(
                horizontalTabHeight < defaultProps.horizontalTabHeight
                  ? defaultProps.horizontalTabHeight
                  : horizontalTabHeight,
              ),
            },
          }}
        >
          {this.buildTabItemList({
            underline,
            tabList,
            currentIndex: currentStage,
            titleStyle,
            titleActiveStyle,
          })}
        </View>
      );
    }

    return scroll ? (
      <ScrollBox
        current={currentStage}
        leftScrollOffset={1}
        width={transformSize(
          verticalTabWidth < defaultProps.verticalTabWidth
            ? defaultProps.verticalTabWidth
            : verticalTabWidth,
        )}
        height={verticalScrollHeight}
        direction="vertical"
        gap={0}
        list={tabList}
        itemBuilder={(item, index) => {
          return this.buildTabItem({
            underline,
            item,
            index,
            currentIndex: currentStage,
            titleStyle,
            titleActiveStyle,
          });
        }}
      />
    ) : (
      <View
        id={this.verticalHeaderId}
        className={classNames(`${classPrefix}__header-vertical`)}
        style={{
          width: transformSize(
            verticalTabWidth < defaultProps.verticalTabWidth
              ? defaultProps.verticalTabWidth
              : verticalTabWidth,
          ),
        }}
      >
        {this.buildTabItemList({
          underline,
          tabList,
          currentIndex: currentStage,
          titleStyle,
          titleActiveStyle,
        })}
      </View>
    );
  };

  buildMultiPanel = () => {
    const {
      scroll,
      verticalScrollHeight,
      animated,
      showPanel,
      tabList,
      panelStyle,
    } = this.props;
    const { currentStage, horizontalPanelWidth, verticalMultiPanelHeight } =
      this.state;

    if (!showPanel) {
      return null;
    }

    const tabListAdjust = isArray(tabList) ? tabList : [];

    if (tabListAdjust.length === 0) {
      return null;
    }

    const direction = this.getDirection();

    const verticalScrollHeightStyle =
      direction === 'vertical'
        ? {
            height: scroll
              ? transformSize(verticalScrollHeight)
              : `${verticalMultiPanelHeight}px`,
          }
        : {};

    let transformStyle = `translate3d(0px, -${currentStage * 100}%, 0px)`;
    if (direction === 'horizontal') {
      transformStyle = `translate3d(-${currentStage * 100}%, 0px, 0px)`;
    }

    const bodyInnerStyle = {
      ...{
        transform: transformStyle,
        '-webkit-transform': transformStyle,
      },
      ...verticalScrollHeightStyle,
    };

    if (!animated) {
      bodyInnerStyle.transition = 'unset';
    }

    const panelContainerAdjust = {
      ...(direction === 'vertical'
        ? {
            height: scroll
              ? transformSize(verticalScrollHeight)
              : `${verticalMultiPanelHeight}px`,
          }
        : {
            width: `${horizontalPanelWidth}px`,
          }),
    };

    return (
      <View
        className={classNames(`${classPrefix}__body`, {
          [`${classPrefix}__body-horizontal`]: direction === 'horizontal',
          [`${classPrefix}__body-vertical`]: direction === 'vertical',
        })}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        catchMove
        onTouchMove={this.handleTouchMove}
        style={bodyInnerStyle}
      >
        {tabListAdjust.map((item, index) => {
          const { body } = {
            ...{
              body: null,
            },
            ...item,
          };

          return (
            <TabPanel
              key={`${this.prefixKey}_panel_${index}`}
              index={index}
              current={currentStage}
              style={panelContainerAdjust}
              panelStyle={panelStyle}
              direction={direction}
            >
              {body || null}
            </TabPanel>
          );
        })}
      </View>
    );
  };

  buildSinglePanel = () => {
    const { panel } = this.props;

    return panel;
  };

  buildBody = () => {
    const {
      scroll,
      horizontalMultiPanelHeight,
      verticalScrollHeight,
      animated,
      showPanel,
      tabList,
      bodyStyle,
      singlePanel,
    } = this.props;
    const { currentStage, verticalMultiPanelHeight } = this.state;

    if (!showPanel) {
      return null;
    }

    const tabListAdjust = isArray(tabList) ? tabList : [];

    if (tabListAdjust.length === 0) {
      return null;
    }

    const direction = this.getDirection();

    const verticalScrollHeightStyle =
      direction === 'vertical'
        ? {
            height: scroll
              ? transformSize(verticalScrollHeight)
              : `${verticalMultiPanelHeight}px`,
          }
        : {};

    let transformStyle = `translate3d(0px, -${currentStage * 100}%, 0px)`;
    if (direction === 'horizontal') {
      transformStyle = `translate3d(-${currentStage * 100}%, 0px, 0px)`;
    }

    const bodyInnerStyle = {
      ...{
        transform: transformStyle,
        '-webkit-transform': transformStyle,
      },
      ...verticalScrollHeightStyle,
    };

    if (!animated) {
      bodyInnerStyle.transition = 'unset';
    }

    return (
      <View
        id={this.bodyId}
        style={{
          ...(bodyStyle || {}),
          ...(direction === 'horizontal'
            ? {
                ...{
                  width: '100%',
                },
                ...(singlePanel
                  ? {}
                  : { height: transformSize(horizontalMultiPanelHeight) }),
              }
            : {}),
          ...(direction === 'vertical'
            ? {
                ...{
                  width: '100%',
                },
                ...(singlePanel
                  ? {}
                  : {
                      height: scroll
                        ? transformSize(verticalScrollHeight)
                        : `${verticalMultiPanelHeight}px`,
                    }),
              }
            : {}),
          ...(singlePanel
            ? {}
            : {
                position: 'relative',
                overflow: 'hidden',
              }),
        }}
      >
        {singlePanel ? this.buildSinglePanel() : this.buildMultiPanel()}
      </View>
    );
  };

  renderFurther() {
    const {
      style,
      headerBackgroundColor,
      underlineHorizontalPosition,
      underlineHorizontalHeight,
      underlineHorizontalMargin,
      underlineVerticalWidth,
      underlineVerticalMargin,
      underlineVerticalPosition,
      underlineColor,
      underlineBorderRadius,
      underlineActiveColor,
      verticalScrollHeight,
      verticalTabWidth,
      scroll,
      singlePanel,
    } = this.props;

    const direction = this.getDirection();

    const containerStyle = {
      ...style,
      ...(direction === 'vertical'
        ? {
            ...(scroll ? { height: transformSize(verticalScrollHeight) } : {}),
            ...{
              '--underline-vertical-width': transformSize(
                underlineVerticalWidth,
              ),
              '--underline-vertical-height':
                underlineVerticalMargin > 0
                  ? `calc(100% - ${transformSize(underlineVerticalMargin)} * 2)`
                  : '100%',
              '--underline-vertical-margin':
                underlineVerticalMargin > 0
                  ? transformSize(underlineVerticalMargin)
                  : '0',
            },
            ...(underlineVerticalPosition === 'right'
              ? {
                  '--underline-right': '0',
                  '--underline-top': '0',
                }
              : {
                  '--underline-left': '0',
                  '--underline-top': '0',
                }),
          }
        : {}),
      ...(direction === 'horizontal'
        ? {
            ...{
              '--underline-horizontal-height': transformSize(
                underlineHorizontalHeight,
              ),
              '--underline-horizontal-width':
                underlineHorizontalMargin > 0
                  ? `calc(100% - ${transformSize(
                      underlineHorizontalMargin,
                    )} * 2)`
                  : '100%',
              '--underline-horizontal-margin':
                underlineHorizontalMargin > 0
                  ? transformSize(underlineHorizontalMargin)
                  : '0',
            },
            ...(underlineHorizontalPosition === 'bottom'
              ? {
                  '--underline-bottom': '0',
                  '--underline-left': '0',
                }
              : {
                  '--underline-top': '0',
                  '--underline-left': '0',
                }),
          }
        : {}),
      ...{
        '--underline-color': underlineColor,
        '--underline-border-radius': transformSize(underlineBorderRadius),
        '--underline-active-color': underlineActiveColor,
        '--header-background-color': headerBackgroundColor,
      },
    };

    const tabHeader = this.buildTabHeader();

    if (direction === 'horizontal') {
      return (
        <View style={containerStyle}>
          {tabHeader}

          {this.buildBody()}
        </View>
      );
    }

    return (
      <View style={containerStyle}>
        <FlexBox
          flexAuto="right"
          alignItems={singlePanel ? 'stretch' : 'center'}
          leftStyle={{
            width: transformSize(verticalTabWidth),
          }}
          left={tabHeader}
          right={this.buildBody()}
        />
      </View>
    );
  }
}

Tabs.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Tabs;
