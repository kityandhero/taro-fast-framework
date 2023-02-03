import classNames from 'classnames';
import { View } from '@tarojs/components';

import { getGuid, isFunction, logException } from 'easy-soft-utility';

import { getRect, transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';
import { IconChevronRight } from '../Icon';
import { Line } from '../Line';

import './index.less';

const classPrefix = `tfc-item`;

const defaultProps = {
  style: {},
  title: null,
  label: '请设置标题',
  description: null,
  prefix: null,
  prefixStyle: {},
  contentStyle: {},
  extra: null,
  extraContainerStyle: {},
  clickable: false,
  border: true,
  borderWidth: 1,
  borderTopDistance: 0,
  borderColor: 'var(--tfc-border-color)',
  arrow: false,
  arrowSize: 40,
  arrowColor: '',
  disabled: false,
  onClick: null,
  showBody: false,
  body: null,
  bodyStyle: {},
  bodyAnimate: false,
  bodyInnerStyle: {},
  bodyContentStyle: {},
};

class Item extends BaseComponent {
  bodyId = '';

  bodyHeight = -1;

  constructor(props) {
    super(props);

    this.bodyId = getGuid();
  }

  doWorkAdjustDidMount = () => {
    const { body } = this.props;

    if (body != null) {
      const that = this;

      setTimeout(() => {
        that.updateBodyHeight();
      }, 200);
    }
  };

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    this.updateBodyHeight();
  };

  getContainerStyle = () => {
    const { borderWidth, borderColor } = this.props;

    return {
      '--border-width': transformSize(borderWidth),
      '--border-color': borderColor,
    };
  };

  updateBodyHeight = () => {
    const { body } = this.props;

    if (body != null) {
      const that = this;

      getRect(`#${that.bodyId}`)
        .then((rect) => {
          const { height } = { ...{ height: 0 }, ...rect };

          if (height > 0) {
            that.bodyHeight = height;
          }

          return rect;
        })
        .catch((error) => {
          logException(error);
        });
    }
  };

  triggerClick = () => {
    const { disabled, onClick } = this.props;

    if (!!disabled) {
      return;
    }

    if (isFunction(onClick)) {
      onClick();
    }
  };

  renderFurther() {
    const {
      style,
      prefix,
      prefixStyle,
      title,
      label,
      description,
      contentStyle,
      clickable,
      disabled,
      arrow,
      arrowSize,
      arrowColor,
      extra,
      extraContainerStyle,
      border,
      borderTopDistance,
      showBody,
      body,
      bodyStyle,
      bodyInnerStyle,
      bodyContentStyle,
      bodyAnimate,
      children,
    } = this.props;

    const containerStyle = this.getContainerStyle();

    const b =
      (body || null) != null ? (
        <View
          className={classNames(`${classPrefix}-body`, {
            [`${classPrefix}-body__animate`]: bodyAnimate,
          })}
          style={{
            ...bodyStyle,
            ...(showBody
              ? this.bodyHeight > 0
                ? { maxHeight: `${this.bodyHeight}px` }
                : { maxHeight: '150px' }
              : { maxHeight: 0 }),
          }}
        >
          <View
            id={this.bodyId}
            className={classNames(`${classPrefix}-body__inner`)}
            style={bodyInnerStyle}
          >
            <View
              className={classNames(`${classPrefix}-body__inner__content`)}
              style={bodyContentStyle}
            >
              {body}
            </View>
          </View>
        </View>
      ) : null;

    return (
      <View className={classNames(`${classPrefix}`)} style={containerStyle}>
        <View
          className={classNames(
            `${classPrefix}-header`,
            !disabled && clickable ? [`${classPrefix}-header-clickable`] : [],
            disabled && `${classPrefix}-header-disabled`,
          )}
          hoverClass={
            !disabled && clickable
              ? `${classPrefix}-header-clickable--hover`
              : 'none'
          }
          hoverStartTime={5}
          style={style}
          onClick={this.triggerClick}
        >
          <View className={`${classPrefix}-header-content`}>
            {!!prefix ? (
              <View
                className={`${classPrefix}-header-content-prefix`}
                style={prefixStyle}
              >
                {prefix}
              </View>
            ) : null}

            {!!title || !!label || !!description ? (
              <View
                className={`${classPrefix}-header-content-main`}
                style={contentStyle}
              >
                {title ? (
                  <View className={`${classPrefix}-header-title`}>{title}</View>
                ) : null}

                {label}

                {description ? (
                  <View className={`${classPrefix}-header-description`}>
                    {description}
                  </View>
                ) : null}
              </View>
            ) : null}

            {extra ? (
              <View
                className={`${classPrefix}-header-content-extra`}
                style={{
                  ...{
                    fontSize: transformSize(28),
                  },
                  ...extraContainerStyle,
                }}
              >
                {extra}
              </View>
            ) : null}

            {arrow ? (
              <View className={`${classPrefix}-header-content-arrow`}>
                <IconChevronRight size={arrowSize} color={arrowColor} />
              </View>
            ) : null}
          </View>
        </View>

        {children}

        {b}

        {borderTopDistance > 0 ? (
          <Line height={borderTopDistance} transparent />
        ) : null}

        {!border ? null : (
          <View className={classNames(`${classPrefix}__bottom`)}>
            <View
              className={classNames(`${classPrefix}__bottom__border`)}
            ></View>
          </View>
        )}
      </View>
    );
  }
}

Item.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { Item };
