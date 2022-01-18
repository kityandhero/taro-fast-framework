import classNames from 'classnames';
import { ScrollView, Text, View } from '@tarojs/components';

import { handleTouchScroll } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import Overlay from '../Overlay';

const defaultProps = {
  /**
   * 控制是否出现在页面上
   * @default false
   */
  visible: false,
  /**
   * 元素的标题
   */
  title: '',
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
   * 元素被关闭时候触发的事件
   */
  onClose: null,
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

export default class AtFloatLayout extends ComponentBase {
  constructor(props) {
    super(props);

    const { visible } = props;
    this.state = {
      visibleStage: visible,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible: visibleNext } = nextProps;
    const { visibleStage: visiblePrev } = prevState;

    if (visibleNext !== visiblePrev) {
      handleTouchScroll(visibleNext);

      this.setState({
        visibleStage: visibleNext,
      });
    }

    return {};
  }

  handleClose = () => {
    const { onClose } = this.props;

    if (isFunction(onClose)) {
      onClose();
    }
  };

  close = () => {
    this.setState(
      {
        visibleStage: false,
      },
      this.handleClose,
    );
  };

  handleTouchMove = (e) => {
    e.stopPropagation();
  };

  render() {
    const { visibleStage } = this.state;
    const {
      title,
      scrollY,
      scrollX,
      scrollTop,
      scrollLeft,
      upperThreshold,
      lowerThreshold,
      scrollWithAnimation,
      onScroll,
      onScrollToLower,
      onScrollToUpper,
      children,
    } = this.props;

    const rootClass = classNames(
      'tfc-popup',
      {
        'tfc-popup--active': visibleStage,
      },
      this.props.className,
    );

    return (
      <View className={rootClass} onTouchMove={this.handleTouchMove}>
        <Overlay visible={visibleStage} onClick={this.close} />

        <View className="tfc-popup__container layout">
          {title ? (
            <View className="layout-header">
              <Text className="layout-header__title">{title}</Text>
              <View className="layout-header__btn-close" onClick={this.close} />
            </View>
          ) : null}
          <View className="layout-body">
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
              className="layout-body__content"
            >
              {children}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

AtFloatLayout.defaultProps = {
  ...defaultProps,
};
