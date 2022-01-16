import classNames from 'classnames';
import { View, Button, Image, Slot } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { ComponentBase } from 'taro-fast-common/es/customComponents';

import './index.less';

const defaultAction =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfhBAQLCR5MtjrbAAAAjUlEQVRo3u3ZMRKAIAxEUbDirp4nXnctFFDHBtDQ/O1Nnk6aHUMgZCBKMkmmNAtgOmL9M+IQQGVM95zljy8DAAAAAAAAAAAAAACALsDZcppSx7Q+WdtUvA5xffUtrjeA8/qQ21S9gc15/3Nfzw0M5O0G2kM5BQAAAAAAAAAAAAAAQGk33q0qZ/p/Q/JFdmei9usomnwIAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTA0VDExOjA5OjMwKzA4OjAw1U4c3wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0wNFQxMTowOTozMCswODowMKQTpGMAAAAASUVORK5CYII=';

// 设置元素旋转属性
const setTransform = (translate = 0, scale = 1, delay = 300, isH = true) => {
  const duration = `transition-duration: ${delay}ms`;
  const transform = `transform: scale(${scale}) translate3d(${
    isH ? translate : 0
  }px, ${isH ? 0 : translate}px, 0)`;

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
  const backdrop = `${prefixCls}__backdrop`;
  const hover =
    hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`;

  return {
    wrap,
    action,
    text,
    button,
    icon,
    label,
    backdrop,
    hover,
  };
}

const defaultPosition = {
  prefixCls: 'wux-fab-button',
  hoverClass: 'default',
  theme: 'balanced',
  position: 'bottomRight',
  action: defaultAction,
  actionRotate: true,
  hideShadow: false,
  backdrop: false,
  buttons: [],
  direction: 'horizontal',
  spaceBetween: 10,
  duration: 300,
  scale: 0.9,
  reverse: false,
  sAngle: 0,
  eAngle: 360,
  defaultVisible: false,
  visible: false,
  controlled: false,
};

class FloatAction extends ComponentBase {
  constructor(props) {
    super(props);

    const { defaultVisible, visible, controlled } = this.props;
    const buttonVisible = controlled ? visible : defaultVisible;

    this.state = {
      ...this.state,
      ...{
        buttonStyle: [],
        buttonVisible,
      },
    };
  }
  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { defaultVisible, visible, controlled } = nextProps;

    const buttonVisible = controlled ? visible : defaultVisible;

    return { buttonVisible };
  }

  updated(buttonVisible) {
    if (this.data.buttonVisible !== buttonVisible) {
      this.setData({
        buttonVisible,
      });

      this.updateButtonStyle(!buttonVisible);
    }
  }

  onChange(buttonVisible) {
    if (!this.data.controlled) {
      this.updated(buttonVisible);
    }

    this.triggerEvent('change', { value: buttonVisible });
  }

  onToggle() {
    const { buttonVisible } = this.state;

    this.onChange(!buttonVisible);
  }

  onTap(e) {
    const { index, value } = e.currentTarget.dataset;
    const params = {
      index,
      value,
      buttons: this.data.buttons,
    };

    if (!value.disabled) {
      this.triggerEvent('click', params);
      this.onChange(false);
    }
  }

  /**
   * 获取界面上的节点信息
   */
  getRect(selector, all) {
    return new Promise((resolve) => {
      Taro.createSelectorQuery()
        .in(this)
        [all ? 'selectAll' : 'select'](selector)
        .boundingClientRect((rect) => {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }

          if (!all && rect) {
            resolve(rect);
          }
        })
        .exec();
    });
  }

  forceUpdateButtonStyle() {
    this.updateButtonStyle(!this.data.buttonVisible);
  }

  /**
   * 更新按钮组样式
   */
  updateButtonStyle(isReset) {
    const { prefixCls, buttons, duration, direction, spaceBetween, scale } =
      this.data;
    const buttonStyle = [];
    const sign = this.data.reverse ? 1 : -1;
    const isH = direction === 'horizontal';

    // 重置样式
    if (isReset) {
      buttons.forEach(() => {
        buttonStyle.push('opacity: 0; transform: translate3d(0, 0, 0)');
      });

      if (this.data.buttonStyle !== buttonStyle) {
        this.setData({ buttonStyle });
      }

      return;
    }

    // 更新样式
    this.getRect(`.${prefixCls}__action`).then((rect) => {
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

      if (this.data.buttonStyle !== buttonStyle) {
        this.setData({ buttonStyle });
      }
    });
  }

  /**
   * 获取圆形按钮的样式
   * @param {Number} index 当前按钮索引
   * @param {Number} radius 圆的半径
   */
  getCircleStyle(index, radius) {
    const { sAngle, eAngle, duration, scale } = this.data;
    const { length } = this.data.buttons;
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

    const transform = `transform: scale(${scale}) translate3d(${x}px, ${y}px, 0)`;

    return `opacity: 1; transition-duration: ${duration}ms; ${transform}`;
  }

  bindgetuserinfo(e) {
    this.triggerEvent('getuserinfo', {
      ...e.detail,
      ...e.currentTarget.dataset,
    });
  }

  bindcontact(e) {
    this.triggerEvent('contact', { ...e.detail, ...e.currentTarget.dataset });
  }

  bindgetphonenumber(e) {
    this.triggerEvent('getphonenumber', {
      ...e.detail,
      ...e.currentTarget.dataset,
    });
  }

  bindopensetting(e) {
    this.triggerEvent('opensetting', {
      ...e.detail,
      ...e.currentTarget.dataset,
    });
  }

  onError(e) {
    this.triggerEvent('error', { ...e.detail, ...e.currentTarget.dataset });
  }

  render() {
    const {
      backdrop,
      action,
      prefixCls,
      position,
      theme,
      direction,
      reverse,
      hideShadow,
      actionRotate,
      buttons,
      hoverClass,
    } = this.props;
    const { buttonStyle, buttonVisible } = this.state;

    const classes = buildClasses(
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
    );

    return (
      <>
        {backdrop && buttonVisible ? (
          <View class={classes.backdrop}></View>
        ) : null}

        <View
          className={classNames('wux-class', classes.wrap)}
          onClick={this.onToggle}
        >
          <View class={classes.action} hoverClass={classes.hover}>
            {action ? (
              <Image class={classes.text} src={action} />
            ) : (
              <Slot name="action"></Slot>
            )}
          </View>
          {buttons.map((button, index) => {
            const key = `float_action_item_${index}`;

            return (
              <Button
                key={key}
                className={classes.button[index].wrap}
                disabled={button.disabled}
                open-type={button.openType}
                hoverClass={
                  !button.disabled ? classes.button[index].hover : 'none'
                }
                hoverStopPropagation={button.hoverStopPropagation}
                hoverStartTime={button.hoverStartTime}
                hoverStayTime={button.hoverStayTime}
                lang={button.lang}
                sessionFrom={button.sessionFrom}
                sendMessageTitle={button.sendMessageTitle}
                sendMessageImg={button.sendMessageImg}
                sendMessagePath={button.sendMessagePath}
                showMessageCard={button.showMessageCard}
                appParameter={button.appParameter}
                onClick={this.onTap}
                style={buttonStyle[index]}
                onError={this.onError}

                // data-value="{{ button }}"
                // data-label="{{ button.label }}"
                //   bindgetuserinfo="bindgetuserinfo"
                //   bindcontact="bindcontact"
                //   bindgetphonenumber="bindgetphonenumber"
                //   bindopensetting="bindopensetting"
              >
                <Image className={classes.icon} src={button.icon} />

                {button.label ? (
                  <View className={classes.label}>{button.label}</View>
                ) : null}
              </Button>
            );
          })}
        </View>
      </>
    );
  }
}

FloatAction.defaultProps = {
  ...defaultPosition,
};

export default FloatAction;
