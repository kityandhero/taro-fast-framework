import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isFunction, isArray } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';
import { Space, Grid, Icon } from 'taro-fast-component/es/customComponents';

const { IconCheck } = Icon;

const classPrefix = `tfc-selector`;

const defaultProps = {
  ...ComponentBase.defaultProps,
  ...{
    multiple: false,
    value: [],
    options: [],
    columns: 4,
    disabled: false,
    onChange: null,
  },
};

class Selector extends ComponentBase {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      ...this.state,
      ...{
        valueFlag: value || [],
        valueTemp: value || [],
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value: valueNext } = nextProps;
    const { valueFlag: valuePrev } = prevState;

    if (valueNext !== valuePrev) {
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

    let val = [];

    if (multiple) {
      val = active
        ? valueTemp.filter((v) => v !== option.value)
        : [...valueTemp, option.value];

      this.setState({
        valueTemp: val,
      });
    } else {
      val = active ? [] : [option.value];

      this.setState({
        valueTemp: val,
      });
    }

    const extend = {
      get items() {
        return options.filter((o) => val.includes(o.value));
      },
    };

    if (isFunction(onChange)) {
      onChange(val, extend);
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

export default Selector;
