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
      arrow: arrowSource,
      extra,
      children,
    } = this.props;

    const arrow = !arrowSource ? clickable : !!arrowSource;

    return (
      <View
        className={classNames(
          `${classPrefix}`,
          clickable ? [`${classPrefix}-clickable`] : [],
          disabled && `${classPrefix}-disabled`,
        )}
        style={style}
        onClick={this.triggerClick}
      >
        <View className={`${classPrefix}-content`}>
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
                <IconChevronRight size={24} />
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
