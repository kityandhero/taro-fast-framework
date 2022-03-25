import Taro from '@tarojs/taro';
import classNames from 'classnames';
import { ScrollView, View } from '@tarojs/components';

import {
  inCollection,
  getGuid,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { isArray, isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';
import TabPanel from './panel';

import './index.less';

import Badge from '../Badge';
import ColorText from '../ColorText';
import HorizontalScrollBox from '../HorizontalScrollBox';

const ENV = Taro.getEnv();
const MIN_DISTANCE = 100;
const MAX_INTERVAL = 10;

const classPrefix = `tfc-tabs`;

const directionCollection = ['horizontal', 'vertical'];

const defaultProps = {
  className: '',
  titleStyle: {},
  titleActiveStyle: {},
  headerBackgroundColor: '#fff',
  underlineHeight: 2,
  underlineHorizontalMargin: 0,
  underlineColor: '#f0f0f0',
  underlineActiveColor: '#6190e8',
  showPanel: false,
  panelStyle: {},
  panelClassName: '',
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
  verticalHeight: 100,
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
  tabId = '';

  /**
   * 触摸时的原点
   */
  touchDot = 0;

  /**
   * 定时器
   */
  timer = null;

  /**
   * 滑动时间间隔
   */
  interval = 0;

  /**
   * 是否已经在滑动
   */
  isMoving = false;

  tabHeaderRef = null;

  constructor(props) {
    super(props);

    this.tabId = getGuid();

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

    this.interval = 0;

    this.isMoving = false;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { current: currentNext } = nextProps;
    const { currentFlag: currentPrev } = prevState;

    if (currentNext !== currentPrev) {
      return {
        ...{
          currentFlag: currentNext,
          currentStage: currentNext,
        },
      };
    }

    return {};
  }

  doWorkAfterDidMount = () => {
    this.getTabHeaderRef();
  };

  doWorkBeforeUnmount = () => {
    this.tabHeaderRef = null;
  };

  // eslint-disable-next-line no-unused-vars
  doWorkWhenGetSnapshotBeforeUpdate = (preProps, preState) => {
    this.getTabHeaderRef();

    return null;
  };

  getDirection = () => {
    const { direction: directionSource } = this.props;

    const direction = inCollection(directionCollection, directionSource)
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

  getTabHeaderRef = () => {
    if (ENV === Taro.ENV_TYPE.WEB) {
      this.tabHeaderRef = document.getElementById(this.tabId);
    }
  };

  buildTabItem = ({
    item,
    index,
    currentIndex,
    titleStyle,
    titleActiveStyle,
  }) => {
    const itemCls = classNames({
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
        className={itemCls}
        key={`${this.keyPrefix}-item-${index}`}
        style={{
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

        <View className={classNames(`${classPrefix}__item-underline`)}></View>
      </View>
    );
  };

  buildTabItemList = ({
    tabList,
    currentIndex,
    titleStyle,
    titleActiveStyle,
  }) => {
    return tabList.map((item, index) => {
      return this.buildTabItem({
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
      verticalHeight,
      tabList,
      scroll,
    } = this.props;
    const { currentStage } = this.state;

    const direction = this.getDirection();
    const tabHeightStyle =
      direction === 'horizontal'
        ? {
            height: transformSize(
              horizontalTabHeight < defaultProps.horizontalTabHeight
                ? defaultProps.horizontalTabHeight
                : horizontalTabHeight,
            ),
          }
        : {
            height: transformSize(verticalHeight),
          };
    // const scrollX = direction === 'horizontal';
    // const scrollY = direction === 'vertical';

    // const tabItems = (tabList || []).map((item, idx) => {});

    if (direction === 'horizontal') {
      return scroll ? (
        <HorizontalScrollBox
          current={currentStage}
          leftScrollOffset={1}
          height={transformSize(
            horizontalTabHeight < defaultProps.horizontalTabHeight
              ? defaultProps.horizontalTabHeight
              : horizontalTabHeight,
          )}
          gap={0}
          list={tabList}
          itemBuilder={(item, index) => {
            return this.buildTabItem({
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
          id={this.tabId}
          className={classNames(`${classPrefix}__header`)}
          style={{
            ...{
              width: '100%',
              height: transformSize(
                horizontalTabHeight < defaultProps.horizontalTabHeight
                  ? defaultProps.horizontalTabHeight
                  : horizontalTabHeight,
              ),
              whiteSpace: 'nowrap',
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center',
              justifyItems: 'center',
              justifyContent: 'center',
            },
          }}
        >
          {this.buildTabItemList({
            tabList,
            currentIndex: currentStage,
            titleStyle,
            titleActiveStyle,
          })}
        </View>
      );
    }

    return scroll ? (
      <ScrollView
        id={this.tabId}
        className={classNames(`${classPrefix}__header`)}
        style={tabHeightStyle}
        // scrollX={scrollX}
        // scrollY={scrollY}
        scrollWithAnimation
        enhanced
        showScrollbar={false}
        enableFlex
      >
        <View className={classNames(`${classPrefix}__header__inner`)}>
          {this.buildTabItemList({
            tabList,
            currentIndex: currentStage,
            titleStyle,
            titleActiveStyle,
          })}
        </View>
      </ScrollView>
    ) : (
      <View
        id={this.tabId}
        className={classNames(`${classPrefix}__header`)}
        style={tabHeightStyle}
      >
        {this.buildTabItemList({
          tabList,
          currentIndex: currentStage,
          titleStyle,
          titleActiveStyle,
        })}
      </View>
    );
  };

  buildPanelList = () => {
    const {
      verticalHeight,
      animated,
      showPanel,
      tabList,
      panelStyle,
      panelClassName,
    } = this.props;
    const { currentStage } = this.state;

    if (!showPanel) {
      return null;
    }

    const tabListAdjust = isArray(tabList) ? tabList : [];

    if (tabListAdjust.length === 0) {
      return null;
    }

    const direction = this.getDirection();

    const verticalHeightStyle =
      direction === 'vertical'
        ? {
            height: transformSize(verticalHeight),
          }
        : {};

    const underlineStyle = {
      height:
        direction === 'vertical'
          ? `${tabListAdjust.length * 100}%`
          : transformSize(1),
      width:
        direction === 'horizontal'
          ? `${tabListAdjust.length * 100}%`
          : transformSize(1),
    };

    let transformStyle = `translate3d(0px, -${currentStage * 100}%, 0px)`;
    if (direction === 'horizontal') {
      transformStyle = `translate3d(-${currentStage * 100}%, 0px, 0px)`;
    }

    const bodyStyle = {
      ...{
        transform: transformStyle,
        '-webkit-transform': transformStyle,
      },
      ...verticalHeightStyle,
    };

    if (!animated) {
      bodyStyle.transition = 'unset';
    }

    return (
      <View
        className={classNames(`${classPrefix}__body`)}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        catchMove
        onTouchMove={this.handleTouchMove}
        style={bodyStyle}
      >
        <View
          className={classNames(`${classPrefix}__underline`)}
          style={underlineStyle}
        ></View>

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
              style={panelStyle}
              className={panelClassName}
              direction={direction}
            >
              {body || null}
            </TabPanel>
          );
        })}
      </View>
    );
  };

  renderFurther() {
    const {
      // className,
      headerBackgroundColor,
      underlineHeight,
      underlineHorizontalMargin,
      underlineColor,
      underlineActiveColor,
      verticalHeight,
      // scroll,
    } = this.props;

    const direction = this.getDirection();

    const containerStyle = {
      ...(direction === 'vertical'
        ? {
            height: transformSize(verticalHeight),
          }
        : {}),
      ...(underlineHorizontalMargin > 0
        ? {
            '--underline-width': `calc(100% - ${transformSize(
              underlineHorizontalMargin,
            )} * 2)`,
            '--underline-horizontal-margin': transformSize(
              underlineHorizontalMargin,
            ),
          }
        : {
            '--underline-width': '100%',
            '--underline-horizontal-margin': '0',
          }),
      ...{
        '--underline-height': transformSize(underlineHeight),
        '--underline-color': underlineColor,
        '--underline-active-color': underlineActiveColor,
        '--header-background-color': headerBackgroundColor,
      },
    };

    // const containerClassName = classNames(
    //   classPrefix,
    //   {
    //     [`${classPrefix}--scroll`]: scroll,
    //     [`${classPrefix}--${direction}`]: true,
    //     [`${classPrefix}--${ENV}`]: true,
    //   },
    //   className,
    // );

    const tabHeader = this.buildTabHeader();

    return (
      <View style={containerStyle}>
        {tabHeader}

        {this.buildPanelList()}
      </View>
    );
  }
}

Tabs.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Tabs;
