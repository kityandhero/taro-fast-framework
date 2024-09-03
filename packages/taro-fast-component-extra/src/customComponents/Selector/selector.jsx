import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isArray, isFunction } from 'easy-soft-utility';

import { AbstractComponent } from 'taro-fast-common';
import { Grid, IconCheck, Space } from 'taro-fast-component';

const classPrefix = `tfc-selector`;

const defaultProps = {
  ...AbstractComponent.defaultProps,
  multiple: false,
  value: [],
  options: [],
  columns: 4,
  disabled: false,
  onChange: null,
};

class Selector extends AbstractComponent {
  constructor(properties) {
    super(properties);

    const { value } = properties;

    this.state = {
      ...this.state,

      valueFlag: value || [],
      valueTemp: value || [],
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    const { value: valueNext } = nextProperties;
    const { valueFlag: valuePrevious } = previousState;

    if (valueNext !== valuePrevious) {
      return {
        valueFlag: valueNext || [],
        valueTemp: valueNext || [],
      };
    }

    return {};
  }

  triggerChange = (option, active) => {
    const { options, multiple, onChange } = this.props;
    const { valueTemp } = this.state;

    if (!isArray(options)) {
      throw new Error('Selector Options must be array');
    }

    let value = [];

    if (multiple) {
      value = active
        ? valueTemp.filter((v) => v !== option.value)
        : [...valueTemp, option.value];

      this.setState({
        valueTemp: value,
      });
    } else {
      value = active ? [] : [option.value];

      this.setState({
        valueTemp: value,
      });
    }

    const extend = {
      get items() {
        return options.filter((o) => value.includes(o.value));
      },
    };

    if (isFunction(onChange)) {
      onChange(value, extend);
    }
  };

  renderFurther() {
    const { columns, disabled: disabledSource, multiple, options } = this.props;
    const { valueTemp } = this.state;

    if (!isArray(options)) {
      throw new Error('Selector Options must be array');
    }

    const items = options.map((option) => {
      const active = (valueTemp || []).includes(option.value);
      const disabled = option.disabled || disabledSource;
      const itemCls = classNames(`${classPrefix}-item`, {
        [`${classPrefix}-item-active`]: active && !multiple,
        [`${classPrefix}-item-multiple-active`]: active && multiple,
        [`${classPrefix}-item-disabled`]: disabled,
      });

      return (
        <View
          key={option.value}
          className={itemCls}
          onClick={() => {
            if (disabled) {
              return;
            }

            this.triggerChange(option, active);
          }}
        >
          {option.label}

          {option.description && (
            <View className={`${classPrefix}-item-description`}>
              {option.description}
            </View>
          )}

          {active && (
            <View className={`${classPrefix}-check-mark-wrapper`}>
              <IconCheck
                className={`${classPrefix}-check-mark-wrapper-mark`}
                size={22}
                color="#fff"
              />
            </View>
          )}
        </View>
      );
    });

    return (
      <View className={classPrefix}>
        {!columns && <Space wrap>{items}</Space>}

        {columns && (
          <Grid columns={columns} gap={8}>
            {items}
          </Grid>
        )}
      </View>
    );
  }
}

Selector.defaultProps = {
  ...defaultProps,
};

export { Selector };
