import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  handleTouchScroll,
  inCollection,
  showRuntimeError,
} from 'taro-fast-common/es/utils/tools';
import { isFunction, isNumber } from 'taro-fast-common/es/utils/typeCheck';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import Overlay from '../Overlay';
import Card from '../Card';
import Icon from '../Icon';
import CenterBox from '../CenterBox';

import './index.less';

const { IconCloseCircle } = Icon;

const positionCollection = ['bottom', 'top', 'left', 'right', 'center'];

const defaultProps = {
  /**
   * 控制是否出现在页面上
   * @default false
   */
  visible: false,
  /**
   * 元素的标题
   */
  mode: 'through',
  space: true,
  border: true,
  header: '',
  extra: null,
  bodyBorder: true,
  footer: null,
  footerBorder: true,
  footerStyle: {},
  showClose: false,
  arcTop: false,
  arcBottom: false,
  arcSize: 24,
  maxHeight: 828,
  minHeight: 40,
  maxWidth: '85%',
  minWidth: '20%',
  bodyStyle: {},
  closeWhenOverlayClick: true,
  closeIcon: <IconCloseCircle size={18} color="#ccc" />,
  closeIconStyle: {},
  position: 'bottom',
  /**
   * 元素被关闭时候触发的事件
   */
  onClose: null,
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

class Popup extends ComponentBase {
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

      return {
        visibleStage: visibleNext,
      };
    }

    return {};
  }

  getMinHeight = () => {
    const { minHeight } = this.props;

    if (isNumber(minHeight)) {
      const n = toNumber(minHeight);

      return n <= 0 ? defaultProps.minHeight : n;
    }

    return {};
  };

  getMaxHeight = () => {
    const { maxHeight } = this.props;

    if (isNumber(maxHeight)) {
      const n = toNumber(maxHeight);

      const minHeight = this.getMinHeight();

      return n <= 0 ? defaultProps.maxHeight : n <= minHeight ? minHeight : n;
    }

    return {};
  };

  getArcSize = () => {
    const { arcSize } = this.props;

    if (isNumber(arcSize)) {
      const n = toNumber(arcSize);

      return n <= 0 ? defaultProps.arcSize : n;
    }

    return {};
  };

  getPosition = () => {
    const { position } = this.props;

    return inCollection(positionCollection, position)
      ? position
      : defaultProps.position;
  };

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
    e.preventDefault();
  };

  getHeight = () => {
    const minHeight = this.getMinHeight();
    const maxHeight = this.getMaxHeight();

    return {
      minHeight: `${minHeight}px`,
      maxHeight: `${maxHeight}px`,
    };
  };

  getWidth = () => {
    const { minWidth, maxWidth } = this.props;

    return {
      minWidth,
      maxWidth,
    };
  };

  getBodyStyle = () => {
    const { bodyStyle } = this.props;

    const height = this.getHeight();
    const width = this.getWidth();
    const position = this.getPosition();

    return {
      ...(bodyStyle || {}),
      ...(inCollection(['center', 'top', 'bottom'], position) ? height : {}),
      ...(inCollection(['left', 'right'], position) ? width : {}),
    };
  };

  getArcStyle = () => {
    const { arcTop, arcBottom } = this.props;

    const as = this.getArcSize();

    return {
      ...(arcTop
        ? {
            borderTopLeftRadius: `${as}px`,
            borderTopRightRadius: `${as}px`,
          }
        : {}),
      ...(arcBottom
        ? {
            borderBottomLeftRadius: `${as}px`,
            borderBottomRightRadius: `${as}px`,
          }
        : {}),
    };
  };

  getMode = () => {
    const { mode } = this.props;

    const position = this.getPosition();

    return position === 'center' ? 'card' : mode;
  };

  getCloseWhenOverlayClick = () => {
    const { closeWhenOverlayClick } = this.props;

    const position = this.getPosition();

    return position === 'center' ? false : closeWhenOverlayClick;
  };

  getShowClose = () => {
    const { showClose, closeIcon } = this.props;

    const position = this.getPosition();

    if (position === 'center' && (closeIcon || null) == null) {
      showRuntimeError({
        message: 'closeIcon not all when position is center ',
      });
    }

    return position === 'center' ? true : showClose;
  };

  render() {
    const { visibleStage } = this.state;
    const {
      space,
      border,
      extra,
      header,
      headerStyle,
      bodyBorder,
      footer,
      footerBorder,
      footerStyle,
      closeIcon,
      closeIconStyle,
      scroll,
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

    const showClose = this.getShowClose();
    const closeWhenOverlayClick = this.getCloseWhenOverlayClick();
    const mode = this.getMode();
    const bodyStyle = this.getBodyStyle();
    const arcStyle = this.getArcStyle();
    const height = this.getHeight();
    const position = this.getPosition();

    const panel = (
      <View
        className={classNames('tfc-popup__container', {
          ['tfc-popup__container__center']: position === 'center',
          ['tfc-popup__container__top']: position === 'top',
          ['tfc-popup__container__bottom']: position === 'bottom',
          ['tfc-popup__container__left']: position === 'left',
          ['tfc-popup__container__right']: position === 'right',
          ['tfc-popup__container__absolute']: inCollection(
            ['left', 'right', 'top', 'bottom'],
            position,
          ),
        })}
        style={bodyStyle}
      >
        <View
          className="tfc-popup__container__body"
          style={{
            ...(inCollection(['center', 'top', 'bottom'], position)
              ? height
              : {}),
            ...(inCollection(['center'], position) ? { width: '100vw' } : {}),
          }}
        >
          {showClose && closeIcon ? (
            <View
              className="tfc-popup__container__body__close"
              style={{
                ...closeIconStyle,
                ...{
                  top:
                    mode !== 'card' ? 'var(--tfc-px-12)' : 'var(--tfc-px-32)',
                  right:
                    mode !== 'card' ? 'var(--tfc-px-12)' : 'var(--tfc-px-32)',
                  height: 'var(--tfc-px-40)',
                  width: 'var(--tfc-px-40)',
                  position: 'absolute',
                },
              }}
              onClick={this.close}
            >
              <CenterBox>{closeIcon}</CenterBox>
            </View>
          ) : null}
          <Card
            mode={mode}
            border={!!border}
            bodyBorder={!!bodyBorder}
            footerBorder={!!footerBorder}
            space={!!space}
            header={header}
            headerStyle={{
              ...headerStyle,
              ...{
                paddingTop: 'var(--tfc-px-10)',
                paddingBottom: 'var(--tfc-px-10)',
              },
            }}
            extra={extra}
            footer={footer}
            footerStyle={footerStyle}
            scroll={scroll}
            scrollY={scrollY}
            scrollX={scrollX}
            scrollTop={scrollTop}
            scrollLeft={scrollLeft}
            upperThreshold={upperThreshold}
            lowerThreshold={lowerThreshold}
            scrollWithAnimation={scrollWithAnimation}
            onScroll={onScroll}
            onScrollToUpper={onScrollToUpper}
            onScrollToLower={onScrollToLower}
            style={{
              ...(inCollection(['center', 'top', 'bottom'], position)
                ? height
                : {}),
              ...(inCollection(['left', 'right'], position)
                ? {
                    height:
                      mode !== 'card'
                        ? '100%'
                        : 'calc(100% - var(--tfc-px-48))',
                  }
                : {}),
              ...arcStyle,
            }}
          >
            {children}
          </Card>
        </View>
      </View>
    );

    return (
      <View className={rootClass} catchMove onTouchMove={this.handleTouchMove}>
        <Overlay
          visible={visibleStage}
          zIndex={0}
          lockScroll
          onClick={() => {
            if (closeWhenOverlayClick) {
              this.close();
            }
          }}
        >
          {inCollection(['center'], position) ? panel : null}
        </Overlay>

        {inCollection(['left', 'right', 'top', 'bottom'], position)
          ? panel
          : null}
      </View>
    );
  }
}

Popup.defaultProps = {
  ...defaultProps,
};

export default Popup;
