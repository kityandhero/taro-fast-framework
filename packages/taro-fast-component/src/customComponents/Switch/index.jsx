import classNames from 'classnames';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import { Spin } from '../Spin';

import './index.less';

const classPrefix = `tfc-switch`;

const defaultProps = {
  loading: false,
  disabled: false,
  checked: false,
  beforeChange: null,
  onChange: null,
  checkedText: '',
  uncheckedText: '',
  size: 2,
  color: '',
  hidden: false,
  onChange: null,
};

class Switch extends ComponentBase {
  triggerChange = () => {
    const { checked, onChange } = this.props;

    if (isFunction(onChange)) {
      onChange(!checked);
    }
  };

  renderFurther() {
    const {
      checked,
      disabled: disabledSource,
      loading,
      checkedText,
      uncheckedText,
      size,
      color,
      hidden,
    } = this.props;

    if (hidden) {
      return null;
    }

    const disabled = disabledSource || loading || false;

    return (
      <View
        className={classNames(classPrefix, {
          [`${classPrefix}-checked`]: checked,
          [`${classPrefix}-disabled`]: disabled,
        })}
        style={{
          ...{
            '--width': transformSize(50 * size),
            '--height': transformSize(30 * size),
          },
          ...(!!color
            ? {
                '--checked-color': color,
              }
            : {}),
        }}
        onClick={this.triggerChange}
      >
        <View className={`${classPrefix}-checkbox`} hoverClass="none">
          <View className={`${classPrefix}-handle`} hoverClass="none">
            <Spin spin={loading}>
              <View
                style={{
                  width: transformSize(30 * size),
                  height: transformSize(30 * size),
                }}
              ></View>
            </Spin>
          </View>

          <View
            className={`${classPrefix}-inner`}
            hoverClass="none"
            style={{
              fontSize: transformSize(13 * size),
              padding: `0 var(--tfc-4)`,
            }}
          >
            {checked ? checkedText : uncheckedText}
          </View>
        </View>
      </View>
    );
  }
}

Switch.defaultProps = {
  ...defaultProps,
};

export default Switch;
