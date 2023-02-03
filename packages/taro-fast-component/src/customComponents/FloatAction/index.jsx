import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  isFunction,
  isImageBase4,
  isString,
  isUrl,
  logException,
} from 'easy-soft-utility';

import { getRect } from 'taro-fast-common';

import { Avatar } from '../Avatar';
import { BaseComponent } from '../BaseComponent';
import { CenterBox } from '../CenterBox';
import { IconAdd, IconEdit } from '../Icon';
import { ImageBox } from '../ImageBox';
import { Overlay } from '../Overlay';

import './index.less';

const unit = 'px';

const classPrefix = `tfc-float-action`;

// 设置元素旋转属性
const setTransform = (translate = 0, scale = 1, delay = 300, isH = true) => {
  const duration = `transition-duration: ${delay}ms`;
  const transform = `transform: scale(${scale}) translate3d(${
    isH ? translate : 0
  }${unit}, ${isH ? 0 : translate}${unit}, 0)`;

  return `opacity: 1; ${duration}; ${transform}`;
};

function buildClasses(
  prefixCls,
  position,
  theme,
  direction,
  reverse,
  buttonVisible,
  hideShadow,
  actionRotate,
  buttons,
  hoverClass,
) {
  const wrap = classNames(prefixCls, {
    [`${prefixCls}--${position}`]: position,
    [`${prefixCls}--${theme}`]: theme,
    [`${prefixCls}--${direction}`]: direction,
    [`${prefixCls}--reverse`]: reverse,
    [`${prefixCls}--opened`]: buttonVisible,
  });

  const action = classNames(`${prefixCls}__action`, {
    [`${prefixCls}__action--hide-shadow`]: hideShadow,
  });

  const text = classNames(`${prefixCls}__text`, {
    [`${prefixCls}__text--rotate`]: buttonVisible && actionRotate,
  });

  const button = buttons.map((o) => {
    const w = classNames(`${prefixCls}__button`, {
      [`${prefixCls}__button--hide-shadow`]: o.hideShadow,
      [`${prefixCls}__button--disabled`]: o.disabled,
      [`${o.className}`]: o.className,
    });
    const hover =
      o.hoverClass && o.hoverClass !== 'default'
        ? o.hoverClass
        : `${prefixCls}__button--hover`;

    return {
      wrap: w,
      hover,
    };
  });

  const icon = `${prefixCls}__icon`;
  const label = `${prefixCls}__label`;
  const hover =
    hoverClass && hoverClass !== 'default'
      ? hoverClass
      : `${prefixCls}__action--hover`;

  return {
    wrap,
    action,
    text,
    button,
    icon,
    label,
    hover,
  };
}

const defaultProps = {
  left: 'var(--tfc-30)',
  right: 'var(--tfc-30)',
  top: 'var(--tfc-30)',
  bottom: 'var(--tfc-30)',
  hoverClass: 'default',
  theme: 'balanced',
  position: 'bottomRight',
  action: '',
  actionRotate: true,
  hideShadow: false,
  buttons: [],
  direction: 'horizontal',
  /**
   * 居中布局下展开按钮距离中间的距离
   */
  spaceBetween: 10,
  duration: 300,
  scale: 0.9,
  reverse: false,
  sAngle: 0,
  eAngle: 360,
  closeAfterItemClick: true,
  hidden: false,
  overlay: false,
  overlayColor: '#000',
  overlayAlpha: 0.3,
  overlayDuration: 300,
  closeWithOverlayClick: false,
};

