import Taro from '@tarojs/taro';
import classNames from 'classnames';
import { ScrollView, View } from '@tarojs/components';

import {
  inCollection,
  getGuid,
  mergeStyle,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import './index.less';

import Badge from '../Badge';
import ColorText from '../ColorText';

const ENV = Taro.getEnv();
const MIN_DISTANCE = 100;
const MAX_INTERVAL = 10;

const directionCollection = ['horizontal', 'vertical'];

const defaultProps = {
  style: '',
  className: '',
  /**
   * Tab 方向，请跟 AtTabPane 保持一致
   * @default 'horizontal'
   */
  direction: 'horizontal',
  /**
   * Tab 高度，当 tabDirection='vertical' 时，需要设置；
   * 当 tabDirection='horizontal' 时，会自动根据内容撑开，请勿设置
   */
  height: '',
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

    this.state = {
      currentFlag: 0,
      currentStage: 0,
      scrollFlag: false,
      scrollLeft: 0,
      scrollTop: 0,
      scrollIntoView: '',
    };

    this.tabId = getGuid();

    this.touchDot = 0;

    this.timer = null;

    this.interval = 0;

    this.isMoving = false;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { current: currentNext, scroll: scrollNext } = nextProps;
    const { currentFlag: currentPrev, scrollFlag: scrollPrev } = prevState;

    if (currentNext !== currentPrev || scrollNext !== scrollPrev) {
      return {
        currentFlag: currentNext,
        currentStage: currentNext,
        scrollFlag: scrollNext,
      };
    }

    return {};
  }

  componentDidMount() {
    this.getTabHeaderRef();
    this.updateScroll(this.props.current);
  }

  componentWillUnmount() {
    this.tabHeaderRef = null;
  }

  // eslint-disable-next-line no-unused-vars
  doWorkWhenGetSnapshotBeforeUpdate = (preProps, preState) => {
    this.getTabHeaderRef();

    this.updateScroll(this.props.current);

    return null;
  };

  getDirection = () => {
    const { direction: directionSource } = this.props;

    const direction = inCollection(directionCollection, directionSource)
      ? directionSource
      : 'horizontal';

    return direction;
  };

  updateScroll = (idx) => {
    if (this.props.scroll) {
      // 标签栏滚动
      switch (ENV) {
        case Taro.ENV_TYPE.WEAPP:
          this.setState({
            scrollIntoView: `tab${this.tabId}${Math.max(idx - 1, 0)}`,
          });

          break;

        case Taro.ENV_TYPE.ALIPAY:
          break;

        case Taro.ENV_TYPE.SWAN:
          this.setState({
            scrollIntoView: `tab${this.tabId}${Math.max(idx - 1, 0)}`,
          });

          break;

        case Taro.ENV_TYPE.WEB:
          const indexWEB = Math.max(idx - 1, 0);
          const prevTabItem = this.tabHeaderRef.childNodes[indexWEB];
          prevTabItem &&
            this.setState({
              scrollTop: prevTabItem.offsetTop,
              scrollLeft: prevTabItem.offsetLeft,
            });

          break;

        default:
          console.warn('Tab 组件在该环境还未适配');

          break;
      }
    }
  };

  handleClick = (index, event) => {
    const { onClick } = this.props;

    this.setState({
      currentStage: index,
    });

    if (isFunction(onClick)) {
      onClick(index, event);
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

  buildTabItemList = () => {
    const { height, tabList, scroll } = this.props;
    const { currentStage, scrollLeft, scrollTop, scrollIntoView } = this.state;

    const direction = this.getDirection();
    const heightStyle = { height };
    const scrollX = direction === 'horizontal';
    const scrollY = direction === 'vertical';

    const tabItems = (tabList || []).map((item, idx) => {
      const itemCls = classNames({
        'tfc-tabs__item': true,
        'tfc-tabs__item--active': currentStage === idx,
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
          icon={iconItem}
          iconContainerStyle={{
            paddingRight: transformSize(10),
          }}
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
          id={`tab${this.tabId}${idx}`}
          key={`tfc-tabs-item-${idx}`}
          style={styleItem || {}}
          onClick={(e) => {
            this.handleClick(idx, e);
          }}
        >
          {titleComponent}

          <View className="tfc-tabs__item-underline"></View>
        </View>
      );
    });

    return scroll ? (
      <ScrollView
        id={this.tabId}
        className="tfc-tabs__header"
        style={heightStyle}
        scrollX={scrollX}
        scrollY={scrollY}
        scrollWithAnimation
        enhanced
        showScrollbar={false}
        scrollLeft={scrollLeft}
        scrollTop={scrollTop}
        scrollIntoView={scrollIntoView}
      >
        {tabItems}
      </ScrollView>
    ) : (
      <View id={this.tabId} className="tfc-tabs__header">
        {tabItems}
      </View>
    );
  };

  renderFurther() {
    const { style, className, height, animated, tabList, scroll } = this.props;
    const { currentStage } = this.state;

    const direction = this.getDirection();

    const heightStyle = { height };
    const underlineStyle = {
      height: direction === 'vertical' ? `${tabList.length * 100}%` : '1PX',
      width: direction === 'horizontal' ? `${tabList.length * 100}%` : '1PX',
    };

    let transformStyle = `translate3d(0px, -${currentStage * 100}%, 0px)`;
    if (direction === 'horizontal') {
      transformStyle = `translate3d(-${currentStage * 100}%, 0px, 0px)`;
    }

    const bodyStyle = {
      transform: transformStyle,
      '-webkit-transform': transformStyle,
    };

    if (!animated) {
      bodyStyle.transition = 'unset';
    }

    const rootCls = classNames(
      {
        'tfc-tabs': true,
        'tfc-tabs--scroll': scroll,
        [`tfc-tabs--${direction}`]: true,
        [`tfc-tabs--${ENV}`]: true,
      },
      className,
    );

    const tabItemList = this.buildTabItemList();

    return (
      <View className={rootCls} style={mergeStyle(heightStyle, style)}>
        {tabItemList}

        <View
          className="tfc-tabs__body"
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
          catchMove
          onTouchMove={this.handleTouchMove}
          style={mergeStyle(bodyStyle, heightStyle)}
        >
          <View className="tfc-tabs__underline" style={underlineStyle}></View>
          {this.props.children}
        </View>
      </View>
    );
  }
}

Tabs.defaultProps = {
  ...defaultProps,
};

export default Tabs;
