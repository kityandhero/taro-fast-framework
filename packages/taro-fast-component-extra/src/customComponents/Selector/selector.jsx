import classNames from 'classnames';
import { View } from '@tarojs/components';

import { ComponentBase } from 'taro-fast-common/es/customComponents';
import { transformSize } from 'taro-fast-common/es/utils/tools';
import { isArray, isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { Grid, Icon, Space } from 'taro-fast-component/es/customComponents';

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
          style={{
            padding: `${transformSize(16)} ${transformSize(16)}`,
            borderRadius: transformSize(4),
          }}
          onClick={() => {
            if (disabled) {
              return;
            }

            this.triggerChange(option, active);
          }}
        >
          {option.label}

          {option.description && (
            <View
              className={`${classPrefix}-item-description`}
              style={{
                fontSize: transformSize(6),
              }}
            >
              {option.description}
            </View>
          )}

          {active && (
            <View
              className={`${classPrefix}-check-mark-wrapper`}
              style={{
                borderTop: `solid ${transformSize(16)} transparent`,
                borderBottom: `solid ${transformSize(
                  16,
                )} var(--tfc-color-primary)`,
                borderLeft: `solid ${transformSize(20)} transparent`,
                borderRight: `solid ${transformSize(
                  20,
                )} var(--tfc-color-primary)`,
              }}
            >
              <IconCheck
                className={`${classPrefix}-check-mark-wrapper-mark`}
                style={{
                  left: `calc(${transformSize(4)} * -1)`,
                  top: `calc(${transformSize(8)} * -1)`,
                  height: transformSize(12),
                  width: transformSize(16),
                }}
                size={22}
                color="#fff"
              />
            </View>
          )}
        </View>
      );
    });

    return (
      <View
        className={classPrefix}
        style={{
          fontSize: transformSize(30),
        }}
      >
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