class FloatAction extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        buttonStyle: [],
        buttonVisible: false,
      },
    };
  }

  updated = (buttonVisible) => {
    const { buttonVisible: buttonVisiblePrev } = this.state;

    if (buttonVisiblePrev !== buttonVisible) {
      this.setState({
        buttonVisible,
      });

      this.updateButtonStyle(!buttonVisible);
    }
  };

  onChange = (buttonVisible) => {
    this.updated(buttonVisible);
  };

  onToggle = () => {
    const { buttonVisible } = this.state;

    this.onChange(!buttonVisible);
  };

  // eslint-disable-next-line no-unused-vars
  onItemClick = (button, index) => {
    const { closeAfterItemClick } = this.props;

    const { onClick } = button;

    if (isFunction(onClick)) {
      onClick(button);
    }

    if (!button.disabled && closeAfterItemClick) {
      this.onChange(false);
    }
  };

  /**
   * 更新按钮组样式
   */
  updateButtonStyle = (isReset) => {
    const { buttons, duration, direction, spaceBetween, scale, reverse } =
      this.props;
    const buttonStyle = [];
    const sign = reverse ? 1 : -1;
    const isH = direction === 'horizontal';

    // 重置样式
    if (isReset) {
      buttons.forEach(() => {
        buttonStyle.push('opacity: 0; transform: translate3d(0, 0, 0)');
      });

      const { buttonStyle: buttonStylePrev } = this.state;

      if (buttonStylePrev !== buttonStyle) {
        this.setState({ buttonStyle });
      }

      return;
    }

    // 更新样式
    getRect(`.${classPrefix}__action`)
      .then((rect) => {
        switch (direction) {
          case 'horizontal':
          case 'vertical':
            buttons.forEach((_, index) => {
              const offset = `${
                sign * (rect.width + spaceBetween) * (index + 1)
              }`;
              const style = setTransform(offset, scale, duration, isH);

              buttonStyle.push(style);
            });
            break;
          case 'circle':
            const radius = rect.width + spaceBetween;
            buttons.forEach((_, index) => {
              buttonStyle.push(this.getCircleStyle(index, radius));
            });
            break;
        }

        const { buttonStyle: buttonStylePrev } = this.state;

        if (buttonStylePrev !== buttonStyle) {
          this.setState({ buttonStyle });
        }

        return rect;
      })
      .catch((error) => {
        logException(error);
      });
  };

  /**
   * 获取圆形按钮的样式
   * @param {Number} index 当前按钮索引
   * @param {Number} radius 圆的半径
   */
  getCircleStyle = (index, radius) => {
    const { sAngle, eAngle, duration, scale, buttons } = this.props;
    const { length } = buttons;
    const { max, sin, cos, PI } = Math;
    const startAngle = (sAngle * PI) / 180;
    const endAngle = (eAngle * PI) / 180;
    const points = endAngle % (2 * PI) === 0 ? length : max(1, length - 1);
    const currentAngle =
      startAngle + ((endAngle - startAngle) / points) * index;

    let x = sin(currentAngle) * radius;
    let y = cos(currentAngle) * radius;

    x = parseFloat(x.toFixed(6));
    y = parseFloat(y.toFixed(6));

    const transform = `transform: scale(${scale}) translate3d(${x}${unit}, ${y}${unit}, 0)`;

    return `opacity: 1; transition-duration: ${duration}ms; ${transform}`;
  };

  onOverlayClick = () => {
    const { closeWithOverlayClick } = this.props;

    if (closeWithOverlayClick) {
      this.onChange(false);
    }
  };

  renderFurther() {
    const {
      left,
      right,
      top,
      bottom,
      action,
      position,
      theme,
      direction,
      reverse,
      hideShadow,
      actionRotate,
      buttons,
      hoverClass,
      overlay,
      overlayColor,
      overlayAlpha,
      overlayDuration,
    } = this.props;
    const { buttonStyle, buttonVisible } = this.state;

    const style = {
      '--left': left,
      '--right': right,
      '--top': top,
      '--bottom': bottom,
    };

    const classes = buildClasses(
      classPrefix,
      position,
      theme,
      direction,
      reverse,
      buttonVisible,
      hideShadow,
      actionRotate,
      buttons,
      hoverClass,
    );

    return (
      <>
        {overlay ? (
          <Overlay
            visible={buttonVisible}
            zIndex={1000}
            overlayColor={overlayColor}
            overlayAlpha={overlayAlpha}
            duration={overlayDuration}
            onClick={this.onOverlayClick}
            lockScroll
          />
        ) : null}

        <View className={classNames(classPrefix, classes.wrap)} style={style}>
          <View
            class={classes.action}
            hoverClass={classes.hover}
            onClick={this.onToggle}
          >
            {action ? (
              isString(action) ? (
                isUrl(action) || isImageBase4(action) ? (
                  <View class={classes.text}>
                    <ImageBox src={action} lazyLoad />
                  </View>
                ) : (
                  <View class={classes.text}>
                    <CenterBox>
                      <Avatar
                        circle
                        style={{ background: 'transparent' }}
                        text={action}
                      />
                    </CenterBox>
                  </View>
                )
              ) : (
                <View class={classes.text}>
                  <CenterBox>{action}</CenterBox>
                </View>
              )
            ) : (
              <View class={classes.text}>
                <CenterBox>
                  <IconAdd size={40} color="#fff" />
                </CenterBox>
              </View>
            )}
          </View>

          {buttons.map((button, index) => {
            const key = `float_action_item_${index}`;

            return (
              <View
                key={key}
                className={classes.button[index].wrap}
                disabled={button.disabled}
                hoverClass={
                  !button.disabled ? classes.button[index].hover : 'none'
                }
                hoverStopPropagation={button.hoverStopPropagation}
                hoverStartTime={button.hoverStartTime}
                hoverStayTime={button.hoverStayTime}
                onClick={() => {
                  this.onItemClick(button, index);
                }}
                style={buttonStyle[index]}
              >
                {button.icon ? (
                  isString(button.icon) ? (
                    isUrl(button.icon) || isImageBase4(button.icon) ? (
                      <View class={classes.icon}>
                        <ImageBox src={button.icon} lazyLoad />
                      </View>
                    ) : (
                      <View class={classes.icon}>
                        <CenterBox>
                          <Avatar
                            circle
                            style={{ background: 'transparent' }}
                            text={button.icon}
                          />
                        </CenterBox>
                      </View>
                    )
                  ) : (
                    <View class={classes.icon}>
                      <CenterBox>{button.icon}</CenterBox>
                    </View>
                  )
                ) : (
                  <View class={classes.icon}>
                    <CenterBox>
                      <IconEdit size={40} color="#fff" />
                    </CenterBox>
                  </View>
                )}

                {button.label ? (
                  <View className={classes.label}>{button.label}</View>
                ) : null}
              </View>
            );
          })}
        </View>
      </>
    );
  }
}

FloatAction.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { FloatAction };
