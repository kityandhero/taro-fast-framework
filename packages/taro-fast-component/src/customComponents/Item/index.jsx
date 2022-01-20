import classNames from 'classnames';
import { View } from '@tarojs/components';

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
  description: null,
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
      description,
      clickable,
      disabled,
      arrow,
      extra,
      extraContainerStyle,
      children,
      border,
      showBody,
      body,
    } = this.props;

    const b =
      showBody && (body || null) != null ? (
        <View className={classNames(`${classPrefix}-body`)}>{body}</View>
      ) : null;

    return (
      <View className={classNames(`${classPrefix}`)}>
        <View
          className={classNames(
            `${classPrefix}-header`,
            !disabled && clickable ? [`${classPrefix}-header-clickable`] : [],
            disabled && `${classPrefix}-header-disabled`,
          )}
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

            {!!title || !!children || !!description ? (
              <View className={`${classPrefix}-header-content-main`}>
                {title ? (
                  <View className={`${classPrefix}-header-title`}>{title}</View>
                ) : null}

                {children}

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
                style={extraContainerStyle}
              >
                <VerticalBox>{extra}</VerticalBox>
              </View>
            ) : null}

            {arrow ? (
              <View className={`${classPrefix}-header-content-arrow`}>
                <VerticalBox>
                  <IconChevronRight size={20} />
                </VerticalBox>
              </View>
            ) : null}
          </View>
        </View>

        {b}
      </View>
    );
  }
}

Item.defaultProps = {
  ...defaultProps,
};

export default Item;
