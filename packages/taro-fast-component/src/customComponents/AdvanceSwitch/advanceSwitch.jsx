import { View, Text, Switch } from '@tarojs/components';

import {
  inCollection,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import { isFunction, isString } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import FlexBox from '../FlexBox';
import VerticalBox from '../VerticalBox';

const typeCollection = ['switch', 'checkbox'];

const defaultProps = {
  required: false,
  hidden: false,
  label: '',
  labelStyle: {},
  labelContainerStyle: {},
  checked: false,
  disabled: false,
  type: 'switch',
  color: '',
  onChange: null,
  loading: false,
};

class AdvanceSwitch extends ComponentBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        checkedFlag: false,
        checkedTemp: false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { checked: checkedNext } = nextProps;
    const { checkedFlag: checkedPrev } = prevState;

    if (checkedNext !== checkedPrev) {
      return {
        checkedFlag: checkedNext,
        checkedTemp: checkedNext ?? '',
      };
    }

    return {};
  }

  setChecked = (v) => {
    const { onChange } = this.props;

    this.setState({ checkedTemp: !!v });

    if (isFunction(onChange)) {
      onChange(!!v);
    }
  };

  onClick = () => {
    const { loading, disabled: disabledSource } = this.props;
    const { checkedTemp } = this.state;

    const disabled = disabledSource || loading || false;

    if (disabled || loading) {
      return;
    }

    this.setChecked(!checkedTemp);
  };

  renderFurther() {
    const {
      required,
      hidden,
      label,
      labelStyle,
      labelContainerStyle,
      color,
      type: typeSource,
      loading,
      disabled: disabledSource,
    } = this.props;
    const { checkedTemp } = this.state;

    if (!!hidden) {
      return null;
    }

    const type = inCollection(typeCollection, typeSource)
      ? typeSource
      : 'switch';
    const disabled = disabledSource || loading || false;

    let labelComponent = label;

    if (isString(label)) {
      if (!stringIsNullOrWhiteSpace(label)) {
        labelComponent = (
          <VerticalBox>
            <View
              style={{ ...{ paddingRight: 'var(--tfc-40)' }, ...labelStyle }}
            >
              {!!required ? (
                <Text
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    textAlign: 'center',
                    width: 'var(--tfc-24)',
                    height: 'var(--tfc-45)',
                    lineHeight: 'var(--tfc-45)',
                    color: 'red',
                  }}
                >
                  *
                </Text>
              ) : null}
              {label}
            </View>
          </VerticalBox>
        );
      } else {
        labelComponent = null;
      }
    }

    if (labelComponent == null) {
      return (
        <Switch
          type={type}
          checked={checkedTemp}
          color={color}
          disabled={disabled}
          onChange={this.onClick}
        />
      );
    }

    return (
      <FlexBox
        flexAuto="left"
        left={labelComponent}
        leftStyle={labelContainerStyle}
        right={
          <Switch
            type={type}
            checked={checkedTemp}
            color={color}
            disabled={disabled}
            onChange={this.onClick}
          />
        }
      />
    );
  }
}

AdvanceSwitch.defaultProps = {
  ...defaultProps,
};

export default AdvanceSwitch;
