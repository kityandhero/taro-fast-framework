import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import VerticalBox from '../VerticalBox';
import Icon from '../Icon';

const { IconChevronRight } = Icon;

const classPrefix = `tfc-list-item`;

const defaultProps = {
  style: {},
  title: null,
  description: null,
  prefix: null,
  extra: null,
  clickable: false,
  border: true,
  arrow: false,
  disabled: false,
  onClick: null,
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

  render() {
    const {
      style,
      prefix,
      title,
      description,
      clickable,
      disabled,
      arrow,
      extra,
      children,
      border,
    } = this.props;

    return (
      <View
        className={classNames(
          `${classPrefix}`,
          !disabled && clickable ? [`${classPrefix}-clickable`] : [],
          disabled && `${classPrefix}-disabled`,
        )}
        style={style}
        onClick={this.triggerClick}
      >
        <View
          className={`${classPrefix}-content`}
          style={!border ? { borderBottom: '0' } : {}}
        >
          {prefix && (
            <View className={`${classPrefix}-content-prefix`}>
              <VerticalBox>{prefix}</VerticalBox>
            </View>
          )}

          <View className={`${classPrefix}-content-main`}>
            {title && <View className={`${classPrefix}-title`}>{title}</View>}
            {children}
            {description && (
              <View className={`${classPrefix}-description`}>
                {description}
              </View>
            )}
          </View>

          {extra ? (
            <View className={`${classPrefix}-content-extra`}>
              <VerticalBox>{extra}</VerticalBox>
            </View>
          ) : null}

          {arrow ? (
            <View className={`${classPrefix}-content-arrow`}>
              <VerticalBox>
                <IconChevronRight size={20} />
              </VerticalBox>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

Item.defaultProps = {
  ...defaultProps,
};

export default Item;
