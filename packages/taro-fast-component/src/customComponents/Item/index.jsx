import classNames from 'classnames';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import VerticalBox from '../VerticalBox';
import Icon from '../Icon';

import './index.less';

const { IconChevronRight } = Icon;

const classPrefix = `tfc-item`;

const defaultProps = {
  style: {},
  title: null,
  label: '请设置标题',
  description: null,
  contentStyle: {},
  prefix: null,
  extra: null,
  extraContainerStyle: {},
  clickable: false,
  border: true,
  arrow: false,
  disabled: false,
  onClick: null,
  showBody: false,
  body: null,
  bodyStyle: {},
  bodyAnimate: false,
};

class Item extends ComponentBase {
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
      title,
      label,
      description,
      contentStyle,
      clickable,
      disabled,
      arrow,
      extra,
      extraContainerStyle,
      border,
      showBody,
      body,
      bodyStyle,
      bodyAnimate,
      children,
    } = this.props;

    const b =
      (body || null) != null ? (
        <View
          className={classNames(`${classPrefix}-body`, {
            [`${classPrefix}-body__animate`]: bodyAnimate,
            [`${classPrefix}-body__open`]: showBody,
            [`${classPrefix}-body__close`]: !showBody,
          })}
          style={bodyStyle}
        >
          <View className={classNames(`${classPrefix}-body__inner`)}>
            {body}
          </View>
        </View>
      ) : null;

    return (
      <View className={classNames(`${classPrefix}`)}>
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
          <View
            className={`${classPrefix}-header-content`}
            style={!border ? { borderBottom: '0' } : {}}
          >
            {!!prefix ? (
              <View className={`${classPrefix}-header-content-prefix`}>
                <VerticalBox>{prefix}</VerticalBox>
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
                <VerticalBox>{extra}</VerticalBox>
              </View>
            ) : null}

            {arrow ? (
              <View className={`${classPrefix}-header-content-arrow`}>
                <VerticalBox>
                  <IconChevronRight size={40} />
                </VerticalBox>
              </View>
            ) : null}
          </View>
        </View>
        {children}
        {b}
      </View>
    );
  }
}

Item.defaultProps = {
  ...defaultProps,
};

export default Item;
